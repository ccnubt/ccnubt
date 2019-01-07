<template>
  <div>
    <el-button type="primary" @click="show_dlg = true">添加活动</el-button>
    <el-dialog title="添加活动" :visible.sync="show_dlg">
      <el-form >
        <el-form-item label="活动名称" >
          <el-input v-model="title" autocomplete="off"></el-input>
        </el-form-item>
        <div style="text-align: left">
          <span >时间</span>
          <el-date-picker v-model="time" type="datetimerange" range-separator="至"
                          start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <el-form-item v-model="pos" label="地点" >
          <el-input  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="活动内容" >
          <el-input  v-model="content" type="textarea" rows="15" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add_commit">确 定</el-button>
        <el-button @click="show_dlg = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
    export default {
        name: "Activity",
        data: function () {
          return {
            show_dlg: false,
            title: null,
            content: null,
            time: null,
            pos: null,
            dlg_loading: false
          }
        },
        methods: {
          add_commit: function () {
            this.dlg_loading = true
            this.$http.post('/api/root/new_activity/?api_key='+this.$store.getters.GET_API_KEY,{
                title: this.title,
                content: this.content,
                start_time: this.time[0].getTime(),
                end_time: this.time[1].getTime(),
                pos: this.pos
            })
              .then(res=>{
                console.log(res)
                if (res.data.result_code == 1){
                  this.show_dlg = false
                }
                else{
                  
                }
              })
            this.dlg_loading = false
          }
        }
    }
</script>

<style scoped>

</style>
