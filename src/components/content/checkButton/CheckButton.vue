<template>
  <div class="check-button" :class="{check: isCheck}">
    <img src="~assets/img/cart/right.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isCheck: {
         type: Boolean,
         default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #a3a3a5;
  }

  .check-button img {
    height: 30px;
    width: 30px;
  }

  .check {
    border-color: red;
    background-color: forestgreen;
  }
</style>
