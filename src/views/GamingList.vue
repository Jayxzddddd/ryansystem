<template>
  <div>
    <el-container>
      <el-header class="header">
        <h4>游戏游玩页面</h4>
        <el-link v-show="!isLogin" href='#/test' type="Danger">登录</el-link>
        <div v-show="isLogin">
          <el-button style="height: 100%" type="warning">{{username}}</el-button>
          <el-button style="height: 100%" type="success" @click="logout">退出登录</el-button>
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px">

          <el-menu class="el-menu-vertical-demo"
                   @select="menuItemClick">


            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-star-off"></i>
                <span>游戏主页</span>
              </template>
              <el-menu-item index="/gamingHome">游戏首页</el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>游戏选择页面</span>
              </template>
              <el-menu-item index="/YLGYGaming">羊了个羊游戏</el-menu-item>
              <el-menu-item index="/goldenGaming">金子收集游戏</el-menu-item>
              <el-menu-item index="/tCSGaming">贪吃蛇游戏</el-menu-item>
            </el-submenu>



            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>游戏评价页面</span>
              </template>
              <el-menu-item index="/reservationtest">留言版页面</el-menu-item>
            </el-submenu>



            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-info"></i>
                <span>个人中心页面</span>
              </template>
              <el-menu-item index="/userPersonCenter">个人信息展示</el-menu-item>
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
  name: "GamingList",
  data(){
    return{
      isLogin:false,
      username:''
    }
  },
  methods:{
    menuItemClick(index){
      this.$router.push(index);
    },
    logout(){
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userId');
      window.localStorage.removeItem('username');
      this.$router.push('/test')
      window.location.reload();
    }
  },
  created() {
    this.username = window.localStorage.getItem('username');
    let token = window.localStorage.getItem('token');
    if(token!=null && token!=''){
      this.isLogin = true;
    }
  }
}
</script>

<style scoped>
.header{
  background-color: #67C23A;
  display: flex;
  justify-content: space-between;
}
h4{
  color: white;
  font-family: "微软雅黑";
}

</style>