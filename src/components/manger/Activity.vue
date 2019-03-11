<template>
  <div>
    <el-button type="primary" @click="add_button">添加活动</el-button>
    
    <el-dialog  :title="form.head"  :visible.sync="form.show_dlg">
      <el-form label-width="20%"  label-position="top" size="mini" style="text-align: left">
        <el-form-item label="活动名称">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" >
          <el-date-picker v-model="form.time" type="datetimerange" range-separator="至"
                          start-placeholder="开始日期" end-placeholder="结束日期" style="width: 50%">
          </el-date-picker>
        </el-form-item>
        <el-form-item  label="活动地点" >
          <el-input  autocomplete="off" v-model="form.pos"></el-input>
        </el-form-item>
        <el-form-item  label="活动内容" >
          <el-input  v-model="form.content" type="textarea" rows="10" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add_commit">确 定</el-button>
        <el-button @click="form.show_dlg = false">取 消</el-button>
      </div>
    </el-dialog>
    <div>
      <el-card v-for="a in activities" class="box-card" shadow="hover":key="a.id">
        <div slot="header" class="clearfix">
          <span>{{a.title}}</span>
          <el-button style="float: right; margin: 2px" type="danger" @click="del_activity(a.id)" v-loading="del_loading">删除</el-button>
          <el-button style="float: right; margin: 2px" type="warning" @click="edit_button(a)">编辑</el-button>
        </div>
        <div class="text item">时间：{{a.start_time|dateFormat}} ~ {{a.end_time|dateFormat}} </div>
        <div class="text item">地点：{{a.pos}}</div>
        <div class="text item">内容：{{a.content}}</div>
      </el-card>
    </div>

  </div>

</template>

<script>
  import formatDate from '@/scripts/dateFormat'
  export default {
    name: "Activity",
    data: function () {
      return {
        form:{
          head: null,
          show_dlg: false,
          title: null,
          content: null,
          time: null,
          pos: null,
          dlg_loading: false,
          id: null
        },
        activities: [],
        del_loading: false
      }
    },
    methods: {
      add_button: function(){
        this.form.show_dlg = true;
        this.form.id = null;
        this.form.title = null;
        this.form.content = null;
        this.form.pos = null;
        this.form.time = null;
        this.form.head = '添加活动';
      },
      edit_button: function(a){
        this.form.show_dlg = true;
        this.form.id = a.id;
        this.form.title = a.title;
        this.form.content = a.content;
        this.form.pos = a.pos;
        let s_t = new Date(a.start_time)
        let e_t = new Date(a.end_time)
        this.form.time =[s_t,e_t]

        this.form.head = '编辑活动';
      },
      add_commit: function () {
        this.form.dlg_loading = true
        this.$http.post('/api/root/new_activity/?api_key='+this.$store.getters.GET_API_KEY,{
            title: this.form.title,
            content: this.form.content,
            start_time: this.form.time[0].getTime(),
            end_time: this.form.time[1].getTime(),
            pos: this.form.pos,
            id: this.form.id
        })
          .then(res=>{
            console.log(res)
            if (res.data['result_code']== 1){
              this.form = {
                head: null,
                show_dlg: false,
                title: null,
                content: null,
                time: null,
                pos: null,
                dlg_loading: false,
                id: null
              }
              this.reload();
            }
            else{

            }
          })
        this.dlg_loading = false
      },
      del_activity: function(id){
        this.$http.get('/api/root/activity/del/'+id+'/',{params:{api_key:this.$store.getters.GET_API_KEY}}).then(res=> {
          this.del_loading = true
          if (res.data.result_code==1){
            this.reload();
          }
          this.del_loading = false
        })
      },
      reload: function () {

        this.$http.get('/api/root/activity/',{params:{api_key:this.$store.getters.GET_API_KEY}}).then(res=>{

          if (res.data.result_code == 1){
            console.log(res.data.activities)
            this.activities = res.data.activities
          }
        })
      }
    },
    created: function () {
      this.reload();
    },
    filters:{
      dateFormat: function (date) {
        let d = new Date(date)
        return formatDate(d,'yyyy年MM月dd日 hh:mm')
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 70%;
    text-align: left;
    margin: 10px auto;
    padding: 10px;
  }
</style>
