import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-screen bg-slate-50 p-4">
      <Card className="bg-green-100 border-green-300 w-full max-w-3xl shadow-lg text-center gap-y-4 p-6">
        <CardHeader>
          <CardTitle className="font-mono text-5xl md:text-6xl font-bold tracking-tight text-green-900 mb-4">
            BIENVENIDO A ROADMAP
          </CardTitle>
          <CardDescription className="font-medium text-xl md:text-2xl text-slate-700">
            Un servicio donde podrá gestionar sus tareas en tiempo real.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-slate-600 text-base md:text-lg px-6">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit hic
            velit, incidunt voluptates laborum nesciunt veritatis unde est nemo
            deleniti doloremque minima, aut perferendis repellendus dolorum
            harum nisi. Provident, possimus. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Perferendis, ex voluptate maxime
            repellendus iste in ratione dolorum vero tempora, eveniet expedita
            adipisci non alias facilis dolores aperiam. Neque, nobis asperiores!
          </p>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center gap-3 pt-4">
          <Button variant="default" className="w-full max-w-xs">
            Iniciar sesión
          </Button>

          <div className="text-sm text-slate-600 flex items-center gap-1 flex-wrap justify-center">
            <span>¿Aún no posee una cuenta?</span>
            <Button
              variant="link"
              className="p-0 h-auto font-semibold text-green-800"
            >
              Regístrese
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default HomePage;
