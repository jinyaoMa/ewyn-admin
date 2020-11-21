import Vue from "vue";
import Vuex from "vuex";
import program from "./program";

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
      state: {}
    },
    program
  )
);
