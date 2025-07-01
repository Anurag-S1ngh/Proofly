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
      <header className="sticky top-0 z-30 w-full bg-white/20 backdrop-blur-lg">
        <nav className="flex justify-between items-center w-full lg:px-16 px-4 py-3">
          {/* Logo */}
          <Link href="/">
            <div className="cursor-pointer flex items-center">
              <QuoteIcon className="inline mr-2 fill-violet-700 stroke-none" />
              <h1 className="font-medium text-neutral-800 font-logo inline">
                Proofly
              </h1>
            </div>
          </Link>
          <div className="hidden lg:flex gap-8 items-center">
            <Link href="/signin">
              <h3 className="hover:underline underline-offset-3">Sign In</h3>
            </Link>
            <Link href="/dashboard">
              <h3 className="hover:underline underline-offset-3">Dashboard</h3>
            </Link>
          </div>
          <div className="lg:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <MenuIcon className="cursor-pointer" />
              </DrawerTrigger>
              <DrawerContent className="px-4">
                <DrawerHeader className="py-10">
                  <DrawerTitle asChild>
                    <div>
                      <Link href="/signin">
                        <h3 className="text-center text-4xl cursor-pointer text-neutral-800 transition duration-200 hover:bg-neutral-100 py-2 rounded-lg">
                          Sign In
                        </h3>
                      </Link>
                      <Link href="/dashboard">
                        <h3 className="text-center text-4xl cursor-pointer text-neutral-800 transition duration-200 hover:bg-neutral-100 py-2 rounded-lg">
                          Dashboard
                        </h3>
                      </Link>
                    </div>
                  </DrawerTitle>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
        </nav>
        <Separator />
      </header>
    </>
  );
};
