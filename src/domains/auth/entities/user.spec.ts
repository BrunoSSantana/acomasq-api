import { expect } from 'vitest';
import { User } from './user';
import { randomUUID } from 'node:crypto';

describe('User', () => {
  it('should create a user', () => {
    const user = User.create({
      username: 'test',
      password: 'password',
    });

    expect(user).to.be.an('object');
    expect(user).to.have.property('id');
    expect(user).to.have.property('username', 'test');
    expect(user).to.have.property('password', 'password');
    expect(user).to.have.property('createdAt');
    expect(user).to.have.property('updatedAt');
  });

  it('should mapper a user data to domain', () => {
    const id = randomUUID();
    const userObject = {
      id,
      username: 'test',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = User.toDomain(userObject);

    expect(user).to.instanceOf(User);
  });

  it('should mapper a user domain to data', () => {
    const id = randomUUID();
    const userObject = {
      id,
      username: 'test',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = User.toDomain(userObject);
    const userTOJSON = user.toJSON();

    expect(userTOJSON).not.toHaveProperty('password');
  });
});
