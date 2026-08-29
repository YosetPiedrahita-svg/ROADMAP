import { z } from "zod";

//* definir el schema con sus reglas
export const userFirebase = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  photoURL: z.string(),
  created: z.string(),
  is_active: z.boolean(),
});

//* pasarlo a un type para toda la app
export type userFirebaseType = z.infer<typeof userFirebase>;
