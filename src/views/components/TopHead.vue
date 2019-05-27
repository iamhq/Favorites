<template>
  <div id="header">
    <div class="relative" id="header-inner">
      <Menu id="header-nav" mode="horizontal" :active-name="activeName" width="500px">
        <MenuItem name="find">
          <Icon type="ios-search"/>
          <router-link to="/find">发现</router-link>
        </MenuItem>
        <MenuItem name="home">
          <Icon type="ios-cloud"/>
          <router-link to="/home">我的收藏</router-link>
        </MenuItem>
        <MenuItem name="user">
          <Icon type="ios-people"/>
          <router-link to="/user">个人中心</router-link>
        </MenuItem>
        <!-- <MenuItem name="help">
          <Icon type="ios-help-circle-outline"/>
          <router-link to="/">帮助</router-link>
        </MenuItem>
        <MenuItem name="about">
          <Icon type="ios-information-circle-outline"/>
          <router-link to="/">关于</router-link>
        </MenuItem>-->
      </Menu>
      <img class="header-logo" src="/assets/images/logo.png">
      <div id="header-right-user">
        <div v-if="user" class="inline-block">
          <span @click="signout" class="pointer">退出</span>
          <Avatar :src="user.avatar" size="small"/>
          <span class="margin-left">{{user.nickname}}</span>
        </div>
        <div v-else class="inline-block margin-left">
          <router-link to="/signin">
            <Button type="info" shape="circle">登录</Button>
          </router-link>
        </div>
        <router-link to="/register" class="margin-left">
          <Button type="primary" shape="circle">注册</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tophead",
  data() {
    return {
      activeName: 1,
      user: null
    };
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData: function() {
      this.user = this.globalV.user;
      this.activeName = this.$route.name;
    },
    signout: function() {
      this.globalV.user = null;
      this.$router.push({
        name: "signin"
      });
    }
  }
};
</script>

<style scoped>
#header {
  background: #282b2d;
}

#header-inner {
  margin: 0 auto;
  max-width: 1400px;
  height: 50px;

  color: #fff;
}

.header-logo {
  position: absolute;
  left: 0;
  top: 5px;
  z-index: 901;

  width: 45px;
  height: 45px;
}

#header-nav {
  margin-left: 80px;

  height: 51px;

  background: #282b2d;
  color: #fff;
}

#header-nav a {
  color: #fff;
}

#header-right-user {
  position: absolute;
  top: 10px;
  right: 0;
  z-index: 901;
}

.margin-left {
  margin-left: 10px;
}
</style>

