import { userFirebaseType } from "@/schemas/userFirebase";
import { collection } from "firebase/firestore";
import { useFirestore, useUser } from "reactfire";

export const useUserFirebase = () => {
  const { status, data: user } = useUser();
  const db = useFirestore();
  const userRef = collection(db, "users");

  //* probar imprimir un usario generico sencillo sin guardar aun
  const registerUserDB = () => {
    const newUser: userFirebaseType = {
      id: "1",
      email: "a",
      name: "yoset",
      photoURL: "a",
      created: "a",
      is_active: true,
    };

    console.log(newUser);
  };

  return { registerUserDB };
};

//todo intentanr guardar el usario en la db
//todo despues intentar imprimirlo en pantalla
