<template>
	<router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      form: {
        name: "",
        business_name: "",
        region: "",
        brand_name: "",
        qua_types: "",
        bus_lic_types: "",
        startime: "",
        endtime: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    reReque() {
      console.log("如果状态是没有通过的情况下，做处理，重新申请");
    },
    handleClickNext() {
      this.$router.push({ path: "/submitInfoList" });
    },
    handleSubmitedInfo() {
      this.$router.push({ path: "/submitedInfoReview" });
    },
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    onSubmit() {
      //console.log('submit!');
    },
    handleRemove(file, fileList) {
      //console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scope>
.width_limit {
  min-width: 109px;
}
.el-form .el-form-item {
  position: relative;
}
.must_write::before {
  content: "*";
  font-size: 1em;
  color: red;
  position: absolute;
  margin: 12px 30px 0;
  z-index: 1;
}
._fixmust::before {
  margin: 12px 0px 0;
  z-index: 1;
}
._spin::before {
  margin-left: -8px;
}
._spin3::before {
  margin-left: 12px;
}
._spin4::before {
  margin-left: 46px;
}
</style>