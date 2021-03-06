// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import config from '@/config'
import importDirective from '@/directive'
import path from '@/libs/path'
import {fetchPost, fetchPostObj, fetchGet} from '@/libs/http'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'

Vue.use(iView)
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.prototype.$path = path
Vue.prototype.$http = {fetchPost, fetchPostObj, fetchGet}
/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
