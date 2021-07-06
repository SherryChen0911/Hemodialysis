<template>
	<view class="content">
		<view class="section-style">
			<text>长期医嘱</text>
		</view>
		<view class="list-view">
			<view class="list-item">
				<text>血透室护理常规 每周一次 2020/11/16 09:08:00</text>
				<text>备注:</text>
			</view>		
			<view class="list-item">
				<text>血透室护理常规 每周一次 2020/11/16 09:08:00</text>
				<text>备注:</text>
			</view>	
		</view>
		<view class="section-style">
			<text>临时医嘱</text>
		</view>
		<view class="list-view">		
			<view class="list-item">
				<text>血透室护理常规 每周一次 2020/11/16 09:08:00</text>
				<view class="list-iten-section">
					<text>执行时间:</text>
					<input type="text" value="sdfsfssdfsfs" />
					<button class="one-btn small-btn">确定</button>
				</view>
			</view>
		</view>	
		<view class="list-view">
			<view class="list-item">
				<text>血透室护理常规 每周一次 2020/11/16 09:08:00</text>
				<view class="list-iten-section">
					<text>执行时间:</text>
					<input type="text" value="sdfsfssdfsfs" />
					<button class="one-btn small-btn">确定</button>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
	.list-iten-section{
		height: 80rpx;
		display: flex;
		flex-direction: row;		
		align-items: center;
	}
	.small-btn{
		border-radius: 20rpx;
		height: 60rpx;
		font-size: 28rpx;
	}
</style>
