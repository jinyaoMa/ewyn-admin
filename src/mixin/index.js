import _moment from "moment";

export default {
  data() {
    return {
      customerList: [],
      customerPhone: [],
      attendanceList: [],
      measurementList: [],
      userList: [],
      programlist: [],
      productlist: [],
      compliancylist: [],
      purchaseList: []
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
    },
    userPermission() {
      if (typeof this.$store.state.user.permission === "string") {
        const matchUser = this.$store.state.user.permission.match(/USER:(\d)/);
        const matchAdmin = this.$store.state.user.permission.match(
          /ADMIN:(\-?\d)/
        );
        const result = {};
        if (matchUser) {
          result.user = parseInt(matchUser[1]);
        }
        if (matchAdmin) {
          result.admin = parseInt(matchAdmin[1]);
        }
        return result;
      }
      return {
        user: 0,
        admin: 0
      };
    }
  },
  methods: {
    logout(id) {
      this.$http
        .get(this.constants.string.server_base + `user/logout/${id}`)
        .then((result) => {
          if (result.data.status === "logout") {
            this.$store.dispatch("setUser", {});
            this.$router.push("/login");
          }
        });
    },
    auth(id, callback) {
      this.$http
        .get(this.constants.string.server_base + `user/auth/${id}`)
        .then((result) => {
          if (result.data.data) {
            this.$store.dispatch("setUser", result.data.data);
          }
          typeof callback === "function" && callback(result);
        });
    },
    login(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "user/login", data)
        .then((result) => {
          typeof callback === "function" && callback(result);
        });
    },
    getUserlist() {
      this.$http
        .get(this.constants.string.server_base + "user/all")
        .then((result) => {
          this.userList = result.data.data;
        });
    },
    getProgramlist() {
      this.$http
        .get(this.constants.string.server_base + "program/all")
        .then((result) => {
          this.programlist = JSON.parse(JSON.stringify(result.data.data));
          this.$store.dispatch("setProgramlist", result.data.data);
        });
    },
    getProductlist() {
      this.$http
        .get(this.constants.string.server_base + "product/all")
        .then((result) => {
          this.productlist = result.data.data;
          this.$store.dispatch("setProductlist", result.data.data);
        });
    },
    getCompliancylist() {
      this.$http
        .get(this.constants.string.server_base + "compliancy/all")
        .then((result) => {
          this.compliancylist = result.data.data;
          this.$store.dispatch("setCompliancylist", result.data.data);
        });
    },
    getCustomerlist() {
      this.$http
        .get(this.constants.string.server_base + "customer/all")
        .then((result) => {
          this.customerList = result.data.data;
        });
    },
    getCustomerById(id, callback) {
      this.$http
        .get(this.constants.string.server_base + `customer/id/${id}`)
        .then((result) => {
          typeof callback === "function" && callback(result.data);
        });
    },
    getCustomerPhone() {
      this.$http
        .get(this.constants.string.server_base + "customer/phone")
        .then((result) => {
          this.customerPhone = result.data.data;
        });
    },
    searchCustomer(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "customer/search", data)
        .then((result) => {
          typeof callback === "function" && callback(result.data);
        });
    },
    getPurchaseById(id) {
      this.$http
        .get(this.constants.string.server_base + `purchase/customer/${id}`)
        .then((result) => {
          this.purchaseList = result.data.data;
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
      if (
        typeof this.attendanceList === "object" &&
        typeof this.attendanceList.length === "number"
      ) {
        return this.attendanceList.filter(
          (p) => _moment(p.date).format("YYYY-MM-DD") == date
        );
      }
      return [];
    },
    getAttendanceByDateRange(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "attendance/dateRange", data)
        .then((result) => {
          this.attendanceList = result.data.data;
          typeof callback === "function" && callback(result);
        });
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
    addUser(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "user/add", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.userList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    editUser(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "user/edit", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.userList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    deleteUserById(id, callback) {
      this.$http
        .get(this.constants.string.server_base + `user/deactivate/${id}`)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.userList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    resetUserPasswordById(id, callback) {
      this.$http
        .get(this.constants.string.server_base + `user/resetPassword/${id}`)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.userList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    setUserPassword(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "user/setPassword", data)
        .then((result) => {
          typeof callback === "function" && callback(result);
        });
    },
    addProduct(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "product/add", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.productlist = JSON.parse(JSON.stringify(result.data.data));
            this.$store.dispatch("setProductlist", result.data.data);
          }
          typeof callback === "function" && callback(result);
        });
    },
    editProduct(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "product/edit", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.productlist = JSON.parse(JSON.stringify(result.data.data));
            this.$store.dispatch("setProductlist", result.data.data);
          }
          typeof callback === "function" && callback(result);
        });
    },
    deleteProductById(id, callback) {
      this.$http
        .get(this.constants.string.server_base + `product/delete/${id}`)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.productlist = JSON.parse(JSON.stringify(result.data.data));
            this.$store.dispatch("setProductlist", result.data.data);
          }
          typeof callback === "function" && callback(result);
        });
    },
    addCompliancy(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "compliancy/add", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.compliancylist = JSON.parse(JSON.stringify(result.data.data));
            this.$store.dispatch("setCompliancylist", result.data.data);
          }
          typeof callback === "function" && callback(result);
        });
    },
    editCompliancy(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "compliancy/edit", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.compliancylist = JSON.parse(JSON.stringify(result.data.data));
            this.$store.dispatch("setCompliancylist", result.data.data);
          }
          typeof callback === "function" && callback(result);
        });
    },
    deleteCompliancyById(id, callback) {
      this.$http
        .get(this.constants.string.server_base + `compliancy/delete/${id}`)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.compliancylist = JSON.parse(JSON.stringify(result.data.data));
            this.$store.dispatch("setCompliancylist", result.data.data);
          }
          typeof callback === "function" && callback(result);
        });
    },
    addProgram(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "program/add", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.programlist = JSON.parse(JSON.stringify(result.data.data));
            this.$store.dispatch("setProgramlist", result.data.data);
          }
          typeof callback === "function" && callback(result);
        });
    },
    editProgram(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "program/edit", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.programlist = JSON.parse(JSON.stringify(result.data.data));
            this.$store.dispatch("setProgramlist", result.data.data);
          }
          typeof callback === "function" && callback(result);
        });
    },
    deleteProgramById(id, callback) {
      this.$http
        .get(this.constants.string.server_base + `program/delete/${id}`)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.programlist = JSON.parse(JSON.stringify(result.data.data));
            this.$store.dispatch("setProgramlist", result.data.data);
          }
          typeof callback === "function" && callback(result);
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
    deleteCustomerById(id, callback) {
      this.$http
        .get(this.constants.string.server_base + `customer/deactivate/${id}`)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.customerList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    addAttendance(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "attendance/add", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.attendanceList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    editAttendance(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "attendance/edit", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.attendanceList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    deleteAttendance(id, data, callback) {
      this.$http
        .post(
          this.constants.string.server_base + `attendance/delete/${id}`,
          data
        )
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.attendanceList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    addPurcahse(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "purchase/add", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.purchaseList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    editPurcahse(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "purchase/edit", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.purchaseList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    deletePurcahse(id, data, callback) {
      this.$http
        .post(
          this.constants.string.server_base + `purchase/delete/${id}`,
          data
        )
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.purchaseList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    addMeasurement(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "measurement/add", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.measurementList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    editMeasurement(data, callback) {
      this.$http
        .post(this.constants.string.server_base + "measurement/edit", data)
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.measurementList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    },
    deleteMeasurement(id, data, callback) {
      this.$http
        .post(
          this.constants.string.server_base + `measurement/delete/${id}`,
          data
        )
        .then((result) => {
          if (result.data.affectedRows === 1) {
            this.measurementList = result.data.data;
          }
          typeof callback === "function" && callback(result);
        });
    }
  }
};
