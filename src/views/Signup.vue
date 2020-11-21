<template>
  <el-container class="signup" style="height: 100%; background-color: #ffffff">
    <el-main>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="First Name">
          <el-input
            v-model="formInline.firstname"
            placeholder="First Name"
          ></el-input>
        </el-form-item>
        <el-form-item label="Last Name">
          <el-input
            v-model="formInline.lastname"
            placeholder="Last Name"
          ></el-input>
        </el-form-item>
        <el-form-item label="Telephone">
          <el-input
            v-model="formInline.telephone"
            placeholder="Telephone"
          ></el-input>
        </el-form-item>
        <el-form-item label="Goal Date">
          <el-date-picker
            v-model="formInline.goaldate"
            type="date"
            placeholder="Pick a date"
            :default-value="new Date(2000, 1, 1, 0 , 0,0)"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="Email">
          <el-input
            v-model="formInline.email"
            placeholder="Email"
            type="email"
          ></el-input>
        </el-form-item>
        <el-form-item label="Program Type">
          <el-select v-model="formInline.program" placeholder="Program Type">
            <el-option
              :label="program.program_name"
              :value="program.program_id"
              v-for="program in $store.state.programlist"
              :key="program.program_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Start Weight (lb)">
          <el-input-number
            v-model="formInline.weight"
            :precision="2"
            :step="0.01"
            :max="0"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Register</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      formInline: {
        firstname: "",
        lastname: "",
        telephone: "",
        goaldate: "",
        email: "",
        program: "",
        weight: 0.0,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
