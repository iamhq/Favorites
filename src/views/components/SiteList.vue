<template>
  <div id="sites">
    <div v-for="s in sites" :key="s._id">
      <Avatar v-if="user && routerName==='sites'" :src="user.avatar"/>
      <Avatar v-if="user && routerName!=='sites'" :src="s.avatar"/>
      <a class="site-link relative inline-block" target="_blank" :href="s.url">
        <span class="fs-20">
          {{s.title}}
          <Button class="jump-btn" type="primary" ghost icon="ios-redo">前往</Button>
        </span>
        <div>{{s.desc}}</div>
      </a>
      <Button
        v-if="routerName==='sites'"
        @click="deleteSite(s._id)"
        class="delete-btn"
        type="primary"
        shape="circle"
        icon="ios-trash-outline"
      ></Button>
    </div>

    <div v-if="sites.length < 1">暂无收藏</div>
  </div>
</template>

<script>
export default {
  name: "siteList",
  data: function() {
    return {
      user: null,
      // list: this.sites,
      routerName: "",
      deleteSiteUrl: "http://localhost:3011/fs/deleteSite"
    };
  },
  props: {
    sites: Array,
    favorite: null
  },
  methods: {
    deleteSite: function(siteId) {
       let params = {
        siteID: siteId,
        favoriteID: this.favorite._id
      };
      this.$emit('delete-site', siteId);
      console.log(siteId);
     
      // this.$http.post(this.deleteSiteUrl, params).then(
      //   response => {
      //     //成功处理
      //     this.$Message.success({
      //       top: 500,
      //       content: "删除收藏成功！"
      //     });

      //     console.log("success: ", response);
      //   },
      //   reject => {
      //     //失败处理
      //     console.log("failllll:deleteSiteUrl ", reject);
      //   }
      // );
    }
  },
  mounted: function() {
    this.user = this.globalV.user;
    this.routerName = this.$route.name;
  }
};
</script>

<style scoped>
.sites-img {
  width: 60px;
  height: 40px;
}

.site-link {
  margin-bottom: 10px;
  border-bottom: 2px dashed gray;
  width: 450px;
  padding: 10px 90px 10px 10px;
  vertical-align: middle;
}

.delete-btn {
  margin-left: 20px;
}

.jump-btn {
  position: absolute;
  top: 25px;
  right: 0;
}
</style>


