"use client"
import { Avatar, Dropdown } from 'flowbite-react';
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
    arrowIcon={true}
    inline
    label={<Avatar alt="User settings" img={image} rounded/>}
  >
    <Dropdown.Header>
      <span className="block text-sm">
        {name}
      </span>
      <span className="block truncate text-sm font-medium">
        {email}
      </span>
    </Dropdown.Header>
    <Dropdown.Item>
      Dashboard
    </Dropdown.Item>
    <Dropdown.Item>
      Settings
    </Dropdown.Item>
    <Dropdown.Item>
      Earnings
    </Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item onClick={() => handleSignOut()}>
      Sign out
    </Dropdown.Item>
  </Dropdown>
  )
}

export default AuthDropdown