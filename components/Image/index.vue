<template>
  <div class="wrapper">
    <a :href="href">
      <img :src="src" alt="">
    </a>
  </div>
</template>

<script>
export default {
  props:{
    src:{
      type:String,
      default:'https://webimg.ziroom.com/25e3ac3e-b416-4e8d-bd8a-44a833033d59.jpg'
    },
    href:{
      type:String,
      default:'http://www.ziroom.com'
    }
  },
  methods:{
    getConfig() {
      return {
        src:this.src,
        href:this.href
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  width:100%;
  height: 300px;
  a {
    img {
      width: 100%;
      height:100%;
    }
  }
}
</style>
