<template>
	<view class="content">
		<form class="patient-select" @submit="formSubmit">
			<view class="form-item form-cnt paitent-select-cnt">
				<view class="form-prefix-space paitent-select-prefix">
						<text>选择日期:</text>
				</view>
				<view class="form-mid-space">
					<picker mode="date" fields="day"  @change="setPatientSelectDate">
						<input type="text" disabled="true" :value="patientSelectData.selectDate" placeholder="请选择查询日期"/>
					</picker>
				</view>
			</view>
			<view class="form-item form-cnt paitent-select-cnt">
				<view class="form-prefix-space paitent-select-prefix">
					<text>选择时段:</text>
				</view>
				<view class="form-mid-space">
					<picker mode="selector" :range="timeRange" @change="setPatientSelectTime">
						<input type="text" disabled="true" :value="patientSelectData.selectTime" placeholder="请选择查询时段"/>
					</picker>
				</view>
			</view>
			<view class="form-cnt paitent-select-cnt">
				<view class="form-prefix-space paitent-select-prefix">
					<text>选择透析室:</text>
				</view>
				<view class="form-mid-space">
					<picker mode="selector" :range="roomRange"  @change="setPatientSelectRoom">
						<input type="text" disabled="true" :value="patientSelectData.selectRoom" placeholder="请选择查询诊室"/>
					</picker>					
				</view>
			</view>
			<view class="btn-area">
				<button class="one-btn paitent-select-btn" form-type="submit">查询患者</button>
			</view> 
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				patientSelectData:
				{
					selectDate:"",
					selectTime:"",
					timeOrder:-1,
					selectRoom:"",
					roomOrder:-1,
				},
				timeInfo:[],
				roomInfo:[],
				timeRange:[],
				roomRange:[],
			}
		},
		onLoad() {
			//请求【选择时段】的选项
			this.$myRequest({
				url:'/common/banci',
				success: (res) => {
					// console.log(res);
					if(res.data.code == 200){
						this.timeInfo = res.data.data;
						for (let i = 0; i < this.timeInfo.length; i++) {
							this.timeRange.push(this.timeInfo[i].item_name);
						}
					}
				},
			});
			//请求【选择透析室】的选项
			this.$myRequest({
				url:'/common/dialysisroom',
				success: (res) => {
					// console.log(res);
					if(res.data.code == 200){
						this.roomInfo = res.data.data;
						for (let i = 0; i < this.roomInfo.length; i++) {
							this.roomRange.push(this.roomInfo[i].item_name);
						}
					}
				},
			});
		},
		onBackPress() {
			uni.navigateTo({
				url:"../login/login",
			});
			return true;
		},
		methods: {
			//查询病患列表
			formSubmit(e){
				uni.showToast({
					title: 'loading',
					icon: 'loading',
					mask: true
				});
				//判断数据是否存在
				if((this.patientSelectData.selectDate != "") && (this.patientSelectData.timeOrder != -1) && (this.patientSelectData.selectRoom != "")){
					//转换数据格式
					let timeVal = this.timeInfo[this.patientSelectData.timeOrder].item_value;
					
					//发起请求
					this.$myRequest({
						url:'/patient/patientlist',
						method:'POST',
						data:{
							banci_id:timeVal,
							date:this.patientSelectData.selectDate,
							room:this.patientSelectData.selectRoom,
						},
						success: (res) => {
							if(res.data.code == 200){
								uni.setStorageSync("patientList",res.data.data);
								uni.setStorageSync("searchInfo",{banci_id:timeVal,date:this.patientSelectData.selectDate,room:this.patientSelectData.selectRoom,});
								setTimeout(() => {
										uni.navigateTo({
											url: "../patient-list/patient-list"
										});
									}, 500);
							}
						},
					});
				}
				else{
					uni.showToast({
						title: "搜索信息不全",
						icon: 'none',
					});
				}
			},
			setPatientSelectDate(e){
				this.patientSelectData.selectDate = e.detail.value;
			},
			setPatientSelectTime(e){
				// console.log(e);
				this.patientSelectData.selectTime = this.timeRange[e.detail.value];
				this.patientSelectData.timeOrder = e.detail.value;
			},
			setPatientSelectRoom(e){
				this.patientSelectData.selectRoom = this.roomRange[e.detail.value];
				this.patientSelectData.roomOrder = e.detail.value;
			},
			selectPatient(){
				uni.navigateTo({
					url: "../patient-list/patient-list"
				});
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");
	.patient-select{
		width: calc(100% - 40rpx);
		margin: 0 20rpx 0 20rpx;
	}
	.paitent-select-prefix{
		width: 200rpx;
	}
	.paitent-select-cnt{
		border-color: #51D3C7;
	}
	.paitent-select-btn{
		margin: 50rpx auto;
		height: 100rpx;
		width: calc(100% - 40rpx);;
	}
</style>
