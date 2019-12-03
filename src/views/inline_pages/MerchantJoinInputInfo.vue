<template>

  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="信息填写" name="first">
      <el-form
        ref="form"
        :model="form"
        label-width="110px"
        @submit.prevent="onSubmit"
        style="margin:20px;width:60%;min-width:600px;"
      >
        <el-form-item class="must_write" label="商户名称:">
          <el-input v-model="form.merchants_name" placeholder="填写您的商户名称"></el-input>
        </el-form-item>
        <el-form-item class="must_write _fixmust" label="企业/学校名称:">
          <el-input v-model="form.org_name" checked placeholder="请您填写与营业执照/办学许可证上一致的名称"></el-input>
        </el-form-item>

        <el-form-item class="must_write" label=" 品牌名称">
          <el-input v-model="form.brand" placeholder="请填写您的品牌名称"></el-input>
        </el-form-item>

        <el-form-item class="must_write" label="资质类型">
          <el-radio-group v-model="form.edu_type">
            <el-radio :label="1" >营业执照</el-radio>
            <el-radio :label="2" >办学许可证</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="must_write _fixmust" label="营业执照类型">
          <el-radio-group v-model="form.org_type">
            <el-radio :label="1" >企业法人</el-radio>
            <el-radio :label="2">个体工商户</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="must_write _spin4" label=" 注册号">
          <el-input v-model="form.org_code" placeholder="请填写您的注册号，参考营业执照"></el-input>
        </el-form-item>

        <el-form-item class="must_write _fixmust _spin" label=" 办学许可证编号">
          <el-input v-model="form.brand_name" placeholder="请您填写办学许可证编号"></el-input>
        </el-form-item>

        <el-form-item 
          v-model="form.org_license_time" 
          class="must_write _spin4" 
          label="有效期" >
          <el-col :span="12">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.startime"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          
          <el-col :span="12">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.endtime"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          
          <el-radio-group v-model="form.org_license_time">
            <!-- <el-radio label="有效期" :prop="checktimestate"></el-radio> -->
            <el-radio label="永久有效">永久有效</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item class="must_write" label="资质附件">
          <el-upload
            tip="上传一张营业执照"
            limit=1
            :headers=headers
            name=media
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleLicenseSuccess"
            :on-error="PicLicenseErr"
          >
            <i  class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <el-form-item class="must_write _spin3" label="联系人姓名:">
          <el-input v-model="form.owner_name" placeholder="填写您的姓名"></el-input>
        </el-form-item>

        <el-form-item ref="insertNumer" class="must_write _fixmust" label="联系人手机号">
          <el-row>
            <el-input style="width:80%" v-model.number="insertNumer.owner_phone" 
            placeholder="填写您的手机号" 
            prop="owner_phone">
            </el-input>

            <el-button  
            class="validateCode" 
            @click="sendMsg('insertNumer')" 
            :disabled="isDisabled">{{buttonName}}</el-button>

          </el-row>
        </el-form-item>
        <el-form-item class="must_write must_write _spin3" label="输入验证码">
          <el-row>
            <el-input style="width:80%" v-model="insertNumer.validateCode" placeholder="填写您验证码"></el-input>
            <!-- <el-button style="width:14%">确认</el-button> -->
          </el-row>
        </el-form-item>

        <el-form-item class="must_write _spin3" label="联系人邮箱">
          <el-input v-model="form.owner_mail" placeholder="填写您的邮箱"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">立即创建</el-button>
          <el-button @click.native.prevent>取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>

    <el-tab-pane @click.native.prevent="handleCheckState" label="审核情况" name="second" align-center>
        <el-steps :active="2" align-center finish-status="success">
        <el-step title="信息填写" description="2017-07-19 15:43:23"></el-step>
        <el-step title="提交审核" description="2017-07-19 15:43:23"></el-step>
        <el-step title="审核通过" description="审核中请耐心等待"></el-step>
      </el-steps>

      <el-row>
        <el-button @click="handleSubmitedInfo">查看已提交信息</el-button>
        <el-button @click="reReque">修改并重新申请</el-button>
        <el-button type="success" @click="handleClickNext">下一步</el-button>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
 // import { phoneCode } from '../api/api';
 import axios from 'axios';
export default {
  data() {
  var CheckTel = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入手机号码'));
    } else if (!Number.isInteger(value)) {
        callback(new Error('手机号码必须是数字'));
    } else if (value.toString().length != 11) {
        callback(new Error('手机号码必须是11位'));
    } else {
        callback();
    }}

    return { 
    disabled: true,
    buttonName: "发送短信",
    isDisabled: false,
    time: 10,
    insertNumer:{
        owner_phone: '15313321103',
        validateCode: '0101',
    },
    rules: {
        owner_phone: [{
            required: true,
            validator: CheckTel,
            trigger: 'blur'
        }],
        validateCode: [{
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
        }],
    },
      activeName: "first",
      checktimestate:"0",
      startime: "2019-10-01",
      endtime: "2020-10-01",
      form: {
        // 商户名称
        merchants_name: "北京新东方",
        //企业学校名称
        org_name: "北京新东方教育科技（集团）有限公司",
        brand: "新东方",
        edu_type: "1",
        //营业执照类型，edutype：1才有
        org_type: "1",
        org_code:"293928382838x",
        owner_name:"张三",
        owner_mail:"01@qq.com",
        org_license_time:"",
        //资质附件
        org_license:"https:\/\/midpf-account.cdn.bcebos.com\/5a0a785735d5183b44809ebe7074035a.jpeg",
      },
      dialogImageUrl: "",
      dialogVisible: false,
    }
  },
  computed:{
    headers() {
      return {
        'ContentType': 'multipart/form-data'
      }
    }
  },
  methods: {
    handleCheckState(){
      //审查情况访问shop_view接口
      axios.get("http://192.168.3.253:8081/openApi/shop_view",{"shop_id":"121",
      "merchants_id":"77064127556400"}).then(res=>res.data)
      .then(data=>{
        let {name,status,audit_time,audit_msg}=data;
        console.log(status)
      })
    },
    sendMsg(insertNumer) {
      axios.get("http://192.168.3.253:8081/sms/sendMessage",{"phone":"15313321103"}).then(res=>res.data)
      .then(data=>{
        let {status,msg,code}=data;
        console.log(code)
      });
        this.$refs.insertNumer.validate('owner_phone',valid=>{
            if (valid!=='') {
                this.rules.owner_phone;
            }else {
            let me = this;
            me.isDisabled = true;
            let interval = window.setInterval(function () {
                me.buttonName = me.time + '后重新发送';
                --me.time;
                if (me.time < 0) {
                    me.buttonName = "重新发送";
                    me.time = 10;
                    me.isDisabled = false;
                    window.clearInterval(interval);
                  }
              }, 1000);
          }
      });
    },
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
    },
    handleLicenseSuccess(res,file){
      console.log(res)
    },
    PicLicenseErr(err,file,fileList){
      console.log(err)
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