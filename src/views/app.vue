<template>
  <div id="app-con">
    <topHead></topHead>
    <router-view/>
  </div>
</template>

<script>
import topHead from "./components/common/topHead.vue";

export default {
  name: "app",
  data() {
    return {
      test: 213123
    };
  },
  components: {
    topHead
  }
};
</script>

<style scoped>
#app-con {
  margin: 0 auto;
  min-width: 1200px;
  min-height: 100%;
}
</style>


