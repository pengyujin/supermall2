import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  addCart(context, payload) {
    //判断购物车有没有存在的
    //数组常用的方法 push/pop/unshift/shift/sort/reverse/map/filter/reduce/join

    //要想要外面的知道里面做了什么操作，用Promise
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER,oldProduct)
        resolve("商品+1")
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve("添加新的商品")
      }
    })


  }
}
