import { NotFoundException } from '@nestjs/common';

import { User } from '@/domains/auth/entities/user';
import { IUserRepository } from '@/domains/auth/repositories';

export class GetUserByUsernameService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }
    return User.create(user);
  }
}
