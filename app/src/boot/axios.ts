import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'
import { useAuthStore } from 'stores/auth'
import { Cookies } from 'quasar'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 2000,
  responseType: 'json'
  // withCredentials: true
})

const _axios = axios.create({
  baseURL: process.env.API_URL,
  timeout: 2000,
  responseType: 'json'
  // withCredentials: true
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default boot(({ app, ssrContext, store }) => {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies
  const authStore = useAuthStore(store)

  api.interceptors.request.use(function (config) {
    // config.headers.Cookie = `SSID=${authStore.ssid}`
    // config.headers.SSID = authStore.ssid
    if (authStore.isAuthenticated) {
      config.headers.common.Authorization = `Token ${authStore.token}`
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  api.interceptors.response.use(async function (response) {
    return response
  }, async function (error) {
    if (error.response.status === 401) { //  && error.response.config.url !== 'auth/logout'
      authStore.removeToken(cookies)
      error.config.headers.Authorization = ''
      return api.request(error.config)
    }
    return Promise.reject(error)
  })

  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = _axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api, _axios as axios }
