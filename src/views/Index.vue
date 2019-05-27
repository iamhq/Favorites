<template>
  <div id="index">
    <router-link class="inline-block" id="index-start-btn" to="/find">
      开始使用
    </router-link>
  </div>
</template>

<script>
export default {
  name: "index"
};
</script>

<style scoped>
#index {
    padding: 300px 0;
    height: 100%;
    background: url('/assets/images/background.jpg') no-repeat;
    background-size: 100% 100%;
    text-align: center;
}
#index-start-btn {
  border-radius: 30px;
  width: 200px;
  line-height: 50px;
  font-size: 24px;
  color: #fff;
  background: #2d8cf0;
  text-align: center;
}

#index-start-btn:hover {
    color: #8cf;
}
</style>

