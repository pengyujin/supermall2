import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
//修改state应该同故宫mutations
  [ADD_COUNTER](state, payload){
    payload.count++
  },
  [ADD_TO_CART](state, payload){
    payload.checked = false
    state.cartList.push(payload)
  }
}
