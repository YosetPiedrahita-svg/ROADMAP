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

interface NavBar {
  name: string;
  to: string;
  icon: LucideIcon;
}

const NavLinkHome = () => {
  const { logout } = useAuthentication();

  const navigations: NavBar[] = [{ name: "Inicio", to: "/", icon: Home }];

  return (
    <NavigationMenu className=" w-full max-w-none bg-red-50">
      <NavigationMenuList className="justify-between px-10">
        {navigations.map((item) => {
          const IconComponent = item.icon;

          return (
            <NavigationMenuItem key={item.name}>
              {/* cada elemento*/}
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={(props) => (
                  <Link href={item.to} {...props}>
                    <IconComponent className="mr-2 h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )}
              />
            </NavigationMenuItem>
          );
        })}

        <NavigationMenuItem>
          <Button
            variant="ghost"
            onClick={() => logout()}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar sesión</span>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinkHome;
