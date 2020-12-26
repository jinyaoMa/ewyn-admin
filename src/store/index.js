import Vue from "vue";
import Vuex from "vuex";
import program from "./program";
import product from "./product";
import compliancy from "./compliancy";
import user from "./user";

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
        isNarrow: false,
        cid: 0
      },
      getters: {
        isNarrow(state) {
          return state.isNarrow;
        }
      },
      mutations: {
        setNarrow(state, flag) {
          state.isNarrow = flag;
        },
        setCID(state, id) {
          state.cid = id;
        }
      },
      actions: {
        setNarrow(context, flag) {
          context.commit("setNarrow", flag);
        },
        setCID(context, id) {
          context.commit("setCID", id);
        }
      }
    },
    program,
    product,
    compliancy,
    user
  )
);
