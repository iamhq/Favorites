<template>
  <div class="main-container" id="home">
    <!-- <SiteList v-if="hasResult" :sites="sites"></SiteList> -->
    <div v-if="!user" class="fs-20">
      <div>请先登录</div>
      <router-link to="/signin">
        <Button class="margin-top15" type="info" shape="circle">去登录</Button>
      </router-link>
    </div>
    <div v-if="user">
      <Layout>
        <Sider id="home-sider">
          <Menu id="home-menu" width="200px" theme="dark" :active-name="activeName">
            <router-link to="favorites">
              <MenuItem name="favorites">
                <Icon type="md-document"/>我的收藏夹
              </MenuItem>
            </router-link>
            <router-link to="sites">
              <MenuItem name="sites">
                <Icon type="md-chatbubbles"/>我的收藏
              </MenuItem>
            </router-link>
            <router-link to="addSite">
              <MenuItem name="addSite">
                <Icon type="md-chatbubbles"/>添加收藏
              </MenuItem>
            </router-link>
          </Menu>
        </Sider>
        <Content id="home-content">
          <router-view></router-view>
        </Content>
      </Layout>

      <br>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      activeName: "favorites",
      user: null
    };
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData: function() {
      this.activeName = this.$route.name;
    }
  },
  mounted: function() {
    this.user = this.globalV.user;
  }
};
</script>

<style scoped>
#home-content {
  /* padding-left: 100px; */
  position: fixed;
  height: 100vh;
  left: 220px;
  background: #fff;
}

#home-sider {
  position: fixed;
  height: 100vh;
  left: 0;
  top:51px;
  overflow: auto;
}
</style>

