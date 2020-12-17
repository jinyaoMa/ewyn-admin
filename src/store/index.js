import Vue from "vue";
import Vuex from "vuex";
import program from "./program";
import product from "./product";
import compliancy from "./compliancy";

Vue.use(Vuex);

const combine = (...stores) => {
  const result = {};
  stores.forEach((store) => {
    for (const key in store) {
      if (!result[key]) {
        result[key] = {};
      }
      Object.assign(result[key], store[key]);
    }
  });
  return result;
};

export default new Vuex.Store(
  combine(
    {
      state: {
        cid: 0
      },
      mutations: {
        setCID(state, id) {
          state.cid = id;
        }
      },
      actions: {
        setCID(context, id) {
          context.commit("setCID", id);
        }
      }
    },
    program,
    product,
    compliancy
  )
);
