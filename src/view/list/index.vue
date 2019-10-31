<template>
<div class="list">
  <h3>活动列表</h3>
  <el-row>
    <el-button type="primary" @click="dialogFormVisible = true">新建活动</el-button>
  </el-row>

  <!-- 新建活动  -->
  <el-dialog title="新建活动" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="创建人" :label-width="formLabelWidth">
        <el-select v-model="form.creator" placeholder="选择创建人">
          <el-option label="张三" value="zs"></el-option>
          <el-option label="里斯" value="ls"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createActivity">确 定</el-button>
    </div>
  </el-dialog>

  <el-table :data="list" style="width: 100%">
    <el-table-column prop="name" label="活动名称" width="180">
    </el-table-column>
    <el-table-column prop="creator" label="创建人" width="180">
    </el-table-column>
    <el-table-column prop="_updateTime" label="创建时间" >
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <router-link :to="{name:'main',params:{pid: scope.row._id}}" class="btn">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </router-link>
        <router-link :to="{name:'main',params:{pid: scope.row._id}}" class="btn">
          <el-button type="text" size="small">编辑</el-button>
        </router-link>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination layout="prev, pager, next" :total="50">
    </el-pagination>
  </div>

</div>
</template>

<script>
import request from '../../utils/request';
import moment from 'moment';
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '张三',
        address: '自如寓 搬家保洁活动'
      }, {
        date: '2016-05-04',
        name: '张三',
        address: '自如整租'
      }, {
        date: '2016-05-01',
        name: '张三',
        address: '空气质量检测'
      }, {
        date: '2016-05-03',
        name: '张三',
        address: '自如校园大使'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        creator: ''
      },
      list:[],
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getActiveList();
  },
  methods: {
    handleClick(r) {
      console.log(r);
    },
    getActiveList() {
      request.get('/api/admin/page/list').then(res => {
        let {code,data,message} = res;
        //2019-10-08T09:21:03.671Z
        if (code == 0) {
          let tmp = data.list;
          this.list =  tmp.map(item => ({
            _updateTime: moment(item.updateTime).format("YYYY-MM-DD hh:mm:ss"),
            ...item
          }));
          console.log('list:',this.list);
        }else {
          this.list.length = 0;
        }
      }).catch(e => e);
    },

    createActivity() {
      this.dialogFormVisible = false;
      request.post('/api/admin/page/create',this.form).then(res => {
        console.log(res);
        let {code,data,message} = res;
        if (code == 0) {
          this.$notify.success({title:'成功',message,duration:2500});
          this.getActiveList();
        }else {
          this.$notify.error({title:'错误',message,duration:2500})
        }
      }).catch(e => e);
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  .pagination {
    padding: 30px;
    text-align: center;
  }
  .btn {
    margin-right: 10px;
    display: inline-block;
  }
}
</style>
