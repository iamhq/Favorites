<template>
  <div id="register">
    <div>
      <div id="login-container">
        <div class="login-title fs-20">注册新账号</div>
        <div class="margin-top15">
          <label class="login-label inline-block">用户名:</label>
          <Input
            v-model="userData.username"
            prefix="ios-contact"
            placeholder="请输入用户名"
            style="width: auto"
          />*
        </div>
        <div class="margin-top15">
          <label class="login-label inline-block">昵称:</label>
          <Input
            v-model="userData.nickname"
            prefix="md-happy"
            placeholder="请输入用户名"
            style="width: auto"
          />*
        </div>
        <div class="margin-top15">
          <label class="login-label inline-block">密码:</label>
          <Input
            v-model="userData.password"
            type="password"
            prefix="ios-key"
            placeholder="请输入密码"
            style="width: auto"
          />*
        </div>
        <Button @click="registerFun" class="fs-14" id="submit-btn" long>立即注册</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { log } from "util";
import { setTimeout } from "timers";
export default {
  name: "login",
  data() {
    return {
      userData: {
        username: "",
        password: "",
        nickname: ""
      }
    };
  },
  methods: {
    registerFun: function() {
      this.$http.post("http://localhost:3011/register", this.userData).then(
        response => {
          console.log(response);
          if (response.body.code === 200) {
            this.$Notice.success({
              top: 100,
              title: "注册成功！跳转登录！"
            });
            this.$router.push({
              name: "signin"
            });
          } else {
            this.$Notice.error({
              title: response.body.msg
            });
          }
        },
        error => {
          this.$Notice.error({
            title: "注册失败！" + error
          });
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
  width: 272px;
  text-align: center;
}

.login-label {
  width: 65px;
  font-size: 16px;
  text-align: left;
}

#submit-btn {
  margin-top: 30px;
}
</style>
