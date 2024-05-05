<template>
  <div>
    <template>
      <el-carousel :interval="4000" type="card" height="500px">
        <el-carousel-item v-for="item in carouseData" :key="item.url">
          <img :src="item.url"  @click="handle(item.index)"/>
        </el-carousel-item>
      </el-carousel>

    </template>
  </div>

</template>


<script>
export default {
  name: "GamingHome",
  data(){
    return {
      url1:'C:\\Users\\10518\\Desktop\\1.jpg',
      carouseData: [
        { url: require("../image/羊了个羊card背景图.jpg"),index:"/YLGYGaming" },
        { url: require("../image/golden.jpg"),index:"/goldenGaming" },
        { url: require("../image/TCSBG.jpg"),index:"/tCSGaming"}
      ],
    };
  },
  methods:{
    handle(index){
      this.$router.push(index);
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>