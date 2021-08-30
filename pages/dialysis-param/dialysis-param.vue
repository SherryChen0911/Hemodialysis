<template>
	<view>
		<uni-nav-bar class="nav-style" statusBar="true" fixed="true" left-icon="back" right-icon="loop" :title="patient.name" color="#ffffff" background-color="#51D3C7" @clickLeft="toPatientList" @clickRight="reflesh"></uni-nav-bar>
		<view class="content">
			<view class="table-list">
				<view class="table-line table-title">
					<text class="table-item">记录时间</text>
					<text class="table-item">收缩压</text>
					<text class="table-item">舒张压</text>
					<text class="table-item">静脉压</text>
					<text class="table-item">跨膜压</text>
					<text class="table-item">脉搏</text>
				</view>
				<view class="table-line table-cnt" v-for="item in dialysisParamInfo" @click="showParamSelect(item)">
					<text class="table-item">{{item.show_create_date}}</text>
					<text class="table-item">{{item.systolic_pressure}}</text>
					<text class="table-item">{{item.diastolic_pressure}}</text>
					<text class="table-item">{{item.venous_pressure}}</text>
					<text class="table-item">{{item.transmembrane_pressure}}</text>
					<text class="table-item">{{item.cardiotach}}</text>
				</view>
				<view class="btn-line table-cnt">
					<button class="table-btn" @click="addInfo">
						<uni-icons class="btn-icon" type="plus" color="#51D3C7" size="15"></uni-icons>
						新增
					</button>
				</view>
			</view>
		</view>
		
		<!-- 弹出框 -->
		<uni-popup ref="paramSelect" type="dialog">
			<view class="bottom-select-view" slot="default">
					<button class="one-btn" @click="copyParam">复制</button>
					<button class="one-btn" @click="editParam">编辑</button>
					<button class="err-btn" @click="deleteParam">删除</button>
			</view>
		</uni-popup>
	</view>

</template>

<script>
	import Store from '../../common/store.js'
	export default {
		data() {
			return {
				patient:{},
				dialysisParamInfo:[],
				selectItem:{}
			}
		},
		onShow: function () {
			this.patient = Store.getStorageSync("patient");
			let tempa = Store.getStorageSync("bloodPressure")
			console.log("bloodPressure",tempa);
			//获取透析参数
			this.$myRequest({
				url:'/patient/dialysisparam',
				method:'POST',
				data:{
					cure_id:this.patient.cure_id,
				},
				success: (res) => {
					if(res.data.code == 200){
						console.log("length:",res.data.data.length);
						console.log("透析参数",res.data.data);
						if(res.data.data.length === 0){
							Store.setStorageSync("defaultBP",0);
						}
						else{
							Store.setStorageSync("defaultBP",1);
						}
						//改记录时间的样式
						for(let i = 0; i < res.data.data.length; i++){
							if(res.data.data[i].create_date != ""){
								let temp = res.data.data[i].create_date.split(" ");
								let temp1 = temp[1].slice(0,5);
								res.data.data[i].show_create_date = temp1;
							}
						}
						this.dialysisParamInfo = res.data.data;
					}
				},
			});
		},		
		methods: {
			//导航返回按钮对应方法
			toPatientList(){
				uni.navigateTo({
					url: "../patient-list/patient-list",
				});
				this.patient={};
				this.dialysisParamInfo=[];
			},
			//导航刷新按钮对应方法
			reflesh(){
				let tempa = Store.getStorageSync("bloodPressure")
				uni.showToast({
					title: 'loading',
					icon: 'loading',
					mask: true
				});
				//获取透析参数
				this.$myRequest({
					url:'/patient/dialysisparam',
					method:'POST',
					data:{
						cure_id:this.patient.cure_id,
					},
					success: (res) => {
						if(res.data.code == 200){
							console.log("length:",res.data.data.length);
							console.log("透析参数",res.data.data);
							if(res.data.data.length === 0){
								Store.setStorageSync("defaultBP",0);
							}
							else{
								Store.setStorageSync("defaultBP",1);
							}
							//改记录时间的样式
							for(let i = 0; i < res.data.data.length; i++){
								if(res.data.data[i].create_date != ""){
									let temp = res.data.data[i].create_date.split(" ");
									let temp1 = temp[1].slice(0,5);
									res.data.data[i].show_create_date = temp1;
								}
							}
							this.dialysisParamInfo = res.data.data;
						}
					},
				});
			},
			//新增按钮
			addInfo(){
				uni.navigateTo({
					url: "../dialysis-param-add/dialysis-param-add"
				});
			},
			//选中列表按钮
			showParamSelect(item){
				this.$refs.paramSelect.open();
				this.selectItem = item;
			},
			//复制透析参数
			copyParam(){
				Store.setStorageSync("dialysisParam",this.selectItem);
				uni.navigateTo({
					url: "../dialysis-param-copy/dialysis-param-copy",
				});
				this.$refs.paramSelect.close();
			},
			//编辑透析参数
			editParam(){
				Store.setStorageSync("dialysisParam",this.selectItem);
				uni.navigateTo({
					url: "../dialysis-param-edit/dialysis-param-edit",
				});
				this.$refs.paramSelect.close();
			},
			//删除透析参数
			deleteParam(){
				this.$refs.paramSelect.close();
				//删除透析参数
				this.$myRequest({
					url:'/patient/delete/dialysisparam',
					method:'POST',
					data:{
						hemodialysis_parameters_id: this.selectItem.hemodialysis_parameters_id,
					},
					success: (res) => {
						if(res.data.code == 200){
							this.reflesh();
							uni.showToast({
								title: '透析参数删除成功',
								icon: 'none',
								mask: true
							},500);
						}
						else{
							uni.showToast({
								title: '透析参数删除失败',
								icon: 'none',
								mask: true
							},500);
						}
					},
				});
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");
	.table-list{
		width: calc(100% - 4rpx);
		border: 2rpx solid;
		border-color: #C0C0C0;
		border-radius: 20rpx;
	}
	.table-line{
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.table-title{
		color: #FFFFFF;
		font-weight: 600;
		background-color: #C0C0C0;
		border-radius: 20rpx 20rpx 0 0;
	}
	.table-cnt{
		border-top: 2rpx solid;
		border-color: #C0C0C0;
	}
	.table-item{
		flex: 1;
		text-align: center;
		font-size: 28rpx;
	}
	.btn-line{
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.table-btn{
		width: 240rpx;
	}
	.bottom-select-view{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 100rpx;
		padding: 0 20rpx;
	}
	.one-btn{
		margin-bottom: 20rpx;
	}
	.err-btn{
		margin-bottom: 20rpx;
	}
</style>
