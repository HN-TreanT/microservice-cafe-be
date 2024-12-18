import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const microservices = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          // brokers: ['kafka:9092'],
          // brokers: ['127.0.0.1:9094'],
          brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
        },
        consumer: {
          groupId: 'online-services-consumer',
        },
      },
    }
  );
  await microservices.listen();
}
bootstrap();
