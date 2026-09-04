import { userFirebaseType } from "@/schemas/userFirebase";
import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";

interface ProfileValidation {
  profile?: userFirebaseType;
  valido: boolean;
  mensaje: string;
}
//* todo lo relacionado con los datos del perfil menos crearlo eliminarlo y avtivarlo
export const useProfileFirestore = (): ProfileValidation => {
  const { data: user } = useUser();
  const db = useFirestore();

  const profileDocRef = doc(db, "Users", user!.uid);
  const { data: profile } = useFirestoreDocData(profileDocRef, {
    idField: "uid",
    suspense: true,
  });

  if (!profile) {
    return {
      valido: false,
      mensaje: "No fue posible encontrar la instancia de perfil",
    };
  }

  return {
    profile: profile as userFirebaseType,
    valido: true,
    mensaje: "Usuario encontrado con éxito",
  };
};
