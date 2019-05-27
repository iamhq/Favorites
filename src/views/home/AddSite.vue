<template>
  <div id="addSite">
    <div class="fs-20">添加收藏</div>
    <Form
      ref="newSite"
      :model="newSite"
      :rules="ruleValidate"
      :label-width="100"
      class="margin-top15"
    >
      <FormItem label="标题：" prop="title">
        <Input v-model="newSite.title" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="描述：" prop="desc">
        <Input v-model="newSite.desc" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="网址：" prop="url">
        <Input v-model="newSite.url" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="添加到收藏夹：" prop="favoriteID">
        <Select @on-change="selectChangeFun" v-model="newSite.favoriteID" placeholder="请选择">
          <Option v-for="f in list" :key="f._id" :value="f._id">{{f.name}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button @click="addSite('newSite')" type="primary">添加</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: "favorites",
  components: {},
  data: function() {
    return {
      list: [],
      url: "http://localhost:3011/fs/addSite",
      selectF: {},
      newSite: {
        title: "",
        desc: "",
        url: "",
        favoriteID: ""
      },
      ruleValidate: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        desc: [{ required: true, message: "描述不能为空", trigger: "blur" }],
        url: [{ required: true, message: "网址不能为空", trigger: "blur" }],
        favoriteID: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  methods: {
    addSite: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.requestAdd();
        } else {
          this.$Message.error("请输入!");
        }
      });
    },
    requestAdd: function() {
      this.$http.post(this.url, this.newSite).then(
        response => {
          this.$Message.success({
            top: 500,
            content: "添加成功！"
          });
          this.$router.push({
            name: "sites",
            params: response.body.favorite
          });
          console.log("success: ", response);
        },
        reject => {
          //失败处理
          console.log("failllll: ", reject);
        }
      );
    },
    selectChangeFun: function(f) {
      // this.selectF =
      console.log("sele", f);
    }
  },
  created: function() {
    this.user = this.globalV.user;
    
    if (this.user) {
      this.list = this.user.favorites;
      this.newSite.avatar = this.user.avatar;
    }
    if (this.user) {
      let params = {
        username: this.user.username
      };
      //   this.getFavorites(this.url,params);
    }
  }
};
</script>

<style scoped>
div#addSite {
  width: 500px;
  min-height: 50px;
}
</style>


