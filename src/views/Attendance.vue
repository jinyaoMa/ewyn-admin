<template>
  <div class="attendance">
    <el-form :inline="false" :model="form" class="form" label-width="150px">
      <el-form-item label="Customer">
        <el-select
          v-model="form.customer"
          filterable
          placeholder="Select your customer"
          @change="handleCustomerSelect"
        >
          <el-option
            v-for="customer in customerPhone"
            :key="customer.customerid"
            :label="`${customer.name} (${customer.telephone})`"
            :value="customer.customerid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Date" v-if="form.customer">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a date"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="Weight" v-if="form.customer">
        <el-input-number
          v-model="form.weight"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Product" v-if="form.customer">
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
      <el-form-item label="Cardio" v-if="form.customer">
        <el-input v-model="form.cardio" placeholder="Cardio"></el-input>
      </el-form-item>
      <el-form-item label="Comments" v-if="form.customer">
        <el-input
          type="textarea"
          v-model="form.comment"
          placeholder="Comments"
          :show-word-limit="true"
          maxlength="512"
          :rows="3"
        ></el-input>
      </el-form-item>
      <el-form-item label="DTR" v-if="form.customer">
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
          >Cancel</el-button
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
        width="200px"
        label="Program"
      >
        <template slot-scope="scope">
          {{ programName(scope.row.programid) }}
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
        width="150px"
        prop="gainLoss"
        label="Gain / Loss"
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
export default {
  name: "attendance",
  data() {
    return {
      form: {
        customer: "",
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
  mounted() {
    this.getAttendancelist();
    this.getCustomerPhone();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleCustomerSelect(id) {
      this.getAttendanceById(id);
    },
    handleEditClick(row) {},
    onConfirm() {},
    onCancel() {
      this.form = {
        customer: "",
        date: "",
        weight: "",
        product: "",
        cardio: "",
        comment: "",
        dtr: "",
      };
      this.getAttendancelist();
    },
    handleDeleteClick(row) {},
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