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
    <el-divider v-if="userPermission.admin === -1"></el-divider>
    <h3 class="title" v-if="userPermission.admin === -1">Manage Programs</h3>
    <el-form :inline="false" class="form" v-if="userPermission.admin === -1 && programlist.length">
      <el-form-item
        v-for="(program, i) in programlist"
        :key="program.programid"
      >
        <el-input
          v-model="program.program_name"
          :placeholder="$store.state.programlist[i].program_name"
        >
          <el-button
            v-if="
              program.program_name !== $store.state.programlist[i].program_name
            "
            slot="prepend"
            type="success"
            @click="handleEditProgramClick(program)"
          >
            Confirm Edit
          </el-button>
          <el-button
            slot="append"
            icon="el-icon-delete"
            type="danger"
            @click="handleDeleteProgramClick(program)"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="newProgram" placeholder="New Program">
          <el-button
            slot="append"
            icon="el-icon-plus"
            type="primary"
            @click="handleNewProgramClick"
          ></el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <el-divider v-if="userPermission.admin === -1"></el-divider>
    <h3 class="title" v-if="userPermission.admin === -1">Manage Products</h3>
    <el-form :inline="false" class="form" v-if="userPermission.admin === -1 && productlist.length">
      <el-form-item
        v-for="(product, i) in productlist"
        :key="product.productid"
      >
        <el-input
          v-model="product.product_name"
          :placeholder="$store.state.productlist[i].product_name"
        >
          <el-button
            v-if="
              product.product_name !== $store.state.productlist[i].product_name
            "
            slot="prepend"
            type="success"
            @click="handleEditProductClick(product)"
          >
            Confirm Edit
          </el-button>
          <template slot="append">
            <el-select v-model="product.optional" placeholder="Option">
              <el-option label="Mandatory" :value="0"> </el-option>
              <el-option label="Optional" :value="1"> </el-option>
            </el-select>
            <el-button
              icon="el-icon-delete"
              type="danger"
              @click="handleDeleteProductClick(product)"
            ></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="newProduct.name" placeholder="New Product">
          <template slot="append">
            <el-select v-model="newProduct.option" placeholder="Option">
              <el-option label="Mandatory" :value="0"> </el-option>
              <el-option label="Optional" :value="1"> </el-option>
            </el-select>
            <el-button
              icon="el-icon-plus"
              type="primary"
              @click="handleNewProductClick"
            ></el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-divider v-if="userPermission.admin === -1"></el-divider>
    <h3 class="title" v-if="userPermission.admin === -1">Manage Compliancy</h3>
    <el-form :inline="false" class="form" v-if="userPermission.admin === -1 && compliancylist.length">
      <el-form-item
        v-for="(compliancy, i) in compliancylist"
        :key="compliancy.compliancyid"
      >
        <el-input
          v-model="compliancy.compliancy_name"
          :placeholder="$store.state.compliancylist[i].compliancy_name"
        >
          <el-button
            v-if="
              compliancy.compliancy_name !==
              $store.state.compliancylist[i].compliancy_name
            "
            slot="prepend"
            type="success"
            @click="handleEditCompliancyClick(compliancy)"
          >
            Confirm Edit
          </el-button>
          <el-button
            slot="append"
            icon="el-icon-delete"
            type="danger"
            @click="handleDeleteCompliancyClick(compliancy)"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="newCompliancy" placeholder="New Compliancy">
          <el-button
            slot="append"
            icon="el-icon-plus"
            type="primary"
            @click="handleNewCompliancyClick"
          ></el-button>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import crypto from "crypto";

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
      newProduct: {
        name: "",
        option: "",
      },
      newCompliancy: "",
    };
  },
  mounted() {
    this.getProgramlist();
    this.getProductlist();
    this.getCompliancylist();
  },
  methods: {
    handleDeleteProductClick(product) {
      this.deleteProductById(product.productid, (result) => {
        if (result.data.affectedRows === 1) {
          this.$message({
            type: "success",
            message: `Product ${product.product_name} (${
              parseInt(product.optional) === 0 ? "Mandatory" : "Optional"
            }) deleted!`,
          });
        } else {
          this.$message({
            type: "warning",
            message: `Product ${product.product_name} (${
              parseInt(product.optional) === 0 ? "Mandatory" : "Optional"
            }) was in-use!`,
          });
        }
      });
    },
    handleEditProductClick(product) {
      this.editProduct(product, (result) => {
        if (result.data.affectedRows === 1) {
          this.$message({
            type: "success",
            message: `Product ${product.product_name} (${
              parseInt(product.optional) === 0 ? "Mandatory" : "Optional"
            }) updated!`,
          });
        }
      });
    },
    handleNewProductClick() {
      this.addProduct(
        {
          ...this.newProduct,
        },
        (result) => {
          if (result.data.affectedRows === 1) {
            this.$message({
              type: "success",
              message: `New product (${this.newProduct.name}) (${
                parseInt(this.newProduct.option) === 0
                  ? "Mandatory"
                  : "Optional"
              }) added!`,
            });
            this.newProduct = {
              name: "",
              option: "",
            };
          }
        }
      );
    },
    handleDeleteCompliancyClick(compliancy) {
      this.deleteCompliancyById(compliancy.compliancyid, (result) => {
        if (result.data.affectedRows === 1) {
          this.$message({
            type: "success",
            message: `Compliancy state ${compliancy.compliancy_name} deleted!`,
          });
        } else {
          this.$message({
            type: "warning",
            message: `Compliancy state ${compliancy.compliancy_name} was in-use!`,
          });
        }
      });
    },
    handleEditCompliancyClick(compliancy) {
      this.editCompliancy(compliancy, (result) => {
        if (result.data.affectedRows === 1) {
          this.$message({
            type: "success",
            message: `Compliancy state ${compliancy.compliancy_name} updated!`,
          });
        }
      });
    },
    handleNewCompliancyClick() {
      this.addCompliancy(
        {
          compliancy: this.newCompliancy,
        },
        (result) => {
          if (result.data.affectedRows === 1) {
            this.$message({
              type: "success",
              message: `New compliancy state (${this.newCompliancy}) added!`,
            });
            this.newCompliancy = "";
          }
        }
      );
    },
    handleDeleteProgramClick(program) {
      this.deleteProgramById(program.programid, (result) => {
        if (result.data.affectedRows === 1) {
          this.$message({
            type: "success",
            message: `Program ${program.program_name} deleted!`,
          });
        } else {
          this.$message({
            type: "warning",
            message: `Program ${program.program_name} was in-use!`,
          });
        }
      });
    },
    handleEditProgramClick(program) {
      this.editProgram(program, (result) => {
        if (result.data.affectedRows === 1) {
          this.$message({
            type: "success",
            message: `Program ${program.program_name} updated!`,
          });
        }
      });
    },
    handleNewProgramClick() {
      this.addProgram(
        {
          program: this.newProgram,
        },
        (result) => {
          if (result.data.affectedRows === 1) {
            this.$message({
              type: "success",
              message: `New program (${this.newProgram}) added!`,
            });
            this.newProgram = "";
          }
        }
      );
    },
    onConfirmPassword() {
      if (this.formPassword.newPassword === this.formPassword.confirmPassword) {
        const userid = this.$store.state.user.userid;

        const data = JSON.stringify({
          userid,
          oldPassword: this.formPassword.password,
          password: this.formPassword.newPassword,
        });
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

        this.setUserPassword(
          {
            a: userid,
            b: encrypted,
            c: key,
            d: iv,
          },
          (result) => {
            if (result.data.error === "logout") {
              this.$router.push("/login");
            } else if (result.data.affectedRows === 1) {
              this.$message({
                type: "success",
                message: `Password changed!`,
              });
            } else {
              this.$message.error("Please confirm your old password.");
            }
          }
        );
      } else {
        this.$message.error("Please confirm your new password.");
      }
    },
    onCancelPassword() {
      this.formPassword = {
        password: "",
        newPassword: "",
        confirmPassword: "",
      };
    },
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
  .el-select
    margin-right 20px
    .el-input__inner
      width auto

>>> .el-input-group__prepend
  button.el-button--success
    color #FFF
    background-color #67C23A
    border-radius 4px 0 0 4px
</style>