<template>
	<view class="content">
		<view class="list-view">
			<view class="list-item" v-for="(item,key) in patientList">
				<view class="header">
					<view class="list-head-left">
						<image class="patient-pic" :src="item.pic" mode="aspectFill"></image>
						<text>{{item.name}} {{item.sex}}</text>
						<view class="patient-status">
							<text v-show="item.isfinish">已完成</text>
						</view>
					</view>
					<view class="list-head-right">
						<text>ID: {{item.credentials_number}}</text>
						<text>透析号: {{item.hemodialysis_id}}</text>
						<text>治疗项目: {{item.treatmentitems}}</text>
						<text>传染病: {{item.infectious_check_result}}</text>
						<text>净化器: {{item.filter}}</text>
						<text>预订时间: {{item.frequency_hours}}小时</text>
						<text>预计脱水: {{item.dry_water_value}}Kg</text>
						<text>抗凝方式: {{item.anticoagulationmethod}}</text>
						<text>首计: {{item.first}}</text>
						<text>追加: {{item.second}}</text>
					</view>
				</view>
				<view v-show="!item.isfinish" class="footer">
					<button class="btn" @click="callPatient(item,key)">叫号</button>
					<button class="btn" @click="takePic(item,key)">患者拍照</button>
					<button class="btn" v-show="item.start_time == ''" @click="doTreatment(item)">开始治疗</button>
					<button class="btn" v-show="item.start_time != ''" @click="doTreatment(item)">执行治疗</button>
					<button class="btn" @click="endTreatment(item,key)">结束治疗</button>
				</view>
			</view>
		</view>
		<uni-popup id="endTreatement" ref="endTreatement" type="dialog">
			<uni-popup-dialog type="info" mode="base" :content="popupMsg" @confirm="confirmEndTreatment" @close="cancelEndtreatment" >
			</uni-popup-dialog>
		</uni-popup>
		<view v-show="navSelected" class="nav-select">
			<view class="nav-select-item" @click="changeAccount">切换账号</view>
			<view class="nav-select-item" @click="reflesh">刷新</view>
		</view>
	</view>
</template>

<script>
	import Store from '../../common/store.js'
	import _ from "lodash"
	import moment from "moment"
	
	let that = null;
	export default {
		data() {
			return {
				navSelected:false,
				patientList:[],
				popupMsg:"",
				operatePatientOrder: -1,
				operatePatient:{},
			}
		},
		onNavigationBarButtonTap(e){
			this.navSelected = !this.navSelected;
		},
		onBackPress() {
			uni.navigateTo({
				url:"../search-select/search-select",
			});
			return true;
		},
		onLoad() {
			this.reflesh()
		},
		methods: {
			//患者叫号
			callPatient(item,key){
				//获取诊室信息
				let searchInfo = Store.getStorageSync("searchInfo");
				let needkey = key.toString();
				this.$myRequest({
					url:'/patient/call/number',
					method:'POST',
					data:{
						clinicname:searchInfo.room,
						patientnum:needkey,
						patientname:item.name
					},
					success: (res) => {
						if(res.data.code == 200){
							uni.showToast({
								title: res.data.data.message,
								icon: 'none',
								mask: true
							});
						}
					},
				});
			},
			//患者拍照
			takePic(item,key){
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
							// url:"http://192.168.0.46:8083/patient/update/pic",
							url:"http://172.19.38.137:8083/patient/update/pic",
							filePath:res.tempFilePaths[0],
							fileType:'image',
							name:'file',
							formData:{
								'hemodialysis_id':item.hemodialysis_id
							},
							success:(res1)=>{
								console.log("uploadFile",res1)
								//刷新单个头像
								that.$myRequest({
									url:'/patient/img',
									method:'POST',
									data:{
										"hemodialysis_id":item.hemodialysis_id
									},
									success: (res) => {
										//若获取成功同时传入图片和治疗状态数据
										if(res.data.code == 200){
											that.patientList[key].pic = res.data.data.pat_pic;
										}
									},
								});
							},
							fail:(err1)=>{
								console.log("uploadFile",err1)
								console.error("uploadFile 失败",err1);
							}
						})
					},
					fail: function (err) {
						console.log("chooseImage 失败",err);
					}
				});
			   },
			//执行治疗按钮方法
			doTreatment(item){
				if(item.cure_id == ""){
					// console.log("进入创建主表流程")
					let searchInfo = Store.getStorageSync("searchInfo");
					this.$myRequest({
						url:'/patient/create/cure',
						method:'POST',
						data:{
							banci_id: searchInfo.banci_id,
							room: searchInfo.room,
							hemodialysis_id: item.hemodialysis_id,
							date: searchInfo.date,
							patient_id: item.patient_id,
							patient_schedule_id: item.patient_schedule_id,
						},
						success: (res) => {
							// console.log("创建主表",res.data.data)
							if(res.data.code == 200){
								this.reflesh();
								setTimeout(()=>{
									// console.log("重新打印patientList",this.patientList)
									for(let k = 0; k < this.patientList.length; k++){
										if(this.patientList[k].patient_id == item.patient_id){
											// console.log("找到patient",this.patientList[k])
											Store.setStorageSync("patient",this.patientList[k]);
											break;
										}
									}
									uni.switchTab({
										url: "../treat-info/treat-info",
									});
								},5000)
							}
							else{
								uni.showToast({
									title: "主表创建失败！",
									icon: 'none',
								});
							}
						},
					});
				}
				else{
					console.log("进入执行治疗流程")
					Store.setStorageSync("patient",item);
					uni.switchTab({
						url: "../treat-info/treat-info",
					});
				}
			},
			//结束治疗按钮方法：弹出提示框
			endTreatment(item,key){
				this.operatePatientOrder = key;
				this.operatePatient = item;
				this.popupMsg = "是否为患者" + item.name + "结束治疗？";
				this.$refs.endTreatement.open();
			},
			//取消执行结束治疗
			cancelEndtreatment(){
				this.operatePatientOrder = -1;
				this.operatePatient = {};
			},
			//确认执行结束治疗
			confirmEndTreatment(){
				//获取当前时间
				let dateGetter = new Date();
				let year = dateGetter.getFullYear();
				let month = dateGetter.getMonth() + 1;
				let date = dateGetter.getDate();
				let hour = dateGetter.getHours();
				let min = dateGetter.getMinutes();
				let sec = dateGetter.getSeconds();
				let  endtime = year.toString() + "-" + month.toString() +"-" + date.toString() + " " + hour.toString() + ":" + min.toString() + ":" + sec.toString();
				//修改患者end_time值
				this.$myRequest({
					url:'/patient/leave/hospital',
					method:'POST',
					data:{
						cure_id: this.operatePatient.cure_id,
						end_time:endtime,
						patient_schedule_id: this.operatePatient.patient_schedule_id,
					},
					success: (res) => {
						if(res.data.code == 200){
							//改变end_time值
							this.operatePatient.end_time = endtime;
							//改变患者卡片按钮显示状态
							this.operatePatient.isfinish = true;
							//改变本地缓存
							this.patientList[this.operatePatientOrder] = this.operatePatient;
							Store.setStorageSync("patientList",this.patientList);
						}
					},
				});
			},
			//导航栏右侧切换账号
			changeAccount(){
				uni.redirectTo({
					url:"../login/login",
				});
				this.patientList = [];
			},
			////导航栏右侧刷新
			reflesh(){
				console.log("enter reflesh")
				this.navSelected = false;
				that = this;
				uni.showToast({
					title: 'loading',
					icon: 'loading',
					mask: true
				});
				that = this;
				let searchInfo = Store.getStorageSync("searchInfo");
				let patientData = [];
				//请求患者列表信息
				this.$myRequest({
					url:'/patient/patientlist',
					method:'POST',
					data:{
						banci_id: searchInfo.banci_id,
						date: searchInfo.date,
						room: searchInfo.room,
					},
					success: (res) => {
						if(res.data.code == 200){
							Store.setStorageSync("patientList",res.data.data);
							patientData = res.data.data;
							console.log("patientList:",patientData)
							let timer = 0;
							for (let j = 0; j < patientData.length; j++) {
								//获取患者头像
								this.$myRequest({
									url:'/patient/img',
									method:'POST',
									data:{
										"hemodialysis_id":patientData[j].hemodialysis_id
									},
									success: (res) => {
										let i = _.findIndex(patientData,{hemodialysis_id:res.data.data.hemodialysis_id})
										if (i>=0){
											let finishTreatement = false;
											let endTime = moment(patientData[i].end_time)
											if (endTime.isValid()){
												finishTreatement = endTime.isBefore(moment());
											}
											//若获取成功同时传入图片和治疗状态数据
											if(res.data.code == 200){
												patientData[i].pic = res.data.data.pat_pic;
												patientData[i].isfinish = finishTreatement;
											}
											//若获取失败只传入治疗状态数据
											else{
												patientData[i].isfinish = finishTreatement;
											}
											clearTimeout(timer)
											timer = setTimeout(()=>{
												this.patientList =  _.cloneDeep(patientData);
											},300)
										}
									},
								});
							}
						}
					},
				});
				console.log("out of reflesh")
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");	
	.list-view{
		width: 100%;
	}
	.list-item{
		padding: 20rpx;
		margin-bottom: 20rpx;
		width: calc(100% - 40rpx);
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4);
	}
	.header{
		display: flex;
		flex-direction: row;
	}
	.list-head-left{
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}	
	.patient-pic{
		width: 200rpx;
		height: 300rpx;
	}
	.patient-status{
		margin-top: 5rpx;
		width: 120rpx;
		color: #FFFFFF;
		background-color: #C0C0C0;
		border-radius: 20rpx;
		font-size: 28rpx;
	}
	.list-head-right{
		margin-left: 20rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
	}
	.footer{
		margin-top: 20rpx;
		border-top: 2rpx solid;
		border-color: #51D3C7;
		padding-top: 20rpx;
		display: flex;
		justify-content: center;
	}
	button::after{
		border: none;
	}
	.btn {
	    display: flex;
	    align-items: center;
	    justify-content: center;
		background-color: #51D3C7;
		color: #FFFFFF;
		font-size: 28upx;
	    border-radius: 20rpx;
	    box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4);
		height: 50rpx;
	}
	.nav-select{
		position: fixed;
		z-index: 100;
		top: 90rpx;
		right: 5rpx;
		background-color: #EEEEEE;
		width: 250rpx;
		box-shadow: 2px 2px 5px rgba(28, 42, 134, 0.4);
	}
	.nav-select-item{
		height: 50rpx;
		padding: 10rpx;
		border-left: 1rpx solid;
		border-right: 1rpx solid;
		border-bottom: 1rpx solid;
		border-color: #C0C0C0;
	}
</style>
