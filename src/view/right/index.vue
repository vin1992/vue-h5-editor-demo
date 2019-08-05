<template>
  <div class="wrap">
    <h1>页面设置</h1>
    <el-row class="btn-wrap">
      <el-button type="danger" round @click="delCpnt">删除组件</el-button>
      <el-input v-model="editProps[key]" :placeholder="key" :name="key" v-for="(value,key) in editProps" :key=key ></el-input>
    </el-row>
  </div>
</template>

<script>
  export default {
    props:{
      editProps:Object,
      pushMsg:Function
    },
    data() {
      return {
      }
    },
    watch:{
      editProps:{
        handler(newProps) {
          this.pushMsg({
            type:'changeProps',
            data:newProps
          })
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      delCpnt() {
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
