<template>
  <div class="main-container" id="find">
    <h1 class="find-title">发现</h1>
    <Input
      v-model="keyword"
      @on-search="searchFun"
      id="search-input"
      search
      size="large"
      placeholder="输入关键字查找"
    />
    <div v-if="hasResult">
      <div class="fs-20 margin-top15">查询到的收藏结果</div>

      <SiteList :sites="sites"></SiteList>
      <!-- <div class="fs-20 margin-top15">查询到的收藏夹结果</div>

      <FavoritesList :favorites="favorites"></FavoritesList> -->
    </div>
  </div>
</template>

<script>
import FavoritesList from "./components/FavoritesList.vue";
import SiteList from "./components/SiteList.vue";
export default {
  name: "find",
  components: {
    FavoritesList,
    SiteList
  },
  data() {
    return {
      keyword: "",
      favorites: [],
      sites: [],
      resUrl: "http://localhost:3011/g/queryAll?keyword=",
      hasResult: false
    };
  },
  methods: {
    searchFun: function() {
      console.log("resp,,,,");

      this.$http.get(this.resUrl + this.keyword).then(
        response => {
          if (response.status === 200) {
            console.log("resp,,,,llllll");
            this.hasResult = true;
            this.favorites = response.body.data.favorites.data || [];
            this.sites = response.body.data.sites.data || [];
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
#find {
  text-align: left;
}
#search-input {
  display: block;
  margin: 0px auto;
  width: 600px;
}

.find-title {
  text-align: center;
  margin: 50px 0 20px 0;
}
</style>
