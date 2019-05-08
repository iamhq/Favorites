<template>
  <div id="login">
    <div>
      <div class="fs-20" id="login-container">
        <div class="login-title">登录</div>
        <div class="margin-top15">
          <label class="login-label inline-block">用户名:</label>
          <Input
            v-model="userData.username"
            prefix="ios-contact"
            placeholder="请输入用户名"
            style="width: auto"
          />
        </div>
        <div class="margin-top15">
          <label class="login-label inline-block">密码:</label>
          <Input
            v-model="userData.password"
            type="password"
            prefix="ios-key"
            placeholder="请输入密码"
            style="width: auto"
          />
        </div>
        <Button @click="loginFun" id="siginin-btn">登录</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  name: "login",
  data() {
    return {
      userData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    loginFun: function() {
      this.$http.post(
        "http://localhost:3011/signin",
        this.userData).then(
        response => {
          if (response.status === 200) {
            this.$router.push({ name: "user", params: response.body.user});
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>

<style scoped>
#login-container {
  margin: 100px auto;
  width: 302px;
  text-align: center;
}

.login-label {
  width: 80px;
  text-align: left;
}

#siginin-btn {
  margin-top: 30px;
}
</style>
