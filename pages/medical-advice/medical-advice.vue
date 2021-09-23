<template>
	<view >
		<uni-nav-bar class="nav-style" statusBar="true" fixed="true" left-icon="back" right-icon="loop" :title="patient.name" color="#ffffff" background-color="#51D3C7" @clickLeft="toPatientList" @clickRight="reflesh"></uni-nav-bar>
		<view class="content">
			<view class="section-style">
				<text>长期医嘱</text>
			</view>
			<view class="list-view">
				<text class="zhanwei" v-show="permanentNone">暂无长期医嘱</text>
				<view v-for="item in permanentAdvice" class="list-item">
					<text>{{item.drug_name}} {{item.times}} {{item.create_date}}</text>
					<text>备注:{{item.remark}}</text>
				</view>	
			</view>
			<view class="section-style">
				<text>临时医嘱</text>
			</view>	
			<view v-show="tempNone" class="list-view">
				<text class="zhanwei">暂无临时医嘱</text>
			</view>
			<view v-for="item in temporaryAdvice" class="list-view">
				<form class="list-item" >
					<text>{{item.new_drug_name}}</text>
					<view class="list-item-section">
						<text class="list-preffix">执行时间:</text>
						<picker class="list-mid" :class="{'disable-style' : item.able}" mode="time" :disabled="item.able" @change="setExecuteTime($event,item)">
							<input type="text" v-model="item.tempTime" disabled="true" placeholder="请点击选择时间" />
						</picker>
						<button v-show="item.status !='1'" class="one-btn small-btn" @click="submit(item)">确定</button>
						<button v-show="item.status =='1'" class="err-btn small-btn" @click="clear(item)">回退</button>
					</view>
				</form>
			</view>				
		</view>
	</view>
</template>

<script>
	import Store from '../../common/store.js'
	
	export default {
		data() {
			return {
				patient:{},
				date:"",
				permanentAdvice:[],
				temporaryAdvice:[],
				permanentNone:false,
				tempNone:false,
			}
		},
		onShow: function () {
			this.patient = Store.getStorageSync("patient");
			let searchInfo = Store.getStorageSync("searchInfo");
			this.date = searchInfo.date;
			this.permanentAdvice = [];
			this.temporaryAdvice = [];
			//获取长期医嘱
			this.$myRequest({
				url:'/doctororder/long',
				method:'POST',
				data:{
					hemodialysis_id:this.patient.hemodialysis_id,
				},
				success: (res) => {
					if(res.data.code == 200){
						if(res.data.data == ""){
							this.permanentNone = true;
						}
						else{
							console.log("长期医嘱",res.data.data);
							this.permanentAdvice =  _.cloneDeep(res.data.data);;
						}
					}
				},
			});
			//获取临时医嘱
			this.$myRequest({
				url:'/doctororder/temp',
				method:'POST',
				data:{
					hemodialysis_id:this.patient.hemodialysis_id,
					date:this.date,
				},
				success: (res) => {
					if(res.data.code == 200){
						if(res.data.data == ""){
							this.tempNone = true;
						}
						else{
							for(let i = 0; i < res.data.data.length; i++){
								if(res.data.data[i].exec_date != ""){
									let temp = res.data.data[i].exec_date.split(" ");
									res.data.data[i].tempTime = temp[1];
									res.data.data[i].able = true;
								}
								else{
									res.data.data[i].able = false;
								}
							}
							this.temporaryAdvice = res.data.data;
						}
						console.log("临时医嘱",res.data.data);
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
				this.date="";
				this.permanentNone=false;
				this.tempNone=false;
				this.permanentAdvice=[];
				this.temporaryAdvice=[];
			},
			//导航刷新按钮对应方法
			reflesh(){
				uni.showToast({
					title: 'loading',
					icon: 'loading',
					mask: true
				});
				//获取长期医嘱
				this.$myRequest({
					url:'/doctororder/long',
					method:'POST',
					data:{
						hemodialysis_id:this.patient.hemodialysis_id,
					},
					success: (res) => {
						if(res.data.code == 200){
							if(res.data.data == ""){
								this.permanentNone = true;
							}
							else{
								console.log("长期医嘱",res.data.data);
								this.permanentAdvice =  _.cloneDeep(res.data.data);
							}
						}
					},
				});
				//获取临时医嘱
				this.$myRequest({
					url:'/doctororder/temp',
					method:'POST',
					data:{
						hemodialysis_id:this.patient.hemodialysis_id,
						date:this.date,
					},
					success: (res) => {
						if(res.data.code == 200){
							if(res.data.data == ""){
								this.tempNone = true;
							}
							else{
								for(let i = 0; i < res.data.data.length; i++){
									if(res.data.data[i].exec_date != ""){
										let temp = res.data.data[i].exec_date.split(" ");
										res.data.data[i].tempTime = temp[1];
										res.data.data[i].able = true;
									}
									else{
										res.data.data[i].able = false;
									}
								}
								this.temporaryAdvice = _.cloneDeep(res.data.data);
							}
							console.log("临时医嘱",res.data.data);
						}
					},
				});
			},
			setExecuteTime(e,item){
				item.tempTime = e.detail.value + ":00";
				// console.log(item.tempTime);
				// console.log(this.temporaryAdvice);
			},
			//确定执行按钮
			submit(item){
				item.status = "1";
				item.able = true;
				item.exec_date = this.date + " " + item.tempTime;
				// 修改临时医嘱执行时间
				this.$myRequest({
					url:'/doctororder/update/temp',
					method:'POST',
					data:{
						cure_drug_id:item.cure_drug_id,
						status: "1",
						exec_date: item.exec_date
					},
					success: (res) => {
						if(res.data.code == 200){
							console.log(res);
							uni.showToast({
								title: '临时医嘱执行成功',
								icon: 'none',
								mask: true
							});
						}
					},
				});
			},
			//退回执行按钮
			clear(item){
				item.status = "0";
				//数据库获取的执行时间的数据
				item.exec_date = "";
				//页面显示用的执行时间的数据
				item.tempTime = "";
				item.able = false;
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");

	.list-item{
		margin-bottom: 20rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
	}
	.list-item-section{
		height: 80rpx;
		display: flex;
		flex-direction: row;		
		align-items: center;
	}
	.list-preffix{
		width: 120rpx;
	}
	.list-mid{
		margin-left: 20rpx;
		border: 2rpx solid;
		border-radius: 10rpx;
		border-color: #C0C0C0;
	}
	.small-btn{
		border-radius: 10rpx;
		height: 50rpx;
		font-size: 28rpx;
	}
	.zhanwei{
		height: 100rpx;
		font-size: 28rpx;
	}
</style>
