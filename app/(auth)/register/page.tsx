import FormRegister from "@/components/register/form-register";

const RegisterPage = () => {
  return (
    <main
      className="flex flex-col 
     items-center  justify-center
     min-h-screen min-w-screen"
    >
      <h1 className="font-mono text-3xl md:text-4xl font-extrabold tracking-tight text-green-900 mb-4">
        FORMULARIO DE REGISTRO
      </h1>
      <FormRegister />
    </main>
  );
};
export default RegisterPage;
