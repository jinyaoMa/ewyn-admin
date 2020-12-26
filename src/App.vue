<template>
  <el-container
    class="App"
    direction="vertical"
    :style="{
      height: isNarrow ? 'auto' : '100%',
    }"
  >
    <el-header
      v-if="!$route.path.startsWith('/login')"
      :height="isNarrow ? 'auto' : '80px'"
      class="header image-bg"
      :style="{ backgroundImage: !!`url('${constants.image.header_bg}')` }"
    >
      <el-row :type="isNarrow ? '' : 'flex'" justify="space-between">
        <el-col :span="isNarrow ? 24 : 12">
          <el-image
            style="height: 60px; padding: 10px 0"
            fit="contain"
            :src="'' /*constants.image.logo*/"
            v-if="false"
          >
            <div slot="error" class="image-slot">
              <i :class="!!'el-icon-picture-outline'"></i>
            </div>
          </el-image>
        </el-col>
        <el-col :span="isNarrow ? 24 : 12">
          <div
            class="userInfo"
            :style="{
              textAlign: isNarrow ? 'center' : 'right',
            }"
          >
            <span style="margin-right: 12px">
              {{ $store.state.user.first_name }}
              {{ $store.state.user.last_name }}
            </span>
            <el-button plain round @click="onLogoutClick">Logout</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container :direction="isNarrow ? 'vertical' : 'horizontal'">
      <el-aside
        v-if="!$route.path.startsWith('/login')"
        :width="isNarrow ? 'auto' : '230px'"
        class="aside"
      >
        <el-menu
          class="image-bg"
          :style="{
            backgroundImage: !!`url('${constants.image.header_bg}')`,
            height: '100%',
          }"
          :default-active="$route.path"
          :default-openeds="isNarrow ? [] : ['1', '2']"
          router
        >
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-user-solid"></i>
              <span>Customer</span>
            </template>
            <el-menu-item index="/">Management</el-menu-item>
            <el-menu-item index="/attendance">Attendance</el-menu-item>
            <el-menu-item index="/measurement">Measurement</el-menu-item>
            <el-menu-item index="/weightTrack">Weight Track</el-menu-item>
            <el-menu-item index="/purchase">Purchase Guide</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template #title>
              <i class="el-icon-setting"></i>
              <span>Administrator</span>
            </template>
            <el-menu-item index="/calendar">Calendar</el-menu-item>
            <el-menu-item index="/user" v-if="userPermission.admin === -1"
              >User Management</el-menu-item
            >
            <el-menu-item index="/settings">Settings</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container
        :style="{
          backgroundColor: '#f1f2f3',
          height: $route.path.startsWith('/login')
            ? '100vh'
            : isNarrow
            ? 'auto'
            : 'calc(100vh - 80px)',
        }"
        direction="vertical"
      >
        <el-main
          :style="{
            backgroundImage: $route.path.startsWith('/login')
              ? !!`url('${constants.image.header_bg}')`
              : '',
          }"
          :class="{ 'image-bg': $route.path.startsWith('/login') }"
        >
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    if (
      typeof window !== "undefined" &&
      !this.$route.path.startsWith("/login")
    ) {
      if (
        window.localStorage.getItem(btoa("userid")) === null ||
        window.localStorage.getItem(btoa("userid")) === "0"
      ) {
        this.$router.replace("/login");
      } else {
        this.auth(window.localStorage.getItem(btoa("userid")), (result) => {
          if (result.data.status === "logout") {
            this.$router.replace("/login");
          }
        });
      }
    }
  },
  mounted() {
    // console.log(this);
    this.getProgramlist();
    this.getProductlist();
    this.getCompliancylist();
    if (!this.$isServer) {
      window.addEventListener("resize", this.onResize);
      this.onResize();
    }
  },
  updated() {
    if (
      typeof window !== "undefined" &&
      !this.$route.path.startsWith("/login")
    ) {
      if (
        window.localStorage.getItem(btoa("userid")) === null ||
        window.localStorage.getItem(btoa("userid")) === "0"
      ) {
        this.$router.replace("/login");
      }
    }
  },
  destroyed() {
    if (!this.$isServer) {
      window.removeEventListener("resize", this.onResize);
    }
  },
  methods: {
    onLogoutClick() {
      this.logout(this.$store.state.user.userid);
    },
  },
};
</script>

<style lang="stylus" scoped>
.App
  overflow hidden

.header
  >>> .el-image__inner
    object-position left

.aside
  >>> .el-menu
    background-color #000000
  >>> .el-menu-item, >>> .el-submenu__title
    color #ffffff
    &:hover
      background-color #ffffff33
  >>> .el-menu-item
    &.is-active
      color #fcee01
      background-color transparent

.userInfo
  color #ffffff
  line-height 80px

>>> .el-date-editor
  max-width 100%

>>> .el-input
  width 100% !important
</style>

<style lang="stylus">
body
  margin 0
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #333333
  height 100vh
  width 100vw
  overflow-x hidden
  letter-spacing 1px

.image-bg
  background-attachment fixed
  background-color #000000
  background-size cover
  background-position center center
</style>