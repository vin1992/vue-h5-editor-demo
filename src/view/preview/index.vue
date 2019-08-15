<template>
  <div class="view-wrap">
    <h1>preview</h1>
    <dragCpnt :config="config" :editable="edit" :select="handleSelect" :initKey="handleInitKey"></dragCpnt>
  </div>
</template>

<script>
import dragCpnt from './dragCpnt';
export default {
  components:{
    dragCpnt
  },

  data() {
    return {
      config:[],
      activeKey:'',
      drag:false,
      edit:false,
      dark:false
    }
  },

  computed:{
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: !this.edit,
        ghostClass: 'ghost'
      }
    }
  },

  mounted() {
    window.addEventListener('message',this.recieveMsg);
  },

  beforeDestroy() {
    window.removeEventListener('message',this.recieveMsg);
  },

  methods:{
    pushMsg(data) {
      window.top.postMessage(data);
    },
    recieveMsg({data}) {
      console.log('收到消息',data);
      let {type} = data;
      switch (type) {
        case 'addCpnt':
          this.handleAddCpnt(data.data);
        break;
        case 'getConfig':
          this.getConfig();
        break;
        case 'changeProps':
          this.handleChangeProps(this.activeKey,data.data);
        break;
        case 'delCpnt':
          this.handleDelCpnt(this.activeKey);
        break;
        case 'switchEdit':
          this.edit = data.data;
          break;
        case 'switchTheme':
          this.dark = data.data;
          break;
        default:
          return;
      }
    },
    handleAddCpnt(item) {
      this.config.push(item);
    },

    getConfig() {
      console.log(this.config);
      this.pushMsg({
        type:'getConfig',
        data:this.config
      });
    },

    handleSelect(key,props) {
      if (!this.edit) return;
      this.activeKey = key;
      this.pushMsg({
        type:'changeProps',
        data:props
      })
    },

    handleInitKey() {
      this.pushMsg({
        type:'initKey',
        data:null
      })
    },

    handleChangeProps(key,props) {
      if (!key || !this.edit) return; 
      this.config = this.changeDeepIndex(this.config, key, props);
    },

    handleDelCpnt(key) {
      if (!key || !this.edit) return;
      this.config = this.delDeepIndex(this.config, key)
      this.pushMsg({
        type:'delCpnt',
        data:null
      })
    },

    changeDeepIndex: function (arr, key, res, prevKey = '') {
      return arr.map((item, index) => {
        let currentKey = prevKey !== '' ? prevKey + '-' + index : index.toString()
        if (currentKey === key) {
          item.props = res
        }
        if (item.children) item.children = this.changeDeepIndex(item.children, key, res, currentKey)
        return item
      })
    },

    delDeepIndex: function (arr, key, prevKey = '') {
      return arr.filter((item, index) => {
        let currentKey = prevKey !== '' ? prevKey + '-' + index : index.toString()
        if (currentKey === key) return false
        if (item.children && item.children.length > 0) item.children = this.delDeepIndex(item.children, key, currentKey);
        return true
      })
    },
  }
}
</script>

<style scoped lang="less">

</style>
