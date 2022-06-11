<template>
  <div class="q-pa-md">
    <q-table
      style="height: 650px"
      :title="title"
      :rows="rows"
      :columns="columns"
      :pagination="{ rowsPerPage: 0 }"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TopValueModel } from 'stores/stat'

const columns = [
  {
    name: 'label',
    required: true,
    label: '',
    align: 'left',
    field: row => row.label,
    format: val => `${val}`,
    sortable: false
  },
  {
    name: 'value',
    required: true,
    label: 'Продаж в мес.',
    align: 'left',
    field: row => row.value,
    format: val => val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    sortable: false
  }
]

export default defineComponent({
  name: 'TopTableWidget',
  props: {
    /**
      * название
      */
    title: {
      type: String,
      default: ''
    },
    /**
      * Массив из значений
      */
    rows: {
      type: Array as PropType<TopValueModel[]>
    }
  },
  data () {
    return {
      columns
    }
  },
  computed: {
    loading () {
      return !!this.rows
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
