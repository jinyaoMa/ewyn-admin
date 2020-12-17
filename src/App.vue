<template>
  <el-container class="App" style="height: 100%">
    <el-header
      height="80px"
      class="header image-bg"
      :style="{ backgroundImage: !!`url('${constants.image.header_bg}')` }"
    >
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-image
            style="height: 60px; padding: 10px 0"
            fit="contain"
            :src="'' /*constants.image.logo*/"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="250px" class="aside">
        <el-menu
          class="image-bg"
          :style="{
            backgroundImage: !!`url('${constants.image.header_bg}')`,
            height: '100%',
          }"
          :default-active="$route.path"
          :default-openeds="['1', '2']"
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
          </el-submenu>
          <el-submenu index="2">
            <template #title>
              <i class="el-icon-setting"></i>
              <span>Administrator</span>
            </template>
            <el-menu-item index="/calendar">Calendar</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container
        style="background-color: #f1f2f3; height: calc(100vh - 80px)"
        direction="vertical"
      >
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  mounted() {
    console.log(this);
    this.getProgramlist();
    this.getProductlist();
    this.getCompliancylist();
  },
  methods: {},
};
</script>

<style lang="stylus" scoped>
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
  overflow hidden
  letter-spacing 1px

.image-bg
  background-attachment fixed
  background-color #000000
  background-size cover
  background-position center center
</style>