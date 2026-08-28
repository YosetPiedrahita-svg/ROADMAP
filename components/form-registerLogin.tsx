"use client";
import {
  RegisterLoginZodSchema,
  RegisterLoginZodSchemaType,
} from "@/lib/schemas/zodSchemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent, CardFooter } from "./ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { useEffect, useTransition } from "react";
import useAuthentication from "@/hooks/useAuthentication";
import RegisterLoginButton from "./register-loginButton";
import { toast } from "sonner";
import { useSigninCheck } from "reactfire";
import { useRouter } from "next/navigation";

//! interface para saber de donde proviene
interface Props {
  page: "login" | "register";
}

const FormRegisterLogin = ({ page }: Props) => {
  //* estados y funciones

  //todo botones individuales de registro falta modo login
  const { status, data: signInCheckResult } = useSigninCheck();
  const router = useRouter();
  const [isLoading, setTransition] = useTransition();
  const { registerWithEmail, registerWithGoogle, loginWithEmail } =
    useAuthentication();

  //* si el usario existe es renderizado
  useEffect(() => {
    if (status === "success" && signInCheckResult?.signedIn) {
      router.replace("/home");
    }
  }, [status, signInCheckResult, router]);

  //* 1 inicializar form con type
  const form = useForm<RegisterLoginZodSchemaType>({
    resolver: zodResolver(RegisterLoginZodSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //* FormSubmit
  const FormSubmit = (data: RegisterLoginZodSchemaType) => {
    setTransition(async () => {
      // 1. Elegir la función según la página actual
      const authAction = page === "login" ? loginWithEmail : registerWithEmail;

      // 2. Ejecutar la acción y mostrar el feedback
      const result = await authAction(data);
      console.log(result.mensaje);

      if (result.valido) {
        toast.success(result.mensaje);
      } else {
        toast.error(result.mensaje);
      }
    });
  };

  //* handle independiente del boton sin estar conectado al boton
  const handleGoogleSubmit = async () => {
    const result = await registerWithGoogle();
    if (result.valido) toast.success(result.mensaje);
    else toast.error(result.mensaje);
  };

  //! diferencia si existe usuario no renderiza y lo manda directamente
  //* el texto se corresponde con la pagina proveniente
  return status === "success" && !signInCheckResult.signedIn ? (
    <div>
      <h1 className="font-mono text-3xl md:text-4xl font-extrabold tracking-tight text-green-900 mb-4 text-center">
        {page === "register" ? "FORMULARIO DE REGISTRO" : " INICIAR SESIÓN"}
      </h1>
      <form
        id="form-registerLogin"
        onSubmit={form.handleSubmit(FormSubmit)}
        className="bg-green-100 border-green-300 w-full max-w-3xl shadow-lg text-center gap-y-4 p-6"
      >
        <CardContent>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="font-medium  text-xl md:text-2xl text-slate-700"
                    htmlFor="form-registerLogin-email"
                  >
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-registerLogin-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@gmail.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="font-medium  text-xl md:text-2xl text-slate-700"
                    htmlFor="form-registerLogin-password"
                  >
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="form-registerLogin-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter className=" justify-center">
          <RegisterLoginButton
            page={page}
            isLoading={isLoading}
            formReset={form.reset}
            handleGoogleSubmit={handleGoogleSubmit}
          />
        </CardFooter>
      </form>
    </div>
  ) : null;
};
export default FormRegisterLogin;

//todo hace lo mismo pero ahora con login
//todo cambiar nombre al schema
//todo funcion para iniciar seccion no solo registro
//todo un boton no ocupa todo su espacio
