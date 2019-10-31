<template>
  <div class="wrapper">

    <template v-if="isTypeOf(value) === 'string' || isTypeOf(value) === 'number'">
      <div class="name" v-if="name">{{name}}</div>
      <input type="text" :value="value" @input="$emit('input',$event.target.value)">
    </template>

    <template v-if="isTypeOf(value) === 'boolean'">
      <div class="name" v-if="name">{{name}}</div>
      <input type="checkbox" :checked="value" @change="$emit('input',$event.target.checked)">
    </template>

    <template v-if="isTypeOf(value) === 'object'">
      <!-- <div class="name" v-if="name">{{name}}</div>   -->
      <template v-for="(val,name) in value">
        <PropItem class="item" :key="name" v-model="value[name]" :name="name"></PropItem>      
      </template>
    </template>

    <template v-if="isTypeOf(value) === 'array'">
      <div class="name" v-if="name">{{name}}</div>
      <template v-for="(item,id) in value">
        <div class="item-box" :key="id">
          <el-button @click="handleRemoveItem">删除</el-button>
          <PropItem v-model="value[id]" :name="id.toString()"></PropItem>        
        </div>
      </template>
      <el-button @click="handleAddItem">新增</el-button>
    </template>

  </div>
</template>

<script>
export default {
  name:'PropItem',
  props:{
    value:[String,Boolean,Number,Object,Array],
    name:String,
  },
  data() {
    return {}
  },
  methods:{
    isTypeOf(val) {
      return Object.prototype.toString.call(val).slice(8,-1).toLowerCase();
    },
    
    handleAddItem() {

    },

    handleRemoveItem() {

    }
  }
}
</script>

<style lang="less" scoped>
  .wrapper {
    overflow: hidden;
    margin-bottom: 10px;
    .name {
      display: inline-block;
      float: left;
      font-size: 20px;
      margin-right: 10px;
      line-height: 30px;
    }
    input[type='text'] {
      display: inline-block;
      float: left;
      width:200px;
      height: 30px;
      border-radius:4px;
      outline: none;
      border:none;
      border:1px solid #ccc;
      font-size: 16px;
      padding: 0 4px;
    }
    .item {
      display: block;
    }
  }
</style>

