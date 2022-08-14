import { ListUserController } from '@/domains/user/implementations/controllers/list-user-controller';
import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { ListUserNestDto } from './dtos/list-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly listUserController: ListUserController) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
  @Get()
  findAll(listUserDto: ListUserNestDto) {
    return this.listUserController.list(listUserDto);
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
