<template>
  <div id="updatePass">
    <div>
      <div id="user-update-container">
        <div class="login-title fs-20">修改密码</div>

        <div class="margin-top15">
          <label class="user-update-label inline-block">请输入旧密码:</label>
          <Input
            v-model="userData.password"
            prefix="ios-key"
            placeholder="请输入旧密码"
            style="width: auto"
            type="password"
          />
        </div>
        <div class="margin-top15">
          <label class="user-update-label inline-block">请输入新密码:</label>
          <Input
            v-model="userData.newPassword"
            type="password"
            prefix="ios-key"
            placeholder="请输入新密码"
            style="width: auto"
          />
        </div>
        <div class="margin-top15">
          <label class="user-update-label inline-block">请确认新密码:</label>
          <Input
            v-model="newPassword"
            type="password"
            prefix="ios-key"
            placeholder="请确认新密码"
            style="width: auto"
          />
        </div>
        <Button @click="updateFun" class="fs-14" id="submit-btn">确认修改</Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "updatePass",
  data() {
    return {
      user: null,
      userData: {
        username: "",
        password: "",
        newPassword: ""
      },
      newPassword: ""
    };
  },
  methods: {
    updateFun: function() {
      if (this.userData.newPassword !== this.newPassword) {
        this.$Message.error("两次密码不一致!");
        return;
      }
      this.$http.post("http://localhost:3011/u/update", this.userData).then(
        response => {
          console.log(response);
          if (response.status === 200 && response.body.code === 200) {
            this.$Notice.success({
              title: "修改成功！请重新登录！",
              desc: response.body.msg
            });
            this.globalV.user = null;
            this.$router.push({
              name: "signin"
            });
          } else {
            this.$Notice.error({
              title: "修改失败！",
              desc: response.body.msg
            });
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  created: function() {
    this.user = this.globalV.user;
    console.log("this.globalV.user", this.globalV);
    if (this.user) {
      this.userData.username = this.user.username;
    }
  }
};
</script>
<style scoped>
#user-update-container {
  margin: 100px auto;
  width: 600px;
  text-align: center;
}

.user-update-label {
  width: 120px;
  font-size: 16px;
  text-align: left;
}

#submit-btn {
  margin-top: 30px;
}
</style>