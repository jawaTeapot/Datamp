import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import * as _ from 'lodash'

export interface TariffModel {
  name: string;
  has_trial: boolean;
  description_html: string;
}

export interface PriceModel {
  name: string;
  price: number;
}

export interface RateModel {
  period: string;
  sale: string;
  prices: PriceModel [];
}

export const usePriceStore = defineStore('price', {
  state: () => ({
    tariffs: [] as TariffModel[],
    rates: [] as RateModel[],
    isLoaded: false
  }),
  getters: {
    getTariffs: (state) => state.tariffs,
    getRates: (state) => state.rates,
    getTariffByName (state) {
      return (name) => _.findLast(state.tariffs, { name })
    }
  },
  actions: {
    async loadPrices () {
      if (this.isLoaded === true) return
      const { data } = await api.get('pricing/v1')
      this.tariffs = data.tariffs
      this.rates = data.rates
      this.isLoaded = true
    }
  }
})
