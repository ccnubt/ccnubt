<template>
  <el-collapse-item  name="r.id" class="card">
    <div slot="title" slot-scope="scope">
      <div>
        <div style="width: 150px;display:inline-block;text-align: left">订单编号：{{r.id}}</div>
        <div style="display:inline-block">
          订单状态：<el-tag  v-bind:type="r.status<=3? status_tag[r.status].type:(r.solved? 'success':'danger')">
          {{status_tag[r.status].label}}{{r.status>=4? (r.solved? ",维修成功":",维修失败"):''}}
        </el-tag>
        </div>
        <!--{{status_tag}}-->
      </div>
    </div>
    <div class="detail">
      <div>
        <p>问题描述：{{r.detail}}</p>
        <p>创建时间：{{r.create_time|dateFormat}}</p>
        <p>用户信息：</p>
        <ul>
          <li>姓名：{{r.user_info.name}}</li>
          <li>性别：{{r.user_info.sex=='male'? '男':'女'}}</li>
          <li>手机：{{r.user_info.phone}}</li>
          <li>QQ：{{r.user_info.qq}}</li>
        </ul>
      </div>
      <div v-show="r.bt_user_info">
        <p>接单队员信息：</p>
        <ul>
          <li>姓名：{{r.bt_user_info.name}}</li>
          <li>性别：{{r.bt_user_info.sex=='male'? '男':'女'}}</li>
          <li>手机：{{r.bt_user_info.phone}}</li>
          <li>QQ：{{r.bt_user_info.qq}}</li>
        </ul>
      </div>
      <div v-show="r.status==6">
        <p>完成时间：{{r.finish_time|dateFormat}}</p>
        <p>评价：{{r.evaluation}}</p>
        <p>评分：<el-rate v-model="r.score" disabled
                       show-score text-color="#ff9900" score-template="{value}"></el-rate>
        </p>
      </div>
    </div>
  </el-collapse-item>
</template>

<script>
  import formatDate from '@/scripts/dateFormat'
  export default {
    props:['r'],
    test:'111',
    name: "ReservationItem",
    data:function () {
      return {
        status_tag:[
          {
            label:"已取消",
            type:"info"
          },{
            label:"未接单",
            type:"warning"
          },{
            label:"已接单",
            type:""
          },{
            label:"维修中",
            type:""
          },{
            label:"待确认",
            type:""
          },{
            label:"待评价",
            type:""
          },{
            label:"已完成",
            type:""
          }
        ]
      }
    },
    filters:{
      dateFormat: function (date) {
        let d = new Date(date)
        return formatDate(d,'yyyy/MM/dd hh:mm')
      }
    }
  }
</script>

<style scoped>
  .detail{
    text-align: left;
    padding: 3px;
    font-size: 15px;
    background-color: #ebe7f3;
    border-radius: 20px;
  }
  .card{
    font-size: 30px;
  }
</style>
