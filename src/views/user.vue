<template>
  <div id="user">

    <div v-if="!user" class="fs-20 margin-top15 no-user">
      <div class="margin-0">请先登录</div>
      <router-link to="/signin"> 
        <Button class="margin-top15" type="info" shape="circle">去登录</Button>
      </router-link>
    </div>
    <div v-if="user">
      <Layout>
        <Sider id="main-sider">
          <Menu id="home-menu" width="200px" theme="dark" :active-name="activeName">
            <router-link to="updatePassword">
              <MenuItem name="updatePassword">
                <Icon type="md-document"/>修改密码
              </MenuItem>
            </router-link>
           <router-link to="updateUser">
              <MenuItem name="updateUser">
                <Icon type="md-chatbubbles"/>修改资料
              </MenuItem>
            </router-link>
           <!--   <router-link to="addSite">
              <MenuItem name="addSite">
                <Icon type="md-chatbubbles"/>添加收藏
              </MenuItem>
            </router-link>-->
          </Menu>
        </Sider>
        <Content id="main-content">
          <router-view></router-view>
        </Content>
      </Layout>

      <br>
    </div>
  </div>
</template>
<script>
export default {
  name: "user",
  data() {
    return {
      test: "user",
      user: null,
      activeName: "updatePassword"
    };
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData: function() {
      this.activeName = this.$route.name;
    },

  },
  components: {},
  created: function() {
    this.user = this.globalV.user;
  }
};
</script>

<style scoped>
.no-user {
  margin-left: 200px;
}
</style>

