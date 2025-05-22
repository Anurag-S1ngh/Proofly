import { Button } from "@workspace/ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer";
import { Separator } from "@workspace/ui/components/separator";
import { MenuIcon, QuoteIcon } from "lucide-react";
import Link from "next/link";

export const NavBar = () => {
  return (
    <>
      <header className="sticky lg:mx-16 mx-4 py-3">
        <nav className="flex justify-between items-center w-full">
          <Link href={"/"}>
            <div className="cursor-pointer flex items-center">
              <QuoteIcon className="inline mr-2 fill-violet-700 stroke-none" />
              <h1 className=" text-lg text-neutral-800 font-logo inline">
                Proofly
              </h1>
            </div>
          </Link>
          <Drawer>
            <DrawerTrigger asChild>
              <Button>
                <MenuIcon />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="lg:px-16 px-4 ">
              <DrawerHeader className="py-10">
                <DrawerTitle asChild>
                  <div>
                    <Link href={"/signin"}>
                      <h3 className="text-center text-4xl cursor-pointer text-neutral-800 hover:text-blue-600 transition duration-200 hover:bg-neutral-100 py-2 rounded-lg">
                        Sign In
                      </h3>
                    </Link>
                    <Link href={"/dashboard"}>
                      <h3 className="text-center text-4xl cursor-pointer text-neutral-800 hover:text-blue-600 transition duration-200 hover:bg-neutral-100 py-2 rounded-lg">
                        Dashboard
                      </h3>
                    </Link>
                  </div>
                </DrawerTitle>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </nav>
      </header>
      <Separator />
    </>
  );
};
