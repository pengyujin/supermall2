import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
//安装插件
Vue.use(Vuex)

const state = {
  cartList: []
}
//创建Store对象
const store = new Vuex.Store({
  state,
  //mutations完成的方法尽可能单一
  mutations,
  actions
})

export default store
//去main.js导入
