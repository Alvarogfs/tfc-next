import Image from "next/image";
import React from "react";
import NavBarLink from "./NavBarLink";
import AuthButton from "../auth/AuthButton";
import Link from "next/link";
import ColorSchemeToggleButton from "./ColorSchemeToggleButton";
import { getI18n } from "@/locales/server";
import LanguageSelector from "./LanguageSelector";
import { auth } from "@/utils/auth";
import { Navbar, NavbarBrand } from "flowbite-react";
import NavBarDropdown from "./NavBarDropdown";
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
            TFC Next.js
          </span>
        </NavbarBrand>
        <NavBarDropdown user={session?.user}>
          <AuthButton></AuthButton>
        </NavBarDropdown>
      </Navbar>
    </>
  );
};

export default NavBar;
