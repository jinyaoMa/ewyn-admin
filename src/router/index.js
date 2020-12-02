import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "../views/Signup.vue";
import Attendance from "../views/Attendance.vue";
import Measurement from "../views/Measurement.vue";
import Calendar from "../views/Calendar.vue";

Vue.use(VueRouter);

const routes = [
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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
