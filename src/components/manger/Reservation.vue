<template>
  <div id="reservation">
    <div class="block">
      <el-date-picker v-model="date" type="daterange" align="right" unlink-panels
                      range-separator="至" start-placeholder="开始日期"
                      end-placeholder="结束日期" :picker-options="pickerOptions"
                      @change="date_change">
      </el-date-picker>
    </div>
    <div  v-loading="loading">
      <el-collapse v-for="reservation in reservations" :key="reservation.id">
        <ReservationItem v-bind:r="reservation"></ReservationItem>
      </el-collapse>
    </div>
    <div class="page">
      <el-pagination :page-size="20"
          layout="prev, pager, next" :total="page.total" background
          :current-page="page.current" @current-change="current_change" />
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
        },
        
        //分页
        page: {
          current: 1,
          total: 1
        }
      }
    },
    methods:{
      reload: function () {
        var d_from = 0;
        var d_to = new Date().getTime();
        if (this.date && this.date.length==2){
          d_from = this.date[0].getTime()
          d_to = this.date[1].getTime()
        }
        console.log("reload")
        this.loading = true;
        this.$http.get('/api/root/reservation/',{
          params:{
            api_key:this.$store.getters.GET_API_KEY,
            page: this.page.current,
            from: d_from,
            to: d_to
          }
        })
          .then(res=>{
            if (res.data['result_code'] == 1){
              this.page.total = res.data["total"]
              this.reservations = res.data['reservations']
            }
            this.loading = false
          })
        
      },
      current_change: function (currentPage) {
        this.page.current = currentPage;
        this.reload();
      },
      date_change: function () {
        // console.log("date_change")
        this.page.current = 1;
        this.reload();
      }
    },
    created:function () {
      this.reload()
    }
  }
</script>

<style scoped>
  #reservation{
    padding: 5px;
    text-align: left;
    margin: 0 1%;
  }
  .page{
    text-align: center;
  }
</style>
