import React from "react";
import NotFound from "@/app/not-found";
import { getI18n } from "@/locales/server";
import NavBar from "@/components/navbar/NavBar";
import ClientWrapper from "@/components/ClientProvider";
import { Button } from "flowbite-react";
import Link from "next/link";
const NestedNotFound = async ({ params }: { params: { locale: string } }) => {
  const t = await getI18n();
  return (
    <ClientWrapper locale={params.locale}>
      <NotFound>
        <NavBar></NavBar>
        <div className="flex flex-col pt-28 min-h-full dark:text-white items-center gap-7 justify-center">
          <h2 className="text-2xl">{t("not-found.title")}</h2>
          {/* @ts-ignore */}
          <Button as={Link} href="/">
            {t("not-found.return")}
          </Button>
        </div>
      </NotFound>
    </ClientWrapper>
  );
};

export default NestedNotFound;
