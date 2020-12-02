import _moment from "moment";

export default {
  data() {
    return {
      customerList: [],
      customerPhone: [],
      attendanceList: [],
      measurementList: []
    };
  },
  computed: {
    moment(str) {
      return function(params) {
        return _moment(params).format("YYYY-MM-DD");
      };
    },
    productName(product_id) {
      return function(params) {
        const product = this.$store.state.productlist.filter(
          (p) => p.productid === params
        );
        if (product.length === 1) {
          return product[0].product_name;
        }
        return "";
      };
    },
    programName(program_id) {
      return function(params) {
        const program = this.$store.state.programlist.filter(
          (p) => p.programid === params
        );
        if (program.length === 1) {
          return program[0].program_name;
        }
        return "";
      };
    },
    compliancyName(compliancy_id) {
      return function(params) {
        const compliancy = this.$store.state.compliancylist.filter(
          (p) => p.compliancyid === params
        );
        if (compliancy.length === 1) {
          return compliancy[0].compliancy_name;
        }
        return "";
      };
    }
  },
  methods: {
    getProgramlist() {
      if (this.$store.state.programlist.length < 1) {
        this.$http
          .get(this.constants.string.server_base + "program/all")
          .then((result) => {
            this.$store.dispatch("setProgramlist", result.data.data);
          });
      }
    },
    getProductlist() {
      if (this.$store.state.productlist.length < 1) {
        this.$http
          .get(this.constants.string.server_base + "product/all")
          .then((result) => {
            this.$store.dispatch("setProductlist", result.data.data);
          });
      }
    },
    getCompliancylist() {
      if (this.$store.state.compliancylist.length < 1) {
        this.$http
          .get(this.constants.string.server_base + "compliancy/all")
          .then((result) => {
            this.$store.dispatch("setCompliancylist", result.data.data);
          });
      }
    },
    getCustomerlist() {
      this.$http
        .get(this.constants.string.server_base + "customer/all")
        .then((result) => {
          this.customerList = result.data.data;
        });
    },
    getCustomerPhone() {
      this.$http
        .get(this.constants.string.server_base + "customer/phone")
        .then((result) => {
          this.customerPhone = result.data.data;
        });
    },
    getAttendancelist() {
      this.$http
        .get(this.constants.string.server_base + "attendance/all")
        .then((result) => {
          this.attendanceList = result.data.data;
        });
    },
    getAttendanceById(id) {
      this.$http
        .get(this.constants.string.server_base + `attendance/customer/${id}`)
        .then((result) => {
          this.attendanceList = result.data.data;
        });
    },
    getAttendanceByDate(date) {
      return this.attendanceList.filter(p => _moment(p.date).format("YYYY-MM-DD") == date);
    },
    getMeasurementlist() {
      this.$http
        .get(this.constants.string.server_base + "measurement/all")
        .then((result) => {
          this.measurementList = result.data.data;
        });
    },
    getMeasurementById(id) {
      this.$http
        .get(this.constants.string.server_base + `measurement/customer/${id}`)
        .then((result) => {
          this.measurementList = result.data.data;
        });
    },
    addCustomer(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "customer/add", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.customerList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    editCustomer(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "customer/edit", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.customerList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    deleteCustomer(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "customer/deactivate", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.customerList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    }
  }
};
