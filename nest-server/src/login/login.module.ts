import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { RedisModule } from 'nestjs-redis/dist';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RedisModule.forRootAsync({
      useFactory: (loginService: LoginService) => loginService, // or use async method
      //useFactory: async (configService: ConfigService) => configService.get('redis'),
      inject: [LoginService],
    }),
    JwtModule.register({
      secret: 'taoism',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
