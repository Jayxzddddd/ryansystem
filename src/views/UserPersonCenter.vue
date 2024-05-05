<template>
  <div>
    用户名:{{loginUser.username}}<br>
    手机号:{{loginUser.phone}}<br>
    邮箱:{{loginUser.email}}<br>
  </div>

</template>

<script>
export default {
  name: "UserPersonCenter",
  data(){
    return{
      loginUser:{}
    }
  },
  methods:{

  },
  created() {
    this.$axios.get('http://localhost:8089/ryansystemserver/user/getUserInfo',{
      headers:{
        'token':window.localStorage.getItem('token')
      }
    }).then(res=>{
      if(res.data.code == 200){
        this.loginUser = res.data.dataobject;
      }else{
        this.$message({
          message:res.data.msg,
          type:'warning'
        })
      }
    })
  }
}
</script>

<style scoped>

</style>