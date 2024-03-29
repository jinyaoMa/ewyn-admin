export default {
  state: {
    compliancylist: []
  },
  mutations: {
    setCompliancylist(state, list) {
      state.compliancylist = typeof list === "object" && typeof list.length === "number" ? list : [];
    }
  },
  actions: {
    setCompliancylist(context, list) {
      context.commit("setCompliancylist", list);
    }
  }
};
