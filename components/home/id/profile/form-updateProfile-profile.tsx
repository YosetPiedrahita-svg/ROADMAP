"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userFirebase } from "@/schemas/userFirebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useProfileFirestore } from "@/hooks/useProfileFirestore";
import { Eraser, SaveCheck } from "lucide-react";

const updateProfileSchema = userFirebase
  .pick({
    name: true,
    photoURL: true,
  })
  .partial();

type UpdateProfileType = z.infer<typeof updateProfileSchema>;

const FormUpdateProfile = () => {
  //*importar instancia actual del perfil
  const { profile } = useProfileFirestore();

  const form = useForm<UpdateProfileType>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onTouched",
    defaultValues: {
      name: profile!.name ?? "",
      photoURL: profile!.photoURL ?? "",
    },
  });

  const FormSubmit = (data: UpdateProfileType) => {
    console.log("Datos a actualizar:", data);
  };

  //* boton de reseteo
  const handleReset = () => {
    form.reset({
      name: profile!.name ?? "",
      photoURL: profile!.photoURL ?? "",
    });
  };

  return (
    <form
      id="form-updateProfile"
      className="w-full max-w-2xl rounded-xl border bg-card shadow-sm"
      onSubmit={form.handleSubmit(FormSubmit, (errors) =>
        console.log("Errores de validación:", errors),
      )}
    >
      <CardContent className="space-y-6 p-6">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">
            Actualizar perfil
          </h2>

          <p className="text-sm text-muted-foreground">
            Modifica tu nombre o la imagen de perfil. Puedes actualizar uno o
            ambos campos.
          </p>
        </div>

        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-updateProfile-name">Name</FieldLabel>

                <Input
                  {...field}
                  id="form-updateProfile-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Ingresa tu nombre"
                  autoComplete="name"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="photoURL"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-updateProfile-photoURL">
                  Foto de perfil
                </FieldLabel>

                <Input
                  {...field}
                  id="form-updateProfile-photoURL"
                  aria-invalid={fieldState.invalid}
                  placeholder="https://ejemplo.com/foto.jpg"
                  type="url"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>

      <CardFooter className="flex flex-col-reverse gap-3 border-t bg-muted/20 p-6 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={!form.formState.isDirty}
        >
          <Eraser className="mr-2 h-4 w-4" />
          Restablecer
        </Button>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          <SaveCheck className="mr-2 h-4 w-4" />
          Guardar cambios
        </Button>
      </CardFooter>
    </form>
  );
};

export default FormUpdateProfile;
