import { IsEmail, IsEmpty, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({message: 'Name is required'})
    name: string;
    @IsNotEmpty()
    @IsEmail({}, {message: "email not empty"})
    email: string;
    @IsNotEmpty()
    password: string;
    @IsOptional()// Nếu muốn cho phép trường này không có
    phone: string;
    @IsOptional()
    address: string;
    @IsOptional()
    image: string;

}
