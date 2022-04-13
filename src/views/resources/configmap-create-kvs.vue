<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>配置详细
<a href="javascript:" class="file">从文件导入
              <input multiple="multiple" @change="()=>fileChange()" ref="files" type="file" accept=".txt"></input>
            </a>
        </span>
      </div>
      <div>

        <el-form :inline="true" label-width="80px" v-for="(item,itemindex) in kvs">
          <el-form-item label="key">
            <el-input v-model="item.key"></el-input>
          </el-form-item>
          <el-form-item label="value">
            <el-input type="textarea" v-model="item.value"></el-input>
          </el-form-item>
          <el-button v-show="itemindex>0" @click="rmKV(itemindex)" type="primary" icon="el-icon-minus"
                     circle></el-button>
        </el-form>
        <el-button type="primary" @click="addKV" icon="el-icon-plus">添加配置</el-button>

        <el-button type="primary" @click="Save" icon="el-icon-success">保存</el-button>
      </div>
      <div style="text-align: center;margin-top: 20px;color:red">
        {{ errorMsg }}
      </div>
      <div>
      </div>
    </el-card>
  </div>
</template>
<script>
import {postConfigMap, getConfigMap} from '@/api/configmaps'

export default {
  props: ["Name", "NameSpace"],
  data() {
    return {
      kvs: [
        {key: "", value: ""}
      ],
      errorMsg: "",
      IsUpdate: false
    }
  },
  created() {
    if (this.$route.params.name !== undefined) {
      const {ns, name} = this.$route.params
      this.IsUpdate = true
      this.$parent.childSet(ns, name)
      getConfigMap(ns, name).then(rsp => {
        for (let key in rsp.data.Data) {
          if (this.kvs.length === 1 && this.kvs[0].key === "") {
            this.kvs[0].key = key
            this.kvs[0].value = rsp.data.Data[key]
          } else {
            this.kvs.push(
              {key, value: rsp.data.Data[key]}
            )
          }
        }

      })
    }
  },
  methods: {
    fileChange() {
      const files = this.$refs["files"].files
      if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          const reader = new FileReader()
          reader.readAsText(files[i], 'UTF-8')
          reader.filename = files[i].name
          reader.onload = (e) => {
            if (this.kvs.length === 1 && this.kvs[0].key === "") {
              this.kvs[0].key = e.target.filename
              this.kvs[0].value = e.target.result
            } else {
              this.kvs.push(
                {key: e.target.filename, value: e.target.result}
              )
            }
          }
        }
      }

    },
    addKV() {
      this.kvs.push({key: "", value: ""})
    },
    rmKV(index) {
      this.kvs.splice(index, 1)
    },
    Save() {
      // 把kv数组整合成一个大对象
      let postData = {}
      this.kvs.forEach((item) => {
        postData[item.key] = item.value // 给对对象赋值 包含(key ,value)
      })
      const postModel = {
        Name: this.$props.Name,
        NameSpace: this.$props.NameSpace,
        Data: postData,
        IsUpdate: this.IsUpdate
      }
      console.log(postData)
      postConfigMap(postModel)
        .then(rsp => {
          alert("创建成功")
        }).catch((error) => {
        if (error.response) {
          this.errorMsg = JSON.stringify(error.response.data)
        } else {
          this.errorMsg = JSON.stringify(error.message)
        }
      })
    }
  }
}
</script>
<style>
.file {
  position: relative;
  display: inline-block;
  background: #D0EEFF;
  border: 1px solid #99D3F5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1E88C7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}

.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}

.file:hover {
  background: #AADFFD;
  border-color: #78C3F3;
  color: #004974;
  text-decoration: none;
}
</style>
