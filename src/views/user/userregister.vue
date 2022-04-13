<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">

      <el-form :inline="true" :model="form" label-width="80px">
        <el-form-item label="用户ID">
          <el-input v-model="form.id" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="form.usertype" placeholder="请选择用户类型">
            <el-option label="管理员" value="administrator"></el-option>
            <el-option label="普通用户" value="user"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form :inline="true" :model="form" label-width="80px">
        <el-form-item label="电话">
          <el-input v-model="form.usertel" placeholder="用户电话"></el-input>
        </el-form-item>
        <el-form-item label="用户地址">
          <el-input v-model="form.useradd" placeholder="用户地址"></el-input>
        </el-form-item>
      </el-form>

      <el-form-item label="密码" prop="password">
        <el-col :span="9">
          <el-input v-model="form.password" type="password"
                    autocomplete="off" show-password="true" maxlength="20"
                    placeholder="建议使用大小写字母数字和特殊符号的组合"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkpassword">
        <el-col :span="9">
          <el-input v-model="form.checkPass" autocomplete="off" show-password="true" maxlength="20"
                    placeholder="再次输入你的密码"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即注册</el-button>
        <el-button>取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        id: '',
        username: '',
        password: '',
        usertype: '',
        usertel: '',
        useradd: '',
        checkPass: '',
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
  }
}
</script>


