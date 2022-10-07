/* eslint-disable @typescript-eslint/ban-ts-comment */

import consola from 'consola'
import { defineCachedStore } from 'pinia-cached-store'
// import type { StorageUnitTypes } from 'types'
import { acceptHMRUpdate } from 'pinia'
// import { UnitClass } from 'types/UnitClass'
import type { UnitClass } from 'types/UnitClass'
import { useSupabase } from '@/composables/supabase'
const supabase = useSupabase()

export const useDataStore = defineCachedStore({
  id: 'data',

  state: () => ({
    customers: [],
    storageTypes: <UnitClass | undefined><unknown>[],
    storageTypesLastUpdate: 0,
    storageUnitsSubscriber: <any>{},
  }),
  async refresh({ name }: { name: string }) {
    consola.debug('fetching data ...', name)
    const { data } = await supabase
      .from<UnitClass>('unitclass')
      .select()
      // .eq('availability->showAvailable', true)
      // .order('updatedAt', { ascending: false })
    if (data !== null) {
      data.forEach((item) => {
        if (typeof item.features == 'string')
          item.features = JSON.parse(item.features)
        if (typeof item.dimensions == 'string')
          item.dimensions = JSON.parse(item.dimensions)
        if (typeof item.rates == 'string')
          item.rates = JSON.parse(item.rates)
        if (typeof item.filters == 'string')
          item.filters = JSON.parse(item.filters)
        if (typeof item.discount == 'string')
          item.discount = JSON.parse(item.discount)
        if (typeof item.availability == 'string')
          item.availability = JSON.parse(item.availability)
        // @ts-expect-error
        if (typeof item.promotions == 'string')
          // @ts-expect-error
          item.promotions = JSON.parse(item.promotions)
        if (typeof item.ranking == 'string')
          item.ranking = JSON.parse(item.ranking)
      })
      // console.log(data)
      // @ts-expect-error
      this.storageTypes = data
      this.storageTypesLastUpdate = new Date(data[0].updatedAt!).valueOf()
      // console.log(data)

      // this.storageUnitsSubscriber =
      supabase
        .from('unitclass')
        .on('*', (payload) => {
          console.log('Change received!', payload)
          // TODO Refactor this
          switch (payload.eventType) {
            case 'INSERT':
              this.storageTypes.unshift(payload.new)
              // this.fetchAddedBottles()
              // this.fetchOpenedBottles()
              break
            case 'UPDATE':
              // eslint-disable-next-line no-case-declarations
              const storageUnitFinded = this.storageTypes.find((item: any) => {
                return payload.new.id === item.id
              })
              if (storageUnitFinded)
                Object.assign(storageUnitFinded, payload.new)

              // this.fetchAddedBottles()
              // this.fetchOpenedBottles()
              // return
              break
            case 'DELETE':
              // this.deleteBottle(payload.new.id)
              // this.fetchAddedBottles()
              // this.fetchOpenedBottles()
              break
          }
        })
        .subscribe()
    }
  },

  caching: {
    // force reload on new version
    checkValidity: (state: { appVersion: any }) => (state.appVersion ?? '') === import.meta.env.VITE_APP_VERSION,
  },
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot))
