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
            :value="program.program_id"
            :key="program.program_id"
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
            :value="product.product_id"
            :key="product.product_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Recommended">
        <el-select v-model="form.recommend" placeholder="Recommended">
          <el-option
            v-for="product in $store.state.productlist"
            :label="product.product_name"
            :value="product.product_id"
            :key="product.product_id"
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
          :max="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Goal Weight">
        <el-input-number
          v-model="form.goalWeight"
          :precision="2"
          :step="0.01"
          :max="0"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Sign Up</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-table :data="tableData" border style="width: 100%"
    max-height="500">
      <el-table-column show-overflow-tooltip sortable width="150px" prop="first_name" label="First Name"></el-table-column>
      <el-table-column show-overflow-tooltip sortable width="150px" prop="last_name" label="Last Name"></el-table-column>
      <el-table-column show-overflow-tooltip sortable width="120px" prop="telephone" label="Telephone"></el-table-column>
      <el-table-column show-overflow-tooltip sortable width="120px" prop="goal_date" label="Goal Date"></el-table-column>
      <el-table-column show-overflow-tooltip sortable width="150px" prop="email" label="Email"></el-table-column>
      <el-table-column show-overflow-tooltip sortable width="200px" label="Program Type">
        <template slot-scope="scope">
          {{
            $store.state.programlist.filter(
              (p) => p.program_id === scope.row.program_id
            )[0].program_name
          }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable width="180px" prop="reason" label="Reason for Joining"></el-table-column>
      <el-table-column show-overflow-tooltip sortable width="150px" label="Product Use">
        <template slot-scope="scope">
          {{
            $store.state.productlist.filter(
              (p) => p.product_id === scope.row.product_id
            )[0].product_name
          }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable width="150px" label="Recommended">
        <template slot-scope="scope">
          {{
            $store.state.productlist.filter(
              (p) => p.product_id === scope.row.recommend
            )[0].product_name
          }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable width="120px" prop="start_date" label="Start Date"></el-table-column>
      <el-table-column show-overflow-tooltip sortable width="150px" prop="start_weight" label="Start Weight"></el-table-column>
      <el-table-column show-overflow-tooltip sortable width="150px" prop="goal_weight" label="Goal Weight"></el-table-column>
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
      tableData: [],
    };
  },
  mounted() {
    this.getCustomerlist();
  },
  methods: {
    getCustomerlist() {
      this.$http
        .get(this.constants.string.server_base + "api/customerlist")
        .then((result) => {
          this.tableData = result.data;
        });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      console.log(row);
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