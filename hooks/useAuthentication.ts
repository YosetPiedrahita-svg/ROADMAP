import { RegisterZodSchemaType } from "@/lib/schemas/zodSchemas";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useAuth } from "reactfire";

const useAuthentication = () => {
  interface RegisterValidation {
    user?: UserCredential;
    error: boolean;
    code: number;
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
      console.log(registerUser.user);
      return {
        user: registerUser,
        error: false,
        code: 201,
      };

      //* si algo fallo en la creacion
    } catch (e) {
      console.error(e, "error");
      return {
        error: true,
        code: 400,
      };
    }
  };

  return { register };
};

export default useAuthentication;
