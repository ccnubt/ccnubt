<template>
  <div>
    <el-collapse v-for="reservation in reservations">
      <ReservationItem v-bind:r="reservation"></ReservationItem>
    </el-collapse>
  </div>
</template>

<script>
  import ReservationItem from "./ReservationItem";
  export default {
    name: "Reservation",
    components: {
      ReservationItem
    },
    data:function () {
      return {
        reservations:[]
      }
    },
    methods:{
      reload: function () {
        this.$http.get('/api/root/reservation/',{params:{api_key:this.$store.getters.GET_API_KEY}})
          .then(res=>{
            if (res.data['result_code'] == 1){
              this.reservations = res.data['reservations']
            }
          })
      }
    },
    created:function () {
      this.reload()
    }
  }
</script>

<style scoped>

</style>
