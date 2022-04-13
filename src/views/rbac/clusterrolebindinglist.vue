<template>
  <div>
    <div style="padding: 20px">
      <el-button type="primary" @click="$router.push({name:'Createclusterrolebinding'})">创建绑定</el-button>
    </div>
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
      <el-table-column label="角色/绑定名称" width="350">
        <template slot-scope="scope">
          <p><span class="role">角色:</span>{{ scope.row.roleRef.name }}</p>
          <p><span class="role">绑定名:</span>{{ scope.row.metadata.name }}
            <i class=" el-icon-circle-plus" @click="()=>showAdd(scope.$index,scope.row.metadata.name)"></i>
          </p>
          <p>
            <el-tag class="ii" closable
                    :type="getType(sub.kind)"
                    v-for="sub in scope.row.subjects"
                    @close="rmUserFromBinding(scope.row.metadata.name,sub.kind,sub.name)">
              {{ sub.name }}({{ sub.kind }})
            </el-tag>
          </p>
          <p v-show="addConfig.index===scope.$index">
            <el-select v-model="addConfig.kind" style="width:80px;height:30px!important;">
              <el-option label="User" value="User"/>
              <el-option label="ServiceAccount" value="ServiceAccount"/>
              <el-option label="Group" value="Group"/>
            </el-select>
            <el-input placeholder="输入用户名" v-model="addConfig.name" style="width: 100px"></el-input>
            <i class="ii el-icon-s-claim" @click="appendUserToBinding"> 保存</i>
            <i class="ii el-icon-remove" @click="addConfig.index=-1"> 取消</i>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.metadata.creationTimestamp }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <i @click="()=>rmRoleBinding(scope.row.metadata.name )" class="el-icon-delete"> 删除</i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  getClusterRoleBindingList,
  deleteClusterRoleBinding,
  addUserToClusterBinding,
  deleteUserFromClusterBinding
} from '@/api/rbac'
import {NewClient} from "@/utils/ws";

const apiGroup = 'rbac.authorization.k8s.io'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      namespace: 'default',
      nslist: [], //ns列表
      addConfig: {
        index: -1,
        kind: 'User',
        name: '',//用户名
        bindingname: '', //binding名称
        ns: '' //命名空间
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    showAdd(index, bdname) {
      this.addConfig.index = index
      this.addConfig.bindingname = bdname
    },
    rmUserFromBinding(bdname, kind, username) {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        console.log(bdname, kind, username)
        deleteUserFromClusterBinding(bdname, {kind, name: username, apiGroup})
      })
    },
    appendUserToBinding() {
      const {ns, bindingname, kind, name} = this.addConfig
      //构建出一个subject
      addUserToClusterBinding(bindingname, {kind, name, apiGroup}).then(rsp => {
        this.addConfig.index = -1
        this.addConfig.name = ''
      })
    },
    rmRoleBinding(name) {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {

        deleteClusterRoleBinding(name)
      })
    },
    getType(kind) {
      if (kind === "User") {
        return "info"
      }
      if (kind === "Group") {
        return "success"
      }
      return "warning"
    },

    fetchData() {
      this.listLoading = true
      // 通过rest api 获取
      getClusterRoleBindingList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
      this.wsClient = NewClient()
      this.wsClient.onmessage = (e) => {
        if (e.data !== 'ping') {
          const object = JSON.parse(e.data)
          if (object.type === 'clusterrolebinding') {
            this.list = object.result.data
            this.$forceUpdate()
          }
        }
      }
    },
  }
}
</script>
<style>
i {
  cursor: pointer
}

.ii {
  margin-left: 10px;
  font-size: 14px !important;
}

.role {
  color: green
}
</style>
