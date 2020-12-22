<template>
  <div class="settings">
    <h3 class="title">Change Password</h3>
    <el-form
      :inline="false"
      :model="formPassword"
      class="form"
      label-width="150px"
    >
      <el-form-item label="Old Password">
        <el-input
          type="password"
          v-model="formPassword.password"
          placeholder="Old Password"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="New Password">
        <el-input
          type="password"
          v-model="formPassword.newPassword"
          placeholder="New Password"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password">
        <el-input
          type="password"
          v-model="formPassword.confirmPassword"
          placeholder="Confirm Password"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onConfirmPassword">Confirm</el-button>
        <el-button type="info" @click="onCancelPassword">Clear Form</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <h3 class="title">Manage Programs</h3>
    <el-form :inline="false" class="form">
      <el-form-item
        v-for="(program, i) in programlist"
        :key="program.programid"
      >
        <el-input v-model="program.program_name">
          <el-button
            v-if="
              program.program_name !== $store.state.programlist[i].program_name
            "
            slot="prepend"
            type="success"
          >
            Confirm Edit
          </el-button>
          <el-button
            slot="append"
            icon="el-icon-delete"
            type="danger"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="newProgram">
          <el-button
            slot="append"
            icon="el-icon-plus"
            type="primary"
          ></el-button>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "settings",
  data() {
    return {
      formPassword: {
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      newProgram: "",
    };
  },
  mounted() {
    this.getProgramlist();
    console.log(this.programlist);
  },
  methods: {
    onConfirmPassword() {},
    onCancelPassword() {},
  },
};
</script>

<style lang="stylus" scoped>
.settings
  padding 20px
  background-color #ffffff

.form, h3
  max-width 747px
  margin 0 auto

.title
  margin-top 10px
  margin-bottom 30px

>>> .el-input-group__append
  button.el-button--primary
    color #FFF
    background-color #409EFF
    border-radius 0 4px 4px 0
  button.el-button--danger
    color #ffffff
    background-color #F56C6C
    border-radius 0 4px 4px 0

>>> .el-input-group__prepend
  button.el-button--success
    color #FFF
    background-color #67C23A
    border-radius 4px 0 0 4px
</style>