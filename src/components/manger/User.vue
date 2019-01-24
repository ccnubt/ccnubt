<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="姓名" ></el-table-column>
    <el-table-column prop="sex" label="性别" ></el-table-column>
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
</template>

<script>
  import formatDate from '@/scripts/dateFormat'
  export default {
    data() {
      return {
        tableData: [],
        role_options:[{
            value: 0,
            label: '用户'
          },{
            value: 1,
            label: '队员'
          }]
      }
    },
    methods:{
      reload: function () {
        this.$http.get('/api/root/user/',{params:{api_key:this.$store.getters.GET_API_KEY}})
          .then(res=>{
            if (res.data['result_code'] == 1){
              this.tableData = res.data['users_list']
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
