<template>
	<view>
		<uni-nav-bar class="nav-style" statusBar="true" fixed="true" left-icon="back" right-icon="loop" :title="patient.name" color="#ffffff" background-color="#51D3C7" @clickLeft="toPatientList" @clickRight="reflesh"></uni-nav-bar>
		<view class="content">
				<button class="table-btn" @click="setTemplate">
					<uni-icons class="btn-icon" type="plus" color="#51D3C7" size="15"></uni-icons>
					使用模板
				</button>
			<view class="texarea-border">
				<textarea v-model="summary" placeholder="" />
			</view>
			<button class="one-btn" @click="submit">保存</button>
		</view>

		<!-- 弹出框 -->
		<uni-popup id="dialogInput" ref="templates" type="dialog">
			<view class="template-list" slot="default">
				<scroll-view scroll-y="true" >
				<view class="template-item" scroll-y="true" v-for="item in templateList" @click="selectTemplate(item)">
						<text>{{item.item_name}}</text>
				</view>
				</scroll-view>
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
				summary:"",
				templateList:[],
			}
		},
		onShow: function () {
			this.patient = Store.getStorageSync("patient");
			console.log(this.patient);
			//获取透析小结
			this.$myRequest({
				url:'/patient/summary',
				method:'POST',
				data:{
					cure_id:this.patient.cure_id,
				},
				success: (res) => {
					if(res.data.code == 200){
						
						this.summary = res.data.data.summary;
						console.log("透析小结",res.data.data,this.summary);
					}
				},
			});
			//获取透析小结模板
			this.$myRequest({
				url:'/common/dialysistemp',
				success: (res) => {
					if(res.data.code == 200){
						console.log("透析小结模板",res.data.data);
						this.templateList = res.data.data;
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
				this.summary="";
				this.templateList=[];
			},
			//导航刷新按钮对应方法
			reflesh(){
				uni.showToast({
					title: 'loading',
					icon: 'loading',
					mask: true
				});
				//获取透析小结
				this.$myRequest({
					url:'/patient/summary',
					method:'POST',
					data:{
						cure_id:this.patient.cure_id,
					},
					success: (res) => {
						if(res.data.code == 200){
							
							this.summary = res.data.data.summary;
							console.log("透析小结",res.data.data,this.summary);
						}
					},
				});
				//获取透析小结模板
				this.$myRequest({
					url:'/common/dialysistemp',
					success: (res) => {
						if(res.data.code == 200){
							console.log("透析小结模板",res.data.data);
							this.templateList = res.data.data;
						}
					},
				});
			},
			//显示模板
			setTemplate(){
				this.$refs.templates.open();
			},
			//选择模板内容
			selectTemplate(item){
				this.summary = item.item_name;
				this.$refs.templates.close();
			},
			//提交透析小结
			submit(){
				console.log(this.summary);
				//提交透析小结
				this.$myRequest({
					url:'/patient/update/summary',
					method:'POST',
					data:{
						cure_id:this.patient.cure_id,
						"summary":this.summary,
					},
					success: (res) => {
						if(res.data.code == 200){
							uni.showToast({
								title: '透析小结保存成功',
								icon: 'none',
								mask: true
							});
						}
					},
					fail: (err) => {
						console.log('request fail', err);
						uni.showToast({
							title: '透析小结保存失败',
							icon: 'none',
							mask: true
						});
					},
				});
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");
	.texarea-border{
		width: calc(100% - 44rpx);
		padding: 20rpx;
		border: 2rpx solid;
		border-color: #C0C0C0;
		border-radius: 20rpx;
	}
	textarea{
		width: 100%;
		height: 1000rpx;
	}
	.one-btn{
		width: 100%;
		margin: 20rpx 0;
	}
	.table-btn{
		width: 180rpx;
	}
	.template-list{
		margin: 20rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.template-item{
		padding: 10rpx 0 ;
		border-bottom: 2rpx solid;
		border-color: #C0C0C0;
		font-size: 28rpx;
	}
	scroll-view{
		height: 1000rpx;
	}
</style>
