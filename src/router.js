import Vue from 'vue'
import Router from 'vue-router'
import SearchPage from './components/SearchPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SearchPage',
			component: SearchPage
    }
  ]
})
