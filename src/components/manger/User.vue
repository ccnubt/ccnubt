<template>
  <div class="user_table">
    <div class="role_filter">
      <el-select v-model="role" @change="reload" placeholder="全部">
        <el-option  label="全部" value="3" default/>
        <el-option  label="用户" value="0"/>
        <el-option  label="队员" value="1"/>
      </el-select>
    </div>
    <el-table :data="tableData" >
      <el-table-column prop="name" label="姓名" ></el-table-column>
      <el-table-column prop="sex" label="性别" >
        <template slot-scope="scope">
          {{scope.row.sex == 'male'? '男':'女'}}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" ></el-table-column>
      <el-table-column prop="qq" label="QQ" ></el-table-column>
      <el-table-column label="最后活跃时间" >
        <template slot-scope="scope">
          {{scope.row.last_active_time | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column label="禁用/授权">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.active"
                     active-color="#13ce66" inactive-color="#ff4949"
                     @change="active(scope.row.id)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="120px">
        <template slot-scope="scope">
          <el-select v-model="scope.row.role" placeholder="请选择" @change="auth_role(scope.row.role, scope.row.id)">
            <el-option
                    v-for="item in role_options" :key="item.value"
                    :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination :page-size="20"
                     layout="prev, pager, next" :total="page.total" background
                     :current-page="page.current" @current-change="current_change" />
    </div>
  </div>
</template>

<script>
  import formatDate from '@/scripts/dateFormat'
  export default {
    data() {
      return {
        tableData: [],
        role: null,
        role_options:[{
            value: 0,
            label: '用户'
          },{
            value: 1,
            label: '队员'
          }],
        page:{
          current: 1,
          total:1
        }
      }
    },
    methods:{
      reload: function () {
        this.$http.get('/api/root/user/',{
          params:{
            api_key: this.$store.getters.GET_API_KEY,
            page: this.page.current,
            role: this.role
          }
        })
          .then(res=>{
            if (res.data['result_code'] == 1){
              this.tableData = res.data['users_list']
              this.page.total = res.data['total']
            }
          })
      },
      active: function (id) {
        this.$http.get('/api/root/user/active/'+id+'/',{params:{api_key:this.$store.getters.GET_API_KEY}})
          .then(res=>{
            if (res.data['result_code']==1){
              this.reload()
            }
          })
      },
      auth_role:function(role, id){
        // console.log(role+' '+id)
        this.$http.get('/api/root/user/role/',{params:{api_key:this.$store.getters.GET_API_KEY,id,role}})
          .then(res=>{
            if (res.data['result_code']==1){
              this.reload()
            }
          })
      },
      current_change: function (currentPage) { //当前页数变化
        this.page.current = currentPage;
        this.reload();
      }
    },
    created:function () {
      this.reload()
    },
    filters:{
      dateFormat: function (date) {
        let d = new Date(date)
        return formatDate(d,'yyyy/MM/dd hh:mm')
      }
    }
  }
</script>

<style>
  .user_table{
    margin: 0px 10px;
  }
  .role_filter{
    text-align: left;
  }
</style>
