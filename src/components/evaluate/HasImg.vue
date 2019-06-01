<template>
  <div class="unsatisfied">
    <div class="unsatisfied_list">
      <div class="unsatisfied_list_items" v-for="li in totalData">
        <van-row class="unsatisfied_list_top">
          <van-col :span="5" class="unsatisfied_list_portrait">
            <img :src="li.member_avator">
          </van-col>
          <van-col :span="14" class="unsatisfied_list_evaluate">
            <span class="unsatisfied_list_evaluate_text">{{li.member_name}}</span>
            <span class="unsatisfied_list_evaluate_rate">
              <van-rate :size="5" v-model="li.haoping" color="rgba(255,133,60,1)" void-icon="star" void-color="#e5e5e5" readonly/>
              <i>满意</i>
            </span>
          </van-col>
          <van-col :span="5" class="unsatisfied_list_time">
            {{li.add_time}}
          </van-col>
        </van-row>
        <van-row class="unsatisfied_list_bottom">
          <van-col :span="24" class="unsatisfied_list_bottom_rol">
            <van-row class="unsatisfied_list_bottom_rol_text">
              <van-col :span="24" class="unsatisfied_list_bottom_rol_text_col">
                {{li.content}}
              </van-col>
            </van-row>
            <van-row  class="unsatisfied_list_bottom_rol_img">
              <van-col :span="24">
                <img :src="liArr" v-for="liArr in li.images">
              </van-col>
            </van-row>
            <van-row class="unsatisfied_list_bottom_rol_evaluate">
              <van-col class="unsatisfied_list_bottom_rol_evaluate_col"  :span="24">
                {{li.business}}
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        totalData:"a",
        
      }
    },
    mounted () {
      var formData = new FormData();
      formData.append("store_id",this.$parent.store_id);
      formData.append("type",4);//type:1、2、3、4
      this.$axios.post("/u1/all_comment",formData,JSON.stringify({headers: {"Content-Type":"application/json"}}))
      .then((data)=>{
        console.log(data);
        if (data.data.code == 200) {
          this.totalData = data.data.data.comment.list;
          console.log(this.totalData);
        }
      })
      .catch((err)=>{
      	console.log(err);
      })
    }
  }
</script>

<style scoped lang="stylus">
  .unsatisfied
    width: 10rem
    height: auto
    background:#fff
    .unsatisfied_list
      width: 10rem
      height: auto
      background:#fff
      .unsatisfied_list_items
        width: 19.2rem
        height: auto
        padding-top: 50px
        .unsatisfied_list_top
          height: 110px
          margin-left: 30px
          .unsatisfied_list_portrait
            width: 66px
            height: 66px
            border-raius:50%
            overflow:hidden
            img
              width: 66px
              height: 66px
          .unsatisfied_list_evaluate
            width:470px
            height: 66px
            font-size:15PX
            font-weight:500
            color:rgba(51,51,51,1)
            margin-left: 15px
            .unsatisfied_list_evaluate_text
              display:inline-block
              width:500px
              height: 40px
              line-height: 40px
              overflow:hidden
              font-size:15PX
              font-weight:500
              color:rgba(51,51,51,1)
            .unsatisfied_list_evaluate_rate
              width:250px
              display:flex
              flex-flow:row nowrap
              justify-content:space-between
              i
                color:#FF853C
                font-size:12PX
                display:inline-block
                height: 66px
          .unsatisfied_list_time
            font-size:14PX
            color:#999
        .unsatisfied_list_bottom
          margin-left: 30px
          padding-bottom: 30px
          border-bottom:1PX solid #e5e5e5
          .unsatisfied_list_bottom_rol
            width: auto
            margin-left: 80px
            .unsatisfied_list_bottom_rol_text
              .unsatisfied_list_bottom_rol_text_col
                width: 8.2rem
                font-size:16PX
                color:#333
            .unsatisfied_list_bottom_rol_img
              width:615px
              height: auto
              margin-top: 20px
              img
                width: 164px
                height: 164px
                margin: 10px 0
                margin-right: 10px
            .unsatisfied_list_bottom_rol_evaluate
              width:610px
              height: auto
              position:relative
              .unsatisfied_list_bottom_rol_evaluate_col
                background:#e5e5e5
                width:100%
                text-align:left
                min-height:160px
                color:rgba(102,102,102,1)
                line-height:40px
                font-size:13PX
                padding:10px 30px
            .unsatisfied_list_bottom_rol_evaluate:after
              position:absolute
              top: -30px
              left: 30px
              border:20px solid transparent
              border-bottom-color:#e5e5e5
              
</style>
