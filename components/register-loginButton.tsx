"use client";
import { Mail, Eraser } from "lucide-react";
import { Button } from "./ui/button";
import { UseFormReset } from "react-hook-form";
import { RegisterLoginZodSchemaType } from "@/lib/schemas/zodSchemas";
import Link from "next/link";

//* Props
interface Props {
  isLoading: boolean;
  formReset: UseFormReset<RegisterLoginZodSchemaType>;
  handleGoogleSubmit: () => void;
  page: "login" | "register";
}

//* seccion de botones del formulario fuera de la tarjete
const RegisterLoginButton = ({
  isLoading,
  formReset,
  handleGoogleSubmit,
  page,
}: Props) => {
  const targetPage = page === "login" ? "register" : "login";
  const textPage =
    page === "login"
      ? "No posee uan cuenta?, por favor registrese"
      : "Ya esta registrado?, Inicie Sesion aqui";
  return (
    <div className="flex flex-col items-center mt-8 gap-6 w-full max-w-sm mx-auto p-6 ">
      {/* Título principal */}
      <h1 className="font-mono text-xl md:text-2xl font-bold tracking-tight text-emerald-900 uppercase">
        {page === "login" ? "login" : "register here"}
      </h1>

      {/* Botones principales */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Button
          type="submit"
          form="form-registerLogin"
          disabled={isLoading}
          className="flex-1 transition-all duration-200 shadow-sm hover:shadow"
        >
          <Mail className="mr-2 h-4 w-4" />
          Continuar
        </Button>

        <Button
          type={"reset"}
          variant={"destructive"}
          disabled={isLoading}
          onClick={() => formReset()}
          className=" hover:text-red-600 transition-all duration-200"
        >
          <Eraser className="mr-2 h-4 w-4" />
          Limpiar
        </Button>
      </div>

      {/* Separador estético */}
      <div className="relative w-full flex items-center justify-center my-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <span className="relative bg-white px-3 text-xs uppercase tracking-wider text-emerald-900 font-medium">
          O continúa con
        </span>
      </div>

      {/* Botón de Google */}
      <Button
        variant="outline"
        type={"button"}
        className="w-full flex items-center justify-center gap-2 py-5 border-slate-200 hover:bg-slate-50 transition-all duration-200 shadow-xs"
        disabled={isLoading}
        onClick={handleGoogleSubmit}
      >
        <svg
          viewBox="-3 0 262 262"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
        >
          <path
            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            fill="#4285F4"
          />
          <path
            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            fill="#34A853"
          />
          <path
            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            fill="#FBBC05"
          />
          <path
            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            fill="#EB4335"
          />
        </svg>
        <span className="font-medium text-slate-700">Google</span>
      </Button>
      <Button
        variant={"link"}
        className="relative px-3 text-xs uppercase tracking-wider text-emerald-900 font-medium"
      >
        <Link href={`/${targetPage}`}>{textPage}</Link>
      </Button>
    </div>
  );
};

export default RegisterLoginButton;
