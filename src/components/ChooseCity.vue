<template>
  <div class= "choosecity">
    <div class= "cc_container">
      <van-nav-bar  title= "选择城市" left-arrow @click-left= "onClickLeft" />
      <van-row class= "cc_container_search">
      	<van-col class= "cc_container_row_col" :span= "22" :offset= "1">
          <div class= "cc_container_row_col_search">
            <img :src= "searchimg">
          </div>
          <input class= "cc_container_row_col_input" type= "text" placeholder= "请输入城市名称或首字母" v-model="keyword">
        </van-col>
      </van-row>
      <van-row  class= "cc_container_location">
        <van-col class= "cc_container_location_lo" :span= "23" :offset= "1">
          <div class= "cc_container_location_lo_icon">
            <img :src= "pointimg">
          </div>
          <span class= "cc_container_location_lo_text">当前定位</span>
        </van-col>
      </van-row>
      <van-row  class= "cc_container_location_d">
        <van-col class= "cc_container_location_d_col" :span= "22" :offset= "2">
          <span class= "cc_container_location_d_col_text">{{city}}</span>
        </van-col>
      </van-row>
    </div>
    <ul class= "area_list_index" v-show="isListShow">
      <li @touchstart="toPoi($event)" v-for= "(li,index) in itemArr" :key="index">{{index}}</li>
    </ul>
    <div class= "area_list">
      <div  v-show="isListShow" class= "area_list_item" ref= "listtitle" v-for= "(item,index) in itemArr" :key="index">
        <div class= "area_list_item_title" :data-index= "index">{{index}}</div>
        <div @click="chooseCityPoi($event)" class= "area_list_item_content" v-for= "con in item">{{con.name}}</div>
      </div>
      <div  v-show="!isListShow" class= "area_list_item" ref= "listtitle">
        <div @click="chooseCityPoi($event)" class= "area_list_item_content"  v-for= "keyArr in searchKeyword">{{keyArr}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'choosecity',
    data () {
      return {
        itemArr:[],
        keyword:"",
        searchKeyword:[],
        originPoi:null,
        isListShow:true,
        city:"",
        searchimg:"http://47.111.27.189:88/static/images/icon_sousuo.png",
        pointimg:"http://47.111.27.189:88/static/images/icon_ic_dingqianwsz.png"
      }
    },
    components: {
    },
    methods: {
      onClickLeft () {//返回链接
        this.$router.push('/return');
      },
      searchCity (keyword) {//搜索城市
        let hasChinese = /.*[\u4e00-\u9fa5]+.*$/.test(keyword); // 是否有中文
        let hasLWord = /^[a-z]/.test(keyword); // 是否有英文
        let hasBWord = /^[A-Z]/.test(keyword); // 是否有英文
        if(hasChinese&&hasLWord&&hasBWord){
         return ; 
        }else if(keyword.length>0&&hasChinese&&!hasLWord&&!hasBWord){ 
          for (var i in this.itemArr) {
            console.log(this.itemArr[i]);
              for (var s of this.itemArr[i]) {
                console.log(s.name);
                if (s.name.indexOf(keyword)>-1) {
                  this.searchKeyword.push(s.name);
                  this.isListShow = false;
                  }else{
                  // this.searchKeyword = "";
                }
              }
            }
        }else if(keyword.length>0&&!hasChinese&&hasLWord&&!hasBWord){
          for (var i in this.itemArr) {
            console.log(this.itemArr[i]);
              for (var s of this.itemArr[i]) {
                console.log(s.pinyin);
                if (s.pinyin.indexOf(keyword)>-1) {
                  this.searchKeyword.push(s.name);
                  this.isListShow = false;
                  }else{
                  // this.searchKeyword = "";
                }
              }
            }
        }else if(keyword.length>0&&!hasChinese&&!hasLWord&&hasBWord){
          for (var i in this.itemArr) {
            console.log(this.itemArr[i]);
              for (var s of this.itemArr[i]) {
                console.log(s.abbr);
                if (s.abbr.indexOf(keyword)>-1) {
                  this.searchKeyword.push(s.name);
                  this.isListShow = false;
                  }else{
                  // this.searchKeyword = "";
                }
              }
            }
        }
        },
      toPoi (e) {//点击跳转
      console.log(e);
      this.originPoi = e.currentTarget.offsetTop;
      document.documentElement.scrollTop = this.originPoi*3;
      },
      chooseCityPoi (e) {//选择城市后的跳转链接
        if(e.target.innerHTML){
          this.$router.push("/choose_c/"+e.target.innerHTML);
          this.city = this.$route.params.city;
        }
      },
      scroll () {//滑动的时候的监听事件
        this.$nextTick(function(){
           let scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        })
      }
    },
    watch: {
      keyword(newValue, oldValue) {
        if(newValue.length>oldValue.length){
          this.isListShow = false;
          this.searchKeyword = [];
          this.searchCity(newValue);
        }else if(newValue.length<oldValue.length){
          this.isListShow = false;
          this.searchKeyword = [];
          this.searchCity(newValue);
        }else{
          this.isListShow = true;
          this.searchKeyword = [];
        }
      }
    },
    mounted () {
      this.city = this.$route.params.city;
      window.addEventListener('scroll', this.scroll)
      this.$axios.post("/u1/area_list")
      .then((data)=>{
        if (data.data.code == 200) {
          this.itemArr = data.data.data;
          console.log(this.itemArr);
        }
      })
      .catch((err)=>{
      	this.$toast("请求失败");
      	console.log(err);
      })
    }
  }
</script>

<style lang= "stylus">
.choosecity
  width: 10rem
  .cc_container
    width: 10rem
    height: 350px
    position:fixed
    top: 0
    left: 0
    z-index:10
    background:#fff
    .cc_container_search
      height: 88px
      border-bottom:1PX solid #e5e5e5
      .cc_container_row_col
        height: 66px
        margin-top: 11px
        position:relative
        font-size:14PX
        .cc_container_row_col_input::-webkit-input-placeholder
          text-align:center
          font-size:14PX
          color:#999
        .cc_container_row_col_input
          width: 100%
          height: 66px
          border-radius:33px
          background:#e5e5e5
          text-align:center
        .cc_container_row_col_search
          position:absolute
          top: 21px
          left: 160px
          img
            width: 24px
            height: 24px
    .cc_container_location
      padding: 24px 0
      .cc_container_location_lo
        display:flex
        flex-flow:row nowrap
        .cc_container_location_lo_icon
          width: 26px
          height: 35px
          img
            width: 26px
            height: 26px
            margin-top: 9px
        .cc_container_location_lo_text
          color:#808080
          font-size: 14PX
          margin-left: 9px
    .cc_container_location_d
      .cc_container_location_d_col
        .cc_container_location_d_col_text
          display:inline-block
          width: 140px
          text-align:center
          height: 60px
          line-height: 60px
          border:1PX solid rgba(255,186,23,1)
          border-radius:4px
          color:#FFBA17
          font-size: 17PX
  .area_list_index
    width: 0.8rem
    text-align:center
    height: auto
    position:fixed
    right: 0
    top: 455px
    z-index:10
    li
      color:orange
      margin-top: 10px
    li.active
      background:orange
      color:#fff
  .area_list
    width: 10rem
    height: auto
    margin-top: 350px
    .area_list_item
      width: 10rem
      height: auto
      .area_list_item_title
        width:9.2rem
        height:80px
        line-height: 80px
        padding:0 30px
        background:#e5e5e5
        position:relative
      .area_list_item_content:last-child
        border:none
      .area_list_item_content
        width:9.2rem
        height:88px
        line-height: 88px
        background:#fff
        margin:0 30px
        border-bottom:1PX solid #e5e5e5
        box-sizing:border-box
   .area_list_item.active
      .area_list_item_title
        position:fixed
        top: 340px
        left: 0
        z-index:12
</style>
