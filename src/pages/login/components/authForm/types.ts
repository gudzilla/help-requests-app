import { z } from 'zod';

export const FormInputsSchema = z.object({
  login: z.string().email({ message: 'Введите корректный email-адрес' }),
  password: z.string().min(8, { message: 'Минимальная длинна пароля 8 символов' }),
});

export type FormInputs = z.infer<typeof FormInputsSchema>;
