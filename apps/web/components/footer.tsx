import { QuoteIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white px-6 py-12 md:px-16 mt-32">
      <div className="flex lg:flex-row flex-col justify-between">
        <div className="flex flex-col justify-between">
          <Link href="/">
            <div className="cursor-pointer flex items-center">
              <QuoteIcon
                className="inline mr-2 fill-violet-500 stroke-none "
                size={50}
              />
              <h1 className="text-4xl font-semibold text-neutral-50 font-logo inline">
                Proofly
              </h1>
            </div>
          </Link>
          <div className="text-sm lg:mt-6 mt-3">
            <p className="text-neutral-400">We’re Just a Message Away</p>
            <a
              href="anuragsingh2313@gmail.com"
              className="text-blue-500 hover:underline"
            >
              anuragsingh2313@gmail.com
            </a>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col lg:gap-36 gap-5 lg:mt-0 mt-6 lg:w-fit w-full">
          {/* <div className=" w-full"> */}
          {/*   <h4 className="text-sm font-semibold mb-2">Company</h4> */}
          {/**/}
          {/*   <ul className="space-y-1 text-sm text-neutral-400"> */}
          {/*     <li> */}
          {/*       <a href="#" className="hover:text-neutral-200"> */}
          {/*         About */}
          {/*       </a> */}
          {/*     </li> */}
          {/*     <li> */}
          {/*       <a href="#" className="hover:text-neutral-200"> */}
          {/*         Works */}
          {/*       </a> */}
          {/*     </li> */}
          {/*     <li> */}
          {/*       <a href="#" className="hover:text-neutral-200"> */}
          {/*         Blogs */}
          {/*       </a> */}
          {/*     </li> */}
          {/*     <li> */}
          {/*       <a href="#" className="hover:text-neutral-200"> */}
          {/*         Contact */}
          {/*       </a> */}
          {/*     </li> */}
          {/*     <li> */}
          {/*       <a href="#" className="hover:text-neutral-200"> */}
          {/*         Privacy Policy */}
          {/*       </a> */}
          {/*     </li> */}
          {/*     <li> */}
          {/*       <a href="#" className="hover:text-neutral-200"> */}
          {/*         Term of Service */}
          {/*       </a> */}
          {/*     </li> */}
          {/*     <li> */}
          {/*       <a href="#" className="hover:text-neutral-200"> */}
          {/*         404 */}
          {/*       </a> */}
          {/*     </li> */}
          {/*   </ul> */}
          {/* </div> */}

          <div className="w-full">
            <h4 className="text-sm font-semibold mb-2">Follow Us</h4>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li>
                <a
                  href="https://x.com/AnuragSingh1829/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-200 transition duration-100"
                >
                  Twitter →
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/anurag-singh-950376324/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-200 transition duration-100"
                >
                  LinkedIn →
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Anurag-S1ngh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-200 transition duration-100"
                >
                  Github →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-neutral-600 pt-6 text-sm flex flex-col md:flex-row justify-between text-neutral-400">
        <p>© Copyright 2025. All rights reserved.</p>
        <p>
          Created by{" "}
          <a
            href="https://github.com/Anurag-S1ngh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Anurag Singh
          </a>
        </p>
      </div>
    </footer>
  );
}
