import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsEmpty, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto{
    @IsMongoId({message: 'id is not valid'})
    @IsNotEmpty({message: 'id is required'})
    _id: string;
    @IsOptional()
    name: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    address: string;

    @IsOptional()
    image: string;
}
