export default {
  state: {
    productlist: []
  },
  mutations: {
    setProductlist(state, list) {
      state.productlist = list;
    }
  },
  actions: {
    setProductlist(context, list) {
      context.commit("setProductlist", list);
    }
  }
};
