import Vue from 'vue'
import App from './view/app.vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const messages = {
  en: {
    info: 'You can {action} until {limit} minutes from departure.',
    change: 'change your flight',
    refund: 'refund the ticket'
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})

new Vue({
  i18n,
  el: '#app',
  render: h => h(App)
})
