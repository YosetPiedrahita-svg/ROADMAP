import FormRegisterLogin from "@/components/form-registerLogin";

//* pagina para renderizar el formulario de login
const LoginPage = () => {
  return (
    <main
      className="flex flex-col 
     items-center  justify-center
     min-h-screen min-w-screen"
    >
      <FormRegisterLogin page={"login"} />
    </main>
  );
};
export default LoginPage;
