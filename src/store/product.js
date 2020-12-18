export default {
  state: {
    productlist: []
  },
  mutations: {
    setProductlist(state, list) {
      state.productlist = typeof list === "object" && typeof list.length === "number" ? list : [];
    }
  },
  actions: {
    setProductlist(context, list) {
      context.commit("setProductlist", list);
    }
  }
};
