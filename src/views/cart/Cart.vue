<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-button-bar></cart-button-bar>
  </div>

</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartButtonBar from "./childComps/CartButtonBar";
  export default {
    name: "Cart",
    components: {
      CartButtonBar,
      NavBar,
      CartList
    },
    computed: {
      cartLength() {
        return this.$store.state.cartList.length
      },
      //两种语法
      // ...mapGetters(['cartLength', 'cartList'])
      // ...mapGetters({
      //   length: 'cartLength',
      //   list: 'cartList'
      // })
    }


  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #ffffff;
    /*font-weight: 700;加粗*/
  }
</style>
