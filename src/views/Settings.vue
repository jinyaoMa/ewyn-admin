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
          v-model="formPassword.password"
          placeholder="New Password"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password">
        <el-input
          type="password"
          v-model="formPassword.password"
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
        v-for="program in $store.state.programlist"
        :key="program.programid"
      >
        <el-input v-model="program.program_name" readonly>
          <el-button slot="append" icon="el-icon-delete"></el-button>
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
      formPrograms: [],
    };
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
</style>