<template>
	<view class="content">
		<view class="section-style">
			<text>当前并发症</text>
		</view>
		<view class="list-view">
			<view v-if="show == 0" class="complication-item-empty" @click="toComplicationAdd">
				<text style="flex:1;">暂无并发症</text>
				<view class="complication-btn-area">
					<uni-icons type="plusempty" color="#FFFFFF" size="20" class="btn-icon"></uni-icons>
					<text style="color:#FFFFFF;font-size:30rpx;">添加</text>
				</view>
			</view>
			<view v-if="show == 1" class="complication-item">
				<view class="complication-title">
					<text>{{list[1].date}}</text>
					<text>{{list[1].shift}}</text>
				</view>
				<view class="complication-cnt">
					<view class="complication-left">
						<text>穿刺失误:</text><text>{{list[0].puncture1}}</text>
						<text>穿刺处血肿:</text><text>{{list[0].puncture2}}</text>
						<text>血管通路感染、堵塞:</text><text>{{list[0].puncture3}}</text>
						<text>穿刺针脱落或自拔:</text><text>{{list[0].puncture4}}</text>
					</view>
					<uni-icons type="arrowright" color="#C0C0C0" size="20" style="padding:20rpx 0 20rpx 20rpx;margin:0;" @click="toComplicationDetail"></uni-icons>
				</view>
			</view>
		</view>
		<view class="section-style">
			<text>历史并发症</text>
		</view>
		<view class="list-view">
			<view class="complication-item " v-for="item in list">
				<view class="complication-title">
					<text>{{item.date}}</text>
					<text>{{item.shift}}</text>
				</view>
				<view class="complication-cnt">
					<view class="complication-left">
						<text>穿刺失误:</text><text>{{item.puncture1}}</text>
						<text>穿刺处血肿:</text><text>{{item.puncture2}}</text>
						<text>血管通路感染、堵塞:</text><text>{{item.puncture3}}</text>
						<text>穿刺针脱落或自拔:</text><text>{{item.puncture4}}</text>
					</view>
					<uni-icons type="arrowright" color="#C0C0C0" size="20" style="padding:20rpx 0 20rpx 20rpx;margin:0;" @click="toComplicationDetail"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:0,
				list:[
					{date:'2021-09-09',shift:'下午',puncture1:'11111111',puncture2:'11111111',puncture3:'11111111',puncture4:'11111111',},
					{date:'2021-09-09',shift:'下午',puncture1:'22222222',puncture2:'22222222',puncture3:'22222222',puncture4:'22222222',},
					{date:'2021-09-09',shift:'下午',puncture1:'33333333',puncture2:'33333333',puncture3:'33333333',puncture4:'33333333',},
					{date:'2021-09-09',shift:'下午',puncture1:'44444444',puncture2:'44444444',puncture3:'44444444',puncture4:'44444444',},
				]
			}
		},
		methods: {
			toComplicationAdd(){
				uni.navigateTo({
					url:"../complication-add/complication-add",
				})
			},
			toComplicationDetail(){
				uni.navigateTo({
					url:"../complication-edit/complication-edit",
				})
			}
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
