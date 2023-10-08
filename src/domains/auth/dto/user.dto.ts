import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;

export const getUserByIdSchema = z.object({
  id: z.string().uuid(),
});

export type GetUserByIdDTO = z.infer<typeof getUserByIdSchema>;

export const getUserByUsernameSchema = z.object({
  username: z.string(),
});

export type GetUserByUsernameDTO = z.infer<typeof getUserByUsernameSchema>;

export const deleteUserSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteUserDTO = z.infer<typeof deleteUserSchema>;
