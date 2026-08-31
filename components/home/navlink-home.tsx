//* navlink de usario authorizados
import useAuthentication from "@/hooks/useAuthentication";
import { Button } from "@/components/ui/button";

const NavLinkHome = () => {
  const { logout } = useAuthentication();

  return (
    <div className="bg-red-400 cursor-pointer">
      <Button onClick={() => logout()}>cerrar seccion</Button>
    </div>
  );
};
export default NavLinkHome;
