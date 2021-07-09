<template>
	<view class="content">
		<form class="patient-select">
			<view class="form-item form-cnt paitent-select-cnt">
				<view class="form-prefix-space paitent-select-prefix">
						<text>选择日期:</text>
				</view>
				<view class="form-mid-space">
					<picker mode="date" fields="day"  @change="setPatientSelectDate">
						<input type="text" :value="patientSelectData.selectDate" placeholder="请选择查询日期"/>
					</picker>
				</view>
			</view>
			<view class="form-item form-cnt paitent-select-cnt">
				<view class="form-prefix-space paitent-select-prefix">
					<text>选择时段:</text>
				</view>
				<view class="form-mid-space">
					<picker mode="selector" :range="timeRange"  @change="setPatientSelectTime">
						<input type="text" :value="patientSelectData.selectTime" placeholder="请选择查询时段"/>
					</picker>
				</view>
			</view>
			<view class="form-cnt paitent-select-cnt">
				<view class="form-prefix-space paitent-select-prefix">
					<text>选择透析室:</text>
				</view>
				<view class="form-mid-space">
					<picker mode="selector" :range="roomRange"  @change="setPatientSelectRoom">
						<input type="text" :value="patientSelectData.selectRoom" placeholder="请选择查询诊室"/>
					</picker>					
				</view>
			</view>
			<view class="btn-area">
				<button class="one-btn paitent-select-btn" @click="selectPatient">查询患者</button>
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
					selectRoom:"",
				},
				timeRange:["上午","下午","晚班","急诊"],
				roomRange:["透析1组","透析2组","透析3组","透析4组","透析5组","RPR","C区","B区"],
			}
		},
		onBackPress() {
			uni.navigateTo({
				url:"../login/login",
			});
			return true;
		},
		methods: {
			setPatientSelectDate(e){
				this.patientSelectData.selectDate = e.detail.value;
			},
			setPatientSelectTime(e){
				this.patientSelectData.selectTime = this.timeRange[e.detail.value];
			},
			setPatientSelectRoom(e){
				this.patientSelectData.selectRoom = this.roomRange[e.detail.value];
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
