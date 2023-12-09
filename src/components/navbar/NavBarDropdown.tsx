"use client";
import React, { ReactNode, useState } from "react";
import NavBarLink from "./NavBarLink";
import { useSession } from "next-auth/react";
import { useI18n } from "@/locales/client";
import { User } from "next-auth";
import AuthButton from "../auth/AuthButton";
import ColorSchemeToggleButton from "./ColorSchemeToggleButton";
import LanguageSelector from "./LanguageSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "flowbite-react";

const NavBarDropdown = ({
  user,
  children,
}: {
  user?: User;
  children?: ReactNode;
}) => {
  const t = useI18n();
  return (
    <>
      <div className="flex md:order-2 gap-4 ps-2 items-center">
        <ColorSchemeToggleButton></ColorSchemeToggleButton>
        <LanguageSelector></LanguageSelector>
        {children}
        <Dropdown
          label="menu"
          renderTrigger={() => (
            <span className="dark:text-white inline md:hidden"><FontAwesomeIcon  icon={faBars}></FontAwesomeIcon></span>
          )}
        >
          <NavBarLink href="/"> {t("navbar.home")} </NavBarLink>
          <NavBarLink href="/home/about">{t("navbar.about")}</NavBarLink>
          {user && (
            <>
              <NavBarLink href="/home/favourites">
                {t("navbar.favourites")}
              </NavBarLink>
              <NavBarLink href="/home/battles">
                {t("navbar.battles")}
              </NavBarLink>
            </>
          )}
        </Dropdown>
      </div>
      <div className="hidden md:flex flex-col md:flex-row flex-1 justify-center items-center gap-4">
        <NavBarLink href="/"> {t("navbar.home")} </NavBarLink>
        <NavBarLink href="/home/about">{t("navbar.about")}</NavBarLink>
        {user && (
          <>
            <NavBarLink href="/home/favourites">
              {t("navbar.favourites")}
            </NavBarLink>
            <NavBarLink href="/home/battles">{t("navbar.battles")}</NavBarLink>
          </>
        )}
      </div>
    </>
  );
};

export default NavBarDropdown;
