import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
});

export const signUpSchema = z.object({
  name: z.string().min(5).optional(),
  email: z.string().email(),
  password: z.string().min(6).max(30),
  phone: z.string().min(9).max(12),
});
