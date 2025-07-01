import { Geist } from "next/font/google";

import { Providers } from "@/components/providers";
import { Toaster } from "@workspace/ui/components/sonner";
import "@workspace/ui/globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} font-sans antialiased font-title tracking-tight`}
      >
        <Providers>{children}</Providers>
        <Toaster
          toastOptions={{
            className: "!bg-violet-500 !text-white border !border-violet-400 ",
          }}
        />
        <script async>
          {`
            window.addEventListener("message", function (event) {
              if (event.data && event.data.type === "setHeight") {
                const iframe = document.getElementById("custom-embed");
                    if (iframe) {
                       iframe.style.height = event.data.height + "px";
                    }
              }
            });
          `}
        </script>
      </body>
    </html>
  );
}
