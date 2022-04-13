<template>
  <div class="yaml-editor">
    <textarea ref="yamltext"></textarea>
  </div>
</template>
<script>
import {genConfigFile} from '@/api/rbac'
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/yaml/yaml'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/yaml-lint'

window.jsyaml = require('js-yaml')
export default {
  data() {
    return {
      yaml_text: '',//后端传过来的yaml内容
      yamlEditor: null //编辑器对象
    }
  },
  mounted() {
    const user = this.$route.params.user

    if (user === undefined) {
      alert("错误的参数")
      this.$router.push({name: "Ualist"})  //跳回列表页
    } else {
      genConfigFile(user).then(rsp => {
        this.yaml_text = rsp.data
        this.initYaml()
      })
    }

  },
  methods: {
    initYaml() {
      //初始化 yaml 编辑器
      this.yamlEditor = CodeMirror.fromTextArea(this.$refs.yamltext, {
        lineNumbers: true, // 显示行号
        mode: 'text/x-yaml', // 语法model
        gutters: ['CodeMirror-lint-markers'],  // 语法检查器
        theme: 'monokai', // 编辑器主题
        lint: true // 开启语法检查
      })

      this.yamlEditor.setValue(this.yaml_text) //对编辑器设置值
    }

  },


}

</script>
<style>
.yaml-editor {
  height: 100%;
  position: relative;
}

.yaml-editor .CodeMirror {
  height: auto;
  min-height: 300px;
}

.yaml-editor .CodeMirror-scroll {
  min-height: 300px;
}

.yaml-editor .cm-s-rubyblue span.cm-string {
  color: #F08047;
}

</style>
