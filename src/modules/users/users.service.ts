import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { hashPasswordhelper } from '../../helpers/utils';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email });// tuong tu findOne
    return user ? true : false;
  }

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;
    const isEmailExist = await this.isEmailExist(email);
    if (isEmailExist) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await hashPasswordhelper(password);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      ...(phone && { phone }),  // Chỉ thêm phone nếu có giá trị
      ...(address && { address }),  // Chỉ thêm address nếu có giá trị
      ...(image && { image })  // Chỉ thêm image nếu có giá trị
    });
  
    return {
      _id: user._id
    };
  }
  
  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    // trong filter khong co current va pageSize va neu co thi xoa
    if(filter.current) delete filter.current;
    if(filter.pageSize) delete filter.pageSize;

    if(!current) current = 1;
    if(!pageSize) pageSize = 10;

    // Tính toán số lượng items cần bỏ qua
    const totalItems = (await this.userModel.find(filter)).length;
    // Tính toán tổng số trang
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (+current - 1) * pageSize;

    const result = await this.userModel.find(filter)
      .skip(skip)
      .limit(pageSize)
      .skip(skip)
      .select('-password')
      .sort(sort as any)

      return {result,totalPages};
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
