<template>
  <div>
    <div style="width: 100%; text-align: right">
      <a href="https://yuancl.site/doc.html"><el-button type="success" plain>API文档</el-button></a>
    </div>
    <div id="register">
      <img src="../assets/bt.jpg" width="300px">
      {{msg}}
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="username" ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="name" ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="repassword"></el-input>
        </el-form-item>
      </el-form>
      <el-button  type="primary" @click="commit">注册</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NewAdmin",
    data: function () {
      return {
        username: null,
        password: null,
        repassword: null,
        msg: null,
        name: null
      }
    },
    methods: {
      commit: function () {
        var token = this.$route.query.token;
        if (this.password != this.repassword){
          alert('密码不一致');
          return ;
        }
        this.$http
            .post('/api/root/addadmin/?token='+token,{
              username:this.username,
              password:this.password,
              name: this.name
            })
            .then(res => {
              if (res.data['result_code'] == 1){
                alert("已提交审核！")
                this.$router.push('login')
              }
              else {
                this.msg = res.data['err_msg']
              }
            })
      }
    }
  }
</script>

<style scoped>
#register{
  width: 300px;
  margin: auto;
}
</style>