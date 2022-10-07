<script lang="ts">
// import { ref } from 'vue'
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import 'xtendui'
import 'xtendui/src/tooltip'
import type { WsContent, WsData, WsLabel, WsParam, WsResult } from '../../types/websocket'
// import { query } from '@/utilities/commons'
const frameSrc = ref(
  '')
// 出栈
// const wsOut = (): any => {
//   if (state.wsData.queue.length === 0) {
//     return null
//   }
//   return state.wsData.queue.shift();
// }
const iframeRef = ref()
// const frameSrc = ref(
//   'http://127.0.0.1:8000/game/KingOctopusKA/?g=KingOctopus?g=KingOctopus&p=x&u=237558600&t=123&ak=accessKey&cr=USD&loc=en&api_exit=/')

function Handler() {
  console.log('xxxxx')
}
function receiveMessage(event) {
  console.log(event.data)
  if (event.data === 'CloseGame')
    frameSrc.value = 'http://localhost:8000/'
}

export default {
  name: 'HelloWorld',
  components: {
    // Header: defineAsyncComponent(() => import('../components/Header.vue')),
    // Footer: defineAsyncComponent(() => import('../components/Footer.vue')),
    // LiveAi: defineAsyncComponent(() => import('../components/LiveAi.vue')),
    // LiveData: defineAsyncComponent(() => import('../components/LiveData.vue')),
    // Loading: defineAsyncComponent(() => import('../components/Loading.vue')),
  },
  props: {
    msg: String,
  },

  setup() {
    frameSrc.value
      = 'http://127.0.0.1:8000/'
    window.addEventListener('message', receiveMessage)
    const state = reactive({
      wsUrl: 'ws://127.0.0.1:8068/execstream',
      loading: false,
      imgBase: null,
      isAnaly: false,
      err: '',
      params: {
        index: '',
        url: '',
      } as WsParam,
      wsData: {
        max: 25,
        queue: [],
        labels: new Array<WsLabel>(),
        socket: null,
        img: new Image(),
        timer: null,
      } as WsData,
    })
    const wsSend = (content: string): void => {
      if (!state.wsData.socket)
        return
      const data = {
        index: state.params.index,
        content,
      } as WsContent
      const jsonStr = JSON.stringify(data)
      state.wsData.socket.send(jsonStr)
    }
    const wsPush = (data: any): void => {
      if (state.wsData.queue.length >= state.wsData.max) {
        state.wsData.queue.shift()
        console.log(`队列已达到最大值：${state.wsData.max}，已移除第一个`)
      }
      // 末尾添加
      state.wsData.queue.push(data)
    }
    const route = useRoute()
    // const comLiveRef = ref<any>(null)
    // const comDataRef = ref<any>(null)
    // 初始化
    const initWs = (): void => {
      // console.log(iframeRef.value)
      // const v = iframeRef.value
      // console.log(v.contentWindow)
      // console.log(v.contentWindow.body)
      // iframeRef.value.contentWindow.addEventListener('mouseup', Handler)

      if (route.query && route.query.index && route.query.url) {
        state.params.index = route.query.index.toString()
        state.params.url = route.query.url.toString()
      }
      else {
        state.isAnaly = false
        state.err = '需要传入有效的index和url参数'
        return
      }
      if (!window.WebSocket) {
        state.isAnaly = false
        state.err = '浏览器不支持websocket'
        return
      }
      state.isAnaly = true
      state.loading = true
      const url = `${state.wsUrl}?index=${state.params.index}&url=${state.params.url}`
      state.wsData.socket = new WebSocket(url)
      // 打开
      state.wsData.socket.onopen = () => {
        wsSend('连接ws服务端...')
        state.loading = false
      }
      // 关闭
      state.wsData.socket.onclose = (e: any) => {
        if (e.wasClean)
          console.error('服务端已关闭', e.code, e.reason)

        else
          console.error('网络被中断...')
      }
      // 接收消息
      state.wsData.socket.onmessage = (e: any) => {
        if (Object.prototype.toString.call(e.data) === '[object String]') {
          const result: WsResult = JSON.parse(e.data)
          state.wsData.status = result.status
          state.wsData.starttime = result.starttime
          state.wsData.curtime = result.curtime
          if (result.status === 1) {
            // wsLabels(result.content)
          }
          else {
            console.info('连接ws服务端', result.content)
          }
        }
        else if (Object.prototype.toString.call(e.data) === '[object Blob]') {
          wsPush(e.data)
        }
        else {
          console.error('不支持的类型', e.data)
        }
      }
      // 错误
      state.wsData.socket.onerror = (e: any) => {
        console.error('socket遇到错误', e.message)
      }
      // wsRender()
    }
    // 发送消息

    // 入栈

    const key = Date.now()

    const count = ref(0)
    onMounted(async () => {
      await axios.post('http://localhost:8000/login', { _token: '7NP0LuiVSBDELNlyWCOxULg7sz3s3oS7ewIQCSsu', username: 'asdf', password_confirmation: 'asdfasdf', password: 'asdfasdf' })
      frameSrc.value = ('http://localhost:8000/game/GoldenDragonKA?api_exit=/')
      initWs()
    })
    return {
      key,
      iframeRef,
      count,
      state,
      frameSrc,
      // comLiveRef,
      // comDataRef
    }
  },

}
</script>

<template>
  <div id="tooltip--unique" class="xt-tooltip p-3">
    <div class="xt-card rounded-md shadow-md text-white xt-links-inverse font-medium bg-black">
      <div class="py-2 px-2.5 text-xs">
        Lorem ipsum dolor sit amet
      </div>
    </div>
  </div>

  <div class="main" style="width: 100%; height: 100%;">
    <iframe
      ref="iframeRef" class="frame"
      :src="frameSrc"
    />

    <!-- <iframe id="f1" ref="frame1" :src="'/test.html'"></iframe> -->
    <!-- <div>
      Count: {{ count }}
      <button @click="count++">
        increame
      </button>
    </div> -->
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  border: 1px solid #aaa;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
  position: absolute;
}
.frame {
    width: 100%;
      height: 800px;
}
</style>
<!-- <script setup lang='ts'>
// import AdvertiseBox from '@/components/AdvertiseBox.vue'
// import Signin from '@/components/signin.vue'
</script> -->
<!--
<template>
  <div class="surface-0 text-center">
    <div class="mb-3 font-bold text-4xl">
      <span class="text-green-600">PrimeVue </span>
      <span class="text-blue-400"> & TypeScript</span>
      <span class="text-blue-600"> & Vite</span>
    </div>
    <h2 class="text-2xl pb-6">
      Starter for Vue.js Development.
    </h2>
    <div class="grid grid-cols-3 gap-4">
      <AdvertiseBox header="VUE 3.2" icon="pi-check-circle" color="green-600">
        Composition Api
      </AdvertiseBox>
      <AdvertiseBox header="Script Setup" icon="pi-check-circle" color="green-600">
        Reduce a lot of boilerplate code
      </AdvertiseBox>
      <AdvertiseBox header="Pinia Store 2" icon="pi-check-circle" color="green-600">
        Replacement / Alternative for VUEX Store
      </AdvertiseBox>
      <AdvertiseBox header="Vite 3" icon="pi-check-circle" color="blue-600">
        Vite Plugins like ViteIcons, PurgeIcons, ... and Vitest
      </AdvertiseBox>
      <AdvertiseBox header="Vite Pages" icon="pi-check-circle" color="blue-600">
        Routing by File/Folder & Vite Markdown included
      </AdvertiseBox>
      <AdvertiseBox header="Vite Layouts" icon="pi-check-circle" color="blue-600">
        Layouts like nuxt layout templates
      </AdvertiseBox>
      <AdvertiseBox header="Typescript 4.5" icon="pi-check-circle" color="blue-400">
        Typesafe by default
      </AdvertiseBox>

      <AdvertiseBox header="PrimeVue 3.10" icon="pi-check-circle" color="green-600">
        Excellent Component Library for VUE
      </AdvertiseBox>
      <AdvertiseBox header="PrimeVue Theme and Layout" icon="pi-check-circle" color="green-600">
        Free Sakai theme (PrimeIcons 2 included)
      </AdvertiseBox>
      <AdvertiseBox header="Uno CSS" icon="pi-check-circle" color="blue-400">
        The instant on-demand Atomic CSS engine
      </AdvertiseBox>
      <AdvertiseBox header="Vuelidate 2" icon="pi-check-circle" color="green-600">
        Validation Example included
      </AdvertiseBox>
      <AdvertiseBox header="VueUse" icon="pi-check-circle" color="green-600">
        VueUse Head included
      </AdvertiseBox>
    </div>
  </div>
  <Signin />
</template> -->

<!-- <style scoped></style> -->
<route lang='yaml'>
meta:
  layout: error
</route>
