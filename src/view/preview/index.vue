<template>
  <div class="wrap">
    <template v-for="(item,id) in config">
      <component :is="item.component" :key="id" @click.native="handleSelect(id)" :ref="`cpnt-${id}`"></component>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config:[],
      activeKey:''
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

    handleSelect(key) {
      console.log(key);
      let props = this.$refs[`cpnt-${key}`][0].getConfig();
      this.pushMsg({
        type:'changeProps',
        data:props
      })
    },

    handleChangeProps(key,props) {
      if (key) {
        this.config[key]['props'] = props;
      }
    }
  }
}
</script>

<style>

</style>
