import { BadRequestException,  Injectable as NestInjectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/entities/role.entity';
import { Injectable as AngularInjectable } from '@angular/core';



@NestInjectable()
export class AuthService {

    constructor(
        private readonly usersServices: UsersService,
        private readonly jwtService: JwtService
    ){}

    async register({name,email,password,rol}:RegisterDto){
        const user= await this.usersServices.findOneByEmail(email);
        if(user){
            throw new BadRequestException('email ya registrado')
        }
        return await this.usersServices.create({
            name,
            email,
            password: await bcryptjs.hash(password, 10),
            rol});
    }

    //async register(registerDto: RegisterDto){

        //await this.usersServices.create(registerDto)
        //return 'register';
    //}

    async login({email,password}:LoginDto){
        const user= await this.usersServices.findOneByEmail(email);
        if(!user){
            throw new UnauthorizedException('Email incorrecto')
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Password Incorrecta');}

        const payload = {id:user.id,email: user.email, role: user.role};

        const token = await this.jwtService.signAsync(payload)


        return {token,email};
    }
}
