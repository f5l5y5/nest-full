import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import config from './config';
import { JwtStrategy } from './common/jwt.strategy';
import { RedisModule } from 'nestjs-redis';
import { LoginService } from './login/login.service';
@Module({
  imports: [
    JwtModule.register(config.JwtConfig),
    RedisModule.register({
      host: 'localhost',
      port: 6379,
      // db: 'redis',
      password: '',
      keyPrefix: 'yn',
    }),

    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'root', //账号
      password: 'passwd', //密码
      host: 'localhost', //host
      port: 3306, //
      database: 'db', //库名
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
