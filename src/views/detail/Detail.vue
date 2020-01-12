<template>
  <div id="detail">
    <detail-navbar></detail-navbar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
  import Scroll  from "../../components/common/scroll/Scroll";
  import DetailNavbar from "./childComps/DetailNavbar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import {getDetail, Goods, Shop, GoodsParam} from "../../network/detail";

  export default {
    name: "Detail",
    components: {
      DetailShopInfo,
      DetailSwiper,
      DetailNavbar,
      DetailBaseInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
      }
    },
    created() {
      //保存传进来的IID
      this.iid = this.$route.params.iid
      console.log(getDetail(this.iid))
      //根据iid请求数据
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.data.result;
        console.log(data)
        this.topImages = res.data.result.itemInfo.topImages

        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //获取店铺信息
        this.shop = new Shop(data.shopInfo)

        //保存商品的详情数据
        this.detailInfo = data.detailInfo;

        //获取商品的参数新需
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      })

    },
    methods: {
      imageLoad() {
        //在这里刷新，要在上面的scroll加上ref
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  .content {
    /*不能写死，应该赢定位或者下面动态计算*/
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }
</style>
