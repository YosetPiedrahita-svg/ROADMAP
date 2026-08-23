import { RegisterZodSchemaType } from "@/lib/schemas/zodSchemas";
import {
  createUserWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import { useAuth } from "reactfire";

const useAuthentication = () => {
  interface RegisterValidation {
    user?: User;
    valido: boolean;
    mensaje: string;
  }
  const auth = useAuth();

  //* permitir la autorizacion x correo
  const register = async ({
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

      //* si algo fallo en la creacion
    } catch (e) {
      console.error("error : ", e);
      return {
        valido: false,
        mensaje: "ERROR, EL USARIO NO HA PODIDO SER REGISTRADO",
      };
    }
  };

  return { register };
};

export default useAuthentication;
