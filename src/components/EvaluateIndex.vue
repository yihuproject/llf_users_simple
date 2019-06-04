<template>
  <div class="evaluate">
    <div class="evaluate_header">
      <van-row class="evaluate_rate">
        <van-col :span="3" :offset="1" class="evaluate_rate_business">
          <span class="evaluate_rate_b_rate">4.6</span>
          <span class="evaluate_rate_b_text">商家评分</span>
        </van-col>
        <van-col  :span="16" :offset="1" class="evaluate_rate_style">
          <van-row>
            <van-col class="evaluate_rate_style_text"  :span="6">口味</van-col>
            <van-col class="evaluate_rate_style_rate"  :span="12">
              <van-rate v-model="tmsg.pingfen.kouwei" :size="5" color="rgba(255,133,60,1)" void-icon="star" void-color="#e5e5e5" readonly/>
            </van-col>
            <van-col  class="evaluate_rate_style_text"  :span="6">{{tmsg.pingfen.kouwei}}</van-col>
          </van-row>
          <van-row>
            <van-col :span="6"  class="evaluate_rate_style_text">包装</van-col>
            <van-col :span="12"  class="evaluate_rate_style_rate">
              <van-rate v-model="tmsg.pingfen.baozhuang" :size="5" color="rgba(255,133,60,1)" void-icon="star" void-color="#e5e5e5" readonly/>
            </van-col>
            <van-col :span="6"  class="evaluate_rate_style_text">{{tmsg.pingfen.baozhuang}}</van-col>
          </van-row>
        </van-col>
        <van-col  :span="3" class="evaluate_rate_delivery">
          <span class="evaluate_rate_b_rate">{{tmsg.pingfen.peisong}}</span>
          <span class="evaluate_rate_b_text">配送评分</span>
        </van-col>
      </van-row>
   <van-row class="evaluate_card">
        <van-row class="evaluate_card_items">
          <router-link :to="{path:'/evaluate/'+member_id+'/evaluateall'}">
            <van-col :span='6'  class="evaluate_card__item">
              全部({{tmsg.comment.all}})
            </van-col>
          </router-link>
          <router-link :to="{path:'/evaluate/'+member_id+'/evaluates'}">
            <van-col :span='6'  class="evaluate_card__item">
              满意({{tmsg.comment.bumanyi}})
            </van-col>
          </router-link>
          <router-link  :to="{path:'/evaluate/'+member_id+'/evaluateus'}">
            <van-col :span='6'  class="evaluate_card__item">
              不满意({{tmsg.comment.manyi}})
            </van-col>
          </router-link>
          <router-link :to="{path:'/evaluate/'+member_id+'/evaluatehimg'}">
            <van-col :span='6'  class="evaluate_card__item">
              有图({{tmsg.comment.youtu}})
            </van-col>
          </router-link>
        </van-row>
      </van-row>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        member_id:this.$route.params.store_id,
        tmsg:{
          comment:{
            all: 0,
            bumanyi: 0,
            list: [
              {}
            ],
            manyi: 0,
            youtu: 0
          },
          pingfen:{
            baozhuang:0,
            kouwei:0,
            peisong:0
          }
        }
      }
    },
    created () {
        var formData = new FormData();
        formData.append("store_id",this.$route.params.store_id);
        formData.append("type",1);//type:1、2、3、4
        this.$axios.post("/u1/all_comment",formData,JSON.stringify({headers: {"Content-Type":"application/json"}}))
        .then((data)=>{
          console.log(data);
          console.log(this.$route.params.store_id);
          if (data.data.code == 200) {
            this.tmsg = data.data.data;
          }
        })
        .catch((err)=>{
        	console.log(err);
        })
    }
  }
</script>

<style lang="stylus">
  .evaluate
    width: 10rem
    height: auto
    background:#e5e5e5
    position:relative
    padding-top: 310px
    .evaluate_header
      width: 10rem
      height: auto
      background:#fff
      position:fixed
      top: 0
      left: 0
      z-index:12
      .evaluate_rate
        width: 10rem
        height: 167px
        background:#fff
        .evaluate_rate_business
          width:130px
          padding-top:60px
          line-height: 40px
          .evaluate_rate_b_rate
            width:130px
            font-size:30PX
            font-weight:bold
            color:rgba(255,74,74,1)
            display:inline-block
          .evaluate_rate_b_text
            width:130px
            font-size:13PX
            font-weight:500
            color:rgba(102,102,102,1)
            display:inline-block
        .evaluate_rate_style
          width:420px
          height:167px
          padding-top:48px
          .van-row:last-child
            margin-top:10px
          .van-row
            .evaluate_rate_style_rate
              display:inline-block
              width:190px
              line-height:40px
              font-size:13PX
              font-weight:500
              color:rgba(102,102,102,1)
            .evaluate_rate_style_text
              display:inline-block
              width:70px
              line-height:40px
              font-size:13PX
              font-weight:500
              color:rgba(102,102,102,1)
        .evaluate_rate_delivery
          width:130px
          padding-top:60px
          line-height: 40px
          .evaluate_rate_b_rate
            display:inline-block
            width:130px
            font-size:21PX
            font-weight:bold
            color:rgba(255,74,74,1)
          .evaluate_rate_b_text
            display:inline-block
            width:130px
            font-size:13PX
            font-weight:500
            color:rgba(102,102,102,1)
      .evaluate_card
        margin-top: 30px
        background:#fff
        width: 10rem
        .evaluate_card_items
          height: 120px
          box-sizing:border-box
          border-bottom:1PX solid #e5e5e5
          .evaluate_card__item:first-child
            margin-left: 25px
          .evaluate_card__item
            font-size:12PX
            display:inline-block
            width: 155px
            text-align:center
            height: 60px
            line-height: 60px
            margin-top: 30px
            background:#e5e5e5
            color:#666
          .router-link-exact-active.router-link-active>.evaluate_card__item
            background:#FFBA17
            color:#fff
</style>
