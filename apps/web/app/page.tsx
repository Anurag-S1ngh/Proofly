import { NavBar } from "@/components/nav-bar";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col gap-4 items-center justify-center h-screen -mt-20">
        <h1 className="text-5xl font-bold text-center tracking-tighter ">
          Effortlessly capture
          <br />
          testimonials from your
          <br />
          customers
        </h1>
        <p className="font-bold text-neutral-400 w-2xl break-words text-center tracking-thin">
          Collecting testimonials is hard, we get it! That’s why we built Proofly. In minutes, collect text and video testimonials—no developer or hosting needed.
        </p>
        <Link href={"/signup"}>
          <Button size="lg">Try Now</Button>
        </Link>
      </div>
    </>
  );
}
