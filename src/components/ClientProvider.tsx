"use client"

import { I18nProviderClient } from "@/locales/client"
import { ReactNode } from "react"

const ClientWrapper = ({children, locale} : {children: ReactNode, locale: string}) => {
    return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
}
export default ClientWrapper