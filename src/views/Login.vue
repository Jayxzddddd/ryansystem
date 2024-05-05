<template>
  <div>
    <div>
      <el-card class="bg"  style="width: 461px;background-color: #55585a;transform: translateX(-8px) translateY(-4.6px)">
        <div slot="header">
          <div class="avatar-box">
            <img src="../image/头像.jpg" alt="" style="width: 100%;border-radius: 50%;height:100%">
          </div>
        </div>

        <table>
          <tr>
            <td class="fontcolor el-icon-user-solid">用户账号:</td>
            <td>
              <el-input
                  v-model="user.username"
                  placeholder="请输入用户名"
              ></el-input>
            </td>
          </tr>
          <div style="margin-bottom: 30px">
<!--              账号密码输入区域分隔开-->
          </div>

          <tr>
            <td class="fontcolor el-icon-lock">用户密码:</td>
            <td>
              <el-input
                  type="password"
                  v-model="user.password"
                  placeholder="请输入密码"
                  @keydown.enter.native="Login"
              ></el-input>
            </td>

          </tr>

          <div style="margin-bottom: 30px">
            <!--              输入区域和按钮区域分隔开-->
          </div>

          <tr>
            <td colspan="4">
              <el-button style="width: 400px" type="primary" @click="Login"  class="el-icon-s-custom">登录</el-button>
            </td>
          </tr>


        </table>


      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      userList:{}
    };
  },
  methods: {
    Login() {
      if (Object.keys(this.user.username).length === 0 || Object.keys(this.user.password).length === 0) {
        alert("请输入用户名和密码");
      } else {
        this.$axios.post('http://localhost:8089/ryansystemserver/user/login', this.user).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("userId", res.data.userId);
            window.localStorage.setItem("username", res.data.username);
            this.$router.push('/GamingHome');
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        }).catch(err => console.log(err));
      }
    }
  }
};
</script>

<style scoped>
.bg{
  background:url("../image/登录背景图1.jpg");
  position:fixed;
  margin-top: -10px;/*上边距*/
  margin-left: -8px;/*左边距*/
  background-size:100% 100%;

}
/*头像*/
.avatar-box{
  margin: 0 auto;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #409eff;
  box-shadow: 0 0 10px #409eff;
  position: relative;
  display: flex;justify-content: center;align-items: center;

}

.fontcolor{
  color: azure;
  font-size: 18px;
}


</style>
