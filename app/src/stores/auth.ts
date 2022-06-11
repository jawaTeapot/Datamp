import { defineStore } from 'pinia'
import { Cookies, uid } from 'quasar'
import { api } from 'boot/axios'

const tokenOptions = { path: '/', expires: '30d', sameSite: 'Lax', secure: true } as object

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    ssid: ''
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.token
  },
  actions: {
    checkToken (cookies: Cookies) {
      if (cookies.has('access')) {
        this.token = cookies.get('access')
      } else {
        this.token = ''
      }
    },
    checkSsid (cookies: Cookies) {
      if (cookies.has('ssid')) {
        this.ssid = cookies.get('ssid')
      } else {
        this.ssid = uid()
        cookies.set('ssid', this.ssid, { path: '/' })
      }
    },
    async login (email: string, password: string, cookies: Cookies | null) {
      const cookie = cookies || Cookies
      const { data } = await api.post('auth/login', { email, password })
      this.token = data.auth_token
      cookie.set('access', this.token, tokenOptions)
    },
    async register (email: string, password: string, password2: string, name: string) {
      const payload = {
        email,
        password,
        re_password: password2,
        username: name
      }
      const { data } = await api.post('auth/signup', payload)
      // TODO
      console.log(data)
    },
    removeToken (cookies: Cookies | null) {
      const cookie = cookies || Cookies
      this.token = ''
      cookie.remove('access')
    },
    async logout (cookies: Cookies | null) {
      try {
        await api.post('auth/logout')
      } finally {
        this.removeToken(cookies)
      }
    }
  }
})
