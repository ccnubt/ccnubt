<template>
  <el-collapse-item  name="1">
    <template slot="title">
      {{r.id}}
    </template>
  </el-collapse-item>
</template>

<script>
  export default {
    props:['r'],
    name: "ReservationItem"
  }
</script>

<style scoped>

</style>
