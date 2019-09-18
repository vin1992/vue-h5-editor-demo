<template>
  <el-main class="wrap">
    <el-row class="btn-wrap">
      <el-button  round class="btn" @click="getConfig"> 配置</el-button>
      <el-button type="info" round class="btn" @click="switchEdit">{{edit ? '预览': '编辑'}}</el-button>
      <el-button type="warning" round class="btn" @click="switchTheme">{{dark ? '高雅白' : '深空灰' }}</el-button>
      <el-button type="default" round class="btn" @click="build">构建</el-button>
    </el-row>
    <div class="wrap">
      <iframe :src="url"  ref="screen" :class="{'dark':dark}"></iframe>
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
      url:'',
      edit:false,
      dark:false,
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
    },
    switchEdit() {
      this.edit = !this.edit;
      this.pushMsg({
        type:'switchEdit',
        data:this.edit
        
      })
    },
    switchTheme() {
      this.dark = !this.dark
      this.pushMsg({
        type:'switchTheme',
        data:this.dark
      })
    },

    build() {
      this.pushMsg({
        type:'buildPage',
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
    background:rgba(0,0,0,0.05);
    color:rgba(0,0,0,0.85);
    box-sizing: padding-box;
    background-clip: padding-box;
  }
  .btn-wrap {
    margin-bottom:10px;
  }
  .dark {
    background:rgba(0,0,0,0.85);
    color:#fff;
    border: 10px solid rgba(0,0,0,0.15);
    border-top-width: 80px;
    border-bottom-width:80px;
    background-clip: padding-box;
  }
}
</style>
