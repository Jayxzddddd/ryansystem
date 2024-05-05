<template>
  <div>
    <el-container>
      <el-header class="header">
        <h4>管理员后台管理页面</h4>
        <el-link v-show="!isLogin" href='#/test' type="Danger">登录</el-link>
        <div v-show="isLogin" >
          {{username}}
          <!--          <el-button type="warning" style="height: 100%">{{ username }}</el-button>-->
          <el-button type="primary" style="height: 100%" @click="logout">登出</el-button>
        </div>

      </el-header>

      <el-container>
        <el-aside width="200px">

          <el-menu class="el-menu-vertical-demo"
                   @select="menuItemClick">

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户详细信息管理</span>
              </template>
              <el-menu-item index="/userShowMessage">用户详细信息</el-menu-item>

            </el-submenu>


            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-star-off"></i>
                <span>用户登录信息管理</span>
              </template>
              <el-menu-item index="/userManager">用户登录信息修改</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>留言板管理</span>
              </template>
              <el-menu-item index="/BoardManager">评论管理</el-menu-item>
            </el-submenu>

          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
export default {
  name: "MangerVue",
  data(){
    return{
      user:{},
      username:"",
      isLogin:true
    }
  },
  methods:{
    menuItemClick(index){
      this.$router.push(index);
    },
    logout() {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userId');
      window.localStorage.removeItem('username');
      this.$router.push('/test')
      window.location.reload();
      //this.$router.push('/test')
    },
  },
  created() {
    this.username = window.localStorage.getItem('username');
    let token = window.localStorage.getItem('token')
    if(token!=null && token!=''){
      this.isLogin = true;
    }

  }
}
</script>

<style scoped>
.header{
  background-color: #409EFF;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
}
h4{
  color: white;
  font-family: "微软雅黑";
}

</style>