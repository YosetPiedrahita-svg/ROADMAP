import { RegisterLoginZodSchemaType } from "@/lib/schemas/zodSchemas";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
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
  const { registerUserDB, changeIsOnline } = useUserFirebase();

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
      const provider = new GoogleAuthProvider();
      const registerUser = await signInWithPopup(auth, provider);

      const details = getAdditionalUserInfo(registerUser);

      // 1. Si es un usuario nuevo, primero creamos su registro en la DB
      if (details?.isNewUser) {
        const registerDB = await registerUserDB(registerUser.user);
        if (!registerDB.valido) {
          console.error("Error al registrar en DB: ", registerDB.mensaje);
          return { valido: false, mensaje: registerDB.mensaje };
        }
      }

      // 2. Marcamos al usuario como Online (tanto si es nuevo como si ya existía)
      const statusResult = await changeIsOnline(registerUser.user, true);
      if (!statusResult.valido) {
        console.error("Error de estado: ", statusResult.mensaje);
        return { valido: false, mensaje: statusResult.mensaje };
      }

      console.log("Inicio de sesión exitoso vía Gmail: ", registerUser.user);

      return {
        user: registerUser.user,
        valido: true,
        mensaje: "USUARIO AUTENTICADO CORRECTAMENTE VÍA GMAIL",
      };
    } catch (e) {
      console.error("error: ", e);
      return {
        valido: false,
        mensaje: "ERROR, EL USUARIO NO HA PODIDO SER AUTENTICADO",
      };
    }
  };

  //* inicio de seccion
  const loginWithEmail = async ({
    email,
    password,
  }: RegisterLoginZodSchemaType): Promise<RegisterValidation> => {
    try {
      // 1. Autenticar con Firebase Auth
      const loginUser = await signInWithEmailAndPassword(auth, email, password);

      const statusResult = await changeIsOnline(loginUser.user, true);

      //* Si no se pudo actualizar el estado en Firestore, cancelamos o informamos el error
      if (!statusResult.valido) {
        console.error(statusResult.mensaje);
        return { valido: false, mensaje: statusResult.mensaje };
      }

      console.log("Login exitoso, usuario autenticado: ", loginUser.user);

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
      const result = await changeIsOnline(user!, false);

      if (!result.valido) {
        console.error(result.mensaje);
        toast.error(result.mensaje);
        return result;
      }

      await signOut(auth);

      toast.success("Sesión cerrada con éxito");
      router.replace("/");

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

  //* actualizar nombre de auth
  const updateName = async (name: string): Promise<Result> => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.error(
          "Error: no es posible conectar con un usuario autenticado",
        );

        return {
          valido: false,
          mensaje: "No existe actualmente un usuario autenticado",
        };
      }

      await updateProfile(user, {
        displayName: name,
      });

      return {
        valido: true,
        mensaje: "Nombre de usuario actualizado correctamente",
      };
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error("Firebase Error:", e.message);

        return {
          valido: false,
          mensaje: `Error de Firebase: ${e.message}`,
        };
      }

      if (e instanceof Error) {
        console.error("Error inesperado:", e.message);

        return {
          valido: false,
          mensaje: `Error inesperado: ${e.message}`,
        };
      }

      console.error("Error desconocido:", e);

      return {
        valido: false,
        mensaje: "Ocurrió un error desconocido",
      };
    }
  };

  //* actualizar photo url auth
  const updatePhotoUrl = async (photoURL: string): Promise<Result> => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.error(
          "Error: no es posible conectar con un usuario autenticado",
        );

        return {
          valido: false,
          mensaje: "No existe actualmente un usuario autenticado",
        };
      }

      await updateProfile(user, {
        photoURL,
      });

      return {
        valido: true,
        mensaje: "Foto de perfil actualizada correctamente",
      };
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error("Firebase Error:", e.message);

        return {
          valido: false,
          mensaje: `Error de Firebase: ${e.message}`,
        };
      }

      if (e instanceof Error) {
        console.error("Error inesperado:", e.message);

        return {
          valido: false,
          mensaje: `Error inesperado: ${e.message}`,
        };
      }

      console.error("Error desconocido:", e);

      return {
        valido: false,
        mensaje: "Ocurrió un error desconocido",
      };
    }
  };

  return {
    registerWithEmail,
    registerWithGoogle,
    loginWithEmail,
    logout,
    updateName,
    // updatePhotoUrl,
  };
};

export default useAuthentication;

//todo implementar metodos de actualizar photoURL
