import { userFirebaseType } from "@/schemas/userFirebase";
import { doc, updateDoc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import useAuthentication from "./useAuthentication";

interface ProfileValidation {
  profile?: userFirebaseType;
  valido: boolean;
  mensaje: string;
}
interface Result {
  valido: boolean;
  mensaje: string;
}

export const useProfileFirestore = () => {
  //* hooks
  const { updateName } = useAuthentication();
  const { data: user } = useUser();
  const db = useFirestore();

  //* instania al usario logeafo
  const profileDocRef = doc(db, "Users", user!.uid);

  const { data: profile } = useFirestoreDocData(profileDocRef, {
    idField: "uid",
    suspense: true,
  });

  //* datos del perfil
  const profileData: ProfileValidation = !profile
    ? {
        valido: false,
        mensaje: "No fue posible encontrar la instancia de perfil",
      }
    : {
        profile: profile as userFirebaseType,
        valido: true,
        mensaje: "Usuario encontrado con éxito",
      };

  //* actualización del perfil
  const updateProfile = async (name: string): Promise<Result> => {
    try {
      //* Primero Auth
      const authRes = await updateName(name);

      if (!authRes.valido) {
        console.error("Error: ", authRes.mensaje);
        return {
          valido: false,
          mensaje: "No es posible actualizar el perfil en este momento",
        };
      }
      //* Después Firestore
      await updateDoc(profileDocRef, {
        name,
      });
      return {
        valido: true,
        mensaje: "Perfil de usario actualizado con exito",
      };
    } catch (e) {
      console.error("Imposible actualizar el usuario en la DB", e);
      return {
        valido: false,
        mensaje: "Error inexperado al contactarse con la base de datos",
      };
    }
  };

  return {
    profileData,
    updateProfile,
  };
};
