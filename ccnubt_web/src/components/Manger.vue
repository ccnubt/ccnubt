<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo"
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
             mode="horizontal" @select="handleSelect">
      <el-menu-item index="/user">用户管理</el-menu-item>
      <el-menu-item index="/reservation">订单中心</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Manger",
    data: function () {
      return{
        activeIndex: '/user'
      }
    },
    methods:{
      handleSelect: function(key,keyPath){
        this.$router.push('/manger'+key)
      }
    }
  }
</script>

<style scoped>

</style>
