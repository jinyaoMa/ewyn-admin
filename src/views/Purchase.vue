<template>
  <div class="purchase">
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
      :label-width="isNarrow ? '' : '90px'"
    >
      <el-form-item label="Customer">
        <el-button type="default" @click="onSelectCustomerClick">
          {{ customerString }}
        </el-button>
      </el-form-item>
      <el-form-item required prop="week" label="Week">
        <el-input-number
          v-model="form.week"
          :precision="0"
          :step="1"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item required prop="product" label="Products">
        <el-select
          v-model="form.product"
          placeholder="Product to purchase"
          filterable
        >
          <el-option
            v-for="product in $store.state.productlist"
            :label="`${product.product_name} (${
              parseInt(product.optional) === 0 ? 'Mandatory' : 'Optional'
            })`"
            :value="product.productid"
            :key="product.productid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Due Date">
        <el-date-picker
          v-model="form.dueDate"
          type="date"
          placeholder="Pick a date"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="Sold Date">
        <el-date-picker
          v-model="form.soldDate"
          type="date"
          placeholder="Pick a date"
        ></el-date-picker>
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
    <el-table
      :data="weeklyPurchaselist"
      border
      style="width: 100%"
      row-key="purchaseid"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        show-overflow-tooltip
        sortable
        fixed="left"
        width="90px"
        prop="week"
        label="Week"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        min-width="150px"
        prop="product_name"
        label="Products"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="120px"
        prop="optional"
        label="Option"
      >
        <template slot-scope="scope">
          <el-tag
            :type="parseInt(scope.row.optional) === 0 ? 'success' : 'default'"
          >
            {{ parseInt(scope.row.optional) === 0 ? "Mandatory" : "Optional" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="160px"
        label="Due Date"
      >
        <template slot-scope="scope">
          {{ moment(scope.row.due_date) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        sortable
        width="160px"
        label="Sold Date"
      >
        <template slot-scope="scope">
          {{ moment(scope.row.sold_date) }}
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
  name: "purchase",
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
        week: 1,
        product: "",
        dueDate: "",
        soldDate: "",
      },
      isEdit: false,
      editId: 0,
    };
  },
  mounted() {
    this.getProgramlist();
    this.getProductlist();
    this.getCompliancylist();
    if (parseInt(this.$store.state.cid)) {
      this.getCustomerById(this.$store.state.cid, (result) => {
        if (result.data && result.data.length === 1) {
          const c = result.data[0];
          this.customerString = `${c.first_name} ${c.last_name} (${c.telephone}, ${c.email})`;
          this.form.customer = this.$store.state.cid;
          this.getPurchaseById(c.customerid);
        }
      });
    }
  },
  computed: {
    weeklyPurchaselist() {
      const result = [];
      this.purchaseList.forEach((item) => {
        const resultItemIndex = result.findIndex((i) => i.week === item.week);
        if (resultItemIndex >= 0) {
          if (typeof result[resultItemIndex].children === "undefined") {
            result[resultItemIndex].children = [];
          }
          result[resultItemIndex].children.push(item);
        } else {
          result.push(item);
        }
      });
      return result;
    },
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
          this.getPurchaseById(c.customerid);
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
    handleEditClick(row) {
      this.isEdit = true;
      this.editId = row.purchaseid;
      this.form = {
        customer: row.customerid,
        week: row.week,
        product: row.productid,
        dueDate: moment(row.due_date).add(1, "d").format("YYYY-MM-DD"),
        soldDate: moment(row.sold_date).add(1, "d").format("YYYY-MM-DD"),
      };
    },
    handleDeleteClick(row) {
      this.$confirm(
        `Record Week ${row.week} (Product: ${row.product_name}) will be deleted`,
        "Delete",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "danger",
        }
      )
        .then(() => {
          this.deletePurcahse(
            row.purchaseid,
            {
              customerid: this.form.customer,
            },
            (result) => {
              if (result.data.affectedRows === 1) {
                this.$message({
                  type: "success",
                  message: `Record Week ${row.week} (Product: ${row.product_name}) deleted!`,
                });
              }
            }
          );
        })
        .catch(() => {});
    },
    onSubmit() {
      this.$refs.form.validate((flag) => {
        if (flag) {
          this.addPurcahse(
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
        }
      });
    },
    onConfirm() {
      this.$refs.form.validate((flag) => {
        if (flag) {
          this.editPurcahse(
            {
              ...this.form,
              customerid: this.form.customer,
              purchaseid: this.editId,
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
      const c = this.form.customer;
      this.form = {
        customer: c,
        week: 1,
        product: "",
        dueDate: "",
        soldDate: "",
      };
      this.getPurchaseById(c);
      this.isEdit = false;
      this.editId = 0;
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang="stylus" scoped>
.purchase
  padding 20px
  background-color #ffffff

.form
  max-width 747px
  margin 0 auto
</style>