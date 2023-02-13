import { PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from '@/domains/user/dtos';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
