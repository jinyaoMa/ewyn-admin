<template>
  <div class="measurement">
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
      <el-form-item label="PHC Initial">
        <el-input
          v-model="form.phcInitial"
          placeholder="PHC Initial"
        ></el-input>
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
      <el-form-item label="Bust/Chest">
        <el-input-number
          v-model="form.bustChest"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Waist">
        <el-input-number
          v-model="form.waist"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Mid Section">
        <el-input-number
          v-model="form.midSection"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Hips">
        <el-input-number
          v-model="form.hips"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Right Arm">
        <el-input-number
          v-model="form.rightArm"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Right Thigh">
        <el-input-number
          v-model="form.rightThigh"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="!isEdit && form.customer"
          type="primary"
          @click="onSubmit"
          >Submit</el-button
        >
        <el-button v-if="isEdit" type="primary" @click="onConfirm"
          >Confirm</el-button
        >
        <el-button v-if="isEdit || form.customer" type="info" @click="onCancel"
          >Clear Form</el-button
        >
      </el-form-item>
    </el-form>
    <el-divider v-if="measurementList.length > 0 && !isEdit"></el-divider>
    <el-table
      v-if="measurementList.length > 0 && !isEdit"
      :data="measurementList"
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
        prop="phc_initial"
        label="PHC Initial"
      ></el-table-column>
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
        width="150px"
        prop="bust_chest"
        label="Bust/Chest"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="150px"
        prop="waist"
        label="Waist"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="150px"
        prop="mid_section"
        label="Mid Section"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="150px"
        prop="hips"
        label="Hips"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="150px"
        prop="right_arm"
        label="Right vArm"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="150px"
        prop="right_thigh"
        label="Right Thigh"
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
import moment from "moment";

export default {
  name: "measurement",
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
        phcInitial: "",
        weight: "",
        bustChest: "",
        waist: "",
        midSection: "",
        hips: "",
        rightArm: "",
        rightThigh: "",
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
          this.getMeasurementById(c.customerid);
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
      this.addMeasurement(
        {
          ...this.form,
          customerid: this.form.customer,
        },
        (result) => {
          if (result.data.data) {
            this.$message({
              message: "Record added!",
              type: "success",
            });
          }
        }
      );
    },
    handleCustomerSelect(id) {
      this.getMeasurementById(id);
    },
    handleEditClick(row) {
      this.isEdit = true;
      this.editId = row.measurementid;
      this.form = {
        customer: row.customerid,
        date: moment(row.date).format("YYYY-MM-DD"),
        phcInitial: row.phc_initial,
        weight: row.weight,
        bustChest: row.bust_chest,
        waist: row.waist,
        midSection: row.mid_section,
        hips: row.hips,
        rightArm: row.right_arm,
        rightThigh: row.right_thigh,
      };
    },
    onConfirm() {
      this.editMeasurement(
        {
          ...this.form,
          customerid: this.form.customer,
          measurementid: this.editId,
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
        phcInitial: "",
        weight: "",
        bustChest: "",
        waist: "",
        midSection: "",
        hips: "",
        rightArm: "",
        rightThigh: "",
      };
      this.getMeasurementById(c);
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
          this.deleteMeasurement(
            row.measurementid,
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
.measurement
  padding 20px
  background-color #ffffff

.form
  max-width 747px
  margin 0 auto
</style>