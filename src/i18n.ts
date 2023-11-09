import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
export const fallbackLng = 'es'
export const languages = [fallbackLng, 'en']
export const cookieName = 'i18next'
export const defaultNS = 'translation'
export function getOptions (lng = fallbackLng, ns = defaultNS) {
    return {
      // debug: true,
      supportedLngs: languages,
      fallbackLng,
      lng,
      fallbackNS: defaultNS,
      defaultNS,
      ns
    }
}
const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language : string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns))
  return i18nInstance
}

export async function useTranslation(lng?: string, ns?: string, options = {}) {
  const i18nextInstance = await initI18next(lng ?? fallbackLng, ns ?? defaultNS)
  return {
    //@ts-ignore
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance
  }
}