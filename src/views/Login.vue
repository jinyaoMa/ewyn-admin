<template>
  <el-container class="login">
    <el-main>
      <div class="frame">
        <el-form
          :inline="false"
          :model="form"
          class="form"
          @submit.native.prevent
        >
          <el-form-item label="Username">
            <el-input type="text" v-model="form.username" clearable></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input
              type="password"
              v-model="form.password"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="float: right"
              type="primary"
              native-type="submit"
              @click="onSubmit"
              >Login</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import crypto from "crypto";

export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      const username = this.form.username;

      const data = JSON.stringify(this.form);
      const algorithm = "aes-256-cbc";
      const clearEncoding = "utf8";
      const cipherEncoding = "base64";
      const key = crypto.randomBytes(32).toString("base64").substr(0, 32);
      const iv = crypto.randomBytes(16).toString("base64").substr(0, 16);
      const cipher = crypto.createCipheriv(algorithm, key, iv);
      const cipherChunks = [];
      cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
      cipherChunks.push(cipher.final(cipherEncoding));
      const encrypted = cipherChunks.join("eWyn.");
      // console.log("encrypted: " + encrypted);

      this.login(
        {
          a: username,
          b: encrypted,
          c: key,
          d: iv,
        },
        (result) => {
          if (
            result.data.error === "username" ||
            result.data.error === "password"
          ) {
            this.$message.error("Username or Password are incorrect.");
          } else if (result.data.data) {
            this.$store.dispatch("setUser", result.data.data);
            this.$router.push("/");
          }
        }
      );
    },
  },
};
</script>

<style lang="stylus" scoped>
.login
  height 100%

.frame
  box-sizing border-box
  width 320px
  margin calc(50vmin - 200px) auto 0
  height fit-content
  padding 20px
  background-color #ffffff
  border-radius 4px
</style>