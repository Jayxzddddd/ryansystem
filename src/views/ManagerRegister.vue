<template>
  <div class="bgset">
    <div>
      <img src="../image/管理员注册头像.png" class="touxiang">
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="用户账号:"  prop="username">
        <el-input  v-model.number="ruleForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>


      <el-form-item label="用户密码:" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item label="确认密码:" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请输入确认密码"  @keydown.enter.native="submitForm('ruleForm')"></el-input>
      </el-form-item>

      <el-form-item>
        <div class="nobrdiv">
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </div>

        <div class="nobrdiv">
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>

      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: "ManagerRegister",
  data() {
    var username = (rule, value, callback) => {
      this.username = '';
      if (!value) {
        return callback(new Error('用户账号不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
      }, 100);
      //获取用户名重复
      this.$axios.post('http://localhost:8089/ryansystemserver/user/findOne',{username:value}).then(res=>{
        if(res.data.dataobject!=null)callback(new Error('用户已存在'));
        else{
          this.username=value;
          callback();
        }
      });
    };
    var validatePass = (rule, value, callback) => {
      this.password='';
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        this.password=value;
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        username: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: username, trigger: 'blur' }
        ]
      },
      username:'',
      password:''
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const h = this.$createElement;
          this.$notify({
            title: '注册成功!',
            message: h('i', { style: 'color: teal'}, '欢迎您'+this.username)
          });
          this.$axios.post('http://localhost:8089/ryansystemserver/user/addUser',{username:this.username,password:this.password}).then(res=>{
            this.resetForm('ruleForm');
          });

        } else {
          this.$notify({
            title: '注册失败!',
            message: h('i', { style: 'color: teal'}, '遭遇严重错误')
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.bgset{
  position: fixed;
  background:url("../image/register.jpg");
  width: 460px;
  height: 352px;
  transform: translateY(-14.5px)  translateX(-16px);
}
.el-form-item {
  transform: translateY(30px);
  margin-bottom: 22px;
  width: 400px;
}
.touxiang{
  margin: 0 auto;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #409eff;
  box-shadow: 0 0 10px #409eff;
  position: relative;
  display: flex;justify-content: center;align-items: center;
  transform: translateY(10px);
}


/deep/ .el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 17px;
  color: lightcyan;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}


/*让div不换行*/
.nobrdiv{
  display: inline-block;
  width: 150px;
}


</style>