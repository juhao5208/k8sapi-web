<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="50">
        <template slot-scope="scope">
          <p></p>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="280">
        <template slot-scope="scope">
          <p>{{ scope.row.Name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="配置" width="180">
        <template slot-scope="scope">
          <p>
            <el-checkbox :disabled="true" v-model="scope.row.Options.IsCros">跨域</el-checkbox>
          </p>
          <p>
            <el-checkbox :disabled="true" v-model="scope.row.Options.IsRewrite">重写</el-checkbox>
          </p>

          <p><span>限流</span></p>
        </template>
      </el-table-column>
      <el-table-column label="域名" width="100">
        <template slot-scope="scope">
          <p><a target="_blank" :href="'http://'+scope.row.Host">{{ scope.row.Host }}</a></p>
        </template>
      </el-table-column>
      <el-table-column label="命名空间" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.NameSpace }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.CreateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="danger" @click="()=>rmIngress(scope.row.NameSpace,scope.row.Name )" icon="el-icon-delete"
                     circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getList, rmIngress} from '@/api/ingress'
import {NewClient} from "@/utils/ws";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      wsClient: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    rmIngress(ns, name) {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        rmIngress(ns, name)
      })
    },
    fetchData() {
      this.listLoading = true
      // 通过rest api 获取
      getList("default").then(response => {
        this.list = response.data
        this.listLoading = false
      })
      this.wsClient = NewClient()
      this.wsClient.onmessage = (e) => {
        if (e.data !== 'ping') {
          const object = JSON.parse(e.data)
          if (object.type === 'ingress') {
            this.list = object.result.data
            this.$forceUpdate()
          }
        }
      }

    },
    getStatus(row) {
      if (row.IsComplete)
        return "<span class='green'>Active</span>"
      return "<span class='red'>Waiting</span>"
    },
    getMessage(row) {
      if (!row.IsComplete) {
        return row.Message
      }
      return ''
    }
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
