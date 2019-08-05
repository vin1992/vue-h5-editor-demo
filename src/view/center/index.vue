<template>
  <el-main class="wrap">
    <el-row class="btn-wrap">
      <el-button  round class="btn" @click="getConfig"> 配置</el-button>
      <el-button type="info" round class="btn">预览</el-button>
      <el-button type="warning" round class="btn">主题</el-button>
      <el-button type="danger" round class="btn">编辑</el-button>
    </el-row>
    <div class="wrap">
      <iframe :src="url"  ref="screen" ></iframe>
    </div>
  </el-main>
</template>

<script>
import getLocationHref from '../../utils';

export default {
  props:{
    loaded:Function,
    pushMsg:Function,
    config:Object
  },
  data() {
    return {
      url:''
    }
  },
  created() {
    this.url = getLocationHref() + 'preview';
  },
  mounted() {
    this.loaded(this.$refs.screen);
  },
  methods:{
    getConfig() {
      this.pushMsg({
        type:'getConfig',
        data:null
      })
    }
  }

}
</script>

<style lang="less" scoped>
.wrap {
  width:100%;
  padding-top:0;
  iframe {
    width:100%;
    height:667px;
    border:10px solid rgba(0,0,0,0.85);
    border-top-width: 80px;
    border-bottom-width:80px;
    border-radius:40px;
    box-sizing: border-box;
  }
  .btn-wrap {
    margin-bottom:10px;
  }
}
</style>
