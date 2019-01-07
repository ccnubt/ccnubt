<template>
  <div id="reservation">
    <div class="block">
      <!--<span class="demonstration">带快捷选项</span>-->
      <el-date-picker v-model="date"
                      type="daterange" align="right" unlink-panels
                      range-separator="至" start-placeholder="开始日期"
                      end-placeholder="结束日期" :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <div  v-loading="loading">
      <el-collapse v-for="reservation in reservations"
                   v-if="date_check(reservation.create_time)" :key="reservation.id">
        <ReservationItem v-bind:r="reservation"></ReservationItem>
      </el-collapse>
    </div>
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
        reservations:[],
        loading: false,
        date: [],
        pickerOptions: {
          shortcuts: [{
            text: '全部',
            onClick(picker) {
              picker.$emit('pick', []);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    methods:{
      reload: function () {
        this.loading = true;
        this.$http.get('/api/root/reservation/',{params:{api_key:this.$store.getters.GET_API_KEY}})
          .then(res=>{
            if (res.data['result_code'] == 1){
              this.reservations = res.data['reservations']
            }
          })
        this.loading = false
      },
      date_check:function (v) {
        // let d = Date(v)
        let d = new Date(v)
        if (this.date.length!=2) return true;
        // console.log(this.date[0]<=d)
        // console.log(d <= this.date[1])
        // console.log(this.date[0]+'---'+d+'-----'+ this.date[1])
        return (this.date[0]<=d) && (d <= this.date[1])
      }
    },
    created:function () {
      this.reload()
    }
  }
</script>

<style scoped>
  #reservation{
    padding: 10px;
    text-align: left;
  }
</style>
