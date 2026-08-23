import { RegisterZodSchemaType } from "@/lib/schemas/zodSchemas";
import {
  createUserWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import { useAuth, useUser } from "reactfire";

const useAuthentication = () => {
  interface RegisterValidation {
    user?: User;
    valido: boolean;
    mensaje: string;
  }
  const auth = useAuth();
  const { data: user } = useUser();

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
        mensaje: "Usuario registrado en el sistema correctamente",
      };

      //* si algo fallo en la creacion
    } catch (e) {
      console.error("error : ", e);
      return {
        valido: false,
        mensaje: "error en el registro del usuario",
      };
    }
  };

  return { register };
};

export default useAuthentication;
