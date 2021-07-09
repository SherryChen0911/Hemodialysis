<template>
	<view >
		<uni-nav-bar class="nav-style" left-icon="back" right-icon="loop" :title="patient.name" color="#ffffff" background-color="#51D3C7" @clickLeft="toPatientList"></uni-nav-bar>
		<view class="content">
			<view class="section-style">
				<text>长期医嘱</text>
			</view>
			<view class="list-view">
				<view v-for="item in permanentAdvice" class="list-item">
					<text>{{item.title}} {{item.period}} {{item.date}} {{item.time}}</text>
					<text>备注:</text>
				</view>		
			</view>
			<view class="section-style">
				<text>临时医嘱</text>
			</view>	
			<view v-for="(item,key) in temporaryAdvice" class="list-view">
				<form class="list-item" >
					<text>{{item.medicine}} {{item.dose}} {{item.treatement}} {{item.nurse}} {{item.date}} {{item.time}}</text>
					<view class="list-item-section">
						<text class="list-preffix">执行时间:</text>
						<picker class="list-mid" mode="time" @change="setExecuteTime($event,item,key)">
							<input type="text" :value="item.executeTime" placeholder="请点击选择时间" />
						</picker>
						<button v-show="!item.status" class="one-btn small-btn" @click="submit(item)">确定</button>
						<button v-show="item.status" class="err-btn small-btn" @click="clear(item)">回退</button>
					</view>
				</form>
			</view>				
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				patient:{},
				permanentAdvice:[
					{
						title:"血透室护理常规",
						period:"每周一次",
						date:"2020/11/16",
						time:"09:08:00",
						comment:"",
					},
					{
						title:"血透室护理常规",
						period:"每周一次",
						date:"2020/11/16",
						time:"09:08:00",
						comment:"",
					},
				],
				temporaryAdvice:[
					{
						medicine:"促红素",
						dose:"10000单位",
						treatement:"皮下注射",
						nurse:"李兰芳",
						date:"2020/11/16",
						time:"09:08:00",
						executeTime:"",
						status:false,
					},
					{
						medicine:"左卡尼汀",
						dose:"0.1克",
						treatement:"静脉注射",
						nurse:"李兰芳",
						date:"2020/11/16",
						time:"09:08:00",
						executeTime:"",
						status:false,
					},					
				],
			}
		},
		onShow: function () {
			console.log("这里是临时医嘱页面", uni.getStorageSync("patient"));
			this.patient = uni.getStorageSync("patient");
			console.log(this.patient);
		},
		methods: {
			toPatientList(){
				uni.navigateTo({
					url: "../patient-list/patient-list",
				});
			},
			setExecuteTime(e,item,key){
				item.executeTime = e.detail.value;
			},
			submit(item){
				item.status = true;
				
			},
			clear(item){
				item.status = false;
				item.executeTime = "";
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");
	.section-style{
		padding: 10rpx 10rpx 10rpx 10rpx;
		border-left: 10rpx solid;
		border-color: #51D3C7;
		font-weight: 550;
	}
	.list-view{
		margin: 20rpx 0;
		padding: 20rpx 20rpx 0 20rpx;
		width: calc(100% - 40rpx);
		border: 2rpx solid;
		border-color: #51D3C7;
		border-radius: 20rpx;
	}
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
</style>
