import { userFirebaseType } from "@/schemas/userFirebase";
import { FirebaseError } from "firebase/app";
import {
  doc,
  serverTimestamp,
  Timestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useFirestore } from "reactfire";
import { User } from "firebase/auth";

//*intefaze de mdevolucion
interface Result {
  valido: boolean;
  mensaje: string;
}
//* afectan al usario en general de toda la app mas no regiones especificas
export const useUserFirebase = () => {
  //* funciones y metodos
  const db = useFirestore();

  //* registar usuario een la DB
  const registerUserDB = async (user: User): Promise<Result> => {
    const userDocRef = doc(db, "Users", user.uid);

    //* se usa para validar sin hacer el caso de null
    const newUser: Omit<userFirebaseType, "id"> = {
      email: user.email || "",
      name: user.displayName || "",
      photoURL: user.photoURL || "",
      created: serverTimestamp() as unknown as Timestamp, // Le engañamos a TS de forma segura para el linter
      is_active: true,
      is_online: false,
    };
    try {
      await setDoc(userDocRef, newUser, { merge: true });
      return {
        valido: true,
        mensaje: "Usuario guardado en la base de datos correctamente",
      };
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error("Mensaje Firestore:", e.message);
      }
      return {
        valido: false,
        mensaje: "ERROR, imposible guardar el usuario en la db",
      };
    }
  };

  //* activar o desativar el usario
  const changeIsOnline = async (
    user: User,
    activated: boolean,
  ): Promise<Result> => {
    const userDocRef = doc(db, "Users", user.uid);

    try {
      await updateDoc(userDocRef, { is_online: activated });

      const mensaje = activated ? "Usuario Online" : "Usuario Offline";
      return { valido: true, mensaje };
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error("Firebase Error: ", e.message);
      } else {
        console.error("Error inesperado: ", e);
      }

      const mensaje = activated
        ? "El usuario no pudo activarse"
        : "El usuario no pudo cerrar sesión";

      return { valido: false, mensaje };
    }
  };

  return { registerUserDB, changeIsOnline };
};
