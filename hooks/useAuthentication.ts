import { RegisterZodSchemaType } from "@/lib/schemas/zodSchemas";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  UserCredential,
} from "firebase/auth";
import { useAuth } from "reactfire";

const useAuthentication = () => {
  //* interfaz especifa para las validaciones de registro
  interface RegisterValidation {
    user?: User;
    valido: boolean;
    mensaje: string;
  }

  const auth = useAuth();

  //* permitir la autorizacion x Email
  const registerWithEmail = async ({
    email,
    password,
  }: RegisterZodSchemaType): Promise<RegisterValidation> => {
    try {
      const registerUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      //* Si llega aquí, fue exitoso
      console.log(
        "Registro exitoso, usuario authenticado: ",
        registerUser.user,
      );
      return {
        user: registerUser.user,
        valido: true,
        mensaje: "USUARIO REGISTRADO EN EL SISTEMA CORRECTAMENTE",
      };
    } catch (e) {
      //* si algo fallo en la creacion
      console.error("error: ", e);
      return {
        valido: false,
        mensaje: "ERROR, EL USARIO NO HA PODIDO SER REGISTRADO",
      };
    }
  };

  //* permitir autorizacion via Gmail
  const registerWithGoogle = async (): Promise<RegisterValidation> => {
    try {
      //* provedor del cual provienen los permisos y funcion de respuesta con devolucion
      const provider = new GoogleAuthProvider();
      const registerUser = await signInWithPopup(auth, provider);

      //* si llega hasta aca ya fue exitoso
      console.log(
        "Registro exitoso, usuario authenticado via Gmail: ",
        registerUser.user,
      );
      return {
        user: registerUser.user,
        valido: true,
        mensaje: "USUARIO REGISTRADO EN EL SISTEMA CORRECTAMENTE VIA GMAIL",
      };
    } catch (e) {
      console.error("error: ", e);
      //* cualquier fallo en la creacion via Gmail
      return {
        valido: false,
        mensaje: "ERROR, EL USARIO NO HA PODIDO SER REGISTRADO",
      };
    }
  };

  return { registerWithEmail, registerWithGoogle };
};

export default useAuthentication;

// todo mandar el mensaje especifico de cada error( si ya esta registrado , es de red )
// todo impedir a un usario ya autorizado esta interfaz
