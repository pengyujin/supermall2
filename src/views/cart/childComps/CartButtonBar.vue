<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-check="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去计算: {{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  export default {
    name: "CartButtonBar",
    components: {CheckButton},
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((previousValue ,item) => {
          return previousValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        // return !(this.$store.state.cartList.filter(item => item.checked).length)
        if(this.$store.state.cartList.length == 0) return false
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    },
    methods: {
      //无法监听组件，要用@click.native
      checkClick() {
        if(this.isSelectAll) {//全部选中
          this.$store.state.cartList.forEach(item => item.checked =false)
        } else {
          this.$store.state.cartList.forEach(item => item.checked =true)
        }
      }
    }

  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    position: relative;
    line-height: 40px;
    display: flex;
    background-color: #eeeeee;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .bottom-bar img {
    height: 20px;
    width: 20px;
  }

  .check-button {
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-right: 10px;
  }

  .price {
    margin-left: 20px;
  }
  .calculate {

  }
</style>
