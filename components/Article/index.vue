<template>
  <div class="wrap">
    <h1>{{title}}</h1>
    <p>{{content}}</p>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:'自如友家'
    },
    content:{
      type:String,
      default:'自如寓是一家吧啦啦吧啦是，自如寓是一家吧啦啦吧啦是自如寓是一家吧啦啦吧啦是自如寓是一家吧啦啦吧啦是'
    }
  },
  
  methods:{
    getConfig() {
      return {
        title:this.title,
        content:this.content
      }
    }
  }

}
</script>

<style scoped lang="less">
  .wrap {
    h1 {
      border-left:5px solid red;
      font-size: 18px;
    }
    p {
      text-indent: 2em;
      font-size: 15px;
    }
  }
</style>
