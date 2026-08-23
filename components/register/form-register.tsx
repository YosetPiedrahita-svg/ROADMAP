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
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import useAuthentication from "@/hooks/useAuthentication";
const FormRegister = () => {
  const [isLoading, setTransition] = useTransition();
  const { register } = useAuthentication();

  //* 1 inicializar form con type y schema
  const form = useForm<RegisterZodSchemaType>({
    resolver: zodResolver(RegisterZodSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //* 2 se ejecuta solo cuando es valido
  const FormSubmit = (data: RegisterZodSchemaType) => {
    //* si se se oprimio el boton y se esta cargando guardar el estado
    setTransition(async () => {
      const result = await register(data);

      if (result.error) {
        console.log("error en la creacion del usuario");
      } else {
        console.log(result.user?.user);
      }
    });
  };

  return (
    <form id="form-login" onSubmit={form.handleSubmit(FormSubmit)}>
      <CardContent>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-login-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-login-email"
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
                <FieldLabel htmlFor="form-login-password">Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  id="form-login-password"
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

      <CardFooter
        className="flex flex-row
        justify-center
       gap-4"
      >
        <Button type="submit" variant="outline" disabled={isLoading}>
          Login
        </Button>
        <Button type="reset" disabled={isLoading} onClick={() => form.reset()}>
          reset form
        </Button>
      </CardFooter>
    </form>
  );
};
export default FormRegister;

//todo areglar comentarios y insertar toast
