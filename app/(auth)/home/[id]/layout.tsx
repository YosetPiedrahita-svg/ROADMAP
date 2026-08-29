"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSigninCheck } from "reactfire";
import { toast } from "sonner";
import FooterHome from "@/components/home/footer-home";
import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const router = useRouter();

  const { closeSeccion } = useAuthentication();

  //* verficar estar logeado consulta asincronica del loading
  useEffect(() => {
    if (status === "success" && !signInCheckResult.signedIn) {
      toast.info("necesita estar autenticado para poder ingresar ");
      router.replace("/");
    }
  }, [status, signInCheckResult, router]);

  return status === "success" && signInCheckResult.signedIn ? (
    <div className="min-h-screen min-w-screen">
      <header>
        <p>head</p>
      </header>
      <main>
        {" "}
        {children}
        <Button onClick={() => closeSeccion()}>cerrar seccion</Button>
      </main>
      <footer className="fixed bottom-0 left-0 w-full bg-teal-600 border-t border-gray-200 py-4  ">
        <FooterHome></FooterHome>
      </footer>
    </div>
  ) : (
    <p>loading user...</p>
  );
};
export default HomeLayout;
