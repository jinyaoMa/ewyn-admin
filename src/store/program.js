export default {
  state: {
    programlist: []
  },
  mutations: {
    setProgramlist(state, list) {
      state.programlist = list;
    }
  },
  actions: {
    setProgramlist(context, list) {
      context.commit("setProgramlist", list);
    }
  }
};
