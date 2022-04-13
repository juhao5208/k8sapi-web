<template>
  <div class="app-container">
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-ro>
      <el-table-column align="center" label="用户姓名" width="95">
        <template slot-scope="scope">
          <p>{{ scope.row.username }}</p>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.id }}</p>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="350">
        <template slot-scope="scope">
          <p>{{ scope.row.usertel }}</p>
        </template>
      </el-table-column>

      <el-table-column label="地址" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.useradd }}</p>
        </template>
      </el-table-column>
      <el-table-column label="用户类型" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.usertype }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="danger" @click="()=>deleteUser(scope.row.username)" icon="el-icon-delete"
                     circle></el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
import {getList, deleteUser} from '@/api/user'

export default {
  data() {
    return {
      list: null,
    }
  },
  created() {
    getList().then(rsp => {
      this.list = rsp.data
    })
    this.fetchData()
  },
  methods: {
    deleteUser(name) {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteUser(name)
      })
    },
    fetchData() {
      getList().then(response => {
        this.list = response.data
        //console.log("list", this.list)
      })
    },
  },
}
</script>
<style>
.red {
  color: #d20000
}

.green {
  color: green
}
</style>

