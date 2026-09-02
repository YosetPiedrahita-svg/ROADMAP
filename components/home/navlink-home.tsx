"use client";

import useAuthentication from "@/hooks/useAuthentication";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Home, LogOut, LucideIcon } from "lucide-react";
import { useUser } from "reactfire";
import { usePathname } from "next/navigation";

//* interface de todos las paginas
interface NavLink {
  name: string;
  to: string;
  icon: LucideIcon;
}

//* navbar de todas las paginas
const NavLinkHome = () => {
  const { logout } = useAuthentication();
  const { data: user } = useUser();

  //* ruta actual
  const pathname = usePathname();

  const navigations: NavLink[] = [
    { name: "Home", to: `/home/${user!.uid}`, icon: Home },
  ];

  return (
    <NavigationMenu className="w-full max-w-none h-full max-h-none bg-gray-200 shadow-2xl">
      <NavigationMenuList className="justify-between px-10">
        {navigations.map((item) => {
          const IconComponent = item.icon;
          const isActual = pathname === item.to;
          return (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={(props) => (
                  <Link
                    href={item.to}
                    {...props}
                    className={`flex items-center font-medium hover:underline ${
                      isActual ? "text-green-500" : "text-black"
                    }`}
                  >
                    <IconComponent className="h-6 w-8" />
                    <span>{item.name}</span>
                  </Link>
                )}
              />
            </NavigationMenuItem>
          );
        })}

        <NavigationMenuItem>
          <Button
            variant="destructive"
            onClick={() => logout()}
            /* h-auto libera la restricción de altura del Button, 
            py-3 px-5 iguala el padding del nav item */
            className={
              "flex items-center  font-sans text-2xl text-white bg-green-900 h-auto cursor-pointer  hover:bg-red-600 "
            }
          >
            <LogOut className="h-6 w-8" />
            <span>Logout</span>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinkHome;
