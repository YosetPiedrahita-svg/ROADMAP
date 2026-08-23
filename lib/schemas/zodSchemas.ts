import { z } from "zod";

//* schema para register
export const RegisterZodSchema = z.object({
  email: z.email("no es un formato de email valido"),
  password: z
    .string()
    .min(6, "la contraseña debe poseer al menos 6 caracteres"),
});

//* pasarlo a un type para toda la app
export type RegisterZodSchemaType = z.infer<typeof RegisterZodSchema>;
