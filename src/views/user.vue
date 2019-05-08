<template>
  <div id="user">
    {{user.nickname}}
  </div>
</template>
<script>

export default {
  name: "user",
  data() {
    return {
      test: 'user',
      user: this.$route.params
    };
  },
  components: {
   
  },
  created: function() {
  }
};
</script>
