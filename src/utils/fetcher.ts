import { parseCookies } from 'nookies'
type Error = {
  status: number
  message: string
}
export const fetcher = async (url: RequestInfo, customConfig?: RequestInit) => {
  try {
    const { 'conduit.token': accessToken } = parseCookies()
    const headers: HeadersInit = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: accessToken,
    }
    const config: RequestInit = {
      headers,
      method: 'GET',
      mode: 'cors',
      ...customConfig,
    }
    const response = await fetch(url, config)
    if (!response.ok) {
      const errorMessage: Error = {
        status: response.status,
        message: response.statusText,
      }
      throw errorMessage
    }
    return response.json()
  } catch (err) {
    const error = err as Error
    return { status: error.status, message: error.message }
  }
}
