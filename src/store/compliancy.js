export default {
  state: {
    compliancylist: []
  },
  mutations: {
    setCompliancylist(state, list) {
      state.compliancylist = list;
    }
  },
  actions: {
    setCompliancylist(context, list) {
      context.commit("setCompliancylist", list);
    }
  }
};
