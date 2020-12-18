<template>
  <div class="weightTrack">
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
      <el-form-item label="Date Range">
        <el-date-picker
          v-model="form.date"
          type="daterange"
          unlink-panels
          range-separator="To"
          start-placeholder="Start Date"
          end-placeholder="End Date"
          :picker-options="pickerOptions"
          @change="handleDateChange"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button v-if="form.customer" type="primary" @click="onSubmit"
          >Track</el-button
        >
        <el-button v-if="form.customer" type="info" @click="onCancel"
          >Clear Form</el-button
        >
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <v-chart
      :options="polar"
      autoresize
    ></v-chart>
    <el-divider></el-divider>
    <el-table
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
        prop="weight"
        label="Weight"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from "moment";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/dataset";

export default {
  name: "weightTrack",
  components: {
    "v-chart": ECharts,
  },
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
        startDate: "1900-01-01",
        endDate: "2100-12-31",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "Latest Week",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Latest Month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Latest 4 Mon.",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 120);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      polar: {
        // Make gradient line here
        visualMap: {
          show: false,
          type: "continuous",
          dimension: 0,
          min: 0,
          max: 0, // dateList.length - 1,
        },
        title: {
          left: "center",
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: [], // dateList,
        },
        yAxis: {
          splitLine: { show: false },
        },
        series: {
          type: "line",
          showSymbol: false,
          data: [], // valueList,
        },
      },
    };
  },
  mounted() {
    if (parseInt(this.$store.state.cid)) {
      this.getCustomerById(this.$store.state.cid, (result) => {
        if (result.data && result.data.length === 1) {
          const c = result.data[0];
          this.customerString = `${c.first_name} ${c.last_name} (${c.telephone}, ${c.email})`;
          this.form.customer = this.$store.state.cid;
        }
      });
    }
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
          this.$store.dispatch("setCID", c.customerid);
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
      this.getAttendanceByDateRange(
        {
          startDate: this.form.startDate,
          endDate: this.form.endDate,
          customerid: this.form.customer,
        },
        (result) => {
          if (result.data.data) {
            const dateList = result.data.data.map((item) => {
              return moment(item.date).format("YYYY-MM-DD");
            });
            const valueList = result.data.data.map((item) => {
              return item.weight;
            });
            this.polar.visualMap.max = dateList.length - 1;
            this.polar.xAxis.data = dateList;
            this.polar.series.data = valueList;
            this.polar.title.text = valueList.length > 0 ? `Weight Change: ${valueList[valueList.length - 1] - valueList[0]}` : 'No Data';

            this.$message({
              message: `View from ${this.form.startDate} to ${this.form.endDate}`,
              type: "success",
            });
          }
        }
      );
    },
    onConfirm() {},
    onCancel() {},
    handleDateChange(dates) {
      if (dates !== null && dates.length === 2) {
        this.form.startDate = moment(dates[0]).format("YYYY-MM-DD");
        this.form.endDate = moment(dates[1]).format("YYYY-MM-DD");
      } else {
        this.form.startDate = "1900-01-01";
        this.form.endDate = "2100-12-31";
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.weightTrack
  padding 20px
  background-color #ffffff

.form
  max-width 747px
  margin 0 auto
</style>

<style lang="stylus">
.echarts
  width 100%
  height 300px
</style>