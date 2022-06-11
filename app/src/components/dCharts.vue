<template>
  <div class="dСharts container">
    <div class="dСharts__schedule">
      <div class="dСharts__img">
        <canvas class="dChart__canvas" ref="myChart1" width="111" height="47"></canvas>
      </div>
      <div class="dСharts__box">
        <div class="dСharts__heading">Товаров</div>
        <div class="dСharts__text">
          {{ cardsValue }}
          <svg class="dСharts__svg" :class="{ 'dСharts__svg--down': cardsArrowDown }" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0312 6.53126C10.8897 6.67096 10.6989 6.74929 10.5 6.74929C10.3011 6.74929 10.1103 6.67096 9.96875 6.53126L6.75 3.31251V12.5C6.75 12.6989 6.67098 12.8897 6.53033 13.0303C6.38968 13.171 6.19891 13.25 6 13.25C5.80109 13.25 5.61032 13.171 5.46967 13.0303C5.32902 12.8897 5.25 12.6989 5.25 12.5V3.31251L2.03125 6.53126C1.89036 6.67216 1.69926 6.75131 1.5 6.75131C1.30075 6.75131 1.10965 6.67216 0.968754 6.53126C0.827858 6.39037 0.748703 6.19927 0.748703 6.00001C0.748703 5.80075 0.827858 5.60966 0.968754 5.46876L5.46875 0.96876C5.53843 0.89884 5.62122 0.843363 5.71239 0.805509C5.80355 0.767655 5.90129 0.748169 6 0.748169C6.09871 0.748169 6.19645 0.767655 6.28762 0.805509C6.37878 0.843363 6.46157 0.89884 6.53125 0.96876L11.0312 5.46876C11.1012 5.53844 11.1566 5.62123 11.1945 5.7124C11.2324 5.80356 11.2518 5.9013 11.2518 6.00001C11.2518 6.09872 11.2324 6.19646 11.1945 6.28762C11.1566 6.37879 11.1012 6.46158 11.0312 6.53126Z" :fill="cardsArrowDown ? '#F63D68' : '#83B646'"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="dСharts__schedule">
      <div class="dСharts__img">
        <canvas class="dChart__canvas" ref="myChart2" width="111" height="47"></canvas>
      </div>
      <div class="dСharts__box">
        <h6 class="dСharts__heading">Брендов</h6>
        <p class="dСharts__text">
          {{ brandsValue }}
          <svg class="dСharts__svg" :class="{ 'dСharts__svg--down': brandsArrowDown }" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0312 6.53126C10.8897 6.67096 10.6989 6.74929 10.5 6.74929C10.3011 6.74929 10.1103 6.67096 9.96875 6.53126L6.75 3.31251V12.5C6.75 12.6989 6.67098 12.8897 6.53033 13.0303C6.38968 13.171 6.19891 13.25 6 13.25C5.80109 13.25 5.61032 13.171 5.46967 13.0303C5.32902 12.8897 5.25 12.6989 5.25 12.5V3.31251L2.03125 6.53126C1.89036 6.67216 1.69926 6.75131 1.5 6.75131C1.30075 6.75131 1.10965 6.67216 0.968754 6.53126C0.827858 6.39037 0.748703 6.19927 0.748703 6.00001C0.748703 5.80075 0.827858 5.60966 0.968754 5.46876L5.46875 0.96876C5.53843 0.89884 5.62122 0.843363 5.71239 0.805509C5.80355 0.767655 5.90129 0.748169 6 0.748169C6.09871 0.748169 6.19645 0.767655 6.28762 0.805509C6.37878 0.843363 6.46157 0.89884 6.53125 0.96876L11.0312 5.46876C11.1012 5.53844 11.1566 5.62123 11.1945 5.7124C11.2324 5.80356 11.2518 5.9013 11.2518 6.00001C11.2518 6.09872 11.2324 6.19646 11.1945 6.28762C11.1566 6.37879 11.1012 6.46158 11.0312 6.53126Z" :fill="brandsArrowDown ? '#F63D68' : '#83B646'"/>
          </svg>
        </p>
      </div>
    </div>
    <div class="dСharts__schedule">
      <div class="dСharts__img">
        <canvas class="dChart__canvas" ref="myChart3" width="111" height="47"></canvas>
      </div>
      <div class="dСharts__box">
        <h6 class="dСharts__heading">Продавцов</h6>
        <p class="dСharts__text">
          {{ catalogsValue }}
          <svg class="dСharts__svg" :class="{ 'dСharts__svg--down': catalogsArrowDown }" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0312 6.53126C10.8897 6.67096 10.6989 6.74929 10.5 6.74929C10.3011 6.74929 10.1103 6.67096 9.96875 6.53126L6.75 3.31251V12.5C6.75 12.6989 6.67098 12.8897 6.53033 13.0303C6.38968 13.171 6.19891 13.25 6 13.25C5.80109 13.25 5.61032 13.171 5.46967 13.0303C5.32902 12.8897 5.25 12.6989 5.25 12.5V3.31251L2.03125 6.53126C1.89036 6.67216 1.69926 6.75131 1.5 6.75131C1.30075 6.75131 1.10965 6.67216 0.968754 6.53126C0.827858 6.39037 0.748703 6.19927 0.748703 6.00001C0.748703 5.80075 0.827858 5.60966 0.968754 5.46876L5.46875 0.96876C5.53843 0.89884 5.62122 0.843363 5.71239 0.805509C5.80355 0.767655 5.90129 0.748169 6 0.748169C6.09871 0.748169 6.19645 0.767655 6.28762 0.805509C6.37878 0.843363 6.46157 0.89884 6.53125 0.96876L11.0312 5.46876C11.1012 5.53844 11.1566 5.62123 11.1945 5.7124C11.2324 5.80356 11.2518 5.9013 11.2518 6.00001C11.2518 6.09872 11.2324 6.19646 11.1945 6.28762C11.1566 6.37879 11.1012 6.46158 11.0312 6.53126Z" :fill="catalogsArrowDown ? '#F63D68' : '#83B646'"/>
          </svg>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useStatStore } from 'stores/stat'

export default defineComponent({
  name: 'dCharts',
  data () {
    return {
      cardsValue: 0,
      cardsArrowDown: false,
      brandsValue: 0,
      brandsArrowDown: false,
      catalogsValue: 0,
      catalogsArrowDown: false
    }
  },
  methods: {
    checkArrowDown (counter) {
      return counter.history[counter.history.length - 2] > counter.value
    }
  },
  async mounted () {
    const statStore = useStatStore()
    await statStore.loadCounters()
    Chart.register(...registerables)
    const data = {
      labels: [],
      datasets: [{
        data: [],
        borderColor: '#7226BE',
        fill: false
      }]
    }
    const chartOptions = {
      responsive: false,
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 0
        }
      },
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      }
    }

    statStore.counters.forEach(counter => {
      let ctx
      if (counter.name === 'cards') {
        ctx = this.$refs.myChart1
        this.cardsValue = counter.value
        if (this.checkArrowDown(counter)) this.cardsArrowDown = true
      } else if (counter.name === 'brands') {
        ctx = this.$refs.myChart2
        this.brandsValue = counter.value
        data.datasets[0].borderColor = '#2635BE'
        if (this.checkArrowDown(counter)) this.brandsArrowDown = true
      } else if (counter.name === 'catalogs') {
        ctx = this.$refs.myChart3
        this.catalogsValue = counter.value
        data.datasets[0].borderColor = '#26BE35'
        if (this.checkArrowDown(counter)) this.catalogsArrowDown = true
      }
      data.labels = counter.history
      data.datasets[0].data = counter.history
      new Chart(ctx, {
        type: 'line',
        data,
        options: chartOptions
      })
    })
  }
})
</script>

<style lang="scss" scoped>
@import "../css/mixins";
.dСharts{
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 64px;
  pointer-events: none;
  flex-wrap: wrap;
  &__schedule {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 302px;
    height: 144px;
    background-color: #F4F8FF;
    box-shadow: 0 0 5px rgba(180, 210, 255, 0.4);
    border-radius: 16px;
    @include phone {
      margin-bottom: 20px;
    }
  }
  &__heading {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #848484;
    margin-bottom: 6px;
  }
  &__text {
    padding-right: 19px;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }
  &__svg--down {
    transform: rotate(180deg);
  }
}
</style>
