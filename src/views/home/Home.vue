<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

<!--    在这里监听滑动图标传的值-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :lists="lists"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick()" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import GoodsListItem from "../../components/content/goods/GoodsListItem";
  import Scroll  from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata} from "network/home";
  import {getHomeGoods} from "../../network/home";
  import {debounce} from "../../common/utils";

  export default {
    name: "Home",
    components: {
      Scroll,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      GoodsListItem,
      NavBar,
      TabControl,
      Scroll,
      BackTop
    },
    data() {
      return {
        lists: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0
      }
    },
    computed: {
      showGoods() {
        return  this.goods[this.currentType].list
      }
    },
    created() {
      //请求多个数据

      this.getHomeMultidata();
      //请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      //监听item图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 200)

      //商品图片加载的时候，从GoodsItem里面用bus发送事件出来，这里接收处理
      this.$bus.$on('itemImageLoad', () => {
        // console.log("监听图片")
        refresh()
      })

      //获取tabControl的tabOffsetTop
      console.log(this.$refs.tabControl.$el)
    },
    methods: {
      /**
       * 事件监听相关方法
       */

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = "sell"
            break
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y > 1000)
      },
      loadMore() {
        //调用之前封装好的方法
        this.getHomeGoods(this.currentType)


        // this.$refs.scroll.scroll.refresh()
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // window.console.log(res);
          this.lists = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
          console.log(res.data.data.banner.list);
          console.log(res.data.data.recommend.list);
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1 ;
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp()
          console.log(res);
        })
      }

    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #e9e9e9;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .content {
    /*不能写死，应该赢定位或者下面动态计算*/
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }
  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
