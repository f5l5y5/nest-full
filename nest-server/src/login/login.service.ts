import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoginDto, LoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { User } from './entities/user.entity';
import * as svgCaptcha from 'svg-captcha';
import { RedisService } from 'nestjs-redis/dist/redis.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async createUser(createLoginDto: CreateLoginDto) {
    const newUser = this.user.create(createLoginDto);
    return await this.user.save(newUser);
  }
  async createCode() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });
    this.redisService.getClient().set('code', captcha.text, 'EX', 5);
    return captcha;
  }

  async login(loginDto: LoginDto) {
    const { name, password } = loginDto;
    const user = await this.user.findOne({ where: { name } });
    console.log('打印***user', user, loginDto);
    if (name === user.name && password === user.password) {
      return this.jwtService.sign(loginDto);
    } else {
      return '用户不存在';
    }
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
