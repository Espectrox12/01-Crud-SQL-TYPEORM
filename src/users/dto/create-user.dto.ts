import { IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(4)
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    rol: string;

}
