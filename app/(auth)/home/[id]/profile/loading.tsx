import { Loader } from "lucide-react";

const ProfileLoading = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-2 bg-background">
      <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="text-sm font-semibold tracking-wide text-muted-foreground animate-pulse">
        Cargando perfil...
      </p>
    </main>
  );
};

export default ProfileLoading;
