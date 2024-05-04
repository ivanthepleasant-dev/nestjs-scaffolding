import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { AppConfig, MongoConfig } from './config';
import { HttpLoggerMiddleware } from './middleware/http-logger.middleware';

@Module({
  imports: [
    // Load config module to read .env
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      load: [AppConfig],
    }),
    // Load MongoDB connector module asyncronously to be able to use parsed .evn values
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: MongoConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
