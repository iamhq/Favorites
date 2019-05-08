<template>
  <div id="home">
    hhhhhome
  </div>
</template>
<script>

export default {
  name: "home",
  data() {
    return {
      test: 213123
    };
  },
  components: {
   
  },
  created: function() {
      let params = JSON.stringify({
      title: "2222",
      url: "https://github.com/Tang-Seng/Favorites",
      favoritesID: "5cb2c5905f8d253790dff3c8"
    })
    this.$http.post("http://localhost:3011/fs/addSite", params).then(
      response => {
        //成功处理
        console.log("success: ", response);
      },
      reject => {
        //失败处理
        console.log("failllll: ", reject);
      }
    );
  }
};
</script>
