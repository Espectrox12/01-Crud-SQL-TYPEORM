import { IsInt, IsString, MinLength } from "class-validator";

export class CreateTaskDto {

    @IsString()
    nametask: string;

    @IsString()
    statustasks:string;

    @IsInt()
    userId: number;
  
}
