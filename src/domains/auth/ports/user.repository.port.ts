import { User } from '@/domains/auth/entities/user';

export interface IUserRepositoryPort {
  create(params: User): Promise<User>;
  findByUsername(username: User['username']): Promise<User | null>;
  findById(userId: User['id']): Promise<User | null>;
  delete(userId: User['id']): Promise<void>;
}
