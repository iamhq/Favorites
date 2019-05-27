<template>
  <div id="sites">
    <div class="fs-20">{{favorite.name}}的收藏</div>
    <SiteList :sites="list" :favorite="favorite" v-on:delete-site="deleteSite"></SiteList>
  </div>
</template>

<script>
import SiteList from "../components/SiteList.vue";
import { constants } from "crypto";

export default {
  name: "sites",
  components: {
    SiteList
  },
  data: function() {
    return {
      list: [],
      getSitesUrl: "http://localhost:3011/fs/findAllSites?favoritesID=",
      deleteSiteUrl: "http://localhost:3011/fs/deleteSite",
      user: null,
      favorite: {}
    };
  },
  methods: {
    getSites: function(getSitesUrl) {
      this.$http.get(getSitesUrl).then(
        response => {
          //成功处理
          this.list = response.body.data.list[0].sites;
          this.favorite.name = response.body.data.list[0].name;
          console.log("success: ", response);
        },
        reject => {
          //失败处理
          console.log("failllll: ", reject);
        }
      );
    },
    deleteSite: function(siteID) {
      let params = {
        siteID: siteID,
        favoriteID: this.favorite._id
      };
      console.log("sites  deleteSite", params);

      this.$http.post(this.deleteSiteUrl, params).then(
        response => {
          if (response.body.code === 200) {
            //成功处理
            this.$Message.success({
              top: 500,
              content: "删除收藏成功！"
            });
            this.getSites(this.getSitesUrl + this.favorite._id);
          }else {
             this.$Message.error({
              top: 500,
              content: response.body.msg
            });
          }

          console.log("success: ", response);
        },
        reject => {
          //失败处理
          console.log("failllll:deleteSiteUrl ", reject);
        }
      );
    }
  },
  created: function() {
    this.user = this.globalV.user;
    console.log("this.$router.params", this.$route);
    if (this.user) {
      if (this.$route.params._id) {
        this.favorite = this.$route.params;
      } else if (this.$route.params.favoriteID) {
        this.getSites(this.getSitesUrl + this.$route.params.favoriteID);
        return;
      } else {
        this.favorite = this.user.favorites[0];

        // this.favoritesID = this.user.defaultFavorite._id;
      }
      this.getSites(this.getSitesUrl + this.favorite._id);
    }
  }
};
</script>
