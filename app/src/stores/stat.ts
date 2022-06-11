import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import * as _ from 'lodash'

export interface CounterModel {
  name: string;
  value: number;
  history: number[];
}

export interface TopValueModel {
  label: string;
  value: number;
}

export interface TopModel {
  name: string;
  values: TopValueModel[];
}

export const useStatStore = defineStore('stat', {
  state: () => ({
    counters: [] as CounterModel[],
    tops: [] as TopModel[]
  }),
  getters: {
    getCounterStatByName (state) {
      return (name) => _.findLast(state.counters, { name })
    }
  },
  actions: {
    async loadCounters () {
      if (this.counters.length > 0) return
      const { data } = await api.get('dashboard/v1/stat/counters')
      this.counters = data
    },
    async loadTops () {
      if (this.tops.length > 0) return
      const { data } = await api.get('dashboard/v1/stat/tops')
      this.tops = data
    }
  }
})
