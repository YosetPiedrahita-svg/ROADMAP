import FormRegister from "@/components/form-registerLogin";

const RegisterPage = () => {
  return (
    <main
      className="flex flex-col 
     items-center  justify-center
     min-h-screen min-w-screen"
    >
      <FormRegister page={"register"} />
    </main>
  );
};
export default RegisterPage;
