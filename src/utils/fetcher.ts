import { parseCookies } from 'nookies'
export const fetcher = async (
  url: RequestInfo,
  data?: unknown,
  customConfig?: RequestInit
) => {
  try {
    const { 'conduit.token': accessToken } = parseCookies()
    const headers: HeadersInit = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: accessToken,
    }
    const config: RequestInit = {
      headers,
      method: data ? 'POST' : 'GET',
      mode: 'cors',
      body: JSON.stringify(data),
      ...customConfig,
    }
    const response = await window.fetch(url, config)
    if (!response.ok) {
      const errorMessage = {
        status: response.status,
        message: response.statusText,
      }
      throw errorMessage
    }
    return response.json()
  } catch (error: unknown) {
    return error
  }
}
