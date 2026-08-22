import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { link } from "fs";

const HomePage = () => {
  return (
    <Card size="md">
      <CardHeader>
        <CardTitle>Bienvenido a RoadMap</CardTitle>
        <CardDescription>
          un servicio donde podra gestionar sus tareas en tiempo real{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Es necesario que se autentifique para poder ingresar</p>
      </CardContent>
      <CardFooter>
        <Button variant={link}> iniciar seccion</Button>
        <p>
          aun no posee cuenta? <Button variant={link}>registrese</Button>
        </p>
      </CardFooter>
    </Card>
  );
};
export default HomePage;
