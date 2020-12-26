<template>
  <div class="user">
    <el-form
      :inline="false"
      :model="form"
      class="form"
      :label-width="isNarrow ? '' : '110px'"
    >
      <el-form-item label="Username">
        <el-input v-model="form.username" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item label="First Name">
        <el-input v-model="form.firstname" placeholder="First Name"></el-input>
      </el-form-item>
      <el-form-item label="Last Name">
        <el-input v-model="form.lastname" placeholder="Last Name"></el-input>
      </el-form-item>
      <el-form-item label="Admin Level" :class="{ labelNoFloat: isNarrow }">
        <el-slider
          class="slider"
          v-model="form.adminLevel"
          :min="-1"
          :max="1"
          show-stops
          :marks="{
            '-1': {
              style: {
                transform: 'translateX(0)',
                marginTop: '2px',
              },
              label: 'Highest',
            },
            '1': {
              style: {
                transform: 'translateX(-100%)',
                marginTop: '2px',
              },
              label: 'Normal',
            },
          }"
        ></el-slider>
      </el-form-item>
      <el-form-item>
        <el-button v-if="!isEdit" type="primary" @click="onSubmit"
          >Register</el-button
        >
        <el-button v-if="isEdit" type="primary" @click="onConfirm"
          >Confirm</el-button
        >
        <el-button type="info" @click="onCancel">Clear Form</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-table :data="userList" border style="width: 100%">
      <el-table-column
        show-overflow-tooltip
        sortable
        width="150px"
        prop="first_name"
        label="First Name"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="150px"
        prop="last_name"
        label="Last Name"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="130px"
        prop="name"
        label="Username"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="130px"
        label="Start Date"
      >
        <template slot-scope="scope">
          {{ moment(scope.row.startdate) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        min-width="160px"
        prop="permission"
        label="Permission"
      ></el-table-column>
      <el-table-column fixed="right" label="Operation" width="300">
        <template slot-scope="scope">
          <el-button
            @click="handleEditClick(scope.row)"
            type="primary"
            size="small"
          >
            Edit
          </el-button>
          <el-button
            @click="handleDeleteClick(scope.row)"
            type="danger"
            size="small"
          >
            Inactivate
          </el-button>
          <el-button
            @click="handleResetClick(scope.row)"
            type="info"
            size="small"
          >
            Reset Password
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "User",
  data() {
    return {
      customerId: 0,
      form: {
        username: "",
        firstname: "",
        lastname: "",
        adminLevel: 0,
      },
      isEdit: false,
      editId: 0,
    };
  },
  mounted() {
    this.getUserlist();
  },
  methods: {
    handleDialogInnerSelect() {
      const c = this.dialogFormInnerSelect;
      this.$confirm(
        `${c.first_name} ${c.last_name} (${c.telephone}, ${c.email})`,
        "Confirm customer",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "info",
        }
      )
        .then(() => {
          this.isEdit = true;
          this.customerId = c.customerid;
          this.form = {
            action: true,
            firstname: c.first_name,
            lastname: c.last_name,
            telephone: c.telephone,
            goalDate: moment(c.goal_date).add(1, "d").format("YYYY-MM-DD"),
            email: c.email,
            program: c.programid,
            reason: c.reason,
            product: c.productid,
            recommend: c.recommend,
            startDate: moment(c.start_date).add(1, "d").format("YYYY-MM-DD"),
            startWeight: c.start_weight,
            goalWeight: c.goal_weight,
          };
          this.dialogFormVisible = false;
          this.dialogFormInnerVisible = false;
          this.dialogFormInnerSelect = null;
        })
        .catch(() => {});
    },
    handleInnerTableCurrentChange(row) {
      this.dialogFormInnerSelect = row;
    },
    handleDialogSearch() {
      this.searchCustomer(this.dialogForm, (result) => {
        if (result.data) {
          if (result.data.length === 1) {
            this.handleInnerTableCurrentChange(result.data[0]);
            this.handleDialogInnerSelect();
          } else if (result.data.length > 1) {
            this.dialogFormInnerTable = result.data;
            this.dialogFormInnerVisible = true;
          }
        }
      });
    },
    handleDialogClose() {
      if (parseInt(this.customerId) === 0) {
        this.form.action = false;
      }
      this.dialogFormInnerTable = [];
      this.dialogFormInnerSelect = null;
    },
    handleActionChange(flag) {
      this.dialogFormVisible = flag;
      if (!flag) {
        this.onCancel();
      }
    },
    onSubmit() {
      this.addUser(this.form, (result) => {
        if (result.data.data) {
          this.$message({
            message: "Create successfully!",
            type: "success",
          });
        }
      });
    },
    handleEditClick(row) {
      this.isEdit = true;
      this.editId = row.userid;
      let adminLevel = 0;
      if (row.permission.includes("ADMIN:-1")) {
        adminLevel = -1;
      } else if (row.permission.includes("ADMIN:1")) {
        adminLevel = 1;
      }
      this.form = {
        username: row.name,
        firstname: row.first_name,
        lastname: row.last_name,
        adminLevel,
      };
    },
    onConfirm() {
      this.editUser(
        {
          ...this.form,
          userid: this.editId,
        },
        (result) => {
          if (result.data.affectedRows === 1) {
            this.$message({
              message: "Updated!",
              type: "success",
            });
            this.onCancel();
          }
        }
      );
    },
    onCancel() {
      this.isEdit = false;
      this.customerId = 0;
      this.form = {
        username: "",
        firstname: "",
        lastname: "",
        adminLevel: 0,
      };
      this.getUserlist();
    },
    onInactivate() {
      this.$confirm(
        `${this.form.firstname} ${this.form.lastname} (${this.form.telephone}, ${this.form.email}) will be inactivated`,
        "Inactivcate",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "danger",
          center: true,
        }
      )
        .then(() => {
          this.deleteCustomerById(this.customerId, (result) => {
            if (result.data.affectedRows === 1) {
              this.$message({
                type: "success",
                message: `${this.form.firstname} ${this.form.lastname} (${this.form.telephone}, ${this.form.email}) inactivated!`,
              });
            }
          });
        })
        .catch(() => {});
    },
    handleDeleteClick(row) {
      this.$confirm(
        `User ${row.first_name} ${row.last_name} (username: ${row.name}) will be inactivated`,
        "inactivate",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "danger",
        }
      )
        .then(() => {
          this.deleteUserById(row.userid, (result) => {
            if (result.data.affectedRows === 1) {
              this.$message({
                type: "success",
                message: `User ${row.first_name} ${row.last_name} (username: ${row.name}) inactivated!`,
              });
            }
          });
        })
        .catch(() => {});
    },
    handleResetClick(row) {
      this.$confirm(
        `Password for User ${row.first_name} ${row.last_name} (username: ${row.name}) will be reset`,
        "Reset password",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "danger",
        }
      )
        .then(() => {
          this.resetUserPasswordById(row.userid, (result) => {
            if (result.data.affectedRows === 1) {
              this.$message({
                type: "success",
                message: `Password for User ${row.first_name} ${row.last_name} (username: ${row.name}) reset to ${result.data.plain}!`,
              });
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="stylus" scoped>
.user
  padding 20px
  background-color #ffffff

.form
  max-width 747px
  margin 0 auto

.slider
  margin-left 10px
  margin-right 10px

.labelNoFloat
  >>> .el-form-item__label
    float none
</style>