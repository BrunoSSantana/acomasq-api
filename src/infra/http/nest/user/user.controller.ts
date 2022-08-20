import { OutputUser } from '@/domains/user/entities/user.entity';
import { CreateUserController } from '@/domains/user/implementations/controllers/create-user-controller';
import { ListUserController } from '@/domains/user/implementations/controllers/list-user-controller';
import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { CreateUserNestDto } from './dtos/create-user.dto';
import { ListUserNestDto } from './dtos/list-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly listUserController: ListUserController,
    private readonly createUserController: CreateUserController,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserNestDto) {
    return this.createUserController.execute(createUserDto);
  }

  @Get()
  async findAll(listUserDto: ListUserNestDto): Promise<OutputUser[]> {
    return this.listUserController.execute(listUserDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
