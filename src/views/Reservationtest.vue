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
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.message}}</p>
              </el-card>
            </el-timeline-item>
          </div>
          <div v-else>
            <el-timeline-item placement="top">
              <el-card class="el-card-m" style="height:120px">
                <h4>大黄子：</h4>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 说点什么吧😁</p>
              </el-card>
            </el-timeline-item>
          </div>
        </el-timeline>
      </div>
      <div class="el-card-messages">
        留言人:<el-input type="textarea" :rows="5" placeholder="输入留言" maxlength="200" v-model="board.maker"></el-input>
        留言内容:<el-input type="textarea" :rows="5" placeholder="输入留言" maxlength="200" v-model="board.message"></el-input>
        {{this.board}}
        <el-button type="info" round class="submit-message" @click="submitMessage">留言</el-button>
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "Reservationtest",
  data(){
    return {
      //allmessages:[{memberName:'1',createTime:'10.10',content:'666'},{memberName:'2',createTime:'10.10',content:'666'}],
      allmessages:[],
      board:{}

    };
  },
  methods: {
    submitMessage() {
      // if (this.message == '' || this.message.replace(/(^\s*)|(\s*$)/g, "") == "") {
      //   this.$message('写点啥提交也行呀😉');
      //   return;
      // }
      // else {
        this.$axios.post('http://localhost:8089/ryansystemserver/board/addBoard',this.board,{
          headers:{
            'token':window.localStorage.getItem('token')
          }
        }).then(res=>{
          if(res.data.code == 200){
            this.board = res.data.dataobject;
            this.findAll();
            this.board={};
          }
        }).catch(err=>console.log(err));
      //  这里往下写调用后端的代码；
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
    this.findAll();
  }

}
</script>

<style scoped>
  .infinite-list-wrapper{
    width: 100%;
    height: 450px;
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