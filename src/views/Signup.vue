<template>
  <div class="signup">
    <el-dialog
      width="80%"
      title="Search customer"
      :visible.sync="dialogFormVisible"
      @close="handleDialogClose"
    >
      <el-dialog
        top="20vh"
        width="65%"
        title="Select one customer"
        :visible.sync="dialogFormInnerVisible"
        append-to-body
      >
        <el-table
          :data="dialogFormInnerTable"
          max-height="500"
          highlight-current-row
          @current-change="handleInnerTableCurrentChange"
          style="width: 100%"
        >
          <el-table-column
            show-overflow-tooltip
            sortable
            prop="first_name"
            label="First Name"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            sortable
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
            prop="email"
            label="Email"
          ></el-table-column>
        </el-table>
        <div v-if="dialogFormInnerSelect" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleDialogInnerSelect">
            Select
          </el-button>
        </div>
      </el-dialog>
      <el-form :model="dialogForm">
        <el-form-item label="First Name">
          <el-input
            v-model="dialogForm.firstname"
            placeholder="First Name"
          ></el-input>
        </el-form-item>
        <el-form-item label="Last Name">
          <el-input
            v-model="dialogForm.lastname"
            placeholder="Last Name"
          ></el-input>
        </el-form-item>
        <el-form-item label="Telephone">
          <el-input
            v-model="dialogForm.telephone"
            placeholder="Telephone"
          ></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input
            v-model="dialogForm.email"
            placeholder="Email"
            type="email"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleDialogSearch">
          Search
        </el-button>
      </div>
    </el-dialog>
    <el-form
      :inline="false"
      :model="form"
      ref="form"
      class="form"
      :label-width="isNarrow ? '' : '160px'"
    >
      <el-form-item>
        <el-switch
          v-model="form.action"
          inactive-text="New Customer"
          active-text="Edit Customer"
          @change="handleActionChange"
        >
        </el-switch>
      </el-form-item>
      <el-form-item required prop="firstname" label="First Name">
        <el-input v-model="form.firstname" placeholder="First Name"></el-input>
      </el-form-item>
      <el-form-item required prop="lastname" label="Last Name">
        <el-input v-model="form.lastname" placeholder="Last Name"></el-input>
      </el-form-item>
      <el-form-item required prop="telephone" label="Telephone">
        <el-input v-model="form.telephone" placeholder="Telephone"></el-input>
      </el-form-item>
      <el-form-item required prop="goalDate" label="Goal Date">
        <el-date-picker
          v-model="form.goalDate"
          type="date"
          placeholder="Pick a date"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="email" label="Email">
        <el-input
          v-model="form.email"
          placeholder="Email"
          type="email"
        ></el-input>
      </el-form-item>
      <el-form-item required prop="program" label="Program Type">
        <el-select v-model="form.program" placeholder="Program Type">
          <el-option
            v-for="program in $store.state.programlist"
            :label="program.program_name"
            :value="program.programid"
            :key="program.programid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="reason" label="Reason for Joining">
        <el-input
          type="textarea"
          v-model="form.reason"
          placeholder="Reason for Joining"
          :show-word-limit="true"
          maxlength="512"
          :rows="3"
        ></el-input>
      </el-form-item>
      <el-form-item required prop="product" label="Product Use">
        <el-select v-model="form.product" placeholder="Product Use">
          <el-option
            v-for="product in $store.state.productlist"
            :label="product.product_name"
            :value="product.productid"
            :key="product.productid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item required prop="recommend" label="Recommended">
        <el-select v-model="form.recommend" placeholder="Recommended">
          <el-option
            v-for="product in $store.state.productlist"
            :label="product.product_name"
            :value="product.productid"
            :key="product.productid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item required prop="startDate" label="Start Date">
        <el-date-picker
          v-model="form.startDate"
          type="date"
          placeholder="Pick a date"
        ></el-date-picker>
      </el-form-item>
      <el-form-item required prop="startWeight" label="Start Weight (lb)">
        <el-input-number
          v-model="form.startWeight"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item required prop="goalWeight" label="Goal Weight (lb)">
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
        <el-button v-if="isEdit" type="danger" @click="onInactivate"
          >Inactivate</el-button
        >
        <el-button type="info" @click="onCancel">Clear Form</el-button>
      </el-form-item>
    </el-form>
    <!--
    <el-divider v-if="customerList.length > 0 && !isEdit"></el-divider>
    <el-table
      v-if="customerList.length > 0 && !isEdit"
      :data="customerList"
      border
      style="width: 100%"
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
    -->
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Signup",
  data() {
    return {
      dialogFormVisible: false,
      dialogFormInnerVisible: false,
      dialogFormInnerTable: [],
      dialogFormInnerSelect: null,
      dialogForm: {
        firstname: "",
        lastname: "",
        telephone: "",
        email: "",
      },
      customerId: 0,
      form: {
        action: false,
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
    this.getProgramlist();
    this.getProductlist();
    this.getCompliancylist();
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
      this.$refs.form.validate((flag) => {
        if (flag) {
          this.addCustomer(this.form, (result) => {
            if (result.data.data) {
              this.$message({
                message: "Create successfully!",
                type: "success",
              });
            }
          });
        }
      });
    },
    handleEditClick(row) {
      this.isEdit = true;
      this.editId = row.customerid;
      this.form = {
        action: true,
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
      this.$refs.form.validate((flag) => {
        if (flag) {
          this.editCustomer(
            {
              ...this.form,
              customerid: this.customerId,
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
        }
      });
    },
    onCancel() {
      this.dialogFormInnerTable = [];
      this.dialogFormInnerSelect = null;
      this.isEdit = false;
      this.customerId = 0;
      this.form = {
        action: false,
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
      this.$refs.form.resetFields();
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