<template>
	<view style="width: 100%;">
		<view class="vascular-record-border-bottom">
			<view class="point-btn-area">
				<button v-if="!pointLabel" class="point-btn" @click="startLabel">标记</button>
				<button v-if="pointLabel" class="point-btn" @click="stopLabel">结束标记</button>
				<button class="point-btn" @click="withdrawLabel">撤销</button>
				<button class="point-btn" @click="clearLabel">清除标记</button>
				<button class="point-btn" @click="saveLabel">保存标记</button>
			</view>
			<img style="width: 710rpx;" :src="vasuclarItem.url"  @click="abc"></img>
			<!-- <image style="width: 750rpx;" :src="vasuclarItem.url" mode="aspectFit" @click="abc"></image> -->
			<view class="vascular-access-bodypart-area">
				<text class="vascular-access-bodypart-title">部位:</text>
				<input class="vascular-access-bodypart-input" type="text" value="" placeholder="请填写血管通路照片部位" placeholder-style="font-size:28rpx;"/>
				<button class="one-btn small-btn">保存部位</button>
			</view>
			<view class="point" :style="{left: item.x +'px',top: item.y + 'px'}" v-for="(item,index) in pointList">
				{{index}}
			</view>
		</view>
		<view class="vascular-record-border-bottom">
			<view class="content">
				<view class="section-style new-record">
					<text>最新记录</text>
					<view class="position-circle-btn" @click="toDetail">
						<uni-icons type="plusempty" color="#FFFFFF" size="15" style="margin-right:10rpx;" @click="toDetail"></uni-icons>
						<text>新增</text>
					</view>
				</view>
				<view class="list-view">
					<view class="list-left">
						<view class="list-item-line">
							<text>{{currRecord.holeNo}}</text>
							<text>{{currRecord.nurse}}</text>
							<text>{{currRecord.date}}</text>
							<text>{{currRecord.time}}</text>
						</view>
						<view class="list-item-line">
							<text>备注：{{currRecord.comment}}</text>
						</view>
					</view>
					<uni-icons type="arrowright" color="#C0C0C0" size="20" style="padding:20rpx 0 20rpx 20rpx;margin:0;" @click="toDetail"></uni-icons>
				</view>
			</view>
		</view>
		<view class="">
			<view class="content">
				<view class="section-style">
					<text>历史记录</text>
				</view>
				<view class="list-view" v-for="item in recordList">
					<view class="list-left">
						<view class="list-item-line">
							<text>{{item.holeNo}}</text>
							<text>{{item.nurse}}</text>
							<text>{{item.date}}</text>
							<text>{{item.time}}</text>
						</view>
						<view class="list-item-line">
							<text>备注：{{item.comment}}</text>
						</view>
					</view>
					<uni-icons type="arrowright" color="#C0C0C0" size="20" style="padding:20rpx 0 20rpx 20rpx;margin:0;" @click="toDetail"></uni-icons>
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
				vasuclarItem:{},
				pointLabel:false,
				bodyPart:false,
				pointList:[],
				currRecord:{holeNo:"1孔", nurse:"陈护士", date:"2021-08-31", time:"10:30:00", comment:"正常正常正常正常正常正常正常正常正常正常正常正常正常正常"},
				recordList:[
					{holeNo:"1孔", nurse:"陈护士", date:"2021-08-31", time:"10:30:00", comment:"正常"},
					{holeNo:"1孔", nurse:"陈护士", date:"2021-08-31", time:"10:30:00", comment:"正常"},
					{holeNo:"1孔", nurse:"陈护士", date:"2021-08-31", time:"10:30:00", comment:"正常"},
					{holeNo:"1孔", nurse:"陈护士", date:"2021-08-31", time:"10:30:00", comment:"正常"},
					{holeNo:"1孔", nurse:"陈护士", date:"2021-08-31", time:"10:30:00", comment:"正常"},
					{holeNo:"1孔", nurse:"陈护士", date:"2021-08-31", time:"10:30:00", comment:"正常"},
				]
				
			}
		},
		onLoad() {
			this.vasuclarItem = Store.getStorageSync("vasuclarItem");
			console.log("vasuclarItem",this.vasuclarItem)
		},
		methods: {
			startLabel(){
				this.pointLabel = true;
			},
			stopLabel(){
				this.pointLabel = false;
			},
			withdrawLabel(){
				if(this.pointList.length > 0){
					this.pointList.pop();
				}
				this.pointLabel = false;
			},
			clearLabel(){
				this.pointList = [];
				this.pointLabel = false;
			},
			saveLabel(){
				this.pointLabel = false;
			},
			abc(e){
				if(this.pointLabel){
					console.log("e type", typeof e.detail.x)
					let point = {x: e.detail.x - 7, y: e.detail.y - 7,};
					this.pointList.push(point);
					// this.$forceUpdate()
					console.log('pointList',this.pointList)
				}

			},
			toDetail(){
				uni.navigateTo({
					url:'../vascular-access-record-add/vascular-access-record-add'
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");
	.point-btn-area{
		margin: 20rpx;
		display: flex;
	}
	.point{
		position: absolute;
		width: 30rpx;
		height: 30rpx;
		background-color: red;
		border-radius: 15rpx;
		text-align: center;
		line-height: 30rpx;
		font-size: 24rpx;
		color: #FFFFFF;
		
	}
	button::after{
		border: none;
	}
	.point-btn {
	    display: flex;
	    align-items: center;
	    justify-content: center;
		/* background-color: #51D3C7; */
		color: #51D3C7;
		font-size: 28upx;
		border: 2rpx solid #51D3C7;
	    border-radius: 0;
	    /* box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4); */
		height: 50rpx;
	}
	.point-btn-disable {
	    display: flex;
	    align-items: center;
	    justify-content: center;
		background-color: #C0C0C0;
		color: #FFFFFF;
		font-size: 28upx;
		/* border: 2rpx solid #51D3C7; */
	    border-radius: 0;
	    /* box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4); */
		height: 50rpx;
	}
	.vascular-access-bodypart-area{
		margin: 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 28rpx;
		line-height: 60rpx;
		text-align: left;
	}
	.vascular-access-bodypart-title{
		width: 100rpx;
		height: 60rpx;
	}
	.vascular-access-bodypart-input{
		padding: 0 20rpx;
		margin-right: 10rpx;
		flex: 1;
		height: 60rpx;
		border-radius: 20rpx;
		border: 2rpx solid #C0C0C0;
	}
	.small-btn {
		border-radius: 20rpx;
		height: 60rpx;
		/* width: 160rpx; */
		font-size: 28rpx;
		margin: 0;
	}
	.vascular-record-border-bottom{
		width: 100%;
		border-bottom: 10rpx solid #ebedef;
		text-align: center;
	}
	.list-view{
		margin: 20rpx 0 0 0 !important;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		text-align: left;
	}
	.list-left{
		flex: 1;
	}
	.list-item-line{
		display: flex;
	}
	.list-item-line text{
		margin: 0 20rpx 10rpx 0;
	}
	.new-record{
		width: calc(100% - 20rpx);
		display: flex;
		justify-content: space-between;
	}
	.position-circle-btn {
/* 		position: fixed;
		right: 50rpx;
		top: 800rpx; */
		padding: 0 20rpx;
		height: 60rpx;
		border-radius: 50rpx;
		background-color: #51D3C7;
		font-weight: normal;
		font-size: 28rpx;
		line-height: 60rpx;
		text-align: center;
		color: #FFFFFF;
	    box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4);
	}
</style>
