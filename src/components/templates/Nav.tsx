import MENU_ITEMS from "@/constants/MENU_ITEMS";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { PlusIcon } from "lucide-react";

type NavProps = {};

const Nav = ({}: NavProps) => {
  return (
    <div className="w-full flex items-center justify-start pt-10">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-primary gap-2 text-md font-bold hover:text-blue-950">
              <PlusIcon size={14} /> informações
            </NavigationMenuTrigger>
            <NavigationMenuContent className="py-6 pl-3 pr-16 bg-accent flex flex-col border-none">
              {MENU_ITEMS.map((item) => (
                <NavigationMenuLink
                  href={item.href}
                  key={item.name}
                  className="text-primary text-sm flex items-center gap-2 font-medium px-4 py-4 hover:bg-accent-foreground hover:text-blue-950 rounded-lg"
                >
                  {item.name} 
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Nav;
