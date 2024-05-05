<template>
  <div>
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
          label="用户头像"
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
          prop="password"
          label="用户密码"
          width="180">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              @click="showUpdateDialog(scope.$index, scope.row)">修改</el-button>
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
        用户名:<el-input v-model="user.username" placeholder="请输入用户名"></el-input><br>
        密码:<el-input v-model="user.password" placeholder="请输入用户名"></el-input><br>
        {{this.user}}
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
  name: "UserManager",
  data(){
    return{
      userList:[],
      currentPage:1,
      currentList:[],
      dialogVisible:false,
      user:{username:'',password:''}
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

    showUpdateDialog(index,row){
      this.dialogVisible=true;
      Object.assign(this.user,row);
    },
    edit() {
      this.$axios.post('http://localhost:8089/ryansystemserver/admin/user/editUser',this.user,{
        headers:{
          'token':window.localStorage.getItem('token')
        }
      }).then(res=>{
        if(res.data.code==200){
          this.findAll();
          this.refreshList();
          // window.location.reload();
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

    },

  },
  created() {
    this.findAll();
    this.refreshList();
    let token = window.localStorage.getItem('token');
  }
}
</script>

<style scoped>

</style>