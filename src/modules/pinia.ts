import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import localforage from 'localforage'
// import { useAuthStore } from '@/store'
import type { UserModule } from '@/types'

const identity = <T>(_: T) => _
const simpleDeepCopy = <T>(value: T) => JSON.parse(JSON.stringify(value))
const installPersistedStatePlugin = createPersistedStatePlugin({
  persist: true,
})

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ isClient, initialState, app }) => {
  const pinia = createPinia()
  pinia.use(context => installPersistedStatePlugin(context))

  app.use(pinia)
  localforage.setDriver(localforage.INDEXEDDB)
  pinia.use(
    createPersistedStatePlugin({
      storage: {
        getItem: async (key) => {
          return localforage.getItem(key)
        },
        setItem: async (key, value) => {
          // eslint-disable-next-line no-void
          return localforage.setItem(key, value).then(() => void 0)
        },
        removeItem: async (key) => {
          return localforage.removeItem(key)
        },
      },
      serialize: value => simpleDeepCopy(value),
      deserialize: identity,
    }),
  )
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient)
    pinia.state.value = (initialState.pinia) || {}

  else
    initialState.pinia = pinia.state.value

  // enable athentification
  // const auth = useAuthStore()
  // router.beforeEach((to, from, next) => {
  // const path: string = to.path
  // if (path === '/logout') {
  //   auth.logout()
  //   router.push('/')
  // }
  // else if (path.includes('/admin')) {
  //   if (auth.authenticated)
  //     next()
  //   else
  //     router.push('/login')
  // }
  // else {
  //   next()
  // }
  // })
  watch(
    pinia.state,
    (state) => {
      console.log(state)
      // persist the whole state to the local storage whenever it changes
      // localStorage.setItem('piniaState', JSON.stringify(state))
    },
    { deep: true },
  )
}
