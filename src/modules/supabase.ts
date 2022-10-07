/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { UserModule } from '@/types'

export const install: UserModule = async ({ app }) => {
  // const isHostedByDashibase = import.meta.env.VITE_HOSTED_BY_DASHIBASE === 'true' || false

  // let supabaseUrl: string
  // let supabaseAnonKey: string

  // const supabase = undefined as unknown as SupabaseClient

  async function getDashboardMetadata() {
    // if (!isHostedByDashibase) {
    //   return {
    //     supabaseUrl: config.supabase_url as string,
    //     supabaseAnonKey: config.supabase_anon_key as string,
    //     appName: config.name,
    //     dashboardId: '',
    //   }
    // }
    // let appId = import.meta.env.VITE_APP_ID || 'demo' // Placeholder ID
    // If in production, get appId from host name
    // if (process.env.NODE_ENV !== 'development') {
    // const host = window.location.host
    // appId = host.split('.')[0]
    // }
    const baseSupabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
    const baseSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
    const baseSupabase = createClient(baseSupabaseUrl, baseSupabaseAnonKey)
    baseSupabase.auth.session = () => null
    // const response = await baseSupabase
    //   .from('dashboards')
    //   .select('id,supabase_url,supabase_anon_key,app_name')
    //   // .eq('app_id', appId)
    //   .single()
    // if (response.error) {
    //   throw new Error(response.error.message)
    // }
    // else {
    // While it is okay to share the URL and AnonKey, we don't want to store it explicitly
    window.localStorage.setItem(
      'metadata',
      JSON.stringify({
        supabaseUrl: baseSupabaseUrl,
        supabaseAnonKey: baseSupabaseAnonKey,
        // appName: response.data.app_name,
        // dashboardId: response.data.id,
      }),
    )
    // document.title = response.data.app_name
    return {
      supabaseUrl: baseSupabaseUrl as string,
      supabaseAnonKey: baseSupabaseAnonKey as string,
      // appName: response.data.app_name,
      // dashboardId: response.data.id,
    }
    // }
  }

  async function loadDashboardMetadata() {
    const storedMetadata = window.localStorage.getItem('metadata')
    let metadata = {} as { supabaseUrl: string; supabaseAnonKey: string }
    if (!storedMetadata)
      metadata = await getDashboardMetadata()

    else
      metadata = JSON.parse(storedMetadata)
      // metadata.supabaseUrl = metadata.supabaseUrl,
      // metadata.supabaseAnonKey = metadata.supabaseAnonKey

    return metadata
  }
  await loadDashboardMetadata()
  // eslint-disable-next-line no-async-promise-executor
  // const __tla = new Promise(async () => {
  // // If not self-hosted, dynamically retrieve Supabase URL and Anon Key
  //   if (isHostedByDashibase) {
  //     const metadata = await loadDashboardMetadata()
  //     supabaseUrl = metadata.supabaseUrl
  //     supabaseAnonKey = metadata.supabaseAnonKey
  //   }
  //   supabase = createClient(supabaseUrl, supabaseAnonKey)
  //   app.provide('supabase', supabase)
  // })
  // export { supabase, __tla }
}
