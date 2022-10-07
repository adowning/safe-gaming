/* eslint-disable operator-linebreak */
/* eslint-disable brace-style */
/* eslint-disable no-async-promise-executor */
/* eslint-disable space-before-function-paren */
// @ts-nocheck
// @ts-no-check
/* eslint-disable no-console */
/* eslint-disable no-unreachable-loop */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference lib="webworker" />
import { ExpirationPlugin } from 'workbox-expiration'
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

// import { getFiles, setupPrecaching, setupRouting } from 'preact-cli/sw/'

// declare var self: ServiceWorkerGlobalScope;
import { getDatabase, getUnreadMessageCount } from '../idb'
import { updateDevice } from '../services/apiservice'
import { encodeWebPushData, getWebPushData } from '../util/webpushutil'
import { checkForUpdates } from './updates'
const UPDATE_CHECK = 'update-check'

declare const self: ServiceWorkerGlobalScope

interface PeriodicBackgroundSyncEvent extends ExtendableEvent {
  tag: string
}

precacheAndRoute(self.__WB_MANIFEST || [])

registerRoute(
  ({ request }) => request.mode === 'navigate',
  createHandlerBoundToURL('/index.html'),
)

registerRoute(
  ({ url }) => url.origin === 'https://i.ytimg.com',
  new StaleWhileRevalidate({
    cacheName: 'yt-thumbnails',
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  }),
)

self.addEventListener('install', () => self.skipWaiting())
// self.addEventListener('activate', () => self.clients.claim())
self.addEventListener('activate', (event) => {
  event.waitUntil(getDatabase().catch((error) => console.warn(error)))
  self.clients.claim()
  // self.skipWaiting()
})
self.addEventListener('notificationclick', (event) => {
  event.waitUntil(self.clients.openWindow(event.notification.tag))
  event.notification.close()
})

// @ts-expect-error
self.addEventListener('periodicsync', (event: PeriodicBackgroundSyncEvent) => {
  if (event.tag === UPDATE_CHECK) event.waitUntil(checkForUpdates())
})

self.addEventListener('message', (event) => {
  if (event.data === UPDATE_CHECK) event.waitUntil(checkForUpdates())
})
/*
new
stuff
here
*/

// setupRouting()
// const urlsToCache = getFiles()
// urlsToCache.push({ url: '/favicon.ico', revision: null })
// setupPrecaching(urlsToCache)

async function addMessageToDB(messageData) {
  try {
    const db = await getDatabase()
    await db.add('messages', messageData)
  } catch (e) {
    console.error('addMessageToDB', e)
  }
}

async function sendMessageToMainWindow(messageData) {
  if (BroadcastChannel) {
    const bc = new BroadcastChannel('notify-channel')
    bc.postMessage(messageData)
    bc.close()
  } else {
    return await new Promise(async (resolve) => {
      const clientList = await clients.matchAll({ type: 'window' })
      clientList.map((client) => client.postMessage(messageData))
      resolve(null)
    })
  }
}

async function setAppBadge() {
  const unreadCount = await getUnreadMessageCount().catch((e) => 0)
  if (navigator && navigator.setAppBadge) {
    unreadCount > 0
      ? navigator.setAppBadge(unreadCount)
      : navigator.clearAppBadge()
  }
}

function fromBinary(binary) {
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < bytes.length; i++) bytes[i] = binary.charCodeAt(i)

  const charCodes = new Uint16Array(bytes.buffer)
  let result = ''
  for (let i = 0; i < charCodes.length; i++)
    result += String.fromCharCode(charCodes[i])

  return result
}

// self.addEventListener('activate', (event) => {
//   event.waitUntil(getDatabase().catch((error) => console.warn(error)))
// })

// self.addEventListener('install', (event) => {
//   self.skipWaiting()
// })

self.addEventListener('push', (event) => {
  if (!event.data || !event.data.text) throw new Error('No data in push event')

  const rawData = event.data.text()
  const jsonData = fromBinary(atob(rawData))

  const { title, body, icon = '', tags = [] } = JSON.parse(jsonData)
  const tag = (Math.random() + 1).toString(36).substring(7) // a (unique) random tag to identify the notification

  const messageData = {
    body,
    icon,
    title,
    tags,
    receivedAt: Number(Date.now()),
    read: false,
  }

  event.waitUntil(
    Promise.allSettled([
      self.registration.showNotification(title, { body, image: icon, tag }), // first show notification
      addMessageToDB(messageData), // save message to db
      sendMessageToMainWindow({ type: 'notification', data: messageData }), // send a event to main window to update the notification
      setAppBadge(), // set app badge
    ]),
  )
})

self.addEventListener('notificationclick', (e) => {
  const notification = e.notification
  const load = async () => {
    try {
      const clientList = await clients.matchAll()
      if (clientList.length > 0) {
        for (let i = 0; i < clientList.length; i++) {
          const client = await clientList[i]?.navigate('/')
          client?.focus?.()
          break
        }
      } else {
        clients.openWindow('/')
      }
    } finally {
      notification.close()
    }
  }
  e.waitUntil(load())
})

self.addEventListener('pushsubscriptionchange', (event) => {
  const { oldSubscription, newSubscription } = event
  console.log('pushsubscriptionchange', oldSubscription, newSubscription)
  const upgradeSubscription = async () => {
    const database = await getDatabase()
    const users = await database.getAll('user')
    if (users[0]?.id) {
      const { id, secret } = users[0]
      const newSub =
        newSubscription ??
        (await registration.pushManager.subscribe(oldSubscription.options))
      const webPushData = getWebPushData(newSub)
      const response = await updateDevice(
        id,
        secret,
        encodeWebPushData(webPushData),
      )
      console.log('pushsubscriptionchange', response)
    }
  }
  event.waitUntil(upgradeSubscription())
})

worker.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || event.request.headers.has('range'))
    return

  const url = new URL(event.request.url)

  // don't try to handle e.g. data: URIs
  const isHttp = url.protocol.startsWith('http')
  const isDevServerRequest =
    url.hostname === self.location.hostname && url.port !== self.location.port
  const isStaticAsset =
    url.host === self.location.host && staticAssets.has(url.pathname)
  const skipBecauseUncached =
    event.request.cache === 'only-if-cached' && !isStaticAsset

  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith(
      (async () => {
        // always serve static files and bundler-generated assets from cache.
        // if your application has other URLs with data that will never change,
        // set this variable to true for them and they will only be fetched once.
        const cachedAsset = isStaticAsset && (await caches.match(event.request))

        return cachedAsset || fetchAndCache(event.request)
      })(),
    )
  }
})
