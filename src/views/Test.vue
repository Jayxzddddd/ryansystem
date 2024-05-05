<template>
  <div  class="bg">
    <div style="display: flex;justify-content: center;height: 30vh;transform: translateY(260px);">
      <el-tabs type="border-card" stretch style="width: 461px" >
        <el-tab-pane>
          <span slot="label"><i class="el-icon-s-custom"></i>用户登录</span>
          <Login></Login>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label"><i class="el-icon-user"></i>用户注册</span>
          <ManagerRegister></ManagerRegister>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label"><i class="el-icon-info"></i>管理员登录</span>
          <MangerLogin></MangerLogin>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>


<script>
import Login from "@/views/Login";
import MangerLogin from "@/views/MangerLogin";
import ManagerRegister from "@/views/ManagerRegister";

export default {
  name: "Test",
  data(){
    return{
      labelPosition: 'right',
    }
  },
  components:{
    Login,
    MangerLogin,
    ManagerRegister
  },
  methods:{

  },
  created() {

  }
}

</script>

<style scoped>
/*主页大背景*/
.bg{
  background:url("../image/大背景123.jpg");
  width: 100%;
  height: 100%;
  position:fixed;
  margin-top: -10px;/*上边距*/
  margin-left: -8px;/*左边距*/
  background-size:100% 100%;
}
/*//tabs小背景*/
/deep/.el-tabs--border-card {
  background: none;
  border: none;
  box-shadow: none;
}

/deep/ .el-card {
  border-radius: 4px;
  border: none!important;
  /*border: 1px solid #409eff !important; 当样式出现横线的时候表示他被更高级权重的地方覆盖了所以需要进行强制设置*/
  background-color: #FFFFFF;
  overflow: hidden;
  color: #303133;
  transition: .3s;
}


</style>