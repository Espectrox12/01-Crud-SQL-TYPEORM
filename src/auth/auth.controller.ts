import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';

interface RequesWitchUser extends Request{
    user:{
        email: string;
        role: string;
    }
}

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,

    ){}

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ){
        return this.authService.register(registerDto);
    }
    @Post('login')
    login(
        @Body()
        LoginDto: LoginDto
    ){
        return this.authService.login(LoginDto);
    }

    @Get('profile')
    @Roles("admin","user")
    @UseGuards(AuthGuard,RolesGuard)
    profile(
        @Req()req:RequesWitchUser,
    ){
        return req.user;
    }
}
