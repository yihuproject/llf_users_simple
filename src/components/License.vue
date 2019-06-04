<template>
  <div class="license">
    <van-nav-bar  title= "营业执照" left-arrow @click-left= "onClickLeft" />
    <van-row class="license_title">
      <van-col :span="22">
        商家资质信息公示
      </van-col>
    </van-row>
    <van-row class="license_img">
      <van-col>
        <img :src="img1">
      </van-col>
      <van-col>
        <img :src="img2">
      </van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        img1:this.$route.query.logo_img,
        img2:this.$route.query.face_img
      }
    },
    methods: {
      onClickLeft() {
        this.$router.push('/business/'+this.$route.query.store_id);
      }
    },
  }
</script>

<style scoped lang="stylus">
  .license
    width: 10rem
    background:#e5e5e5
    height: 100vh
    .license_title
      height: 88px
      line-height: 88px
      .van-col
        padding-left: 30px
        font-size:14PX
    .license_img
      background:#fff
      display:flex
      flex-flow:row wrap
      justify-content:space-around
      .van-col
        width: 300px
        height: 300px
        background:#000
        margin: 40px 0
        img
          width: 300px
          height: 300px
          background:#000
</style>
