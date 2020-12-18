import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "../views/Signup.vue";
import Attendance from "../views/Attendance.vue";
import Measurement from "../views/Measurement.vue";
import Calendar from "../views/Calendar.vue";
import WeightTrack from "../views/WeightTrack.vue";
import Login from "../views/Login.vue";
import User from "../views/User.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "Signup",
    component: Signup
  },
  {
    path: "/attendance",
    name: "Attendance",
    component: Attendance
  },
  {
    path: "/measurement",
    name: "Measurement",
    component: Measurement
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar
  },
  {
    path: "/weightTrack",
    name: "WeightTrack",
    component: WeightTrack
  },
  {
    path: "/user",
    name: "User",
    component: User
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
