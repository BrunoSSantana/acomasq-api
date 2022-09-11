import { UpdateUserDto } from '@/domains/user/contracts/dtos/update-user-dto';
import { OutputUser } from '@/domains/user/entities/user.entity';
import { CreateUserController } from '@/domains/user/implementations/controllers/create-user-controller';
import { DetailUserController } from '@/domains/user/implementations/controllers/detail-user-controller';
import { ListUserController } from '@/domains/user/implementations/controllers/list-user-controller';
import { UpdateUserController } from '@/domains/user/implementations/controllers/update-user-controller';
import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Query,
  Patch,
  // Delete,
} from '@nestjs/common';
import { CreateUserNestDto } from './dtos/create-user.dto';
import { ListUserNestDto } from './dtos/list-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly listUserController: ListUserController,
    private readonly createUserController: CreateUserController,
    private readonly detailUserController: DetailUserController,
    private readonly updateUserController: UpdateUserController,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserNestDto) {
    return this.createUserController.execute(createUserDto);
  }

  @Get()
  async findAll(@Query() listUserDto: ListUserNestDto): Promise<OutputUser[]> {
    console.log({ listUserDto });

    return this.listUserController.execute(listUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailUserController.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserController.execute(id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
