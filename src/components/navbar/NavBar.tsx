import Image from "next/image";
import React from "react";
import NavBarLink from "./NavBarLink";
import AuthButton from "../auth/AuthButton";
import Link from "next/link";
import ColorSchemeToggleButton from "./ColorSchemeToggleButton";
import { getI18n } from "@/locales/server";
import LanguageSelector from "./LanguageSelector";
import { auth } from "@/utils/auth";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
const NavBar = async () => {
  const t = await getI18n();
  const session = await auth();
  return (
    <>
      <Navbar

        fluid
        className="bg-white dark:bg-gray-900 w-full fixed border-b px-6 border-gray-200 dark:border-gray-600 z-50"
      >
        <NavbarBrand as={Link} href="/">
          <Image
            src="/img/logo.png"
            className="mr-3"
            alt="Flowbite Logo"
            width="48"
            height="48"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hidden md:inline">
            Flowbite
          </span>
        </NavbarBrand>
        <div className="flex md:order-2 gap-4 ps-2 items-center">
          <AuthButton></AuthButton>
          <ColorSchemeToggleButton></ColorSchemeToggleButton>
          <LanguageSelector></LanguageSelector>
          <NavbarToggle />
        </div>
        <NavbarCollapse id="navbar-sticky">
          <NavBarLink href="/"> {t("navbar.home")} </NavBarLink>
          <NavBarLink href="/about">{t("navbar.about")}</NavBarLink>
          {session?.user && (
            <>
              <NavBarLink href="/home/favourites">
                {t("navbar.favourites")}
              </NavBarLink>
              <NavBarLink href="/home/battles">
                {t("navbar.battles")}
              </NavBarLink>
            </>
          )}
        </NavbarCollapse>
      </Navbar>
    </>
  );
};

export default NavBar;
