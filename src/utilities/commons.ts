// url query参数
export function query(name: string) {
  const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
  const r = window.location.search.substr(1).match(reg)
  if (r != null)
    return unescape(decodeURI(r[2]))
  return null
}

export const commons = {
  proxyUrl: '',
  language: 'en-US',

  getVideoIdFromUrl(videoUrl: string) {
    return videoUrl.replace('https://www.youtube.com/watch?v=', '')
  },

  urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) 
      outputArray[i] = rawData.charCodeAt(i);
    
    return outputArray
  },

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  },

  getPageWidth() {
    return Math.max(
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth,
    );
  },

  getPageHeight() {
    return Math.max(
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight,
    );
  },
};
