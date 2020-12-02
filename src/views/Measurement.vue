<template>
  <div class="measurement">
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
      <el-form-item label="PHC Initial" v-if="form.customer">
        <el-input
          v-model="form.phcInitial"
          placeholder="PHC Initial"
        ></el-input>
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
      <el-form-item label="Bust/Chest" v-if="form.customer">
        <el-input-number
          v-model="form.bustChest"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Waist" v-if="form.customer">
        <el-input-number
          v-model="form.waist"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Mid Section" v-if="form.customer">
        <el-input-number
          v-model="form.midSection"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Hips" v-if="form.customer">
        <el-input-number
          v-model="form.hips"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Right Arm" v-if="form.customer">
        <el-input-number
          v-model="form.rightArm"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Right Thigh" v-if="form.customer">
        <el-input-number
          v-model="form.rightThigh"
          :precision="2"
          :step="0.01"
          :min="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button v-if="!isEdit" type="primary" @click="onSubmit"
          >Submit</el-button
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
  name: "measurement",
  data() {
    return {
      form: {
        customer: "",
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
  mounted() {
    this.getMeasurementlist();
    this.getCustomerPhone();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleCustomerSelect(id) {
      this.getMeasurementById(id);
    },
    handleEditClick(row) {},
    onConfirm() {},
    onCancel() {
      this.form = {
        customer: "",
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
      this.getMeasurementlist();
    },
    handleDeleteClick(row) {},
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