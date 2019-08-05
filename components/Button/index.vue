<template>
  <button >{{title}}</button>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:'按钮'
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
 button {
   width:100%;
   padding:5px 8px;
   font-size:16px;
   color:#fff;
   background:orange;
   text-align: center;
   display: block;
 }
</style>
