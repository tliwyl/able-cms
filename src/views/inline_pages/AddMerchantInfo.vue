<template>
	<el-form ref="form" :model="form" label-width="110px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item class="must_write " label="商户名称:">
			<el-input v-model="form.name" placeholder="填写您的商户名称"></el-input>
		</el-form-item>
		<el-form-item class="must_write _fixmust" label="企业/学校名称:">
			<el-input v-model="form.business_name" placeholder="请您填写与营业执照/办学许可证上一致的名称"></el-input>
		</el-form-item>

		<el-form-item class="must_write" label=" 品牌名称">
			<el-input v-model="form.brand_name" placeholder="请填写您的品牌名称"></el-input>
		</el-form-item>

		<el-form-item class="must_write" label="资质类型">
			<el-radio-group v-model="form.qua_types">
				<el-radio label="营业执照"></el-radio>
				<el-radio label="办学许可证"></el-radio>
			</el-radio-group>
		</el-form-item>

		<el-form-item class="must_write _fixmust" label="营业执照类型">
			<el-radio-group v-model="form.bus_lic_types">
				<el-radio label="企业法人"></el-radio>
				<el-radio label="个体工商户"></el-radio>
			</el-radio-group>
		</el-form-item>

		<el-form-item class="must_write _spin4" label=" 注册号">
			<el-input v-model="form.brand_name" placeholder="请填写您的注册号，参考营业执照"></el-input>
		</el-form-item>

		<el-form-item class="must_write _fixmust _spin" label=" 办学许可证编号">
			<el-input v-model="form.brand_name" placeholder="请您填写办学许可证编号"></el-input>
		</el-form-item>

		<el-form-item class="must_write _spin4" label="有效期">
			<el-col :span="11">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.startime" style="width: 100%;"></el-date-picker>
			</el-col>
			<el-col :span="11">
				<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.endtime" style="width: 100%;"></el-time-picker>
			</el-col>
			<el-radio-group v-model="form.isFover">
				<el-radio label="有效期"></el-radio>
				<el-radio label="永久有效"></el-radio>
			</el-radio-group>
		</el-form-item>
		<!-- 图片上传 -->
		<el-form-item class="must_write" label="资质附件">
			<el-upload limit=6
			action="https://jsonplaceholder.typicode.com/posts/"
			list-type="picture-card"
			:on-preview="handlePictureCardPreview"
			:on-remove="handleRemove">
			<i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</el-form-item>

		<el-form-item class="must_write _spin3" label="联系人姓名:">
			<el-input v-model="form.name" placeholder="填写您的姓名"></el-input>
		</el-form-item>

		<el-form-item class="must_write _fixmust" label="联系人手机号">
			<el-row>
				<el-input style="width:80%" v-model="form.name" placeholder="填写您的手机号"></el-input>
				<el-button>发送验证码</el-button>
			</el-row>
		</el-form-item>
		<el-form-item class="must_write _fixmust" label="输入验证码">
			<el-row>
				<el-input style="width:80%" v-model="form.name" placeholder="填写您验证码"></el-input>
				<el-button>确认</el-button>
			</el-row>
		</el-form-item>

		<el-form-item class="must_write _spin3" label="联系人邮箱">
			<el-input v-model="form.name" placeholder="填写您的邮箱"></el-input>
		</el-form-item>
		

		<el-form-item>
			<el-button type="primary" @click="handleSubmit">提交</el-button>
			<el-button  @click="handleReset">取消</el-button>
		</el-form-item>
	</el-form>
		
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					business_name:'',
					region: '',
					brand_name:'',
					qua_types:'',
					bus_lic_types:'',
					startime: '',
					endtime:'',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				dialogImageUrl: '',
        		dialogVisible: false
			}
		},
		methods: {
			handleSubmit(){
				console.log(1)
			},
			handleReset(){
				this.$router.push({path:'/submitInfoList'})
			},
			handleSubmitInfo(){
				this.$router.push({path:'/addInfo'})
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
	}
</script>

<style lang="scss" scope>
.width_limit{
	min-width:109px;
}
.el-form .el-form-item{
	position: relative;
}
.must_write::before{
	content:"*";
	font-size:1em;
	color:red;
	position:absolute;
	margin:12px 30px 0;
	z-index:1;
}
._fixmust::before{
	margin:12px 0px 0;
	z-index:1;
}
._spin::before{
	margin-left: -8px;
}
._spin3::before{
	margin-left: 12px;
}
._spin4::before{
	margin-left: 46px;
}
</style>