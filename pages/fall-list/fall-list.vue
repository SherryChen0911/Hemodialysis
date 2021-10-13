<template>
	<view class="content">
		<button class="table-btn" @click="toFallAdd">
			<uni-icons class="btn-icon" type="plus" color="#51D3C7" size="15"></uni-icons>
			新增
		</button>
		<view class="search-machine-area">
			<view class="search-machine-condition">
				<view class="search-machine-item">
					<text class="search-machine-title">评估日期</text>
					<picker class="search-machine-cnt-date" mode="date" @change="setStartDate($event)">
						<input class="search-machine-cnt-date" type="text" disabled="true" v-model="searchInfo.startDate" placeholder="开始日期"/>
					</picker>
					<text >至</text>
					<picker class="search-machine-cnt-date" mode="date" @change="setEndDate($event)">
						<input class="search-machine-cnt-date" type="text" disabled="true" v-model="searchInfo.endDate" placeholder="结束日期"/>
					</picker>
				</view>
				<view class="search-machine-item">
					<text class="search-machine-title">患者姓名</text>
					<input class="search-machine-cnt" type="text"  v-model="searchInfo.name" placeholder="请填写患者姓名"/>
				</view>
			</view>
			<button class="search-machine-btn one-btn" @click="qurey">查询</button>
		</view>
		<scroll-view class="scroll-table-list" scroll-x="true" >
			<view class="scorll-table-line table-title">
				<text class="scorll-date-item">评估日期</text>
				<text class="scorll-table-item">患者姓名</text>
				<text class="scorll-table-item">总评分</text>
				<text class="scorll-table-item">年龄评分</text>
				<text class="scorll-table-item">跌倒史评分</text>
				<text class="scorll-table-item">活动能力评分</text>
				<text class="scorll-table-item">意识评分</text>
				<text class="scorll-table-item">视力评分</text>
				<text class="scorll-table-item">疾病史评分</text>
				<text class="scorll-table-item">用药风险评分</text>
			</view>
			<view v-if="!hasFallData" class="table-line table-cnt">
				<text class="table-item">暂无数据</text>
			</view>
			<view v-if="hasFallData" class="scorll-table-line table-cnt" v-for="item in fallList" @click="showFallSelect(item)">
				<text class="scorll-date-item">{{item.assess_date}}</text>
				<text class="scorll-table-item">{{item.patient_name}}</text>
				<text class="scorll-table-item">{{item.total}}</text>
				<text class="scorll-table-item">{{item.age_score}}</text>
				<text class="scorll-table-item">{{item.fall_history_score}}</text>
				<text class="scorll-table-item">{{item.mobility_score}}</text>
				<text class="scorll-table-item">{{item.conscious_score}}</text>
				<text class="scorll-table-item">{{item.eyesight_score}}</text>
				<text class="scorll-table-item">{{item.disease_score}}</text>
				<text class="scorll-table-item">{{item.drug_score}}</text>
			</view>
		</scroll-view>
		
		<!-- 弹出框 -->
		<uni-popup ref="fallSelect" type="dialog">
			<view class="bottom-select-view" slot="default">
				<button class="one-btn btn-margin" @click="editFall">编辑</button>
				<button class="err-btn" @click="deleteFall">删除</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Store from '../../common/store.js'
	
	export default {
		data() {
			return {
				hasFallData:false,
				selectItem:{},
				searchInfo:{
					startDate:"",
					endDate:"",
					name:"",
				},
				fallList:[],
			}
		},
		onShow(){
			this.getFallList();
		},
		methods: {
			//获取列表数据
			getFallList(){
				uni.showToast({
					title: 'loading',
					icon: 'loading',
					mask: true
				});
				this.$myRequest({
					url:'/fallrisk/list',
					method:'POST',
					data:{
						"start_time": this.searchInfo.startDate,
						"end_time": this.searchInfo.endDate,
						"name": this.searchInfo.name,
					},
					success: (res) => {
						if(res.data.code == 200){
							console.log("跌倒列表",res.data.data)
							if(res.data.data.length > 0){
								this.hasFallData = true;
								for (let i =0; i < res.data.data.length; i++) {
									//循环处理时间
									let tempDate = res.data.data[i].assess_date.split(' ');
									res.data.data[i].assess_date = tempDate[0];
									//循环计算分数
									let total =  parseInt(res.data.data[i].age_score) + parseInt(res.data.data[i].fall_history_score) +
									parseInt(res.data.data[i].conscious_score) + parseInt(res.data.data[i].mobility_score) +
									parseInt(res.data.data[i].eyesight_score) + parseInt(res.data.data[i].disease_score) + 
									parseInt(res.data.data[i].drug_score);
									res.data.data[i].total = total;
									console.log("total",res.data.data[i].total)
								}
							}
							else{
								this.hasFallData = false;
							}
							this.fallList = res.data.data;
						}
					},
				});
			},
			//删除单条数据
			deleteFallItem(){
				this.$myRequest({
					url:'/fallrisk/delete',
					method:'POST',
					data:{
						"id": this.selectItem.id,
					},
					success: (res) => {
						if(res.data.code == 200){
							console.log("删除跌倒记录",res.data.data)
							this.getFallList();
							uni.showToast({
								title: '跌倒风险评估删除成功！',
								icon: 'none',
								mask: true
							},500);
							this.getFallList()
						}
						else{
							uni.showToast({
								title: '跌倒风险评估删除失败！',
								icon: 'none',
								mask: true
							},500);
						}
					},
				});
			},
			//下拉框选择评估开始时间
			setStartDate(e){
				console.log(e)
				this.searchInfo.startDate = e.detail.value;
			},
			//下拉框选择评估结束时间
			setEndDate(e){
				console.log(e)
				this.searchInfo.endDate = e.detail.value;
			},
			//新增跌倒风险评估按钮
			toFallAdd(){
				uni.navigateTo({
					url:"../fall-add/fall-add",
				});
			},
			//查询按钮
			qurey(){
				this.getFallList();
			},
			//选中列表按钮
			showFallSelect(item){
				this.$refs.fallSelect.open();
				this.selectItem = item;
			},
			//编辑跌倒数据
			editFall(){
				Store.setStorageSync("fallItem",this.selectItem);
				uni.navigateTo({
					url: "../fall-edit/fall-edit",
				});
				this.$refs.fallSelect.close();
			},
			deleteFall(){
				this.$refs.fallSelect.close();
				this.deleteFallItem();
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");

	.search-machine-area{
		width: 100%;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.search-machine-condition{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.search-machine-item{
		width: 100%;
		height: 60rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.search-machine-title{
		width: 160rpx;
		font-size: 28rpx;
	}
	.search-machine-cnt{
		flex: 1;
		height: 100%;
		padding: 0 20rpx;
		border: 2rpx solid #C0C0C0;
		border-radius: 20rpx;
	}
	.search-machine-cnt-date{
		flex: 1;
		height: 60rpx;
		text-align: center;
	}
	.search-machine-btn{
		font-size: 28rpx;
		width: 100rpx;
		padding: 0;
		margin: 0 0 0 20rpx;
		height: 120rpx;
		border-radius: 20rpx !important;
	}
	

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
	
	
	.scroll-table-list{
		width: calc(100% - 4rpx);
		border: 2rpx solid;
		border-color: #C0C0C0;
		border-radius: 20rpx;
	}
	.scorll-table-line{
		height: 100rpx;
		line-height: 100rpx;
		display: inline-block;
		white-space: nowrap;
	}
	.scorll-date-item{
		width: 200rpx;
		display: inline-block;
		white-space:normal;
		vertical-align: middle;
		line-height: 40rpx;
		text-align: center;
		font-size: 28rpx;
	}
	.scorll-table-item{
		width: 120rpx;
		margin: 0 5rpx;
		display: inline-block;
		white-space:normal;
		vertical-align: middle;
		line-height: 40rpx;
		text-align: center;
		font-size: 28rpx;
	}
</style>
