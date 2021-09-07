<template>
	<view class="vascular-cnt">
		<view class="vascular-view">
			<view class="vascular-item" v-for="(item, index) in list">
				<view class="pic-view">
					<image class="vascular-pic" :src="item.url" mode="aspectFill" @click="bigPic(item)"/>
					<!-- <image class="vascular-pic" :src="item.url" mode="widthFix" @click="bigPic(item)"/> -->
				</view>
				<view class="vascular-del-btn">
					<uni-icons type="trash-filled" color="#c0c0c0" size="20"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 弹出框 -->
		<uni-popup ref="bigPic" type="dialog">
			<view class="big-pic-area" slot="default">
				<image class="big-pic" :src="currUrl" mode="widthFix"/>
				<view class="vascular-btn-area">
					<button class="btn" @click="delPic">删除</button>
					<button class="btn" @click="clocePopup">返回</button>
				</view>
			</view>
		</uni-popup>
	</view>

</template>

<script>
	import Store from '../../common/store.js'
	
	export default {
		data() {
			return {
				currUrl:"../../static/vascular.png",
				list:[
					{
						url:"../../static/vascular.png",
						text:"1"
					},
					{
						url:"../../static/patient1.jpg",
						text:"2"
					},
					{
						url:"../../static/vascular.png",
						text:"3"
					},
					{
						url:"../../static/vascular.png",
						text:"4"
					},
					{
						url:"../../static/vascular.png",
						text:"5"
					},
					{
						url:"../../static/vascular.png",
						text:"6"
					},
					{
						url:"../../static/vascular.png",
						text:"7"
					},
					{
						url:"../../static/vascular.png",
						text:"8"
					},
					{
						url:"../../static/vascular.png",
						text:"9"
					},
					{
						url:"../../static/vascular.png",
						text:"10"
					},
					{
						url:"../../static/vascular.png",
						text:"11"
					},

				]
				
			}
		},
		onReachBottom() {
			console.log("onReachBottom")
		},
		methods: {
			bigPic(item){
				this.$refs.bigPic.open();
			},
			clocePopup(){
				this.$refs.bigPic.close();
			},
			delPic(){
				
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");
	
	page{
		width: 100%;
		background-color: #F0F0F0;
	}
	.vascular-cnt{
		width: 100%;
	}
	.vascular-view{
		width: 100%;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.vascular-item{
		width: calc(100% / 3);
		padding-bottom:10rpx;
		background-color: #FFFFFF;
		text-align: center;
		/* border: 1rpx solid #F0F0F0; */
	}
	.pic-view{
		background-color: #0000FF;
		width: 100%;
		height: 250rpx;
	}
	.vascular-pic{
		width: 100%;
		height: 250rpx;
	}
	.vascular-del-btn{
		width: calc(100% - 2rpx);
		border-left: 1rpx solid #F0F0F0;
		border-right: 1rpx solid #F0F0F0;
	}
	.big-pic-area{
		position: fixed;
		left: 0;
		right: 0;
		top:400rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.big-pic{
		width: calc(100% - 40rpx);
		margin: 0 20rpx;
	}
	.vascular-btn-area{
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.btn {
		flex: 1;
		margin: 20rpx;
	    display: flex;
	    align-items: center;
	    justify-content: center;
		background-color: #51D3C7;
		color: #FFFFFF;
		font-size: 28upx;
	    border-radius: 20rpx;
	    box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4);
	}
</style>
