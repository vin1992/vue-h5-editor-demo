<template>
  <div class="wrap">
    <h1>组件列表</h1>
    <el-card class="box-card" v-for="(com,id) in config" :key="id">
      <div slot="header" class="clearfix">
        <span>{{com.name}}</span>
      </div>
      <div v-if="com.children && com.children.length > 0">
        <div v-for="(o,idx) in com.children" :key="idx" class="text item" @click="handleAddCpnt(o)" >
          {{ o.name }}
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
import config from '../../../components/components';
export default {
  props:{
    pushMsg:Function
  },
  data() {
    return {
      config
    }
  },

  created() {
    console.log('left');
  },

  methods:{
    handleAddCpnt(o) {
      const tmp = {
        type:'addCpnt',
        data:{
          component:o.component,
        }
      }

      if (o.container) {
        tmp.data.children = []
        tmp.data.container = true
      }
      this.pushMsg(tmp);
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  width:100%;
  .box-card {
    .text {
      padding:5px 8px;
      
    }
    .text:hover {
      box-shadow: 2px 2px 2px -2px rgba(0,0,0,0.5);
    }
  }
}

</style>

