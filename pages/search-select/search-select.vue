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
			<!-- <view class="btn-area"> -->
				<button class="one-btn paitent-select-btn" form-type="submit">查询患者</button>
				<button class="one-btn paitent-select-btn"  @click="toFallList">跌倒风险评估</button>
				<button class="one-btn paitent-select-btn" @click="toMachineList">透析机运行记录</button>
			<!-- </view> -->
		</form>
	</view>
</template>

<script>
	import Store from '../../common/store.js'
	import moment from "moment"
	
	
	export default {
		data() {
			return {
				patientSelectData:
				{
					selectDate:"",
					selectTime:"",
					timeOrder:-1,
					selectRoom:"透析1组",
					roomOrder:-1,
				},
				timeInfo:[],
				roomInfo:[],
				timeRange:[],
				roomRange:[],
			}
		},
		onLoad() {
			var myDate = new Date();
			let y = myDate.getFullYear(); 
			let m = myDate.getMonth() +1;
			let d = myDate.getDate();
			if(m<10){
				m = '0'+ m;
			}
			if(d<10){
				d = '0'+ d;
			}
			this.patientSelectData.selectDate = y+'-'+m+'-'+d;
			this.patientSelectData.selectRoom = "透析1组";

			//获取治疗方式
			this.$myRequest({
				url:'/common/treatment',
				success: (res) => {
					if(res.data.code == 200){
						let treatmentInfo = res.data.data;
						Store.setStorageSync("treatmentInfo",treatmentInfo);
					}
					else{
						Store.setStorageSync("treatmentInfo","error");
					}
				},
			});
			//获取净化器列表
			this.$myRequest({
				url:'/common/fliterlist',
				success: (res) => {
					if(res.data.code == 200){
						let fliterInfo = res.data.data;
						Store.setStorageSync("fliterInfo",fliterInfo);
					}
					else{
						Store.setStorageSync("fliterInfo","error");
					}
				},
			});
			//获取抗凝方式列表
			this.$myRequest({
				url:'/common/bloodmethod',
				success: (res) => {
					if(res.data.code == 200){
						let bloodmethodInfo = res.data.data;
						Store.setStorageSync("bloodmethodInfo",bloodmethodInfo);
					}
					else{
						Store.setStorageSync("bloodmethodInfo","error");
					}
				},
			});
			//获取药品单位列表
			this.$myRequest({
				url:'/common/drugunit',
				success: (res) => {
					if(res.data.code == 200){
						let drugunitInfo = res.data.data;
						Store.setStorageSync("drugunitInfo",drugunitInfo);
					}
					else{
						Store.setStorageSync("drugunitInfo","error");
					}
				},
			});
			//获取医生列表
			this.$myRequest({
				url:'/common/doctorlist',
				success: (res) => {
					if(res.data.code == 200){
						let doctorInfo = res.data.data;
						Store.setStorageSync("doctorInfo",doctorInfo);
					}
					else{
						Store.setStorageSync("doctorInfo","error");
					}
				},
			});
			//获取护士列表
			this.$myRequest({
				url:'/common/nurselist',
				success: (res) => {
					if(res.data.code == 200){
						console.log("护士",res.data.data)
						let nurseInfo = res.data.data;
						Store.setStorageSync("nurseInfo",nurseInfo);
					}
					else{
						Store.setStorageSync("nurseInfo","error");
					}
				},
				fail: (err) => {
					console.log('request fail', err);
				},
			});
			
			//请求【选择时段】的选项
			this.timeRange = [];
			this.$myRequest({
				url:'/common/banci',
				success: (res) => {
					if(res.data.code == 200){
						this.timeInfo = res.data.data;
						console.log("选择时段:",this.timeInfo)
						for (let i = 0; i < this.timeInfo.length; i++) {
							this.timeRange.push(this.timeInfo[i].item_name);
						}
						Store.setStorageSync("banciInfo",this.timeInfo);
						Store.setStorageSync("banciRange",this.timeRange);
						//获取时段默认值
						let currTime = moment().format('YYYY-MM-DD HH:mm:ss');
						let currDate = moment().format('YYYY-MM-DD');
						let time1 = currDate + ' 06:00:00';
						let time2 = currDate + ' 12:00:00';
						let time3 = currDate + ' 18:00:00';
						let result1 = moment(time1).isBefore(currTime);
						let result2 = moment(time2).isBefore(currTime);
						let result3 = moment(time3).isBefore(currTime);
						if(result1 === true && result2 ===false){
							this.patientSelectData.selectTime = "上午";
							this.patientSelectData.timeOrder = this.timeRange.indexOf("上午");
						}
						else if(result2 === true && result3 === false){
							this.patientSelectData.selectTime = "下午";
							this.patientSelectData.timeOrder = this.timeRange.indexOf("下午");
						}
						else if(result3 === true || result1 === false){
							this.patientSelectData.selectTime = "晚班";
							this.patientSelectData.timeOrder = this.timeRange.indexOf("晚班");
						}
					}
				},
			});
			//请求【选择透析室】的选项
			this.roomRange = [];
			this.$myRequest({
				url:'/common/dialysisroom',
				success: (res) => {
					if(res.data.code == 200){
						this.roomInfo = res.data.data;
						console.log("选择透析室:",this.roomInfo)
						for (let i = 0; i < this.roomInfo.length; i++) {
							this.roomRange.push(this.roomInfo[i].item_name);
						}
						Store.setStorageSync("roomInfo",this.roomInfo);
						Store.setStorageSync("roomRange",this.roomRange);
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
			toMachineList(){
				uni.navigateTo({
					url: "../dialysis-machine-list/dialysis-machine-list"
				});
			},
			toFallList(){
				uni.navigateTo({
					url: "../fall-list/fall-list"
				});
			},
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
					console.log('timeVal',timeVal);
					Store.setStorageSync("searchInfo",{banci_id:timeVal,date:this.patientSelectData.selectDate,room:this.patientSelectData.selectRoom,});
					uni.navigateTo({
						url: "../patient-list/patient-list"
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
				console.log(e);
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
		margin: 20rpx auto;
	}
</style>
