<template>
  <div class="attendance">
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
    <el-form :inline="false" :model="form" class="form" label-width="150px">
      <el-form-item label="Customer">
        <el-button type="default" @click="onSelectCustomerClick">
          {{ customerString }}
        </el-button>
      </el-form-item>
      <el-form-item label="Date">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a date"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="Weight">
        <el-input-number
          v-model="form.weight"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Product">
        <el-select
          v-model="form.product"
          filterable
          placeholder="Select your customer"
        >
          <el-option
            v-for="compliancy in $store.state.compliancylist"
            :key="compliancy.compliancyid"
            :label="compliancy.compliancy_name"
            :value="compliancy.compliancyid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Cardio">
        <el-input v-model="form.cardio" placeholder="Cardio"></el-input>
      </el-form-item>
      <el-form-item label="Comments">
        <el-input
          type="textarea"
          v-model="form.comment"
          placeholder="Comments"
          :show-word-limit="true"
          maxlength="512"
          :rows="3"
        ></el-input>
      </el-form-item>
      <el-form-item label="DTR">
        <el-date-picker
          v-model="form.dtr"
          type="date"
          placeholder="Pick a date"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="!isEdit && form.customer"
          type="primary"
          @click="onSubmit"
          >Check In</el-button
        >
        <el-button v-if="isEdit" type="primary" @click="onConfirm"
          >Confirm</el-button
        >
        <el-button v-if="isEdit || form.customer" type="info" @click="onCancel"
          >Clear Form</el-button
        >
      </el-form-item>
    </el-form>
    <el-divider v-if="attendanceList.length > 0 && !isEdit"></el-divider>
    <el-table
      v-if="attendanceList.length > 0 && !isEdit"
      :data="attendanceList"
      border
      style="width: 100%"
      max-height="500"
    >
      <el-table-column
        show-overflow-tooltip
        sortable
        width="120px"
        prop="date"
        label="Date"
      >
        <template slot-scope="scope">
          {{ moment(scope.row.date) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="150px"
        prop="weight"
        label="Weight"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="180px"
        label="Product"
      >
        <template slot-scope="scope">
          {{ compliancyName(scope.row.compliancyid) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="180px"
        prop="cardio"
        label="Cardio"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="180px"
        prop="comment"
        label="Comments"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="160px"
        label="Due to Return"
      >
        <template slot-scope="scope">
          {{ moment(scope.row.dtr) }}
        </template>
      </el-table-column>
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
import moment from "moment";

export default {
  name: "attendance",
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
      customerString: "Search a customer",
      form: {
        customer: 0,
        date: "",
        weight: "",
        product: "",
        cardio: "",
        comment: "",
        dtr: "",
      },
      isEdit: false,
      editId: 0,
    };
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
          this.form.customer = c.customerid;
          this.getAttendanceById(c.customerid);
          this.customerString = `${c.first_name} ${c.last_name} (${c.telephone}, ${c.email})`;
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
      this.dialogFormInnerTable = [];
      this.dialogFormInnerSelect = null;
    },
    onSelectCustomerClick() {
      this.dialogFormVisible = true;
    },
    onSubmit() {
      this.addAttendance(
        {
          ...this.form,
          customerid: this.form.customer,
        },
        (result) => {
          if (result.data.data) {
            this.$message({
              message: "Checked in!",
              type: "success",
            });
          }
        }
      );
    },
    handleCustomerSelect(id) {
      this.getAttendanceById(id);
    },
    handleEditClick(row) {
      this.isEdit = true;
      this.editId = row.attendanceid;
      this.form = {
        customer: row.customerid,
        date: moment(row.date).format("YYYY-MM-DD"),
        weight: row.weight,
        product: row.compliancyid,
        cardio: row.cardio,
        comment: row.comment,
        dtr: moment(row.dtr).format("YYYY-MM-DD"),
      };
    },
    onConfirm() {
      this.editAttendance(
        {
          ...this.form,
          customerid: this.form.customer,
          attendanceid: this.editId,
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
      const c = this.form.customer;
      this.form = {
        customer: c,
        date: "",
        weight: "",
        product: "",
        cardio: "",
        comment: "",
        dtr: "",
      };
      this.getAttendanceById(c);
      this.isEdit = false;
      this.editId = 0;
    },
    handleDeleteClick(row) {
      this.$confirm(
        `Record ${moment(row.date).format("YYYY-MM-DD")} (Weight: ${
          row.weight
        }) will be deleted`,
        "Delete",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "danger",
        }
      )
        .then(() => {
          this.deleteAttendance(
            row.attendanceid,
            {
              customerid: this.form.customer,
            },
            (result) => {
              if (result.data.affectedRows === 1) {
                this.$message({
                  type: "success",
                  message: `Record ${moment(row.date).format(
                    "YYYY-MM-DD"
                  )} (Weight: ${row.weight}) deleted!`,
                });
              }
            }
          );
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="stylus" scoped>
.attendance
  padding 20px
  background-color #ffffff

.form
  max-width 747px
  margin 0 auto
</style>