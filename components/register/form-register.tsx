"use client";
import {
  RegisterZodSchema,
  RegisterZodSchemaType,
} from "@/lib/schemas/zodSchemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent, CardFooter } from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useTransition } from "react";
import useAuthentication from "@/hooks/useAuthentication";
import RegisterLoginButton from "../register-loginButton";
import { toast } from "sonner";

const FormRegister = () => {
  //* estados y funciones

  const [isLoading, setTransition] = useTransition();
  const { registerWithEmail, registerWithGoogle } = useAuthentication();

  //* 1 inicializar form con type
  const form = useForm<RegisterZodSchemaType>({
    resolver: zodResolver(RegisterZodSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //* FormSubmit
  const FormSubmit = (data: RegisterZodSchemaType) => {
    //* si se se oprimio el boton y se esta cargando guardar el estado
    setTransition(async () => {
      const result = await registerWithEmail(data);
      console.log(result.mensaje);
      //* imprimir mensaje o error
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

  return (
    <form
      id="form-register"
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
                  htmlFor="form-register-email"
                >
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  id="form-register-email"
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
                  htmlFor="form-register-password"
                >
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  type="password"
                  id="form-register-password"
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
          isLoading={isLoading}
          formReset={form.reset}
          handleGoogleSubmit={handleGoogleSubmit}
        />
      </CardFooter>
    </form>
  );
};
export default FormRegister;
