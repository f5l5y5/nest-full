import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto, LoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'login',
  version: '1',
})
@ApiTags('登录接口')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  create(@Body() loginDto: LoginDto, @Req() req) {
    console.log('打印***', loginDto, req.session);
    return this.loginService.login(loginDto);

    // if (
    //   loginDto?.code?.toLocaleLowerCase() ===
    //   req?.session?.code.toLocaleLowerCase()
    // ) {
    //   // 判断是否登录成功
    //   // return true;
    //   return this.loginService.login(loginDto);
    // } else {
    //   // 验证不通过，重新刷新图片
    //   return false;
    // }
  }

  @Post('/add')
  createUser(@Body() createLoginDto: CreateLoginDto) {
    console.log('打印***', createLoginDto);
    return this.loginService.createUser(createLoginDto);
  }

  @Get('/getDynamicCode')
  @ApiOperation({ summary: '获取动态验证码', description: '获取动态验证码' })
  async createDynamicCode(@Req() req, @Res() res) {
    const captcha = await this.loginService.createCode();

    // req.session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
    console.log('打印***req,res', req.session);
  }

  @Get()
  findAll(@Req() req) {
    console.log('打印***req.session', req.session);
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
