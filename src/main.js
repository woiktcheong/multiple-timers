import Vue from 'vue'
import App from './App.vue'
import VueYouTubeEmbed from 'vue-youtube-embed'

Vue.config.productionTip = false
Vue.use(VueYouTubeEmbed)

new Vue({
  render: h => h(App),
}).$mount('#app')
