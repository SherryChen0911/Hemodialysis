<template>
	<view style="width: 100%;">
		<view class="vascular-record-border-bottom">

			<view class="vascular-access-bodypart-area">
				<text class="vascular-access-bodypart-title">部位:</text>
				<input class="vascular-access-bodypart-input" type="text" v-model="vasuclarItem.location" placeholder="请填写血管通路照片部位" placeholder-style="font-size:28rpx;"/>
				<button class="one-btn small-btn" @click="setLocation">保存部位</button>
			</view>
			<img id="target" style="width: 710rpx;" :src="vasuclarItem.url"  @click="addPoint"></img>
			<!-- <image style="width: 750rpx;" :src="vasuclarItem.url" mode="aspectFit" @click="abc"></image> -->
			<view class="point-btn-area">
				<button v-if="!pointLabel" class="point-btn" @click="startLabel">标记</button>
				<button v-if="pointLabel" class="point-btn" @click="stopLabel">结束标记</button>
				<button class="point-btn" @click="withdrawPoint">撤销</button>
<!-- 				<button class="point-btn" @click="clearLabel">清除标记</button>
				<button class="point-btn" @click="saveLabel">保存标记</button> -->
			</view>
			<view class="point" :style="{left: item.x +'px',top: item.y + 'px'}" v-for="(item,index) in pointList">
				{{index+1}}
			</view>
		</view>
		<view class="vascular-record-border-bottom">
			<view class="content">
				<view class="section-style new-record">
					<text>最新记录</text>
					<view class="position-circle-btn" @click="toAdd">
						<uni-icons type="plusempty" color="#FFFFFF" size="15" style="margin-right:10rpx;"></uni-icons>
						<text>新增</text>
					</view>
				</view>
				<view v-if="!hasCurr" class="list-view">
					暂无记录
				</view>
				<view v-if="hasCurr" class="list-view">
					<view class="list-left">
						<view class="list-item-line">
							<text>{{currRecord.holeNo}}</text>
							<text>{{currRecord.nurse}}</text>
							<text>{{currRecord.create_time}}</text>
						</view>
						<view class="list-item-line">
							<text>备注：{{currRecord.remark}}</text>
						</view>
					</view>
					<uni-icons type="arrowright" color="#C0C0C0" size="20" style="padding:20rpx 0 20rpx 20rpx;margin:0;" @click="toDetail(currRecord)"></uni-icons>
				</view>
			</view>
		</view>
		<view class="">
			<view class="content">
				<view class="section-style">
					<text>历史记录</text>
				</view>
				<view v-if="!hasHistory" class="list-view">
					暂无记录
				</view>
				<view v-if="hasHistory" class="list-view" v-for="item in recordList">
					<view class="list-left">
						<view class="list-item-line">
							<text>{{item.holeNo}}</text>
							<text>{{item.nurse}}</text>
							<text>{{item.create_time}}</text>
						</view>
						<view class="list-item-line">
							<text>备注：{{item.remark}}</text>
						</view>
					</view>
					<uni-icons type="arrowright" color="#C0C0C0" size="20" style="padding:20rpx 0 20rpx 20rpx;margin:0;" @click="toDetail(item)"></uni-icons>
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
				nurseInfo:{},
				pointLabel:false,
				pointList:[],
				hasCurr:false,
				hasHistory:false,
				currRecord:{},
				recordList:[],
			}
		},
		onLoad() {
			this.vasuclarItem = Store.getStorageSync("vasuclarItem");
			this.nurseInfo = Store.getStorageSync("nurseInfo");
			console.log("nurseInfo",this.nurseInfo)
			console.log("vasuclarItem",this.vasuclarItem)
			this.getPoints();
			this.getRecordList();
		},
		onShow() {
			this.getRecordList();
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#target').boundingClientRect(
				(data) => {
					console.log("target",data)
				}
			).exec();
		},
		methods: {
			//设置图片部位
			setLocation(){
				this.$myRequest({
					url:'/vascularposition/location',
					method:'POST',
					data:{
						"pic_id":this.vasuclarItem.pic_id,
						"location":this.vasuclarItem.location,
					},
					success: (res) => {
						if(res.data.code == 200){
							console.log("setLocation",res.data.data)
						}
					},
					fail:(err)=>{
						console.error("setLocation失败",err);
					}
				});
			},
			//获取坐标点
			getPoints(){
				this.pointList = [];
				this.$myRequest({
					url:'/vascularposition/getposition',
					method:'POST',
					data:{
						"pic_id":this.vasuclarItem.pic_id,
					},
					success: (res) => {
						if(res.data.code == 200){
							console.log("positionList",res.data.data)
							this.pointList = res.data.data;
							Store.setStorageSync("pointList",this.pointList);
						}
					},
					fail:(err)=>{
						console.error("positionList失败",err);
					}
				});
			},
			//获取血管通路记录列表
			getRecordList(){
				console.log("getRecordList")
				this.hasCurr = false;
				this.hasHistory = false;
				this.currRecord = {};
				this.recordList = [];
				this.$myRequest({
					url:'/vascularposition/getdesclist',
					method:'POST',
					data:{
						"pic_id":this.vasuclarItem.pic_id,
					},
					success: (res) => {
						console.log("recordList",res.data.data)
						if(res.data.code == 200){
							console.log("recordList",res.data.data)
							let tempList = res.data.data;
							for(let i = 0; i < tempList.length; i++){
								//获取插孔
								for(let j = 0; j < this.pointList.length; j++){
									if(this.pointList[j].position_id == tempList[i].position_id){
										let index = j+1;
										tempList[i].holeNo = "插孔" + index.toString();
									}
								}
								//获取护士
								for(let k = 0; k < this.nurseInfo.length; k++){
									if(this.nurseInfo[k].emp_no == tempList[i].nurse_id){
										tempList[i].nurse = this.nurseInfo[k].name;
									}
								}
								
							}
							if(tempList.length > 0){
								this.hasCurr = true;
								this.currRecord = tempList[0];
								tempList.shift();
								this.recordList = tempList;
								console.log("currRecord",this.currRecord)
								console.log("recordList",this.recordList)
							}
							if(this.recordList.length > 0){
								this.hasHistory = true;
							}
						}
					},
					fail:(err)=>{
						console.error("positionList失败",err);
					}
				});
			},
			//添加标记
			addPoint(e){
				const query = uni.createSelectorQuery().in(this);
				query.select('#target').boundingClientRect(
					(data) => {
						console.log("target",data)
					}
				).exec();
				if(this.pointLabel){
					console.log("e type", typeof e.detail.x)
					let point = {x: e.detail.x - 7, y: e.detail.y - 15,};
					uni.showToast({
						title: 'loading',
						icon: 'loading',
						mask: true
					},100);
					this.$myRequest({
						url:'/vascularposition/addposition',
						method:'POST',
						data:{
							"pic_id":this.vasuclarItem.pic_id,
							"x":point.x,
							"y":point.y,
							"key":this.pointList.length,
						},
						success: (res) => {
							//若获取成功同时传入图片和治疗状态数据
							if(res.data.code == 200){
								console.log("addPoint",res.data.data)
								this.getPoints();
							}
						},
						fail:(err)=>{
							console.error("addPoint失败",err);
							uni.showToast({
								title: '添加失败',
								icon: 'none',
								mask: true
							});
						}
					});
					console.log('pointList',this.pointList)
				}
			},
			//撤销标记
			withdrawPoint(){
				let length = this.pointList.length;
				if(length > 0){
					let withdrawPoint = this.pointList[length-1];
					console.log("withdrawPoint",withdrawPoint)
					uni.showToast({
						title: 'loading',
						icon: 'loading',
						mask: true
					},100);
					this.$myRequest({
						url:'/vascularposition/deleteposition',
						method:'POST',
						data:{
							"position_id":withdrawPoint.position_id,
						},
						success: (res) => {
							//若获取成功同时传入图片和治疗状态数据
							if(res.data.code == 200){
								console.log("withdrawPoint",res.data.data)
								this.pointList.pop();
							}
						},
						fail:(err)=>{
							console.error("withdrawPoint失败",err);
							uni.showToast({
								title: '撤销失败',
								icon: 'none',
								mask: true
							});
						}
					});
				}
				this.pointLabel = false;
			},
			//标记状态变更
			startLabel(){
				this.pointLabel = true;
			},
			//标记状态变更
			stopLabel(){
				this.pointLabel = false;
			},
			//跳转新增
			toAdd(){
				uni.navigateTo({
					url:'../vascular-access-record-add/vascular-access-record-add'
				})
			},
			//跳转详情
			toDetail(item){
				Store.setStorageSync("selectRecord",item);
				uni.navigateTo({
					url:'../vascular-access-record-edit/vascular-access-record-edit'
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
		justify-content: flex-start;
		align-items: flex-start;
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
		width: 200rpx;
		height: 50rpx;
		line-height: 50rpx;
		color: #51D3C7;
		font-size: 28upx;
		border: 2rpx solid #51D3C7;
	    border-radius: 20rpx;

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
