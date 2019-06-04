<template>
  <div class="detail">
    <van-row class="product_banner">
      <van-col :span="24">
        <img :src="totalData.goods_info.goods_image">
      </van-col>
    </van-row>
    <van-row class="product_detail">
      <van-col :span="22" :offset="1">
        <van-row class="product_detail_title">
          <van-col :span="24">
            {{totalData.goods_info.goods_name}}
          </van-col>
        </van-row>
        <van-row class="product_detail_detail">
          <van-col :span="4">
            月售{{totalData.goods_info.goods_salenum}}
          </van-col>
          <van-col :span="1">|</van-col>
          <van-col :span="4">
            点赞{{totalData.goods_info.zan}}
          </van-col>
        </van-row>
        <van-row class="product_detail_price">
          <van-col class="product_detail_price_realprice" :span="4">
            {{totalData.goods_info.goods_price}}
          </van-col>
          <van-col class="product_detail_price_p" :span="4">
            {{totalData.goods_info.goods_marketprice}}
          </van-col>
          <van-col class="product_detail_price_discount" :span="4">
            {{realdiscount}}
          </van-col>
          <van-col class="product_detail_price_add" :span="2" :offset="10">
            <router-link to="/add">+</router-link>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
    <van-row class="product_describe">
      <van-col :span="22" :offset="1">
        <van-row>
          <van-col class="product_describe_title" :span="24">
            商品详情
          </van-col>
        </van-row>
        <van-row>
          <van-col class="product_describe_more" :span="24">
            暂无商品信息
          </van-col>
        </van-row>
      </van-col>
    </van-row>
    <van-row class="product_valuate">
      <van-col :span="23" :offset="1">
        <van-row class="product_valuate_title">
          <van-col :span="24">商品评价</van-col>
        </van-row>
        <van-row class="product_valuate_items" v-for="(item,index) in totalData.com_info">
          <van-col :span="24">
            <van-row>
              <van-col class="product_valuate_items_img" :span="4">
                <img :src="item.member_avatar">
              </van-col>
              <van-col class="product_valuate_items_info" :span="14" :offset="1">
                <p class="product_valuate_items_info_title">{{item.member_name}}</p>
                <p class="product_valuate_items_info_thumb_up">
                  <img src="http://47.111.27.189:88/users/static/images/pingjia_ic_dianz.png" v-show="item.is_zan==1">
                  <img class="thumb_up_false" src="http://47.111.27.189:88/users/static/images/pingjia_ic_dianz1.png" v-show="item.is_zan==0">
                  <i v-show="item.is_zan==1">赞了该商品</i>
                </p>
              </van-col>
              <van-col class="product_valuate_items_time" :span="5">
                {{item.geval_addtime}}
              </van-col>
            </van-row>
            <van-row>
              <van-col class="product_valuate_items_content" :span="20" :offset="3">
                {{item.geval_content}}
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        totalData:{
          cart:"",
          goods_info: {
            describe: "",
            goods_id: "",
            goods_image: "",
            goods_marketprice: "",
            goods_name: "",
            goods_price: "",
            goods_salenum: "",
            zan: ""
          }
        },
        realdiscount:"a",
      }
    },
    created () {
       var formData = new FormData();
       formData.append("store_id",this.$route.params.store_id);
       formData.append("goods_id",this.$route.params.goods_id);
       formData.append("member_id",this.$route.params.member_id);
       this.$axios.post("/u1/goods_detail",formData)
       .then((data)=>{
       	console.log(data);
        if (data.data.code == 200) {
          this.totalData = data.data.data;
          console.log(data);
          var a = (this.totalData.goods_info.goods_price/this.totalData.goods_info.goods_marketprice)*10;
          this.realdiscount = a.toFixed(1)+"折";
        }
       })
       .catch((err)=>{
       	console.log(err);
       })
      
    }
  }
</script>

<style scoped lang="stylus">
  .detail
    width: 10rem
    height: auto
    background:#e5e5e5
    .product_banner
      width: 100%
      background:#fff
      img
        width: 100%
        height: 460px
    .product_detail
      background:#fff
      padding-top:30px
      .product_detail_title
        color:#333
        font-size:17PX
        font-weight:bold
        color:rgba(0,0,0,1)
        padding-bottom: 22px
      .product_detail_detail
        color:#999
        line-height: 33px
        padding-bottom: 22px
        text-align:center
      .product_detail_price
        line-height: 33px
        padding-bottom: 22px
        text-align:left
        .product_detail_price_realprice
          font-weight: bold
          font-size:16PX
          color:#FF4A4A
        .product_detail_price_p
          color:#999
          text-decoration:line-through
          font-size:15PX
        .product_detail_price_discount
          font-size:15PX
          color:#FF4A4A
        .product_detail_price_add
          background:orange
          width: 34px
          text-align:center
          height: 34px
          line-height: 34px
          font-size:20PX
          border-radius:50%
          a
            color:#fff
    .product_describe
      background:#fff
      line-height: 50px
      margin: 30px 0
      padding: 15px 0
      .product_describe_title
        color:#333
        font-weight: bold
        font-size:17PX
      .product_describe_more
        color:#999
        font-size:15PX
    .product_valuate
      background:#fff
      margin-bottom: 30px
      .product_valuate_title
        color:#333
        font-weight: bold
        font-size:17PX
        margin: 15px 0
      .product_valuate_items
        width: 100%
        height: auto
        padding: 30px 0
        border-bottom:1PX solid #e5e5e5
        .product_valuate_items_img
          width: 66px
          height: 66px
          border-radius:50%
          overflow:hidden
          margin-top: 8px
          img
            width: 66px
            height: 66px
        .product_valuate_items_info
          line-height: 40px
          .product_valuate_items_info_title
            color:#333
            font-size:15PX
          .product_valuate_items_info_thumb_up
            color:#999
            font-size:12PX
            img
              width: 24px
              height: 24px
            img.thumb_up_false
              margin-top: 10px
        .product_valuate_items_time
          color:#999
          text-align:right
          font-size:14PX
          margin-left: 30px
        .product_valuate_items_content
          font-size:15PX
          color:#333
          text-align:justify
          line-height: 41px
</style>
