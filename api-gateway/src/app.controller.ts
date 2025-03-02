import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpFaceDTO } from './common/UpFaceDTO';
import { searcgImageDTO } from './common/SearchImageDTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/search-image')
  @UseInterceptors(FileInterceptor('image'))
  searchImage(
    // @Query() query: searcgImageDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.appService.searchImage(image);
  }

  @Post('/upsert-image')
  @UseInterceptors(FileInterceptor('image'))
  upImage(
    @Query() query: UpFaceDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.appService.upImage(query, image);
  }

  @Get('/delete-face/:id')
  deleteFace(@Param('id') id: number) {
    return this.appService.deleteDocument(id);
  }
}
