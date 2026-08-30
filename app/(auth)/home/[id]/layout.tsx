"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSigninCheck } from "reactfire";
import { toast } from "sonner";
import FooterHome from "@/components/home/footer-home";

//* layout para todas las paginas de home
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  //* funciones y estados
  const { status, data: signInCheckResult } = useSigninCheck();
  const router = useRouter();

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
      <main>{children}</main>
      <footer className="fixed bottom-0 left-0 w-full bg-teal-600 border-t border-gray-200 py-4  ">
        <FooterHome></FooterHome>
      </footer>
    </div>
  ) : (
    <p>loading user...</p>
  );
};
export default HomeLayout;

//todo medjorar el loading
//todo header
