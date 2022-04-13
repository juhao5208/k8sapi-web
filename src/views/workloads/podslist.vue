<template>
  <div>
    <div style="margin:30px 0 30px 10px">
      <p><label>Pod总数:</label>
        <span>{{ getPodsNum(false) }}</span>

        <label>就绪:</label>
        <span class="green"> {{ getPodsNum(true) }}</span>

      </p>

    </div>
    <el-container v-for="ns in nslist">
      <el-header>{{ ns.Name }}</el-header>
      <el-main>
        <el-table
          :data="getPodsList(ns.Name)"
          border
          fit
          highlight-current-row
          :summary-method="getCount"
          show-summary
        >
          <el-table-column align="center" label="序号" width="50">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column v-if="false" label="ns" prop="NameSpace" width="90">

          </el-table-column>
          <el-table-column label="状态" width="70">
            <template slot-scope="scope">
              <p v-html="getStatus(scope.row.IsReady )"></p>
            </template>
          </el-table-column>
          <el-table-column label="名称" width="350">
            <template slot-scope="scope">
              <p>{{ scope.row.Name }}</p>
              <p class="red">{{ getMessage(scope.row) }}</p>
            </template>
          </el-table-column>
          <el-table-column label="镜像" width="200" align="center">
            <template slot-scope="scope">
              <p>{{ scope.row.Images }}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="120" align="center">
            <template slot-scope="scope">
              {{ scope.row.CreateTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <router-link icon="el-icon-edit" :to="{name:'Podshell',
              params:{ns:scope.row.NameSpace,pod:scope.row.Name}}">
                <el-link>远程<i class="el-icon-s-platform el-icon--right"></i></el-link>
              </router-link>
              <router-link :to="{name:'Podlogs',
              params:{ns:scope.row.NameSpace,pod:scope.row.Name}}">
                <el-link>日志<i class="el-icon-view el-icon--right"></i></el-link>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="getPodsTotal(ns.Name)"
          :page-size="5"
          :current-page.sync="pages[ns.Name]"
          @current-change="(current)=>changePage(ns.Name,current)"
          :hide-on-single-page=true
        >
        </el-pagination>
      </el-main>
    </el-container>
  </div>

</template>
<script>
import {getList} from "@/api/ns";
import {getPodsByNs} from "@/api/pods";
import {NewClient} from "@/utils/ws";

export default {
  data() {
    return {
      nslist: null,
      pods: {}, //现在存的是  带有 分页信息的 格式，其中包含了pods列表
      pages: {} // 存 ns==>当前页码数
    }
  },
  created() {
    getList().then(response => {
      this.nslist = response.data  // namespace 列表
      this.nslist.forEach(ns => { //循环获取pods
        this.pages[ns] = 1  //灌入当前页码值
        this.loadPods(ns.Name, 1)
      })
      this.wsClient = NewClient()
      this.wsClient.onmessage = (e) => {
        if (e.data !== 'ping') {
          const object = JSON.parse(e.data)
          if (object.type === 'pods') {
            this.pages[object.result.ns] = 1 //设置当前列表 的当前页码=1
            this.pods[object.result.ns] = object.result.data
            this.$forceUpdate()
          }
        }
      }

    })
  },
  computed: {
    getPodsNum(ready) { // 获取PODS总数，字段在后端字段中
      return (ready) => {
        let num = 0
        for (let ns in this.pods) {
          if (typeof (this.pods[ns]) !== undefined && this.pods[ns] !== null) {
            if (ready) {
              //console.log(this.pods[ns])
              num += this.pods[ns].Ext.ReadyNum
            } else
              num += this.pods[ns].Total
          }
        }
        return num
      }
    },
    //新增计算属性，因为有的ns下没有pods 因此要做处理
    getPodsList(ns) {
      return (ns) => {
        if (typeof (this.pods[ns]) === undefined || this.pods[ns] == null) {
          return null
        }
        return this.pods[ns].Data
      }
    },
    //计算属性，给分页组件用的。用于显示Total (后端直接传了)
    getPodsTotal(ns) {
      return (ns) => {
        if (typeof (this.pods[ns]) === undefined || this.pods[ns] == null) {
          return 0
        }
        return this.pods[ns].Total
      }
    }
  },
  methods: {
    changePage(ns, current) {
      this.loadPods(ns, current)
    },
    //分页加载的代码改动
    loadPods(ns, current) {
      getPodsByNs(ns, current).then(rsp => {
        this.pods[ns] = rsp.data
        this.$forceUpdate()
      })
    },
    getStatus(isReady) {
      if (isReady)
        return "<span class='green'>Active</span>"
      return "<span class='red'>Waiting</span>"
    },
    //获取每个PODS表格的 PODS总数，后端直接传了
    getCount(param) {
      const {data} = param
      // let podAllNum=0
      const sum = []
      sum[0] = '合计'
      if (data !== null && data.length > 0) {  //这里要判断一下，因为data可能是null
        const ns = data[0].NameSpace  //获取ns
        if (typeof (this.pods[ns]) === undefined || this.pods[ns] == null)
          sum[1] = 0
        else
          sum[1] = this.pods[ns].Total
      } else {
        sum[1] = 0
      }


      return sum
    },
    getMessage(row) {
      if (!row.IsReady) {
        return row.Message
      }
      return ''
    }

  }
}

</script>
<style>
.el-header, .el-footer {
  background-color: #7cd1c0;
  color: #fff;
  text-align: center;
  line-height: 60px;

}

.red {
  color: #d20000
}

.green {
  color: green
}
</style>
