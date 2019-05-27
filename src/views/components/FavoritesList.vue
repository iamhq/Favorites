<template>
  <div class="margin-top15" id="favorites">
    <span v-for="f in favorites" :key="f._id" class="favorites-iitem inline-block">
      <router-link v-if="routerName==='favorites'" :to="{name: 'sites', params: f}" class="inline-block">
        <img class="favorites-img inline-block" src="/assets/images/wjj.png" alt>
        <div>{{f.name}}</div>
      </router-link>

      <span v-else @click="showFavorites" class="inline-block">
        <img class="favorites-img inline-block" src="/assets/images/wjj.png" alt>
        <div>{{f.name}}</div>
      </span>
      <div>
      <Icon @click="deleteFavorite(f)" v-if="routerName==='favorites'" class="pointer delete-btn" type="ios-close-circle-outline" color="red"/>

      </div>
    </span>

    <div v-if="favorites.length < 1">暂无收藏夹</div>
  </div>
</template>

<script>
export default {
  name: "favoritesList",
  data: function() {
    return {
      list: this.favorites,
      url: "http://localhost:3011/u/findALLFavorites",
      user: null,
      routerName: "",
    };
  },
  props: {
    favorites: Array
  },
  methods: {
    deleteFavorite: function (f) {
      console.log('del',f);
            this.$http.post("http://localhost:3011/f/deleteFavorites", {username:this.user.username, _id:f._id}).then(
        response => {
          console.log(response);
          if (response.status === 200 && response.body.code === 200) {
            this.$Notice.success({
              title: "删除成功！",
              desc: response.body.msg
            });
      this.$emit('delete-favorite');

            
          } else {
            this.$Notice.error({
              title: "删除失败！",
              desc: response.body.msg
            });
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    showFavorites: function() {

    }
  },
  mounted: function() {
    this.user = this.globalV.user;
    this.routerName = this.$route.name;

  }
};
</script>

<style scoped>
.favorites-img {
  width: 60px;
  height: 50px;
}

.favorites-iitem {
  width: 100px;
  text-align: center;
  vertical-align: top;
}

.delete-btn {
}
</style>


