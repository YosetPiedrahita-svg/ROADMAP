import { z } from "zod";
import { Timestamp } from "firebase/firestore";
//* definir el schema con sus reglas
export const userFirebase = z.object({
  id: z.string(),
  created: z.instanceof(Timestamp), //! Validamos que sea una instancia real del Timestamp de Firestore
  email: z.email("formato de email invalido"),
  is_active: z.boolean(),
  is_online: z.boolean(),
  name: z.string(),
  photoURL: z.string().url().or(z.literal("")),
});

//* pasarlo a un type para toda la app
export type userFirebaseType = z.infer<typeof userFirebase>;
