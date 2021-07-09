<template>
	<view>
		<uni-nav-bar class="nav-style" left-icon="back" right-icon="loop" :title="patient.name" color="#ffffff" background-color="#51D3C7" @clickLeft="toPatientList"></uni-nav-bar>
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
				<view class="table-line table-cnt" v-for="item in info">
					<text class="table-item">{{item.time}}</text>
					<text class="table-item">{{item.sbp}}</text>
					<text class="table-item">{{item.dbp}}</text>
					<text class="table-item">{{item.cvp}}</text>
					<text class="table-item">{{item.tmp}}</text>
					<text class="table-item">{{item.pulse}}</text>
				</view>
				<view class="btn-line table-cnt">
					<button class="table-btn" @click="addInfo">
						<uni-icons class="btn-icon" type="plus" color="#51D3C7" size="15"></uni-icons>
						新增
					</button>
				</view>
			</view>
		</view>		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				patient:{},
				info:[
					{
						time:'08:30',
						sbp:'170',//收缩压
						dbp:'90',//舒张压
						cvp:'100',//静脉压
						tmp:'76',//跨膜压
						pulse:'80'
					},
					{
						time:'08:30',
						sbp:'180',//收缩压
						dbp:'90',//舒张压
						cvp:'100',//静脉压
						tmp:'76',//跨膜压
						pulse:'81'
					},
					{
						time:'08:30',
						sbp:'190',//收缩压
						dbp:'90',//舒张压
						cvp:'100',//静脉压
						tmp:'76',//跨膜压
						pulse:'82'
					},
				]
			}
		},
		onShow: function () {
			console.log("这里是透析参数页面",uni.getStorageSync("patient"));
			this.patient = uni.getStorageSync("patient");
			console.log(this.patient);
		},		
		methods: {
			toPatientList(){
				uni.navigateTo({
					url: "../patient-list/patient-list",
				});
			},
			addInfo(){
				uni.navigateTo({
					url: "../dialysis-param-add/dialysis-param-add"
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
	
</style>
