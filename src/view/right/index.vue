<template>
  <div class="wrap">
    <h1>页面设置</h1>
    <el-row class="btn-wrap">
      <el-button type="danger" round @click="delCpnt">删除组件</el-button>
      <div class="item" v-for="(value,key) in editProps" :key="key">
        <PropItem v-model="editProps[key]" name=""></PropItem>
      </div>
    </el-row>
  </div>
</template>
<script>
import PropItem from './propItem';
  export default {
    props:{
      editProps:Object,
      pushMsg:Function
    },
    data() {
      return {
      }
    },

    components:{
      PropItem
    },

    watch:{
      editProps:{
        handler(newProps) {
          
          if (newProps) {
            this.pushMsg({
              type:'changeProps',
              data:newProps
            })
          }
        },
        immediate:true,
        deep:true
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      delCpnt() {
        this.pushMsg({
          type:'delCpnt',
          data:null
        })
        console.log('删除哪个组件');
      }
    }
  }
</script>

<style lang="less" scoped>
.wrap {
  .btn-wrap {
    text-align: right;
  }

}
</style>
