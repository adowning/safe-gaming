/* eslint-disable no-console */
/// <reference lib="webworker" />
import { computed, ref } from 'vue'
// import { getSubscribedPlaylists, setPlaylistItems } from '../idb'
import { useCounterStore } from '../logic/counter'
import { IDB } from '../logic/idb'
// import {
//   getPlaylistID,
//   getPlaylistItems,
//   PlaylistItemLike,
//   PlaylistItemList,
// } from '../lib/youtube'
// const counterStore = useCounterStore()
// let pending
declare const self: ServiceWorkerGlobalScope
// const getPlaylistItems = (playlistItem: any) => {
//   console.log(pending)
//   console.log(playlistItem)
//   return counterStore.currentValue
// }
// const getPlaylistID = (playlistItem: any) => {
//   console.log(pending)
//   console.log(playlistItem)
//   return counterStore.currentValue
// }
async function showNotification(playlistItem: any, video: any) {
  self.registration.showNotification(video.snippet.title, {
    body: `A new video was added to '${playlistItem.snippet.title}'`,
    icon: video.snippet.thumbnails.high.url,
    tag: `https://youtu.be/${video.snippet.resourceId.videoId}`,
  })
}

function filterNewVideos(previousItems: Array<any>, latestItems: Array<any>) {
  const oldVideoIDs = new Set<string>()
  for (const item of previousItems)
    oldVideoIDs.add(item.snippet.resourceId.videoId)

  return latestItems.filter(
    (item: any) => !oldVideoIDs.has(item.snippet.resourceId.videoId),
  )
}

async function getNewVideos() {
  const newVideos: Array<{
    playlistItem: any
    video: any
  }> = []
  // const playlists = await IDB.getAllKeys()

  // for (const { playlistItem, videos } of playlists) {
  //   const latestVideos = await getPlaylistItems(getPlaylistID(playlistItem))
  //   // await setPlaylistItems(playlistItem, latestVideos)

  //   for (const video of filterNewVideos(videos, latestVideos))
  //     newVideos.push({ playlistItem, video })
  // }

  // return newVideos
  return newVideos
}

export async function checkForUpdates() {
  // const hydrating = ref(true)
  // counterStore.$persistedState.isReady().then(() => {
  //   hydrating.value = false
  // })
  // pending = computed(() => counterStore.$persistedState.pending)

  const newVideos = await getNewVideos()
  for (const { playlistItem, video } of newVideos)
    showNotification(playlistItem, video)
}
