// import { defineStore } from 'pinia'
import axios from 'axios'
// // main is the name of the store. It is unique across your application
// // and will appear in devtools
// export const useAuthStore = defineStore('auth', {
//   // a function that returns a fresh state
//   state: () => ({
//     authentificated: false,
//     email: 'admin@test.com',
//   }),
//   // optional getters
//   getters: {},
//   // optional actions
//   actions: {
//     login(password: string) {
//       // `this` is the store instance
//       this.authentificated = this.email === 'admin@test.com' && password === '1234'
//     },
//     logout() {
//       this.authentificated = false
//     },
//   },
// })
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Profiles } from '../../types/api'
// import supabase from '../supabase'
// import { getTime } from '../helper/utility'
import { useSupabase } from '@/composables/supabase'
const supabase = useSupabase()
export function getTime() {
  const time = new Date()
  return time.toLocaleString().replace(/\//g, '-')
}
export const useAuthStore = defineStore('user', {
  // 开启持久化
  // persist: true,

  state: () => ({
    user: <any>{},
    followings: [],
    ownTweets: [],
    followingTweets: [],
    tweets: [],
    authenticated: false,
  }),

  getters: {
    // getTweetById: (state) => {
    //   return id => state.tweets.find(tweet => tweet.id === id)
    // },
    // getAllFollowingId: (state) => {
    //   return () => state.followings.map(following => following.id)
    // },
    // getFollowingById: (state) => {
    //   return id => state.followings.find(following => following.id === id)
    // },
    // isTweetLiked: (state) => {
    //   return id => state.user.liked_tweet_id.includes(id)
    // },
    // isTweetRetweeted: (state) => {
    //   return id => state.user.retweeted_tweet_id.includes(id)
    // },
    // getTotalRepliedById: (state) => {
    //   return (id) => {
    //     const tweet = state.tweets.find(tweet => tweet.id === id)
    //     return tweet.replied_user_id.length
    //   }
    // },
    // getTotalRetweetedById: (state) => {
    //   return (id) => {
    //     const tweet = state.tweets.find(tweet => tweet.id === id)
    //     return tweet.retweeted_tweet_id.length
    //   }
    // },
    // getTotalLikedById: (state) => {
    //   return (id) => {
    //     const tweet = state.tweets.find(tweet => tweet.id === id)
    //     return tweet.liked_user_id.length
    //   }
    // },
    // getAllTweetsWithMedia: (state) => {
    //   return () => state.ownTweets.filter(tweet => tweet.media !== null)
    // },
    // getAllLikedTweets: (state) => {
    //   return () => state.tweets.filter(tweet => state.user.liked_tweet_id.includes(tweet.id))
    // },
  },

  actions: {
    async register(email: string, password: string) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error)
        return error.message
    },

    async logout() {
      const { error } = await supabase.auth.signOut()
      if (error)
        throw error
    },
    async resetpassword(email) {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(email)
      if (error)
        throw error
      return data
    },
    async updatePassword(token, password) {
      const { error, data } = await supabase.auth.api.updateUser(token, { password })
      if (error)
        throw error
      return data
    },
    async login(email: string, password: string) {
      console.log(email, password)
      // if (error)
      //   throw error
      // if (user)
      //   await this.getUserProfile(user.id)
      try {
        // const { user, error } = await supabase.auth.signIn({ email, password })
        const user = await axios.post(
          'https://rxxrfmiyqkxcglrofvim.supabase.co/auth/v1/token?grant_type=password',
          { email, password },
          {
            headers: {
              apiKey:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eHJmbWl5cWt4Y2dscm9mdmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAxMzY4ODcsImV4cCI6MTk3NTcxMjg4N30.lVvW73jUQzANs47BC3C69j0AcmW7eVuzl7twVkGxnOU',
            },
          },
        )
        this.authenticated = true
        this.user = user
        console.log(user)
        // if (!user)
        //   return user.status
        this.authenticated = true
        // await this.getUserProfile(user.id)
        return {
          success: true,
        }
      }
      catch (error) {
        console.log(error)
        if (error) {
          return {
            error,
          }
        }
        return {
          error: 'Sign in failed, please try reloading the page.',
        }
      }
    },

    /**
     * Login with google, apple
     */
    // async loginWithSocialProvider(token: string) {
    //   const { user, error } = await supabase.auth.signIn({ provider: 'google' })
    //   if (error)
    //     throw error
    //   if (user !== null)
    //     this.user = user
    // },

    /**
     * Get user
     */
    async getUserProfile(id: string) {
      console.log('getting profile')
      const { data, error } = await supabase.from('profiles').select('*').eq('id', id)
      if (error)
        throw error
      if (data)
        this.user = data[0]
    },

    /**
     * Get following profile (id, avatar_url, ...)
     */

    // async getFollowingProfile(id) {
    //   const { data, error } = await supabase.from('profiles').select('*').in('id', id)
    //   if (error)
    //     throw error
    //   if (data)
    //     this.followings = data
    // },

    // /**
    //  * Get all followings
    //  */
    // async getFollowings() {
    //   const { data, error } = await supabase.from('followings').select('followingId').eq('userId', this.user.id)
    //   if (error)
    //     throw error
    //   if (data) {
    //     const id = []
    //     for (const item of data)
    //       id.push(item.followingId)

    //     await this.getFollowingProfile(id)
    //   }
    // },

    // /**
    //  * Get all tweets by self
    //  */
    // async getOwnTweets() {
    //   const { data, error } = await supabase.from('tweets').select('*').eq('userId', this.user.id)
    //   if (error)
    //     throw error
    //   if (data) {
    //     data.sort((a, b) => {
    //       const at = new Date(a.createdTime)
    //       const bt = new Date(b.createdTime)
    //       return bt - at
    //     })
    //     this.ownTweets = data.map((item) => {
    //       return {
    //         ...item,
    //         avatar_url: this.user.avatar_url,
    //         username: this.user.username,
    //         nickname: this.user.nickname,
    //       }
    //     })
    //   }
    // },

    // /**
    //  * Get all tweets by followings
    //  */
    // async getFollowingTweets() {
    //   const { data, error } = await supabase.from('tweets').select('*').in('userId', this.getAllFollowingId())
    //   if (error)
    //     throw error
    //   if (data) {
    //     this.followingTweets = data.map((item) => {
    //       return {
    //         ...item,
    //         avatar_url: this.getFollowingById(item.userId).avatar_url,
    //         username: this.getFollowingById(item.userId).username,
    //         nickname: this.getFollowingById(item.userId).nickname,
    //       }
    //     })
    //   }
    // },

    // /**
    //  * Get all tweets by timeline
    //  */
    // async getTweetsByTimeline() {
    //   await this.getFollowings()
    //   await this.getOwnTweets()
    //   await this.getFollowingTweets()
    //   const arr = this.ownTweets.concat(this.followingTweets)
    //   arr.sort((a, b) => {
    //     const at = new Date(a.createdTime)
    //     const bt = new Date(b.createdTime)
    //     return bt - at
    //   })
    //   this.tweets = arr
    // },

    // /**
    //  * Send single tweet
    //  */
    // async sendTweet(tweet, media) {
    //   const time = getTime()
    //   const { data, error } = await supabase
    //     .from('tweets')
    //     .insert([{ userId: this.user.id, tweet, media: media || null, createdTime: time }])
    //   if (error)
    //     throw error
    //   if (data)
    //     this.getTweetsByTimeline()
    // },

    /**
     * Store media in storage and return path with token
     * @param file
     * @returns url or null
     */
    async storeMediaAndReturnPath(file: File) {
      const { error: uploadError } = await supabase.storage.from('gallery/images').upload(file.name, file)
      if (uploadError)
        throw uploadError
      const { publicURL, error: pathError } = supabase.storage.from('gallery/images').getPublicUrl(file.name)
      if (pathError)
        throw uploadError
      if (publicURL)
        return publicURL
      else return null
    },

    /**
     * delete like in liked_tweet_id of user
     */
    // async cancelLikeInUser(tweet_id) {
    //   const arr = this.user.liked_tweet_id.filter(item => item !== tweet_id)
    //   const { data, error } = await supabase
    //     .from('profiles')
    //     .update({ liked_tweet_id: arr })
    //     .match({ id: this.user.id })
    //   if (error)
    //     throw error
    //   if (data)
    //     this.getUserProfile(this.user.id)
    // },

    // /**
    //  * delete user in liked_user_id of tweet
    //  */
    // async cancelLikeInTweet(tweet_id) {
    //   const tweet = this.tweets.find(item => item.id === tweet_id)
    //   let arr = tweet.liked_user_id
    //   arr = arr.filter(item => item !== this.user.id)
    //   const { data, error } = await supabase.from('tweets').update({ liked_user_id: arr }).match({ id: tweet_id })
    //   if (error)
    //     throw error
    //   if (data)
    //     this.getTweetsByTimeline()
    // },

    // /**
    //  * insert like in liked_tweet_id of user
    //  */
    // async confirmLikeInUser(tweet_id) {
    //   const arr = this.user.liked_tweet_id
    //   arr.push(tweet_id)
    //   const { data, error } = await supabase
    //     .from('profiles')
    //     .update({ liked_tweet_id: arr })
    //     .match({ id: this.user.id })
    //   if (error)
    //     throw error
    //   if (data)
    //     this.getUserProfile(this.user.id)
    // },

    // /**
    //  * insert user in liked_user_id of tweet
    //  */
    // async confirmLikeInTweet(tweet_id) {
    //   const tweet = this.tweets.find(item => item.id === tweet_id)
    //   const arr = tweet.liked_user_id
    //   arr.push(this.user.id)

    //   const { data, error } = await supabase.from('tweets').update({ liked_user_id: arr }).match({ id: tweet_id })
    //   if (error)
    //     throw error
    //   if (data)
    //     this.getTweetsByTimeline()
    // },

    // /**
    //  * insert retweet in retweeted_tweet_id of user
    //  */
    // async confirmRetweetInUser(tweet_id) {
    //   const arr = this.user.retweeted_tweet_id
    //   arr.push(tweet_id)
    //   const { data, error } = await supabase
    //     .from('profiles')
    //     .update({ retweeted_tweet_id: arr })
    //     .match({ id: this.user.id })
    //   if (error)
    //     throw error
    //   if (data)
    //     this.getUserProfile(this.user.id)
    // },

    // /**
    //  * insert user in retweeted_tweet_id of tweet
    //  */
    // async confirmRetweetInTweet(tweet_id) {
    //   const tweet = this.tweets.find(item => item.id === tweet_id)
    //   const arr = tweet.retweeted_tweet_id
    //   // if user retweet his own tweet, do not insert a new line
    //   if (tweet.userId === this.user.id) {
    //     arr.push(tweet_id)
    //   }
    //   else {
    //     const newTweet = await this.insertRetweet(tweet)
    //     arr.push(newTweet[0].id)
    //   }
    //   const { error } = await supabase.from('tweets').update({ retweeted_tweet_id: arr }).match({ id: tweet_id })
    //   if (error)
    //     throw error
    //   if (data)
    //     this.getTweetsByTimeline()
    // },

    // /**
    //  * delete retweet in retweeted_tweet_id of user
    //  */
    // async cancelRetweetInUser(tweet_id) {
    //   const arr = this.user.retweeted_tweet_id.filter(item => item !== tweet_id)
    //   const { data, error } = await supabase
    //     .from('profiles')
    //     .update({ retweeted_tweet_id: arr })
    //     .match({ id: this.user.id })
    //   if (error)
    //     throw error
    //   if (data)
    //     this.getUserProfile(this.user.id)
    // },

    // /**
    //  * delete user in retweeted_tweet_id of tweet
    //  */
    // async cancelRetweetInTweet(tweet_id, original_tweet_id) {
    //   const original_tweet = this.tweets.find(item => item.id === original_tweet_id)
    //   // if user cancel the retweets of his own tweet
    //   if (original_tweet.userId === this.user.id) {
    //     const arr = original_tweet.retweeted_tweet_id.filter(item => item !== tweet_id)
    //     const { data, error } = await supabase
    //       .from('tweets')
    //       .update({ retweeted_tweet_id: arr })
    //       .match({ id: original_tweet_id })
    //     if (error)
    //       throw error
    //     if (data)
    //       this.getTweetsByTimeline()
    //   }
    //   else {
    //     const arr = original_tweet.retweeted_tweet_id.filter(item => item !== tweet_id)
    //     const { data, error } = await supabase
    //       .from('tweets')
    //       .update({ retweeted_tweet_id: arr })
    //       .match({ id: original_tweet_id })
    //     if (error)
    //       throw error
    //     if (data)
    //       this.deleteRetweet(tweet_id)
    //   }
    // },

    // async insertRetweet(tweet) {
    //   const time = getTime()
    //   const { data, error } = await supabase.from('tweets').insert([
    //     {
    //       userId: this.user.id,
    //       original_tweet_id: tweet.id,
    //       createdTime: time,
    //     },
    //   ])
    //   if (error)
    //     throw error
    //   if (data)
    //     return data
    // },

    // async deleteRetweet(tweet_id) {
    //   const { data, error } = await supabase.from('tweets').delete().eq('id', tweet_id)
    //   if (error)
    //     throw error
    //   if (data)
    //     this.getTweetsByTimeline()
    // },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))

