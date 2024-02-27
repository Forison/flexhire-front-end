import axios from 'axios'
import Cookies from 'universal-cookie'

export const getInitial = (description: string, limit: number): string => {
	return description.slice(0, limit)
}

export const BASE_API_ENDPOINT = 'http://127.0.0.1:4000'
export const POSITIVE_FEEDBACK = 200

const cookies = new Cookies()

export const storeToken = (accessToken: string): void => {
	cookies.set('access_token', accessToken, {
    path: '/',
    httpOnly: false,
    secure: false
  })
}
