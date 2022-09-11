import { IListUserController } from '@/domains/user/contracts/user-controller';
import { IListUsersUseCase } from '@/domains/user/contracts/user-usecases';
import { OutputUser } from '@/domains/user/entities/user.entity';
import { ListUserDto } from '@/domains/user/contracts/dtos/list-user-dto';

export function pagination(listUserDto: ListUserDto) {
  if (!listUserDto) {
    return {
      take: 10,
      skip: 0,
      // orderby: { ['createdAt']: 'desc' } as {
      //   [key: string]: 'asc' | 'desc';
      // },
    };
  }

  // const [by, order] =
  //   listUserDto.orderby && Object.entries(listUserDto.orderby);

  const restParams = Object.fromEntries(
    Object.entries(listUserDto).filter(([, value]) => value),
  );

  return {
    ...restParams,
    take: listUserDto.take ?? 10,
    skip: listUserDto.skip ?? 0,
    // orderby: { [String(by) || 'createdAt']: order ?? 'desc' },
  };
}

export class ListUserController implements IListUserController {
  constructor(private readonly listUsersUseCase: IListUsersUseCase) {}

  execute(listUserDto: ListUserDto): Promise<OutputUser[]> {
    const listUserDtoHandle = pagination(listUserDto);

    return this.listUsersUseCase.list(listUserDtoHandle);
  }
}
