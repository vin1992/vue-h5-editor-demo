<template>
  <el-row type="flex" class="row-bg" justify="space-around">
    <el-col :span="5" class="left">
      <div class="grid-content bg-purple">
        <Left :pushMsg="pushMsg" />
      </div>
    </el-col>
    <el-col :span="5" class="center">
      <div class="grid-content bg-purple-light">
        <Center :loaded="handleLoaded" :pushMsg="pushMsg" />
      </div>
    </el-col>
    <el-col :span="6" class="right">
      <div class="grid-content bg-purple">
        <Right :editProps="editProps" :pushMsg="pushMsg" />
      </div>
    </el-col>
    <el-dialog
      title="页面配置"
      :visible.sync="showConfigModal"
      width="30%">
      <pre>{{config}}</pre>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showConfigModal = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import getLocationHref from '../../utils';

export default {
  components:{
    Left:() => import('../left'),
    Center:() => import('../center'),
    Right:() => import('../right')
  },
  data() {
    return {
      screen:null,
      config:[],
      showConfigModal:false,
      editProps:null
    }
  },
  created() {
    console.log('main')
  },
  mounted() {
    window.addEventListener('message',this.recieveMsg)
  },
  beforeDestroy() {
    window.removeEventListener('message',this.recieveMsg)
  },
  methods:{
    pushMsg(data) {
      if (this.screen) {
        let url = getLocationHref() + 'preview';
        this.screen.contentWindow.postMessage(data,url);
      }

    },
    recieveMsg({data}) {
      let { type } = data;
      switch (type) {
        case 'getConfig':
          this.showConfigModal = true;
          this.config = data.data;
          break;
        case 'changeProps':
          this.editProps = data.data;
          console.log('editPris',data.data);
          break;
        case 'delCpnt':
          this.editProps = null;
          break;
        case 'buildPage':
          this.handleBuild(data.data);
        default:
          return;
      }
    },
    handleLoaded(screen) {
      console.log(screen);
      if (!screen) return;
      this.screen = screen;
    },

    handleBuild(data) {
      console.log(data);
      this.$router.push({ name:'preview', params:{id: JSON.stringify(data)}});
    }
  }
}
</script>

<style scoped lang="less">
.row-bg {
  width:100%;
  .left,.right {
    width:33.33%;
  }
  .center {
    width:375px;
  }
}
</style>
