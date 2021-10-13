<template>
	<view>
		<uni-nav-bar class="nav-style" statusBar="true" fixed="true" left-icon="back" right-icon="loop" :title="patient.name" color="#ffffff" background-color="#51D3C7" @clickLeft="toPatientList" @clickRight="reflesh"></uni-nav-bar>
		<view class="content">
			<view class="vascular-item" v-for="item in vascularList">
				<text class="vascular-item-title">{{item.allvascularaccess}}</text>
				<image class="vascular-item-cnt" :src="item.lastpicurl" mode="aspectFit"></image>
				<!-- <uni-icons type="arrowright" color="#C0C0C0" size="25" /></uni-icons> -->
				<view class="vascular-item-other">
					<button class="btn" @click="takePic(item)">拍照</button>
					<button class="btn" @click="toVascularDetail(item)">查看更多</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Store from '../../common/store.js'
	import _ from 'lodash'
	
	let that = null;
	export default {
		data() {
			return {
				patient:{},
				vascularList:[],
			}
		},
		onShow:function(){
			that = this;
			console.log("enter onshow")
			this.patient = Store.getStorageSync("patient");
			console.log("patient",this.patient)
			this.vascularList = [];
			//获取血管通路
			this.getVascular();
		},
		methods: {
			//导航返回按钮对应方法
			toPatientList(){
				uni.navigateTo({
					url: "../patient-list/patient-list",
				});
				this.patient={};
			},
			//获取血管通路数据
			getVascular(){
				this.vascularList = [];
				this.$myRequest({
					url:'/patient/vascularaccess',
					method:'POST',
					data:{
						hemodialysis_id:this.patient.hemodialysis_id
					},
					success: (res) => {
						this.vascularList =  _.cloneDeep(res.data.data);
						console.log("vascularList",this.vascularList)
					},
				});
			},
			//进入详情页
			toVascularDetail(item){
				console.log("item",item)
				Store.setStorageSync("vascularMsg",item);
				uni.navigateTo({
					url: "../vascular-access-detail/vascular-access-detail",
				});
			},
			takePic(item){
				uni.chooseImage({
					count: 1,
					success: function (res) {
						console.log("chooseImage",res)
						uni.showToast({
							title: "img:" + res.tempFilePaths[0],
							icon: 'none',
							mask: true
						});
						uni.uploadFile({
							// url:"http://192.168.0.46:8083/patient/new/vascularaccesspic",
							url:"http://172.19.38.137:8083/patient/new/vascularaccesspic",
							filePath:res.tempFilePaths[0],
							fileType:'image',
							name:'file',
							formData:{
								'hemodialysis_id': item.hemodialysis_id,
								'vascular_access_id': item.vascular_access_id,
							},
							success:(res1)=>{
								console.log("res1:",res1)
								uni.showToast({
									title: '照片添加成功',
									icon: 'none',
									mask: true
								});
								setTimeout(() => {
									that.getVascular();
								},500);
							},
							fail:(err1)=>{
								console.error("uploadFile 失败",err1);
								uni.showToast({
									title: '照片添加失败',
									icon: 'none',
									mask: true
								});
							}
						})
					},
					fail: function (err) {
						console.log("chooseImage 失败",err);
					}
				});
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");

	.vascular-item{
		width: calc(100% - 40rpx);
		padding: 20rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 20rpx;
		box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4);
	}
	.vascular-item-title{
		width: 100%;
		padding-bottom: 20rpx;
		font-size: 28rpx;
		text-align: center;
	}
	.vascular-item-cnt{
		width: 710rpx;
	}
	.vascular-item-other{
		width: 100%;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	button::after{
		border: none;
	}
	.btn {
		flex: 1;
		margin: 0 10rpx;
	    display: flex;
	    align-items: center;
	    justify-content: center;
		background-color: #51D3C7;
		color: #FFFFFF;
		font-size: 28rpx;
	    border-radius: 20rpx;
	    box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4);
	}
</style>
