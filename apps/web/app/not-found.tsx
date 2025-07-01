import { NavBar } from "@/components/nav-bar";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <div className="flex h-screen overflow-hidden items-center justify-center">
        <div className="  flex-1 flex justify-center items-center">
          <img className="w-full h-full object-cover" src="/404.jpeg" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center text-6xl sm:text-7xl font-bold space-x-4">
              <span className="">Error</span>
              <span className="text-violet-500">404</span>
            </div>
            <p className="text-sm sm:text-base text-neutral-400 mt-2">
              This page isn’t available right now.
              <br />
              It may have been moved or deleted
            </p>
            <Link href={"/"}>
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
