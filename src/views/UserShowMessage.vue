<template>
  <div>

    <el-button type="primary" class="el-icon-plus" style="right: 3%;bottom: 20%;position: fixed;z-index: 10;transform: translate3d(0,0,0);" circle @click="showAddDialog"></el-button>
    <el-table
        stripe
        border
        :data="currentList"
        style="width: 100%">
      <el-table-column
          prop="id"
          label="编号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="headImage"
          label="头像"
          width="220">
        <template slot-scope="scope">
          <el-image
              style="width: 100px;height: 100px"
              :src="scope.row.headImage"
              fit="fill"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          width="180">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination center
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-size="10"
                   layout="total, prev, pager, next"
                   :total=userList.length>
    </el-pagination>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
    >
      <div>
        <el-form :model="user" label-width="100px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username" placeholder="请输入用户名"></el-input><br>
          </el-form-item>
          <el-form-item label="密码" prop="username">
            <el-input v-model="user.password" placeholder="请输入密码"></el-input><br>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="user.phone" placeholder="请输入手机号"></el-input><br>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="user.email" placeholder="请输入邮箱"></el-input><br>
          </el-form-item>

          <el-form-item label="用户头像" prop="headImage">
            <el-upload
                ref="upload"
                action="http://localhost:8089/ryansystemserver/uploadFile"
                :on-success="afterFileUpload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item><br>

        </el-form>


      </div>


      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>



  </div>

</template>

<script>
export default {
  name: "UserShowMessage",
  data(){
    return{
      userList:[],
      currentPage:1,
      currentList:[],
      dialogVisible:false,
      user:{username:'',password:'',phone:'',email:'',headImage:''}
    }
  },
  methods:{
    findAll(){
      this.$axios.get('http://localhost:8089/ryansystemserver/admin/user/findAll',{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      }).then(res=>{
        if(res.data.code == 200){
          this.userList = res.data.dataobject;
          console.log(this.userList);
        }
      }).catch(err=>console.log(err));
    },

    handleDelete(index, row) {
      this.$confirm('你确定要删除此用户信息吗?','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.$axios.get('http://localhost:8089/ryansystemserver/admin/user/delById?id='+row.id,{
          headers:{
            'token':window.localStorage.getItem('token')
          }
        }).then(res=>{
          if(res.data.code==200){
            this.findAll();
            this.refreshList();
            this.$message({
              message:'删除用户信息成功',
              type:'success'
            });
          }
          else {
            this.$message({
              message:'删除用户信息失败',
              type:'warning'
            });
          }
        })
      }).catch(()=>{
        this.$message({
          message:'已经取消删除',
          type:'warning'
        })
      })
    },
    afterFileUpload(response){
      console.log(response);
      this.user.headImage = response.dataobject;
      console.log(this.user.headImage);
    },
    showAddDialog(){
      this.dialogVisible = true;
      this.user={};
      this.$nextTick(()=>{
        if(this.$refs['upload']){
          this.$refs['upload'].clearFiles();
        }

      });
    },
    showUpdateDialog(index,row){
      this.dialogVisible=true;
      Object.assign(this.user,row);
      this.$nextTick(()=>{
        if(this.$refs['upload']){
          this.$refs['upload'].clearFiles();
        }
      });
    },
    edit() {
      this.$axios.post('http://localhost:8089/ryansystemserver/admin/user/editUser',this.user,{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      }).then(res=>{
        if(res.data.code==200){
          console.log(":"+this.user);
          this.findAll();
          this.refreshList();
          this.dialogVisible=false;
          this.$message({
            message:res.data.msg,
            type:'success'
          });
        }
        else {
          this.$message({
            message:res.data.msg,
            type:'warning'
          })
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.refreshList();
    },
    refreshList(){
      setTimeout(()=>{
        let begin=(this.currentPage-1)*10;
        let end= (this.currentPage)*10;
        this.currentList=this.userList.slice(begin,end);
      },100);

    }

  },
  created() {
    this.findAll();
    this.refreshList();
    let token = window.localStorage.getItem('token');
  },
}
</script>

<style scoped>

</style>