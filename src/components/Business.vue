<template>
  <div class="business">
    <van-row class="business_title">
      <van-col class="business_title_col" :span="23" :offset="1">
        商家信息
      </van-col>
    </van-row>
    <van-row class="business_store_img">
      <van-col :span="23" offset="1">
        <img :src="totalData.face_img" alt="">
        <img :src="totalData.logo_img" alt="">
      </van-col>
    </van-row>
    <van-row class="business_store_contact">
      <van-col :span="22" offset="1">
        <p class="business_store_contact_address">{{totalData.area_info}}</p>
        <span class="business_store_contact_icon"><img src="http://47.111.27.189:88/users/static/images/order_ic_dianhua.png" alt=""></span>
      </van-col>
    </van-row>
    <van-row class="business_detail_info">
      <van-col :span="24">
        <van-row class="business_detail_info_name">
          <van-col :span="23" :offset="1">
            <span class="left">商家名称</span>
            <span class="right">{{totalData.store_name}}</span>
          </van-col>
        </van-row>
        <van-row class="business_detail_info_classify">
          <van-col :span="23" :offset="1">
            <span class="left">商家分类</span>
            <span class="right">{{totalData.sc_name}}</span>
          </van-col>
        </van-row>
        <van-row class="business_detail_info_tel">
          <van-col :span="23" :offset="1">
            <span class="left">商家电话</span>
            <span class="right">{{totalData.store_phone}}</span>
          </van-col>
        </van-row>
        <van-row class="business_detail_info_open_time">
          <van-col :span="23" :offset="1">
            <span class="left">营业时间</span>
            <span class="right">{{totalData.work_start_time}}-{{totalData.work_end_time}}</span>
          </van-col>
        </van-row>
        <van-row class="business_detail_info_img">
          <van-col :span="23" :offset="1">
            <span class="left">营业执照</span>
            <span class="right">
              <router-link :to="{path:'/license',query:{store_id:store_id,logo_img:logo_img,face_img:face_img}}"><van-icon name="arrow"></van-icon></router-link>
            </span>
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
        totalData:"a",
        store_id:this.$route.params.store_id,
        logo_img:"",
        face_img:""
      }
    },
    created () {
      var formData = new FormData();
      formData.append("store_id",this.$route.params.store_id);
      this.$axios.post("/u1/storeinfo",formData,JSON.stringify({headers: {"Content-Type":"application/json"}}))
      .then((data)=>{
        console.log(data);
        if (data.data.code == 200) {
          this.totalData = data.data.data;
          this.face_img = data.data.data.face_img;
          this.logo_img = data.data.data.logo_img;
        }
      })
      .catch((err)=>{
        console.log(err);
      })
      
      
      
      
    }
  }
</script>

<style lang="stylus">
  .business
    width: 10rem
    height: auto
    background:#e5e5e5
    .business_title
      background:#fff
      padding:15px 0
      .business_title_col
        font-size:17PX
        font-weight:bold
        color:rgba(0,0,0,1)
    .business_store_img
      background:#fff
      padding:15px 0
      .van-col
        img
          width: 182px
          height: 182px
          margin-right: 30px
    .business_store_contact
      background:#fff
      padding:15px 0
      .business_store_contact_address
        font-size:14PX
        color:#666
        width: 650px
        overflow:hidden
        float: left
      .business_store_contact_icon:after
        content:""
        display:table
        clear:both
      .business_store_contact_icon
        display:inline-block
        width: 36px
        height: 36px
        float: left
        img
          width: 36px
          height: 36px
    .business_detail_info
      margin-top: 30px
      background:#fff
      .business_detail_info_name,.business_detail_info_classify,.business_detail_info_tel,.business_detail_info_open_time,.business_detail_info_img
        .van-col
          height: 88px
          line-height: 88px
          border-bottom:1PX solid #e5e5e5
          font-size:18PX
          display:flex
          flex-flow:row nowrap
          justify-content:space-between
          align-items:center
          .left,.right
            display:inline-block
            height: 88px
            line-height: 88px
          .left
            color:#333
          .right
            color:#666
            margin-right: 30px
            i
              display:inline-block
              height: 88px
              line-height: 88px
              color:#666
</style>
