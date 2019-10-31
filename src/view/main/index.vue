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
    <el-dialog title="预览二维码" :visible.sync="showConfigModal" width="30%">

      <qrcode-vue :value="url" :size="size" level="H" class="qrcode"></qrcode-vue>
      <div class="link-box">
        生成页面链接：{{url}}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showConfigModal = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import getLocationHref from '../../utils';
import request from '../../utils/request';
import QrcodeVue from 'qrcode.vue';

export default {
  components: {
    Left: () => import('../left'),
    Center: () => import('../center'),
    Right: () => import('../right'),
    QrcodeVue
  },
  data() {
    return {
      screen: null,
      config: [],
      showConfigModal: false,
      editProps: null,
      url: '',
      size: 200
    }
  },
  created() {
    console.log('main')
  },
  mounted() {
    window.addEventListener('message', this.recieveMsg);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.recieveMsg)
  },
  methods: {
    pushMsg(data) {
      if (this.screen) {
        let url = getLocationHref() + 'preview';
        this.screen.contentWindow.postMessage(data, url);
      }
    },
    recieveMsg({
      data
    }) {
      let {
        type
      } = data;
      switch (type) {
        case 'getConfig':
          this.showConfigModal = true;
          this.config = data.data;
          break;

        case 'getPreview':
          this.saveConfig(data.data);
          break;
        case 'changeProps':
          this.editProps = data.data;
          console.log('editProps', data.data);
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
    },

    saveConfig(data) {
      console.log('route:', this.$route.params.pid, data);
      // return;
      let pid = this.$route.params.pid;
      let content = JSON.stringify(data);
      // return;
      request.post('/api/admin/page/modify', {
        pid,
        content
      }).then(res => {
        console.log(res);
        let {
          code,
          data,
          message
        } = res;
        if (code == 0) {
          this.showConfigModal = true;
          this.url = `http://${location.hostname}:3002/${pid}`;
          console.log('url:', this.url);
          this.$notify.success({
            title: '成功',
            message,
            duration: 2500
          });
          this.getActiveList();
        } else {
          this.$notify.error({
            title: '错误',
            message,
            duration: 2500
          })
        }
      }).catch(e => e);
    },
  }
}
</script>

<style lang="less" scoped>
.row-bg {
  width: 100%;

  .left,
  .right {
    width: 33.33%;
  }

  .center {
    width: 375px;
  }

  .qrcode {
    text-align: center;
  }

  .link-box {
    margin-top: 10px;
  }
}
</style>
