import Vue from "vue";
import VueRouter from "vue-router";
/*
import Signup from "../views/Signup.vue";
import Attendance from "../views/Attendance.vue";
import Measurement from "../views/Measurement.vue";
import Calendar from "../views/Calendar.vue";
import WeightTrack from "../views/WeightTrack.vue";
import Login from "../views/Login.vue";
import User from "../views/User.vue";
import Settings from "../views/Settings.vue";
import Purchase from "../views/Purchase.vue";
*/

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Signup.vue")
  },
  {
    path: "/attendance",
    name: "Attendance",
    component: () =>
      import(/* webpackChunkName: "attendance" */ "../views/Attendance.vue")
  },
  {
    path: "/measurement",
    name: "Measurement",
    component: () =>
      import(/* webpackChunkName: "measurement" */ "../views/Measurement.vue")
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../views/Calendar.vue")
  },
  {
    path: "/weightTrack",
    name: "WeightTrack",
    component: () =>
      import(/* webpackChunkName: "weightTrack" */ "../views/WeightTrack.vue")
  },
  {
    path: "/user",
    name: "User",
    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue")
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue")
  },
  {
    path: "/purchase",
    name: "Purchase",
    component: () =>
      import(/* webpackChunkName: "purchase" */ "../views/Purchase.vue")
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
