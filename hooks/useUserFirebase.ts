import { userFirebaseType } from "@/schemas/userFirebase";
import { FirebaseError } from "firebase/app";
import { doc, serverTimestamp, Timestamp, setDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { User } from "firebase/auth";

//* afectan al usario como entidad de la DB
export const useUserFirebase = () => {
  //* funciones y metodos
  const db = useFirestore();

  //* registar usuario een la DB
  const registerUserDB = async (user: User) => {
    const userDocRef = doc(db, "Users", user.uid);

    //* se usa para validar sin hacer el caso de null
    const newUser: Omit<userFirebaseType, "id"> = {
      email: user.email || "",
      name: user.displayName || "",
      photoURL: user.photoURL || "",
      created: serverTimestamp() as unknown as Timestamp, // Le engañamos a TS de forma segura para el linter
      is_active: true,
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

  return { registerUserDB };
};

//todo encontrar xq sigue exigiendo el null y se solocuiona con string
