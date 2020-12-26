<template>
  <div class="calendar">
    <el-calendar>
      <template slot="dateCell" slot-scope="{ date, data }">
        <div v-if="data.type != 'current-month'">
          {{ date.getDate() }}
          {{ data.isSelected ? "✔️" : "" }}
          <span class="dot">{{ dateCount(data.day) }}</span>
        </div>
        <el-popover
          placement="bottom"
          width="500"
          trigger="click"
          v-if="data.type === 'current-month'"
          @show="handlePopShow(data.day)"
        >
          <el-table
            :data="gridData"
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
          </el-table>
          <div slot="reference" style="height: 100%">
            {{ date.getDate() }}
            {{ data.isSelected ? "✔️" : "" }}
            <span class="dot">{{ dateCount(data.day) }}</span>
          </div>
        </el-popover>
      </template>
    </el-calendar>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "calendar",
  data() {
    return {
      gridData: [],
    };
  },
  mounted() {
    this.getAttendancelist();
    this.getAttendanceDateCount();
  },
  computed: {
    _gridData(date) {
      return function (params) {
        return this.getAttendanceByDate(params);
      };
    },
    dateCount() {
      return function (date) {
        const list = this.attendanceDateCount.filter(
          (item) =>
            moment(date).subtract(1, "days").format("YYYY-MM-DD") ===
            moment(item.date).format("YYYY-MM-DD")
        );
        if (list.length > 0) {
          return list[0].count || 0;
        }
        return "";
      };
    },
  },
  methods: {
    handlePopShow(date) {
      this.gridData = this.getAttendanceByDate(
        moment(date).subtract(1, "days").format("YYYY-MM-DD")
      );
    },
  },
};
</script>

<style lang="stylus" scoped>
.calendar
  padding 20px
  background-color #ffffff

.form
  max-width 747px
  margin 0 auto

.is-selected
  color #1989FA

>>> .el-table__empty-block
  justify-content left
  padding-left 10px

>>> .el-table__empty-text
  text-align left

.dot
  display inline-block
  font-size 0.8rem
  line-height 1.5
  padding 0 0.25rem
  border-radius 0.25rem
  background-color #ff6666
  color #ffffff
</style>