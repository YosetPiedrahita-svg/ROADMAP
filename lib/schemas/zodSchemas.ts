import { z } from "zod";

//* schema para register
export const RegisterLoginZodSchema = z.object({
  email: z.email("no es un formato de email valido"),
  password: z
    .string()
    .min(6, "la contraseña debe poseer al menos 6 caracteres"),
});

export type RegisterLoginZodSchemaType = z.infer<typeof RegisterLoginZodSchema>;
