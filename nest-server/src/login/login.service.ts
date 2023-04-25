import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoginDto, LoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  async createUser(createLoginDto: CreateLoginDto) {
    const newUser = this.user.create(createLoginDto);
    return await this.user.save(newUser);
  }

  async login(loginDto: LoginDto) {
    const { name, password } = loginDto;
    const user = await this.user.findOne({ where: { name } });
    console.log('打印***user', user);
    if (user && name === user.name && password === user.password) {
      return { token: '1233333333333333' };
    } else {
      return '登陆失败';
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
