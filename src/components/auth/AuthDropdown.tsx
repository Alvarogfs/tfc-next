"use client"
import { Avatar,  Dropdown } from 'flowbite-react';
import { FC } from 'react'
import {signOut} from "next-auth/react"
import { useRouter } from 'next/navigation';

const AuthDropdown:FC<{
    name: string;
    email: string
    image: string
}> = ({name, email, image}) => {
  const router = useRouter()

  const handleSignOut = () => {
    signOut()
    router.refresh()
  }
  return (
  <Dropdown
    className='bg-black text-white '
    arrowIcon={true}
    inline
    label={<Avatar alt="User settings" img={image} rounded/>}

  >
    <Dropdown.Header>
      <span className="block text-sm text-white">
        {name}
      </span>
      <span className="block truncate text-sm font-medium text-white">
        {email}
      </span>
    </Dropdown.Header>
    <Dropdown.Item className='dark:hover:text-black text-white hover:text-black'>
      Dashboard
    </Dropdown.Item>
    <Dropdown.Item className='dark:hover:text-black text-white hover:text-black'>
      Settings
    </Dropdown.Item>
    <Dropdown.Item className='dark:hover:text-black text-white hover:text-black'>
      Earnings
    </Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item className='dark:hover:text-black text-white hover:text-black' onClick={() => handleSignOut()}>
      Sign out
    </Dropdown.Item>
  </Dropdown>
  )
}

export default AuthDropdown