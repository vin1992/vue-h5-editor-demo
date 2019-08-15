<template>
  <div class="wrapper">
    <p>{{title}}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:'容器组件'
    }
  },
  methods:{
    getConfig() {
      return {
        title:this.title
      }
    }
  }

}
</script>

<style lang="less" scoped>
.wrapper {
  width:100%;
  min-height: 100px;
  padding:10px;
  box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.5);
}
</style>
