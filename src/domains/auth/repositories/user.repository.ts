import { User } from '@/domains/auth/entities/user';

export interface IUserRepository {
  create(params: User): Promise<User>;
  findByUsername(username: User['username']): Promise<User | null>;
  findById(userId: User['id']): Promise<User | null>;
  delete(userId: User['id']): Promise<void>;
}
