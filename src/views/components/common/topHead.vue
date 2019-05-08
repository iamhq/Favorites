<template>
  <div id="header">
    <div class="relative" id="header-inner">
      <Menu id="header-nav" mode="horizontal" active-name="1" width="500px">
        <MenuItem name="1">
          <Icon type="ios-paper"/>
          <router-link to="/index">首页/我的收藏</router-link>
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-analytics"/>
          <router-link to="/index">发现</router-link>
        </MenuItem>
        <MenuItem name="3">
          <Icon type="ios-people"/>
          <router-link to="/user">个人中心</router-link>
        </MenuItem>
      </Menu>
      <img class="header-logo" src="/assets/images/logo.png">
      <div id="header-right-user">
        <div v-if="isSignin" class="inline-block">{{user.nickname}}</div>
        <div v-else class="inline-block">
          <router-link to="/signin">
            <Button type="info" shape="circle">登录</Button>
          </router-link>
        </div>
        <router-link to="/signin">
          <Button type="primary" shape="circle">注册</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "head1",
  data() {
    return {
      test: "head"
    };
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
</style>

