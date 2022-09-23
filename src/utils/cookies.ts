import { CookieSerializeOptions } from 'cookie'
import { setCookie } from 'nookies'

export const setCoookies = (accessToken: string) => {
  const options: CookieSerializeOptions = {
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 //1 day
  }
  setCookie(null, 'conduit.token', accessToken, options)
}
