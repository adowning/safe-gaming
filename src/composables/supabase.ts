import { inject } from 'vue'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
const baseSupabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const baseSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
export const useSupabase = () => {
  // const session = JSON.parse(localStorage.getItem('supabase.auth.token') ?? '{}')
  // const access_token = session?.currentSession?.access_token
  const supabase = inject<SupabaseClient>('supabase') ?? createClient(baseSupabaseUrl, baseSupabaseAnonKey)
  // supabase.auth.setAuth(access_token)
  return supabase
}
