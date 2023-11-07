"use client"
import { Avatar,  Dropdown } from 'flowbite-react';
import { FC } from 'react'
import {signOut} from "next-auth/react"
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image'
import UserModal from './UserModal';

const AuthDropdown:FC<{
    name: string;
    email: string
    image: string
}> = ({name, email, image}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const openModal = () =>{
    const params = new URLSearchParams()
    params.set('editUser', 'true')
    router.replace(`${pathname}?${params.toString()}`)
  }
  const handleSignOut = () => {
    signOut()
    router.refresh()
  }
  return (
  <Dropdown
    className='bg-black text-white '
    arrowIcon={true}
    inline
    //label={<Avatar alt="User settings" img={image ?? '/img/avatar_placeholder.jpg'} rounded/>}
    label={  <Avatar
      img={() => (
          <Image
            src={image ?? '/img/avatar_placeholder.jpg'}
            alt="User image"
            width={48}
            height={48}
            className="rounded-full w-12 h-12 object-cover"
          />
      )}
    ></Avatar>}
  >
    <Dropdown.Header>
      <span className="block text-sm text-white">
        {name}
      </span>
      <span className="block truncate text-sm font-medium text-white">
        {email}
      </span>
    </Dropdown.Header>
    <Dropdown.Item onClick={openModal} className='dark:hover:text-black text-white hover:text-black'>
      Settings
    </Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item className='dark:hover:text-black text-white hover:text-black' onClick={() => handleSignOut()}>
      Sign out
    </Dropdown.Item>
  </Dropdown>

  )
}

export default AuthDropdown