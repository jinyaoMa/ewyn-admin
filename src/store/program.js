export default {
  state: {
    programlist: []
  },
  mutations: {
    setProgramlist(state, list) {
      state.programlist = typeof list === "object" && typeof list.length === "number" ? list : [];
    }
  },
  actions: {
    setProgramlist(context, list) {
      context.commit("setProgramlist", list);
    }
  }
};
