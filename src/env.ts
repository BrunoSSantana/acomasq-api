import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  API_PORT: z.coerce.number().optional().default(3003),
  DATABASE_PORT: z.coerce.number().optional().default(5432),
  DATABASE_NAME: z.string().optional().default('acomasq-db'),
  DATABASE_HOST: z.string().optional().default('db'),
  DATABASE_USERNAME: z.string().optional().default('acomasq'),
  DATABASE_PASSWORD: z.string().optional().default('acomasqpass'),
  DATABASE_URL: z
    .string()
    .optional()
    .default('postgresql://acomasq:acomasqpass@localhost:5432/acomasq-db'),
  GLOBAL_PREFIX: z.string().optional().default('api'),
  SWAGGER_PREFIX: z.string().optional().default('docs'),
});

export type Env = z.infer<typeof envSchema>;
