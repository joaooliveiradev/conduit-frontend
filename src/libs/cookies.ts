import { CookieSerializeOptions } from 'cookie'
import { setCookie, destroyCookie } from 'nookies'

export const setCoookies = (accessToken: string) => {
  const oneHour = 60 * 60;
  const options: CookieSerializeOptions = {
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: oneHour
  }
  setCookie(null, 'conduit.token', accessToken, options)
}

export const destroyCookies = () => destroyCookie(null, 'conduit.token')
