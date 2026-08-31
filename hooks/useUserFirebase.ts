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
//* afectan al usario como entidad de la DB
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
      is_active: false,
      is_online: true,
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

  //todo is_active : false o toogle de alterar valor
  const closeSeccion = async (user: User): Promise<Result> => {
    const userDocRef = doc(db, "Users", user.uid);
    try {
      await updateDoc(userDocRef, { is_online: false });
      return { valido: true, mensaje: "Usuario offline" };
    } catch (e) {
      console.error(Error, e);
      return { valido: false, mensaje: "Usuario no pudo se cerrado" };
    }
  };

  return { registerUserDB, closeSeccion };
};

//todo crear interfaz de respuesta
//todo encontrar xq sigue exigiendo el null y se solocuiona con string
