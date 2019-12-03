<template>
  <!-- 新增物料页面 -->
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="店铺相册" name="first">
    <span>至少上传三张图片:</span> 
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>

        <el-row>
          <el-button type="primary" @click="handleSubmitImg">提交</el-button>
          <el-button type="warning" @click="handleClickNext">取消</el-button>
        </el-row>

      </el-tab-pane>

      <el-tab-pane label="教育评论" name="second" align-center>
        <el-steps :active="2" align-center finish-status="success">
          <el-step title="信息填写" description="2017-07-19 15:43:23"></el-step>
          <el-step title="提交审核" description="2017-07-19 15:43:23"></el-step>
          <el-step title="审核通过" description="审核中请耐心等待"></el-step>
        </el-steps>
        <el-row>
          <el-button @click="handleSubmitedInfo">查看已提交信息</el-button>
          <el-button type="success" @click="handleClickNext">下一步</el-button>
        </el-row>

      </el-tab-pane>
      <el-tab-pane label="课程物料" name="third" align-center>
        <el-steps :active="2" align-center finish-status="success">
          <el-step title="信息填写" description="2017-07-19 15:43:23"></el-step>
          <el-step title="提交审核" description="2017-07-19 15:43:23"></el-step>
          <el-step title="审核通过" description="审核中请耐心等待"></el-step>
        </el-steps>

        <el-row>
          <el-button @click="handleSubmitedInfo">查看已提交信息</el-button>
          <el-button type="success" @click="handleClickNext">下一步</el-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="预约电话" name="fouth" align-center>
        <el-steps :active="2" align-center finish-status="success">
          <el-step title="信息填写" description="2017-07-19 15:43:23"></el-step>
          <el-step title="提交审核" description="2017-07-19 15:43:23"></el-step>
          <el-step title="审核通过" description="审核中请耐心等待"></el-step>
        </el-steps>

        <el-row>
          <el-button @click="handleSubmitedInfo">查看已提交信息</el-button>
          <el-button type="success" @click="handleClickNext">下一步</el-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="咨询电话" name="fivth" align-center>
        <el-steps :active="2" align-center finish-status="success">
          <el-step title="信息填写" description="2017-07-19 15:43:23"></el-step>
          <el-step title="提交审核" description="2017-07-19 15:43:23"></el-step>
          <el-step title="审核通过" description="审核中请耐心等待"></el-step>
        </el-steps>

        <el-row>
          <el-button @click="handleSubmitedInfo">查看已提交信息</el-button>
          <el-button type="success" @click="handleClickNext">下一步</el-button>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
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
    handleSubmitImg(){
      //提交信息
      let cur=this.$router.history.current.fullPath;
      console.log(cur)
    },
    
    handleClickNext() {
      this.$router.push({ path: "/addParts" });
    },
    handleSubmitedInfo() {
      this.$router.push({ path: "/submitedInfo" });
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
    },
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