<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>快捷创建</span>
        <el-form :inline="true">
          <el-form-item label="用户名">
            <el-input v-model="postUser.Name" placeholder="必填,至少两个字符,同名用户会被覆盖"></el-input>
          </el-form-item>
          <el-form-item label="组">
            <el-input v-model="postUser.Group" placeholder="选填"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createUser">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="用户名称" width="350">
        <template slot-scope="scope">
          <p>{{ scope.row.Name }}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.CreateTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <i @click="()=>rmUser(scope.row.Name )" class="el-icon-delete"> 删除</i>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <router-link icon="el-icon-edit" :to="{name:'Configyaml',
              params:{user:scope.row.Name}}">
            <el-link>生成配置<i class="el-icon-setting"></i></el-link>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {getUaList, createUa, deleteUa, genConfigFile} from '@/api/rbac'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      postUser: {
        Name: "", //cn
        Group: "", //o
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 生成config配置
    genConfig(user) {
      genConfigFile(user).then(rsp => {
        this.$alert('<pre>' + rsp.data + '</pre>', 'config内容', {
          confirmButtonText: '确定',
        });
      })
    },
    createUser() {
      createUa({cn: this.postUser.Name, o: this.postUser.Group}).then(rsp => {
        this.fetchData()
        this.postUser.Name = ""
        this.postUser.Group = ""
      })
    },
    rmUser(name) {
      this.$confirm('请考虑清楚，删除用户将会删除证书?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteUa({cn: name}).then(rsp => {
          this.fetchData()
        })
      })
    },
    fetchData() {
      this.listLoading = true
      // 通过rest api 获取
      getUaList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
  }
}
</script>
<style>
i {
  cursor: pointer
}
</style>
