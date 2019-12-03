<template>
<!-- list -->
	<div>
		<section ref="flag">
			<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<h4 style="margin: 0 0 8px;padding:0">筛选查询</h4>
				<el-form :inline="true"  lable="物料ID:" :model="filters">
					<el-form-item>
						<el-input v-model="filters.name" placeholder="物料ID"></el-input>
					</el-form-item>
					<el-select v-model="ops.ops_i" placeholder="物料类型">
						<el-option label="店铺相册" value="店铺相册"></el-option>
						<el-option label="教育评论" value="教育评论"></el-option>
						<el-option label="课程物料" value="课程物料"></el-option>
						<el-option label="预约电话" value="预约电话"></el-option>
						<el-option label="咨询电话" value="咨询电话"></el-option>
					</el-select>
					<el-form-item>
						<el-button type="info" v-on:click="getUsers">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addNewOne">新增物料</el-button>
					</el-form-item>
				</el-form>
			</el-col>

			<!--列表-->
			<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="name" label="序号" width="100" sortable>
				</el-table-column>
				<el-table-column prop="sex" label="店铺ID" width="150" >
				</el-table-column>
				<el-table-column prop="age" label="店铺名称">
				</el-table-column>
				<el-table-column prop="birth" label="审核状态" width="120" >
				</el-table-column>
				<el-table-column label="操作">
					<template solt-scope="scope">
						<el-button  type="info" size="small">查看</el-button>
						<el-button  type="primary" size="small">更新</el-button>
						<el-button  type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
						<el-button  type="success" size="small">解绑</el-button>

					</template>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
				<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
				</el-pagination>
			</el-col>


		</section>
	</div>
	
</template>

<script>
	import util from '../../common/js/util';
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				flag:'',
				ops:{
					ops_i:'店铺相册'
				},
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			addNewOne(){
				let cur=this.$router.history.current.fullPath;
				  if(cur==="/addPartsNew"){
					  console.log(cur)
				  }else{
					  console.log(cur)
				  }
				this.$router.push({path:'/addPartsNew'});
			},

			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>