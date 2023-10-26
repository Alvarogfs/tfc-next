import Link from "next/link";
import React, { FC, ReactNode } from "react";

const NavBarLink: FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-500 md:p-0 md:dark:hover:text-amber-300 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    >
      {children}
    </Link>
  );
};

export default NavBarLink;
