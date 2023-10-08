import { z } from 'zod';

export const CreateSessionSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type CreateSessionDTO = z.infer<typeof CreateSessionSchema>;
