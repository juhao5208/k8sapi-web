<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
        <el-form :inline="true">
          <el-form-item label="绑定名称">
            <el-input v-model="metadata.name"></el-input>
          </el-form-item>
          <el-form-item label="选择集群角色">
            <el-select filterable v-model="roleRef.name">
              <el-option v-for="role in clusterrolelist "
                         :label="role.metadata.name"
                         :value="role.metadata.name"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>选择用户  <i class="ii el-icon-circle-plus" @click="addSubject"></i></span>
        <el-form :inline="true" v-for="(sub,subindex) in subjects" style="margin-top: 20px">
          <el-form-item>
            <el-select
              v-model="sub.kind"
              placeholder="用户类型">
              <el-option
                label="User"
                value="User">
              </el-option>
              <el-option
                label="ServiceAccount"
                value="ServiceAccount">
              </el-option>
              <el-option
                label="Group"
                value="Group">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="输入用户名/组名" v-model="sub.name"/>
          </el-form-item>
          <el-button type="primary" v-show="subindex>0" @click="rmSubject(subindex)">
            <i class="el-icon-minus"></i></el-button>
        </el-form>
      </div>
      <el-button type="primary" @click="saveRoleBinding">保存</el-button>
    </el-card>
  </div>
</template>
<script>
import {getResources} from "@/api/resources";
import {getClusterRoleList, createClusterRoleBinding} from "@/api/rbac";

const apiGroup = 'rbac.authorization.k8s.io'
export default {
  data() {
    return {
      metadata: {name: ""},
      clusterrolelist: [],
      roleRef: {apiGroup, kind: "ClusterRole", name: ""},
      subjects: [  //前端所使用的rule
        {apiGroup, kind: 'User', name: ''}
      ],
    }
  },
  created() {
    this.loadRolelist()
  },
  methods: {
    loadRolelist() {
      getClusterRoleList().then(rsp => {
        this.clusterrolelist = rsp.data
      })
    },
    addSubject() {
      this.subjects.unshift({apiGroup, kind: 'User', name: ''})
    },
    rmSubject(index) {
      this.subjects.splice(index, 1)
    },
    saveRoleBinding() {
      createClusterRoleBinding({metadata: this.metadata, subjects: this.subjects, roleRef: this.roleRef}).then(rsp => {
        alert("成功")
      })
    }
  }
}

</script>
<style>
.ii {
  font-size: 18px
}
</style>
