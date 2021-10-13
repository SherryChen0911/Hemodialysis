<template>
	<view class="content">
		<view class="section-style">
			<text>当前并发症</text>
		</view>
		<view class="list-view">
			<view v-if="!hasCurrent" class="complication-item-empty" @click="toComplicationAdd">
				<text style="flex:1;">暂无并发症</text>
				<view class="complication-btn-area">
					<uni-icons type="plusempty" color="#FFFFFF" size="20" class="btn-icon"></uni-icons>
					<text style="color:#FFFFFF;font-size:30rpx;">添加</text>
				</view>
			</view>
			<view v-if="hasCurrent" class="complication-item">
				<view class="complication-title">
					<text>{{current.work_date}}</text>
					<text>{{current.work_classnum}}</text>
				</view>
				<view class="complication-cnt">
					<view class="complication-left">
						<text>穿刺失误:</text><text>{{current.ccsw}}</text>
						<text>穿刺处血肿:</text><text>{{current.cccsz}}</text>
						<text>血管通路感染、堵塞:</text><text>{{current.xgtlgr}}</text>
						<text>穿刺针脱落或自拔:</text><text>{{current.ccztl}}</text>
					</view>
					<uni-icons type="arrowright" color="#C0C0C0" size="20" style="padding:20rpx 0 20rpx 20rpx;margin:0;" @click="toComplicationDetail(current)"></uni-icons>
				</view>
			</view>
		</view>
		<view class="section-style">
			<text>历史并发症</text>
		</view>
		<view class="list-view">
			<view v-if="!hasHistory" class="complication-item-empty" @click="toComplicationAdd">
				<text style="flex:1;">暂无历史并发症</text>
			</view>
			<view v-if="hasHistory" class="complication-item " v-for="item in history">
				<view class="complication-title">
					<text>{{item.work_date}}</text>
					<text>{{item.work_classnum}}</text>
				</view>
				<view class="complication-cnt">
					<view class="complication-left">
						<text>穿刺失误:</text><text>{{item.ccsw}}</text>
						<text>穿刺处血肿:</text><text>{{item.cccsz}}</text>
						<text>血管通路感染、堵塞:</text><text>{{item.xgtlgr}}</text>
						<text>穿刺针脱落或自拔:</text><text>{{item.ccztl}}</text>
					</view>
					<uni-icons type="arrowright" color="#C0C0C0" size="20" style="padding:20rpx 0 20rpx 20rpx;margin:0;" @click="toComplicationDetail(item)"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Store from '../../common/store.js'
	
	export default {
		data() {
			return {
				searchInfo:{},
				patient:{},
				banciInfo:{},
				current:{},
				history:[],
				hasCurrent:false,
				hasHistory:false,
				list:[
					{date:'2021-09-09',shift:'下午',puncture1:'11111111',puncture2:'11111111',puncture3:'11111111',puncture4:'11111111',},
					{date:'2021-09-09',shift:'下午',puncture1:'22222222',puncture2:'22222222',puncture3:'22222222',puncture4:'22222222',},
					{date:'2021-09-09',shift:'下午',puncture1:'33333333',puncture2:'33333333',puncture3:'33333333',puncture4:'33333333',},
					{date:'2021-09-09',shift:'下午',puncture1:'44444444',puncture2:'44444444',puncture3:'44444444',puncture4:'44444444',},
				]
			}
		},
		onShow() {
			this.getComplicationListData();
		},
		onLoad() {
			this.patient = Store.getStorageSync("patient");
			console.log("patient",this.patient)
			//获取班次列表
			this.banciInfo = Store.getStorageSync("banciInfo");
			console.log("banciInfo",this.banciInfo)
			this.searchInfo = Store.getStorageSync("searchInfo");
			console.log("length",this.banciInfo.length)
			for(let i = 0; i < this.banciInfo.length; i++){
				console.log("value",this.banciInfo[i].item_value)
				if(this.banciInfo[i].item_value == this.searchInfo.banci_id){
					console.log("enter if")
					this.searchInfo.banci = this.banciInfo[i].item_name;
				}
			}
			console.log("searchInfo",this.searchInfo)
			this.getComplicationListData();
		},
		methods: {
			//获取并发症列表数据
			getComplicationListData(){
				console.log("enter getComplicationListData")				
				this.hasCurrent = false;
				this.hasHistory = false;
				this.current = {};
				this.history = [];
				uni.showToast({
					title: 'loading',
					icon: 'loading',
					mask: true
				});
				//获取并发症历史列表
				this.$myRequest({
					url:'/complication/history',
					method:'POST',
					data:{
						cure_id:this.patient.cure_id,
					},
					success: (res) => {
						if(res.data.code == 200){
							console.log("发症历史列表",res.data.data)
							let historyData = res.data.data;
							for(let j = 0; j < historyData.length; j++){
								for(let k = 0; k < this.banciInfo.length; k++){
									console.log("j",j)
									console.log(this.banciInfo[k].item_id)
									if(historyData[j].work_classnum == this.banciInfo[k].item_id){
										historyData[j].work_classnum = this.banciInfo[k].item_name;
									}
								}						
							}
							console.log("发症历史列表",historyData)
							this.history = historyData;
							if(this.history.length > 0){
								this.hasHistory = true;
							}
							for(let l = 0; l < historyData.length; l++){
								if((historyData[l].work_date == this.searchInfo.date)&&(historyData[l].work_classnum == this.searchInfo.banci))
								{
									this.current = historyData[l];
									this.hasCurrent = true;
									historyData.splice(l,1);
									this.history = historyData;
									if(this.history.length > 0){
										this.hasHistory = true;
									}
								}
							}
							console.log("current",this.current)
							console.log("history",this.history)
						}
					},
				});
			},
			toComplicationAdd(){
				uni.navigateTo({
					url:"../complication-add/complication-add",
				})
			},
			toComplicationDetail(item){
				Store.setStorageSync("complicationItem",item);
				uni.navigateTo({
					url:"../complication-edit/complication-edit",
				})
			},
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");
	.complication-item-empty{
		display: flex;
		align-items: center;
	}
	.complication-btn-area{
		padding: 10rpx 20rpx;
		display: flex;
		align-items: center;
		background-color: #51D3C7;
		border-radius: 10rpx;
	}
	.complication-item{
		padding-bottom: 20rpx;
	}
	.complication-item text{
		margin-right: 20rpx;
		font-size: 28rpx;
	}
	.complication-cnt{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.complication-left{
		flex: 1;
	}
	.complication-border{
		border-bottom: #C0C0C0 2rpx solid;
	}
</style>
