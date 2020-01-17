<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item,index) in cartList"
        :key="index"
        :product="item"></cart-list-item>
    </scroll>

  </div>
</template>

<script>
  import CartListItem from "./CartListItem";
  import Scroll from "../../../components/common/scroll/Scroll";
  export default {
    name: "CartLis",
    components: {CartListItem, Scroll},
    data() {
      return {
        cartList: []
      }
    },
    created() {
      this.cartList = this.$store.state.cartList
    },
    activated() {
      console.log("---")
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
