<template>
  <div id="home">
      <topHead></topHead>
  </div>
</template>
<script>
import topHead from './components/common/topHead.vue'
export default {
    name: 'home',
    data(){
        return{
            test:213123,
        }
    },
    components: {
        topHead
    }
}
</script>

<style>
ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
}

html,body {
    margin: 0;
    padding: 0;
    height: 100%;
}

#app {
    margin: 0 auto;
    max-width: 1400px;
    min-height: 100%;
}
.relative {
    position: relative;
}

.blue-bg {
    background: #0E60FF;
}
</style>

