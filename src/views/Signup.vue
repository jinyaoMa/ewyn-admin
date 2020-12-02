<template>
  <div class="signup">
    <el-form :inline="false" :model="form" class="form" label-width="150px">
      <el-form-item label="First Name">
        <el-input v-model="form.firstname" placeholder="First Name"></el-input>
      </el-form-item>
      <el-form-item label="Last Name">
        <el-input v-model="form.lastname" placeholder="Last Name"></el-input>
      </el-form-item>
      <el-form-item label="Telephone">
        <el-input v-model="form.telephone" placeholder="Telephone"></el-input>
      </el-form-item>
      <el-form-item label="Goal Date">
        <el-date-picker
          v-model="form.goalDate"
          type="date"
          placeholder="Pick a date"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="Email">
        <el-input
          v-model="form.email"
          placeholder="Email"
          type="email"
        ></el-input>
      </el-form-item>
      <el-form-item label="Program Type">
        <el-select v-model="form.program" placeholder="Program Type">
          <el-option
            v-for="program in $store.state.programlist"
            :label="program.program_name"
            :value="program.programid"
            :key="program.programid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Reason for Joining">
        <el-input
          type="textarea"
          v-model="form.reason"
          placeholder="Reason for Joining"
          :show-word-limit="true"
          maxlength="512"
          :rows="3"
        ></el-input>
      </el-form-item>
      <el-form-item label="Product Use">
        <el-select v-model="form.product" placeholder="Product Use">
          <el-option
            v-for="product in $store.state.productlist"
            :label="product.product_name"
            :value="product.productid"
            :key="product.productid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Recommended">
        <el-select v-model="form.recommend" placeholder="Recommended">
          <el-option
            v-for="product in $store.state.productlist"
            :label="product.product_name"
            :value="product.productid"
            :key="product.productid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Start Date">
        <el-date-picker
          v-model="form.startDate"
          type="date"
          placeholder="Pick a date"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="Start Weight">
        <el-input-number
          v-model="form.startWeight"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Goal Weight">
        <el-input-number
          v-model="form.goalWeight"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button v-if="!isEdit" type="primary" @click="onSubmit"
          >Sign Up</el-button
        >
        <el-button v-if="isEdit" type="primary" @click="onConfirm"
          >Confirm</el-button
        >
        <el-button v-if="isEdit" type="info" @click="onCancel"
          >Cancel</el-button
        >
      </el-form-item>
    </el-form>
    <el-divider v-if="customerList.length > 0 && !isEdit"></el-divider>
    <el-table
      v-if="customerList.length > 0 && !isEdit"
      :data="customerList"
      border
      style="width: 100%"
      max-height="500"
    >
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
        prop="telephone"
        label="Telephone"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="130px"
        prop="goal_date"
        label="Goal Date"
      >
        <template slot-scope="scope">
          {{ moment(scope.row.goal_date) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="150px"
        prop="email"
        label="Email"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="200px"
        label="Program Type"
      >
        <template slot-scope="scope">
          {{ programName(scope.row.programid) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="200px"
        prop="reason"
        label="Reason for Joining"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="150px"
        label="Product Use"
      >
        <template slot-scope="scope">
          {{ productName(scope.row.productid) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="160px"
        label="Recommended"
      >
        <template slot-scope="scope">
          {{ productName(scope.row.recommend) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="130px"
        prop="start_date"
        label="Start Date"
      >
        <template slot-scope="scope">
          {{ moment(scope.row.start_date) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="150px"
        prop="start_weight"
        label="Start Weight"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="150px"
        prop="goal_weight"
        label="Goal Weight"
      ></el-table-column>
      <el-table-column fixed="right" label="Operation" width="160">
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
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        telephone: "",
        goalDate: "",
        email: "",
        program: "",
        reason: "",
        product: "",
        recommend: "",
        startDate: "",
        startWeight: 0.0,
        goalWeight: 0.0,
      },
      isEdit: false,
      editId: 0,
    };
  },
  mounted() {
    this.getCustomerlist();
  },
  methods: {
    onSubmit() {
      this.addCustomer(this.form, (result) => {});
    },
    handleEditClick(row) {
      this.isEdit = true;
      this.editId = row.customerid;
      this.form = {
        firstname: row.first_name,
        lastname: row.last_name,
        telephone: row.telephone,
        goalDate: row.goal_date,
        email: row.email,
        program: row.programid,
        reason: row.reason,
        product: row.productid,
        recommend: row.recommend,
        startDate: row.start_date,
        startWeight: row.start_weight,
        goalWeight: row.goal_weight,
      };
    },
    onConfirm() {
      this.editCustomer(
        {
          ...this.form,
          customerid: this.editId,
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
      this.form = {
        firstname: "",
        lastname: "",
        telephone: "",
        goalDate: "",
        email: "",
        program: "",
        reason: "",
        product: "",
        recommend: "",
        startDate: "",
        startWeight: 0.0,
        goalWeight: 0.0,
      };
    },
    handleDeleteClick(row) {
      this.$confirm(
        `Record ${row.first_name} ${row.last_name} (${row.telephone}) will be deleted`,
        "Delete",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "danger",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: `Record ${row.first_name} ${row.last_name} (${row.telephone}) deleted!`,
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="stylus" scoped>
.signup
  padding 20px
  background-color #ffffff

.form
  max-width 747px
  margin 0 auto
</style>