import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/animate/fadeInUp.css'
import '@quasar/extras/animate/fadeOutDown.css'
import '@quasar/extras/animate/fadeInRight.css'
import '@quasar/extras/animate/fadeOutRight.css'

import 'quasar/dist/quasar.css'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import '../src/css/app.scss'
import '../src/css/quasar.variables.scss'

import { app } from '@storybook/vue3';
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import Vue from 'vue';

// Vue.use(Quasar, { config: {}, directives: {} });
app.use(Quasar)


// import { configure } from '@storybook/vue'

// import 'quasar/dist/quasar.sass'

// import Vue from 'vue'
// import Quasar from 'quasar'

// import 'quasar/icon-set/material-icons'
// import '@quasar/extras/roboto-font/roboto-font.css'

// Vue.use(Quasar)
// // configure(require.context('../src', true, /\.stories\.js$/), module)

const pinia = createPinia()
app.use(pinia)


export const decorators = [(story) => ({
  components: { story },
  template: '<div style="margin: 3em;"><story /></div>'
})];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

