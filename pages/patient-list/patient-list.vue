<template>
	<view class="content">
		<view class="list-view">
			<view class="list-item">
				<view class="header">
					<view class="list-head-left">
						<image src="../../static/patient1.jpg" mode="aspectFill"></image>
						<text>筱燕秋 男</text>
						<button> </button>
					</view>
					<view class="list-head-right">
						<text>ID: 350204198001101234</text>
						<text>透析号: 2005150004</text>
						<text>治疗项目: HD</text>
						<text>传染病:</text>
						<text>预订时间:</text>
						<text>预计脱水:</text>
						<text>抗凝方式:低分子肝素钙</text>
						<text>首计:</text>
						<text>追加:</text>
					</view>
				</view>
				<view class="footer">
					<button class="btn">患者拍照</button>
					<button class="btn">执行治疗</button>
					<button class="btn">结束治疗</button>
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
	image{
		width: 200rpx;
		height: 300rpx;
	}
	.list-view{
		width: calc(100% - 40rpx);
	}
	.list-item{
		padding: 20rpx;
		width: calc(100% - 40rpx);
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4);
	}
	.header{
		display: flex;
		flex-direction: row;
		padding-bottom: 20rpx;
	}
	.list-head-right{
		margin-left: 20rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.list-head-left{
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	.footer{
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
		/* border: 2rpx solid; */
	    /* border-color: #51D3C7; */
		color: #FFFFFF;
		font-size: 28upx;
	    border-radius: 20rpx;
	    box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4);
		height: 50rpx;
	}
</style>
