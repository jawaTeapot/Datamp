import { Cookies } from 'quasar'
import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'stores/auth'

export default boot(({ router, ssrContext, store }) => {
  router.beforeEach((to, from, next) => {
    const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies
    const authStore = useAuthStore(store)
    authStore.checkToken(cookies)
    authStore.checkSsid(cookies)
    next()
  })
})
