import { CookieSerializeOptions } from 'cookie'
import { setCookie, destroyCookie } from 'nookies'

export const setCoookies = (accessToken: string) => {
  const oneDay = 60 * 60 * 24;
  const options: CookieSerializeOptions = {
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: oneDay
  }
  setCookie(null, 'conduit.token', accessToken, options)
}

export const destroyCookies = () => destroyCookie(null, 'conduit.token')
