<template>
  <div class="app-container">
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-ro>
      <el-table-column align="center" label="镜像ID" width="400">
        <template slot-scope="scope">
          <p>{{ scope.row.id }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="容器" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.containers }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="200">
        <template slot-scope="scope">
          <p>{{ scope.row.created }}</p>
        </template>
      </el-table-column>

      <el-table-column align="center" label="镜像大小" width="100">
        <template slot-scope="scope">
          <p>{{ ((scope.row.size) / 1000000).toFixed(1) + 'MB' }}</p>
        </template>
      </el-table-column>

      <el-table-column label="标签" width="300" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.labels }}</span>
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
import {getImageList} from '@/api/image'
import {deleteImage} from "@/api/image";

export default {
  data() {
    return {
      list: null,
    }
  },
  created() {
    getImageList().then(rsp => {
      this.list = rsp.data
    })
    this.fetchData()
  },
  methods: {
    deleteImage(id) {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteImage(id)
      })
    },
    fetchData() {
      getImageList().then(response => {
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

