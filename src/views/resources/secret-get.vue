<template>
  <div>
    <div style="padding: 10px">
      命名空间：{{ ns }} 名称:{{ name }}
    </div>
    <div style="text-align: center">
      <el-table
        :data="ExtData"
        border
        v-show="ExtData.length>0"
        style="width: 100%"
      >
        <el-table-column
          label="Key名"
          width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.key }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="value值"
          width="380">
          <template slot-scope="scope">
            <p>{{ scope.row.value }}</p>
          </template>
        </el-table-column>

      </el-table>
      <el-table
        :data="SecretData"
        border
        style="width: 100%"
      >
        <el-table-column
          label="Key名"
          width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.key }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="value值"
          width="380">
          <template slot-scope="scope">
            <p @mousedown="()=>b64Decode(scope.row.value,scope.row.key)"
               @mouseup="()=>showStr(scope.row.value,scope.row.key)"
               :ref="scope.row.key">{{ scope.row.value }}</p>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>

</template>
<script>
import {getSecret} from "@/api/secrets";

export default {
  data() {
    return {
      SecretData: [],
      ExtData: [],
      ns: "",
      name: ""
    }
  },
  created() {
    this.ns = this.$route.params.ns
    this.name = this.$route.params.name
    getSecret(this.ns, this.name).then(rsp => {

      for (let key in rsp.data.Data) {
        this.SecretData.push(
          {key, value: rsp.data.Data[key]}
        )
      }
      for (let key in rsp.data.ExtData) {
        this.ExtData.push(
          {key, value: rsp.data.ExtData[key]}
        )
      }

    })
  },
  methods: {
    b64Decode(str, ref) {
      this.$refs[ref].innerHTML = decodeURIComponent(atob(str));
    },
    showStr(str, ref) {
      this.$refs[ref].innerHTML = str
    }

  }

}
</script>
