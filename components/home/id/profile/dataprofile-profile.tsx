"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProfileFirestore } from "@/hooks/useProfileFirestore";
import { cn } from "@/lib/utils";
import { Mail, RefreshCw, User2 } from "lucide-react";

//* toda la seccion para poder hacer idparam
const DataProfile = () => {
  //* importar usuario encontrado
  const { profileData } = useProfileFirestore();
  const { profile, valido } = profileData;
  return (
    <div>
      {valido ? (
        <Card className="w-2xl shadow-lg border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-col items-center gap-4 text-center pb-2">
            {/* Avatar de usuario centrado */}
            <Avatar className="h-28 w-28 border-4 border-background shadow-md">
              <AvatarImage
                src={profile!.photoURL}
                alt="Yoset Alfonso Piedrahita Ramirez"
              />
              <AvatarFallback>YA</AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight">
                {profile!.name}
              </CardTitle>
              <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{profile!.email}</span>
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            {/* Sección de estados con Badges */}
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-muted/40">
              <span className="text-sm font-medium text-muted-foreground">
                Estado de la cuenta
              </span>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "gap-1",
                    profile!.is_online
                      ? "border-green-500 text-green-600 bg-green-50 dark:bg-green-950/30"
                      : "border-red-500 text-red-600 bg-red-50 dark:bg-red-950/30",
                  )}
                >
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full animate-pulse",
                      profile!.is_online ? "bg-green-500" : "bg-red-500",
                    )}
                  />
                  {profile!.is_online ? "Online" : "Offline"}
                </Badge>

                {/* Badge de Activo / No activo */}
                <Badge
                  variant="secondary"
                  className={cn(
                    "gap-1",
                    profile!.is_active ? "" : "text-red-500",
                  )}
                >
                  <User2 className="h-3 w-3" />
                  {profile?.is_active ? "Activo" : "No activo"}
                </Badge>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-2">
            <Button className="w-full gap-2">
              <RefreshCw className="h-4 w-4" />
              Actualizar perfil
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <p>
          MENSAJE DE RECARGAR Y UN BOTON PARA RECARGAR LA PAGINA EN CASO DE QUE
          NO LO ENCUENTRE****
        </p>
      )}
    </div>
  );
};
export default DataProfile;

//TODO MENSAJE Y BOTON DE RECARGAR
