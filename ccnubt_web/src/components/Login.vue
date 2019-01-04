<template>
    <div id="login">
      {{msg}}
      <el-form label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="username" ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
      </el-form>
      <el-button v-loading="loading" type="primary" @click="user_login">登录</el-button>
    </div>
</template>

<script>
  export default {
    name: "Login",
    data: function(){
      return{
        username: '',
        password: '',
        loading: false,
        msg:''
      }
    },
    methods:{
      user_login: function () {
        this.loading = true
        console.log(this.username + this.password)
        this.$http
          .post('/api/root/login/',{username:this.username, password:this.password})
          .then(res => {
            if (res.data['result_code'] == 1){
              this.$store.commit('SET_API_KEY',res.data['api_key'])
              this.$router.push('manger/')
            }
            else {
              this.msg = res.data['err_msg']
            }
          })
        this.loading = false

      }
    }
   }
</script>

<style scoped>
#login{
  width: 300px;
  margin: auto;
}
</style>
