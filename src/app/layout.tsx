import { auth } from "@/utils/auth";
import { getCurrentScheme } from "@/utils/colorScheme";
import { Inter } from "next/font/google";
import { ReactElement } from "react";
const inter = Inter({ subsets: ["latin"] });
export default async function RootLayout ({ children }: { children: ReactElement }) {
  const scheme = await getCurrentScheme();
    return (
      <html lang="en" className={scheme === "dark" ? "dark" : ""}>
      <body
        className={`${inter.className} h-screen ${scheme === 'dark' ? 'bg-black' : 'bg-neutral-200'} `}
      >
          {children}
        </body>
      </html>
    );
  }