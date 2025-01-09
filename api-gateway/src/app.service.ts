import { Injectable, NotFoundException } from '@nestjs/common';
import { UpFaceDTO } from './common/UpFaceDTO';
import { map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { AuthService } from './auth_services/auth.service';
@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async upImage(query: UpFaceDTO, image: Express.Multer.File): Promise<any> {
    console.log(query);
    const url =
      'http://222.252.98.195:8889/frs_up_face?name=' +
      query.name +
      '&id=' +
      query.id +
      '&index=' +
      0 +
      '&collection=face_db' +
      '&conf_thres=0.5';
    const imageBuffer = image.buffer;
    console.log(image);
    const res = await this.httpService
      .post(url, imageBuffer, {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      })
      .pipe(map((response: any) => response.data));
    return res;
  }

  async deleteDocument(id: number): Promise<any> {
    console.log(id);
    const url: string =
      'http://103.47.224.116:6333/collections/face_db/points/delete';
    const body = {
      filter: {
        must: [
          {
            key: 'id',
            match: {
              value: `${id}`,
            },
          },
        ],
      },
    };

    try {
      const response = await axios.post(url, body);
      return response.data;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }

  async searchImage(image: Express.Multer.File): Promise<any> {
    try {
      const config = {
        crop_size: 112,
        headpose: 0,
        yaw_thresh: 30,
        pitch_thresh: 30,
        skip_frame_ratio: 0,
        maxkeep: 20,
        crop_region: [],
        roi_list: [],
        conf_thres: 0.5,
        iou_thres: 0.6,
        img_size: 640,
        visualize: 0,
        facedb_name: 'all_face',
        face_thresh: 0.5,
        limit: 5,
      };
      const query = JSON.stringify(config);
      const response = await this.httpService
        .post('http://222.252.98.195:8889/searching-face', image.buffer, {
          params: { config_param: query, topk: 5, face_db: 'face_db' },
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        })
        .pipe(map((response) => response.data))
        .toPromise(); // convert observable to promise
      if (response?.data) {
        if (Array.isArray(response.data) && response.data.length === 0) {
          return null;
        }
      }
      const highestScoreElement = Array.isArray(response?.data)
        ? response.data.reduce((max: any, item: any) => {
            return item.score > max.score ? item : max;
          }, response.data[0])
        : null;

      console.log(highestScoreElement);
      if (!highestScoreElement)
        throw new NotFoundException({
          message: 'not found account',
          status: false,
        });
      if (highestScoreElement['score'] < 0.7)
        throw new NotFoundException({
          message: 'not found account',
          status: false,
        });

      const res = await this.authService.checkUser(
        highestScoreElement['payload']['id'],
      );
      console.log(res);
      if (!res) {
        throw new NotFoundException({
          message: 'not found account',
          status: false,
        });
      }
      return res;
    } catch (error) {
      console.error('Error:', error); // This will print any error that occurs
      throw error;
    }
  }
}
