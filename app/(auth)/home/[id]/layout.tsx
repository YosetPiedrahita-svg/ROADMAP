"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSigninCheck } from "reactfire";
import { toast } from "sonner";
import FooterHome from "@/components/home/footer-home";
import NavLinkHome from "@/components/home/navlink-home";
import { useUserFirebase } from "@/hooks/useUserFirebase";

//* layout para todas las paginas de home
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  //* funciones y estados
  const { status, data: signInCheckResult } = useSigninCheck();
  const { changeIsOnline } = useUserFirebase();
  const router = useRouter();

  const isOnlineUpdated = useRef(false);

  //* verficar estar logeado consulta asincronica del loading
  useEffect(() => {
    if (status === "success") {
      if (!signInCheckResult.signedIn) {
        toast.info("necesita estar autenticado para poder ingresar ");
        router.replace("/");
      }
      if (signInCheckResult.user && !isOnlineUpdated.current) {
        isOnlineUpdated.current = true;
        changeIsOnline(signInCheckResult.user, true);
      }
    }
  }, [status, signInCheckResult, router, changeIsOnline]);

  return status === "success" && signInCheckResult.signedIn ? (
    <div className="min-h-screen min-w-screen">
      <header className="w-full">
        <NavLinkHome></NavLinkHome>
      </header>
      <main>{children}</main>
      <footer className="fixed bottom-0 left-0 w-full bg-teal-600 border-t border-gray-200 py-4  ">
        <FooterHome></FooterHome>
      </footer>
    </div>
  ) : (
    <h1 className="md:text-2xl font-semibold text-green-900 text-center tracking-tight animate-pulse">
      Cargando Usuario...
    </h1>
  );
};
export default HomeLayout;
