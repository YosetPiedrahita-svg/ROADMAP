"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSigninCheck } from "reactfire";
import { toast } from "sonner";
import FooterHome from "@/components/home/footer-home";
import NavLinkHome from "@/components/home/navlink-home";
import { useUserFirebase } from "@/hooks/useUserFirebase";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const { changeIsOnline } = useUserFirebase();
  const router = useRouter();
  const isOnlineUpdated = useRef(false);

  useEffect(() => {
    if (status === "success") {
      if (!signInCheckResult?.signedIn) {
        toast.info("Necesita estar autenticado para poder ingresar");
        router.replace("/");
      } else if (signInCheckResult?.user && !isOnlineUpdated.current) {
        isOnlineUpdated.current = true;
        changeIsOnline(signInCheckResult.user, true);
      }
    }
  }, [status, signInCheckResult, router, changeIsOnline]);

  // 1. Estado de carga activo
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="md:text-2xl font-semibold text-green-900 text-center tracking-tight animate-pulse">
          Cargando Usuario...
        </h1>
      </div>
    );
  }

  //* Si terminó de cargar y NO está firmado, se retorna null mientras redirige
  if (!signInCheckResult?.signedIn) {
    return <h1>ingreso incorrecto</h1>;
  }

  //* Renderizado exitoso
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full fixed top-0 left-0 bg-green-600 z-50 h-16">
        <NavLinkHome />
      </header>

      {/* pt-16 y pb-20 evitan que el contenido quede oculto bajo el header y footer */}
      <main className="flex-1 pt-16 pb-20">{children}</main>

      <footer className="fixed bottom-0 left-0 w-full bg-teal-600 border-t border-gray-200 py-4 z-50">
        <FooterHome />
      </footer>
    </div>
  );
};

export default HomeLayout;
