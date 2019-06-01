<template>
  <div class="license">
    <van-nav-bar  title= "营业执照" left-arrow @click-left= "onClickLeft" />
    <h1>是第三方士大夫</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    },
    methods: {
      onClickLeft() {
        this.$router.push('/business');
      }
    },
  }
</script>

<style>
</style>
