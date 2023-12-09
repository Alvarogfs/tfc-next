import Providers from "@/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/navbar/NavBar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import CookieConsent from "@/components/CookieConsent";
import { cookies } from "next/headers";
import UserModal from "@/components/auth/UserModal";
import { auth } from "@/utils/auth";
import ClientWrapper from "@/components/ClientProvider";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tfc-next",
  description: "School project",
};

export default async function RootLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <Providers>
        <ClientWrapper locale={locale}>
          <NavBar></NavBar>{" "}
          <div className="flex flex-col pt-28 min-h-full">{children}</div>
         
        </ClientWrapper>
      </Providers>
      {!cookies().has("cookieConsent") && <CookieConsent></CookieConsent>}
      <ClientWrapper locale={locale}> <UserModal user={session?.user}></UserModal></ClientWrapper>
    </>
  );
}
