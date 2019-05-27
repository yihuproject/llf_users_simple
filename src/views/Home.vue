<template>
  <div class="home">
    <input v-model="name" placeholder="请输诗名">
    <input @click="queryInfo" value="查询" type="button">
    <div class="info" v-for="(item,index) in info" :key="index">
      <div class="title">{{item.title}}</div>
      <div class="content">{{item.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      name: "悯农",
      info: []
    };
  },
  mounted() {
    this.queryInfo();
  },
  methods: {
    queryInfo() {
      this.$http.get("searchPoetry", { name: this.name }, res => {
        this.info = res.result;
      });
    }
  }
};
</script>
<style lang="less">
.info {
  padding: 20px;
  margin: 20px;
  background-color: coral;
  color: #fff;
  border-radius: 5px;
}
</style>

