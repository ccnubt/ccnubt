<template>
  <div id="summary">
    <div class="filter">
      <el-date-picker v-model="date" type="daterange" align="right" unlink-panels
        range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期" :picker-options="pickerOptions"
        @change="date_filter">
      </el-date-picker>
    </div>
    <div class="table" v-loading="loading">
      <el-table :data="formdata"  >
        <el-table-column align="center" type="index" />
        <el-table-column align="center" prop="name" label="姓名"  />
        <el-table-column align="center" prop="avg_score" label="用户评价得分"  />
        <el-table-column align="center" prop="count" label="接单量" />
        <el-table-column align="center" prop="score" label="得分"  />
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Summary",
    data: function () {
      return {
        date:[],
        formdata:[],
        pickerOptions: {
          shortcuts: [{
            text: '全部',
            onClick(picker) {
              const start = new Date().setTime(0);
              const end = new Date();
              picker.$emit('pick', [start,end]);
            }
          }, {
            text: '本周',
            onClick(picker) {
              const end = new Date();
              const today = new Date();
              const start = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay());
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '本月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setDate(1);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        loading: true
      }
    },
    methods: {
      reload: function () {
        this.loading = true;
        
        var from = 0;
        if (this.date[0]){
          from = this.date[0].getTime();
        }
        var to = new Date().getTime();
        if (this.date[1]){
          to = this.date[1].getTime();
        }
        this.$http.get('/api/root/summary/',{
          params:{
            api_key: this.$store.getters.GET_API_KEY,
            from: from,
            to: to
          }})
            .then(res => {
              if (res.data['result_code']==1){
                this.formdata = res.data['data']
              }
              this.loading = false;
            })
      },
      date_filter: function () {
        if (this.date.length == 2){
          this.reload();
        }
      }
    },
    created: function () {
      this.reload();
    }
  }
</script>

<style scoped>
  #summary{
    text-align: left;
    margin: 20px;
  }

</style>