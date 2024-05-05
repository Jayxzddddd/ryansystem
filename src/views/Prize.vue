<template>
  <div>
    <el-row :gutter="20">
      <el-col v-for="(item,index) in prizeList" :key="index" :span="8">
        <el-card  shadow="always" style="position:relative;" :body-style="{ padding: '0px' }">
          <el-image class="ImageStyle" :src=item.url></el-image>
          <div style="text-align: center;color: grey">
            <h4>{{item.name}}</h4>
            <p>库存:{{item.number}}</p>
            <el-button round @click="getPrize(item)" >就选它了！</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Prize",
  data(){
    return{
      prizeList:[]
    }
  },
  methods:{
    findAll(){
      this.$axios.get('http://localhost:8089/ryansystemserver/prize/findAll',{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      }).then(res=>{
        this.prizeList = res.data.dataobject;
      }).catch(err=>console.log(err));
    },
    getPrize(item){
      this.$axios.post('http://localhost:8089/ryansystemserver/prize/get',item,{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      }).then(res=>{
        this.$message({
          message:'获取'+item.name+'成功!',
          type:'success'
        });

        this.findAll();
      }).catch(err=>console.log(err));
    }
  },
  created() {
    window.localStorage.getItem('token');
    this.findAll();
  }
}
</script>

<style scoped>
.ImageStyle{
  width: 300px;
  height: 300px;
  margin-left: 50%;
  transform:translateX(-50%);
}
.cardStyle{
  width: 30%;
  text-align: center;
}
</style>