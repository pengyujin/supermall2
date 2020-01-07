<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :lists="lists"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>

    <ul>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
    </ul>
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

  import {getHomeMultidata} from "network/home";
  import {getHomeGoods} from "../../network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      GoodsListItem,
      NavBar,
      TabControl
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
        currentType: 'pop'
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
          console.log(res);
        })
      }

    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
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

  .tab-control {
    position: sticky;
    top:44px;
    z-index: 9;
  }
</style>
