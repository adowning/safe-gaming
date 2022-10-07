const DB_NAME = 'background-sync-db'
const DB_VERSION = 1
const STORE_NAME = 'unsent-requests-store'

export const IDB = {
  initialize() {
    return new Promise((resolve, reject) => {
      // Create a new DB
      const request = indexedDB.open(DB_NAME, DB_VERSION)
      request.onupgradeneeded = function () {
        request.result.createObjectStore(STORE_NAME)
        resolve(null)
      }
      request.onerror = function () {
        reject(request.error)
      }
    })
  },

  getByKey(key: any) {
    return new Promise((resolve, reject) => {
      const oRequest = indexedDB.open(DB_NAME, DB_VERSION)
      oRequest.onsuccess = function () {
        const db = oRequest.result
        const tx = db.transaction(STORE_NAME, 'readonly')
        const st = tx.objectStore(STORE_NAME)
        const gRequest = st.get(key)
        gRequest.onsuccess = function () {
          resolve(gRequest.result)
        }
        gRequest.onerror = function () {
          reject(gRequest.error)
        }
      }
      oRequest.onerror = function () {
        reject(oRequest.error)
      }
    })
  },

  setByKey(value: any, key: any) {
    return new Promise((resolve, reject) => {
      const oRequest = indexedDB.open(DB_NAME, DB_VERSION)
      oRequest.onsuccess = function () {
        const db = oRequest.result
        const tx = db.transaction(STORE_NAME, 'readwrite')
        const st = tx.objectStore(STORE_NAME)
        const sRequest = st.put(value, key)
        sRequest.onsuccess = function () {
          resolve(null)
        }
        sRequest.onerror = function () {
          reject(sRequest.error)
        }
      }
      oRequest.onerror = function () {
        reject(oRequest.error)
      }
    })
  },

  deletebyKey(key: any) {
    return new Promise((resolve, reject) => {
      const oRequest = indexedDB.open(DB_NAME, DB_VERSION)
      oRequest.onsuccess = function () {
        const db = oRequest.result
        const tx = db.transaction(STORE_NAME, 'readwrite')
        const st = tx.objectStore(STORE_NAME)
        const rRequest = st.delete(key)
        rRequest.onsuccess = function () {
          resolve(null)
        }
        rRequest.onerror = function () {
          reject(rRequest.error)
        }
      }
      oRequest.onerror = function () {
        reject(oRequest.error)
      }
    })
  },

  getAllKeys() {
    return new Promise((resolve, reject) => {
      const oRequest = indexedDB.open(DB_NAME, DB_VERSION)
      oRequest.onsuccess = function () {
        const db = oRequest.result
        const tx = db.transaction(STORE_NAME, 'readonly')
        const st = tx.objectStore(STORE_NAME)
        const kRequest = st.getAllKeys()
        kRequest.onsuccess = function () {
          resolve(kRequest.result)
        }
        kRequest.onerror = function () {
          reject(kRequest.error)
        }
      }
      oRequest.onerror = function () {
        reject(oRequest.error)
      }
    })
  },
}
