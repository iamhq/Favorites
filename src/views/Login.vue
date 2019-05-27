<template>
  <div id="login">
    <div>
      <div id="login-container">
        <div class="login-title fs-20">账号登录</div>
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
        <Button @click="loginFun" class="fs-14" id="submit-btn" long>登录</Button>
      </div>
    </div>
  </div>
</template>

<script>
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
      this.$http.post("http://localhost:3011/signin", this.userData).then(
        response => {
          console.log(response)
          if (response.status === 200 && response.body.code === 200) {
            this.$Notice.success({
                title: '登录成功！',
                desc: response.body.msg
            })
            this.globalV.user =  response.body.user;
            console.log('llluser',this.globalV.user);
            this.$router.push({
              name: "favorites",
            });
          }else {
            this.$Notice.error({
                title: '登录失败！',
                desc: response.body.msg
            })
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
  width: 264px;
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
