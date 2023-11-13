'use client';
import { Dropdown } from 'flowbite-react'
import React from 'react'
import {useCurrentLocale, useChangeLocale} from '@/locales/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx'

const LanguageSelector = () => {
    const currentLocale = useCurrentLocale();
    const changeLocale = useChangeLocale();
  return (
    <Dropdown label={<FontAwesomeIcon icon={faLanguage} className='text-2xl text-black dark:text-white' />} arrowIcon={false}>
      <Dropdown.Item className={clsx(`dark:text-white dark:hover:text-black`, {'opacity-50 hover:!bg-[unset] hover:!text-[unset]': currentLocale === 'en'})} onClick={() => changeLocale('en')}>ENG</Dropdown.Item>
      <Dropdown.Item className={clsx(`dark:text-white dark:hover:text-black`, {'opacity-50 hover:!bg-[unset] hover:!text-[unset]': currentLocale === 'es'})} disabled={currentLocale === 'es'} onClick={() => changeLocale('es')}>ESP</Dropdown.Item>
    </Dropdown>
  )
}

export default LanguageSelector