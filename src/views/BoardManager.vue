<template>
  <div>
    <el-card class="el-card-d" shadow="always">
      <div class="infinite-list-wrapper" style="overflow:auto;">
        <el-timeline
            infinite-scroll-disabled="disabled">
          <div v-if="allmessages.length>0">
            <el-timeline-item v-for="(item,index) in allmessages"  :key="index" :timestamp='item.nowtime' placement="top">
              <el-card class="el-card-m" style="height:120px">
                <h4>{{item.maker}}：</h4>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.message}}<el-button class="el-icon-delete"@click="open(item.id)" style="float: right"  type="Border Light"  round/></p>
              </el-card>
            </el-timeline-item>
          </div>
          <div v-else>
            <el-timeline-item placement="top">
              <el-card class="el-card-m" style="height:120px">
                <h4>大黄子：</h4>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 请您先登录哟😁</p>
              </el-card>
            </el-timeline-item>
          </div>
        </el-timeline>
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "BoardManager",
  data(){
    return {
      //allmessages:[{memberName:'1',createTime:'10.10',content:'666'},{memberName:'2',createTime:'10.10',content:'666'}],
      allmessages:[],
      board:{}

    };
  },
  methods: {
      open(id) {
        this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get('http://localhost:8089/ryansystemserver/board/delById?id='+id,{
            headers:{
              'token':window.localStorage.getItem('token')
            }
          }).then(res=>{
            if(res.data.code == 200){
              this.allmessages = res.data.dataobject;
              this.findAll();
            }
          }).catch(err=>console.log(err));
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    findAll(){
      this.$axios.get('http://localhost:8089/ryansystemserver/board/findAll',{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      }).then(res=>{
        if(res.data.code == 200){
          this.allmessages = res.data.dataobject;
        }
      }).catch(err=>console.log(err));
    },
  },
  created() {
    window.localStorage.getItem('token');
    this.findAll();
  }

}
</script>

<style scoped>
.infinite-list-wrapper{
  width: 100%;
  height: 700px;
}
.submit-message{
  width: 100%;
  background: rgb(235, 245, 247);
  color: cadetblue;
  letter-spacing:20px;
}
@media screen and (max-width: 3000px) and (min-width: 767px) {
  .el-card-d{
    float: left;
    margin-top: 20px;
    margin-left: 10%;
    width: 80%;
    height: 90%;
  }

}
/*
屏幕小于768px的
*/
@media screen and (max-width:768px) and (min-width: 100px){
  .el-card-d{
    width: 100%;
    height: 100%;
  }
}

</style>