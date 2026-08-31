import { RegisterLoginZodSchemaType } from "@/lib/schemas/zodSchemas";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { useAuth, useUser } from "reactfire";
import { useUserFirebase } from "./useUserFirebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
//* hook de todo lo relacionado con autenticacion y seguridad

//* interfaz especifa para las validaciones de registro
interface RegisterValidation {
  user?: User;
  valido: boolean;
  mensaje: string;
}
//* interfaz temporal para manejo de secciones
interface Result {
  valido: boolean;
  mensaje: string;
}

const useAuthentication = () => {
  const auth = useAuth();
  const { data: user } = useUser();
  const { registerUserDB, closeSeccion } = useUserFirebase();

  const router = useRouter();
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
      const registerDB = await registerUserDB(registerUser.user);
      if (!registerDB.valido) {
        console.log("No se pudo guardar en la DB:", registerDB.mensaje);
      }

      console.log("Registro exitoso, usuario authenticado: ");

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

      //* preguntar si se creo una nueva instancia o si solo fue un inico de seccion
      //* propiedad is new user
      const details = getAdditionalUserInfo(registerUser);
      if (details!.isNewUser) {
        //! guardar al mismo tiempo en la db
        const registerDB = await registerUserDB(registerUser.user);
        if (!registerDB.valido) {
          console.error("Error: ", registerDB.mensaje);
        }
      }

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

  const logout = async (): Promise<Result> => {
    try {
      //* ya verificado de que xista en el layout
      const result = await closeSeccion(user!);

      if (!result.valido) {
        console.error(result.mensaje);
        return result;
      }
      //* cerrar seccion luego renderizar
      await signOut(auth);
      router.replace("/");
      toast.success("Seccion cerrada con exito");
      return { valido: true, mensaje: "Sesión cerrada con éxito" };
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error("Firebase Error: ", e.message);
      } else if (e instanceof Error) {
        console.error("Error inesperado: ", e.message);
      }
      toast.error("No es posible cerrar la sesión del usuario");
      return {
        valido: false,
        mensaje: "No es posible cerrar la sesión del usuario",
      };
    }
  };

  return {
    registerWithEmail,
    registerWithGoogle,
    loginWithEmail,
    logout,
  };
};

export default useAuthentication;
