export default {
  state: {
    user: {
      userid: "0"
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(btoa("userid"), user.userid || "0");
      }
    }
  },
  actions: {
    setUser(context, user) {
      context.commit("setUser", user);
    }
  }
};
