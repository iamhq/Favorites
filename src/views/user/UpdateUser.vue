<template>
  <div id="updateUser">
    <div>
      <div id="user-update-container">
        <div class="login-title fs-20">修改昵称</div>

        <div class="margin-top15">
          <label class="user-update-label inline-block">请输入昵称:</label>
          <Input
            v-model="userData.nickname"
            prefix="ios-key"
            placeholder="请输入昵称"
            style="width: auto"
            type="text"
          />
        </div>

        <Button @click="updateFun(nicknameUrl)" class="fs-14" id="submit-btn">确认修改</Button>
        <div style="width: 100px;margin-left:130px">
        <div class="login-title fs-20 updata-user-title">修改头像</div>

          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :on-error="handleError"
            :format="['jpg','jpeg','png']"
            :max-size="1024"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="http://localhost:3011/upload.json"
            style="display: inline-block;width:58px;"
          >
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "updateUser",
  data() {
    return {
      user: null,
      userData: {
        username: "",
        nickname: "",
        avatar: "/assets/images/uploads/default.jpg"
      },
      nicknameUrl: "http://localhost:3011/u/updateUser",
      avatarUrl: "http://localhost:3011/u/updateAvatar"
    };
  },
  methods: {
    updateFun: function(url) {
      //   if (this.userData.nickname.length < 1 || this.userData.avatar.length < 1) {
      //     this.$Message.error("不能为空！");
      //     return;
      //   }
      this.$http.post(url, this.userData).then(
        response => {
          console.log(response);
          if (response.status === 200 && response.body.code === 200) {
            if (url == "http://localhost:3011/u/updateUser") {
              this.globalV.user.nickname = this.userData.nickname;
            }
            this.$Notice.success({
              title: "修改成功!",
              desc: response.body.msg
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
    },
    handleSuccess(res, file) {
      console.log("upload res", res);
      this.$Notice.success({
        title: "上传成功!!!!!!"
      });
      this.userData.avatar = res.avatar;
      this.updateFun(this.avatarUrl);
      this.globalV.user.avatar = res.avatar;
    },
    handleError(error) {
      this.$Notice.warning({
        title: "上传失败!!!!!!"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出大小",
        desc: "文件大小不能超过1M"
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "请选择jpg或png格式"
      });
    },
    handleBeforeUpload() {
      this.$Notice.warning({
        title: "正在上传！！"
      });
      return true;
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

.updata-user-title {
    margin: 30px 0;
}
</style>