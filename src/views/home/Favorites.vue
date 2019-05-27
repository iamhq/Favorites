<template>
  <div>
    <div class="fs-20">
      我的收藏夹
      <!-- <Icon type="md-add" /> -->
      <Icon @click="showAddModal" class="pointer" type="ios-add-circle-outline" color="#0e60ff"/>
      <!-- <Icon  class="pointer" type="ios-close-circle-outline" color="red"/> -->
    </div>
    <FavoritesList @delete-favorite="getFavorites" :favorites="list"></FavoritesList>
    <Modal
      v-model="addModalState"
      title="添加收藏夹"
      @on-ok="addFavorite"
      @on-cancel="cancelAddFavorite"
    >
      <p>请输入收藏夹名称</p>
      <Input class="margin-top15" type="text" v-model="addFavoriteData.name"></Input>
    </Modal>
  </div>
</template>

<script>
import FavoritesList from "../components/FavoritesList.vue";

export default {
  name: "favorites",
  components: {
    FavoritesList
  },
  data: function() {
    return {
      list: [],
      findFavoriteUrl: "http://localhost:3011/u/findALLFavorites",
      addFavoriteUrl: "http://localhost:3011/uf/addFavorites",
      addModalState: false,
      addFavoriteData: {
        username: "",
        name: "默认收藏夹"
      },
      findFavoriteData: {
        username: ""
      }
    };
  },
  methods: {
    getFavorites: function() {
      this.$http.post(this.findFavoriteUrl, this.findFavoriteData).then(
        response => {
          //成功处
          this.list = response.body.data.list;
          this.globalV.user.favorites = this.list;
        },
        reject => {
          //失败处理
          console.log("failllll: ", reject);
        }
      );
    },
    addFavorite: function() {
      this.addModalState = true;
      this.$http.post(this.addFavoriteUrl, this.addFavoriteData).then(
        response => {
          //成功处
          console.log("addFavoriteUrl success", response.body.data);
          this.getFavorites();
          this.addModalState = false;
        },
        reject => {
          //失败处理
          console.log("failllll: ", reject);
        }
      );
    },
    showAddModal: function () {
      this.addModalState = true;
    },
    cancelAddFavorite() {
      this.$Message.info("已取消！");
    }
  },
  created: function() {
    console.log("userfffff", this.globalV.user);
    this.user = this.globalV.user;
    if (this.user) {
      this.addFavoriteData.username = this.globalV.user.username;

      this.findFavoriteData.username = this.globalV.user.username;
      this.getFavorites();
    }
  }
};
</script>

<style scoped>

</style>


