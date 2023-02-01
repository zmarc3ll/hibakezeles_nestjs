import { BadRequestException, Body, Controller, Get, HttpCode, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import RegisterDto from './register.dto';
import User from './user.entity';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Post('/register')
  @HttpCode(200)
  async register(@Body() registerDto: RegisterDto) {
    if (!registerDto.email || !registerDto.password || !registerDto.passwordAgain){
      throw new BadRequestException('All fields must be filled');
    }
    if (!registerDto.email.includes('@')) {
      throw new BadRequestException('Email must comtain @ char'); //vagy  UnprocessableEntities
    }
    if (registerDto.password!== registerDto.passwordAgain) {
      throw new BadRequestException('The two passwords must match');
    }
    if (registerDto.password.length < 8) {
      throw new BadRequestException('The password must be at least 8 characters long');
    } 

    const userRepo = this.dataSource.getRepository(User);
    const user = new User();
    user.email = registerDto.email;
    user.password = await bcrypt.hash(registerDto.password, 15)
    await userRepo.save(user);

    delete user.password;

    return user;

    //DB be baszúrás
    const newUser = {
      id: 34,
      email: 'emailexample@gmail.com'
    };
    



  }
}
