// import { get, set, values, del } from 'idb-keyval'
// // import {getPlaylistID, PlaylistItemLike, PlaylistItemList} from './youtube';

// export interface Value {
//   playlistItem: PlaylistItemLike
//   videos: Array<PlaylistItemList.Item>
// }

// export async function getSubscribedPlaylists() {
//   return await values<Value>()
// }

// export async function removeSubscribedPlaylist(playlistID: string) {
//   await del(playlistID)
// }

// export async function setPlaylistItems(
//   playlistItem: PlaylistItemLike,
//   videos: Array<PlaylistItemList.Item>,
// ) {
//   await set(getPlaylistID(playlistItem), { playlistItem, videos })
// }

// export async function getPlaylistInfo(playlistID: string) {
//   return await get<Value>(playlistID)
// }
import { openDB } from 'idb'
// import { DBNAME, DBVERSION } from '.q./staticsettings'
// import type { NotifyDatabase, NotifyV1Store } from '../types/dbtypes'
import type { DBSchema, IDBPDatabase } from 'idb'
// import type { Device } from './localdevice'
// import type { MessageType } from './messagetype'
export interface MessageType {
  /* primaryKey */ id?: number // created by the database
  title: string // title of the message
  body: string // the message body
  icon: string // url to the icon
  tags: string[] // array of tags
  receivedAt: number // the date the message was received
  read: boolean // whether the message has been read or not
}
export interface Device {
  id: string
  secret: string
}
export interface NotifyV1Store extends DBSchema {
  messages: {
    key: number
    value: MessageType
  }
  user: {
    key: string
    value: Device
  }
}

export type NotifyDatabase = IDBPDatabase<NotifyV1Store>
export const DBNAME = 'notify-db'
export const DBVERSION = 1
// if you want to run the gui separate from the api, change this to to your api location example: "http://localhost:8787/api"
export const APIBASE = '/api'
export function getDatabase(): Promise<NotifyDatabase> {
  return openDB<NotifyV1Store>(DBNAME, DBVERSION, {
    upgrade(db: NotifyDatabase) {
      db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true })
      db.createObjectStore('user', { keyPath: 'id', autoIncrement: true })
    },
  })
}

export async function setAllMessagesAsRead(db: NotifyDatabase): Promise<void> {
  const messages = await db.getAll('messages')
  const unreadMessages = messages.map((message: MessageType) => ({
    ...message,
    read: true,
  }))
  const updatePromises = unreadMessages.map((message: MessageType) =>
    db.put('messages', message),
  )
  await Promise.all(updatePromises)
}

export async function getUnreadMessageCount(): Promise<number> {
  const db = await getDatabase()
  const allMessages = await db.getAll('messages')
  const unreadMessages = allMessages.filter(
    (message: MessageType) => !message.read,
  )
  return unreadMessages.length
}
