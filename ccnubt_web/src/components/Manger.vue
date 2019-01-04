<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo"
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
             mode="horizontal" @select="handleSelect">
      <el-menu-item index="/manger/user">用户管理</el-menu-item>
      <el-menu-item index="/manger/reservation">订单中心</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Manger",
    data: function () {
      return{
        activeIndex: '/manger/user'
      }
    },
    methods:{
      handleSelect: function(key,keyPath){
        this.$router.push(key)
      }
    },
    created:function f() {
      console.log(this.$route)
      this.activeIndex = this.$route.path;
    }
  }

</script>

<style scoped>

</style>
