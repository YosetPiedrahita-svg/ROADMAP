"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSigninCheck } from "reactfire";
import { toast } from "sonner";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
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
    <main>
      {children}
      <footer className="font-bold">pie de pagina</footer>
    </main>
  ) : (
    <p>loading user...</p>
  );
};
export default HomeLayout;
