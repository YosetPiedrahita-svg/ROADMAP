import { RegisterLoginZodSchemaType } from "@/lib/schemas/zodSchemas";
import { error } from "console";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { useAuth, useSigninCheck } from "reactfire";

//* interfaz especifa para las validaciones de registro
interface RegisterValidation {
  user?: User;
  valido: boolean;
  mensaje: string;
}

interface exitSeccion {
  valido: boolean;
  mensaje: string;
}

const useAuthentication = () => {
  const auth = useAuth();

  //* permitir la autorizacion x Email
  const registerWithEmail = async ({
    email,
    password,
  }: RegisterLoginZodSchemaType): Promise<RegisterValidation> => {
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
      //* crear variable de error generico
      let mensajeError = "ERROR, EL USARIO NO HA PODIDO SER REGISTRADO";
      if (e instanceof FirebaseError) {
        if (e.code == "auth/email-already-in-use") {
          mensajeError =
            "EL CORRE CON EL QUE SE REGISTRO ACTUALMENTE YA ESTA EN USO";
        }
      }
      return {
        valido: false,
        mensaje: mensajeError,
      };
    }
  };
  //* permitir autorizacion via Gmail- inicio de seccion
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

  //* inicio de seccion
  const loginWithEmail = async ({
    email,
    password,
  }: RegisterLoginZodSchemaType): Promise<RegisterValidation> => {
    try {
      const loginUser = await signInWithEmailAndPassword(auth, email, password);

      //* Si llega aquí, fue exitoso
      console.log("login exitoso, usuario authenticado: ", loginUser.user);

      return {
        user: loginUser.user,
        valido: true,
        mensaje: "USUARIO LOGEADO CORRECTAMENTE",
      };
    } catch (e) {
      console.error("error: ", e);
      let mensajeError = "ERROR AL INICIAR SESIÓN";
      if (e instanceof FirebaseError) {
        if (
          e.code === "auth/invalid-credential" ||
          e.code === "auth/user-not-found"
        ) {
          mensajeError = "CORREO O CONTRASEÑA INCORRECTOS";
        }
      }
      return { valido: false, mensaje: mensajeError };
    }
  };

  //* cerrar seccion actual
  const closeSeccion = async (): Promise<exitSeccion> => {
    try {
      await signOut(auth);
      //* si llego aca es valido
      return { valido: true, mensaje: "Session cerrada con exito " };
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error("error: ", e.message);
      }
      return {
        valido: false,
        mensaje: "ERROR CRITICO, imposible cerrar seccion",
      };
    }
  };

  return {
    registerWithEmail,
    registerWithGoogle,
    loginWithEmail,
    closeSeccion,
  };
};

export default useAuthentication;
