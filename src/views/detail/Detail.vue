<template>
  <div id="detail">
    <detail-navbar @titleClick="titleClick"></detail-navbar>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>

    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" @v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import Scroll  from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";
  import DetailNavbar from "./childComps/DetailNavbar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
  import BackTop from "../../components/content/backTop/BackTop";

  export default {
    name: "Detail",
    components: {
      BackTop,
      DetailShopInfo,
      DetailSwiper,
      DetailNavbar,
      DetailBaseInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,

    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        isShowBackTop: false
      }
    },
    created() {
      //保存传进来的IID
      this.iid = this.$route.params.iid
      // console.log(getDetail(this.iid))

      //根据iid请求数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.data.result;
        // console.log(data)
        this.topImages = res.data.result.itemInfo.topImages

        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //获取店铺信息
        this.shop = new Shop(data.shopInfo)

        //保存商品的详情数据
        this.detailInfo = data.detailInfo;

        //获取商品的参数新需
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //取出评论信息
        if(data.rate.cRate !==0 ) {
          this.commentInfo = data.rate.list[0];
          // console.log(data.rate.list[0])
        }

        //在这里取值就可以等待数据渲染完了，这样去到的值才正确，不是在mounted或者updated中
        //渲染完成之后会回调这个函数,dom加载完成，但是图片还没加载完，高度出错，offsetTop不对
        // this.$nextTick(() => {
        //   this.themeTopYs = []
        //
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs)
        // })
      })

      //请求推荐数据
      getRecommend().then(res => {
        console.log(res)
        this.recommends = res.data.data.list;
      })
    },
    mounted() {

    },
    updated() {

    },
    methods: {
      imageLoad() {
        //在这里刷新，要在上面的scroll加上ref
        this.$refs.scroll.refresh()
      },
      //监听标题点击
      titleClick(index) {
        console.log('标题发生改变，在detail.vue监听到')
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y > 1000)
      },
      addToCart() {
        console.log("Detail监听到传出的")
        //1.获取购物车需要展示的信息
        //这里用Vuex保存购物车的信息,共享信息,在store文件夹
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        this.$store.dispatch('addCart',product).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }

</style>
