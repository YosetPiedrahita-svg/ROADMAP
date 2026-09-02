import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <main className="flex justify-center">
      <Card className="w-2/4">
        <CardHeader className="text-center">
          <CardTitle>Yoset Alfonso Piedrahita Ramirez</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-4">
          <div>
            <p>email</p>
            <p>status</p>
          </div>

          <Image
            src="https://lh3.googleusercontent.com/a/ACg8ocIol423XnBFazUukho7_KcwsCZfvckMYaaKMGdDUP953PGKgQvl=s96-c"
            alt="Foto de perfil"
            width={200}
            height={200}
            className="rounded-full object-cover"
          />
          <div>
            <p>is.online</p>
            <p>is active</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>actualizar</Button>
        </CardFooter>
      </Card>
    </main>
  );
};
export default ProfilePage;
