import PricingItem from './../components/pricing/PricingItem.vue'

export default {
  title: 'Pricing/PricingItem',
  component: PricingItem,
  argTypes: {
    name: { control: 'string' },
    price: { control: 'number' },
    period: { control: 'string' },
    htmlDescription: { control: 'string' }
  }
}

const Template = (args) => ({
  components: { PricingItem },
  setup () {
    return { args }
  },
  template: '<div class="row q-col-gutter-sm q-ma-xs q-mr-sm"> <PricingItem v-bind="args" /> </div>'
})

const description = '<li>300 запросов в сутки</li><li>Данные за последние 14 суток</li><li>Анализ по категориям</li><li>Анализ по брендам</li><li>Окно выборки дат до 33 суток</li><li>классно</li><li>виртуозно</li>'

export const Default = Template.bind({})

Default.args = {
  name: 'Тариф #1',
  price: 3000,
  period: '1 месяц',
  htmlDescription: description
}
