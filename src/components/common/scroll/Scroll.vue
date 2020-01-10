<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
      })
      //监听滚动
      if(this.prototype ===2 || this.prototype ===3) {
        this.scroll.on('scroll', (position) => {
          //拿到滑动位置，发送出去
          this.$emit('scroll',position)
        })
      }

      //监听上拉事件
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }

    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        console.log("测试防抖")
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
