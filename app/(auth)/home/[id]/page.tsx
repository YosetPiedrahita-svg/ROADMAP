import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//* pagina que se renderiza al estar logeado el usario
const IdPage = () => {
  return (
    <main>
      <Card className="bg-red-300">
        <CardHeader>
          <CardTitle className="text-4xl">Bienvenido</CardTitle>
          <CardDescription>¿Cuál es el plan para hoy?</CardDescription>
        </CardHeader>
        <p>
          mostrar todas las tarea sactuales en froma de bloque pequeño nombre ,
          procentaje y boton eliminar o editar
        </p>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>botones para hacer ,crear eliminar y todo eso desde aca </p>
        </CardFooter>
      </Card>

      {/* <p>segundo bloque</p>
      <p>segundo bloque ya con tareas mejor </p>
      <p>==================================================</p>
      <h2>resumen</h2>
      <p>pedientes , en proceso , completados</p> */}
    </main>
  );
};
export default IdPage;

// todo cuando tenga definido las tareas modificar todo el primer bloque adecuadamente
