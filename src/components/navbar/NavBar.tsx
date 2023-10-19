import Image from 'next/image'
import React from 'react'
import NavBarLink from './NavBarLink'
import AuthButton from '../auth/AuthButton'
import Link from 'next/link'
import ColorSchemeToggleButton from './ColorSchemeToggleButton'

const NavBar = () => {
  return (
    <>
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b px-6 border-gray-200 dark:border-gray-600">
      <div className="flex flex-wrap items-center justify-between p-4 gap-4">
      <Link href="/" className="flex items-center">
          <Image src="/img/logo.png" className="mr-3" alt="Flowbite Logo" width="48" height="48"/>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
      </Link>
      <div className="flex md:order-2 gap-2">
          <AuthButton></AuthButton>
          <ColorSchemeToggleButton></ColorSchemeToggleButton>
          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
      </div>
      <div className="items-center ms-auto justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <NavBarLink href="/">Home</NavBarLink>
          </li>
          <li>
            <NavBarLink href="/about" >About</NavBarLink>
          </li>
          <li>
          <NavBarLink href="/favourites">Favourites</NavBarLink>
          </li>
        </ul>
      </div>
      </div>
    </nav>
    </>
  )
}

export default NavBar