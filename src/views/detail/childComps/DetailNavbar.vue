<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.png" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" class="title-item"
          :class="{active: index === currentIndex}" @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "DetailNavbar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        //将点击的位置传出去，实现点击跳转到指定页面的位置
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text)
  }

  .back img {
    width: 30px;
    border: 30px;
    margin-top: 8px;
  }
</style>
