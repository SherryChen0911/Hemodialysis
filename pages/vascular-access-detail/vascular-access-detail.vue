<template>
	<view class="vascular-cnt">
		{{log}}
		<view class="vascular-view">
			<view class="vascular-item" v-for="(item, index) in list">
				<view class="pic-view">
					<image class="vascular-pic" :src="item.url" mode="aspectFill" @click="bigPic(item)"/>
					<!-- <image class="vascular-pic" :src="item.url" mode="widthFix" @click="bigPic(item)"/> -->
				</view>
				<view class="vascular-del-btn">
					<uni-icons type="trash-filled" color="#c0c0c0" size="20" @click="delPic(item)"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 弹出框 -->
		<uni-popup ref="bigPic" type="dialog">
			<view class="big-pic-area" slot="default" >
				<image class="big-pic" :src="currItem.url" mode="aspectFit"/>
				<view class="vascular-btn-area">
					<button class="btn" @click="delPic(currItem)">删除</button>
					<button class="btn" @click="clocePopup">返回</button>
				</view>
			</view>
		</uni-popup>

		<!-- <uni-popup ref="bigPic" type="dialog" background-color="red">
			<view class="big-pic-area" slot="default" >
				<image class="big-pic" :src="currItem.url" mode="widthFix"/>
				<view class="vascular-btn-area">
					<button class="btn" @click="delPic">删除</button>
					<button class="btn" @click="clocePopup">返回</button>
				</view>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	import Store from '../../common/store.js'
	let that = null
	export default {
		data() {
			return {
				log:"",
				currItem: {},
				vascularCount: 0,
				vascularMsg: {},
				list: [],
				page: 1,
				limit: 20,
			}
		},
		onReachBottom() {
			this.log = this.log + " onReachBottom ";
			console.log("onReachBottom")
			let picFetchNum = this.page * this.limit;
			console.log("vascularCount",this.vascularCount);
			console.log("picFetchNum",picFetchNum);
			if(picFetchNum >= this.vascularCount){
				uni.showToast({
					title: '没有更多图片',
					icon: 'none',
					mask: true
				});
			}
			else{
				this.page += 1;
				console.log("page",this.page)
				this.getPic();
			}
		},
		onLoad() {
			this.vascularMsg = Store.getStorageSync("vascularMsg");
			console.log("vascularMsg",this.vascularMsg)
			this.getPic();
		},
		methods: {
			getPic(){
				uni.showToast({
					title: 'loading',
					icon: 'loading',
					mask: true
				});
				console.log("enter getpic")
				console.log("page",this.page)
				this.$myRequest({
					url:'/patient/page/vascularaccesspic',
					method:'POST',
					data:{
						"hemodialysis_id":this.vascularMsg.hemodialysis_id,
						"vascular_access_id":this.vascularMsg.vascular_access_id,
						"page":this.page,
						"prepage":this.limit,
					},
					success: (res) => {
						//若获取成功同时传入图片和治疗状态数据
						if(res.data.code == 200){
							console.log("getPic",res.data.data)
							this.list = this.list.concat(res.data.data.data);
							this.vascularCount = res.data.data.total;
							console.log("list",this.list)
						}
					},
				});
			},
			bigPic(item){
				this.currItem = item;
				console.log("currItem",this.currItem)
				this.$refs.bigPic.open();
			},
			clocePopup(){
				this.$refs.bigPic.close();
			},
			delPic(item){
				this.$myRequest({
					url:'/patient/delete/vascularaccesspic',
					method:'POST',
					data:{
						"pic_id":item.pic_id,
						"picturename":item.picturename,
					},
					success: (res) => {
						//若获取成功同时传入图片和治疗状态数据
						if(res.data.code == 200){
							console.log("delPic",res.data.data)
							//删除照片后重新拉取血管通路图片列表
							this.page = 1;
							this.list = [];
							this.getPic();
							setTimeout(()=>{
								this.$refs.bigPic.close();
								uni.showToast({
									title: '照片删除成功',
									icon: 'none',
									mask: true
								});
							},1000)
						}
					},
					fail:(err)=>{
						console.error("delPic失败",err);
						uni.showToast({
							title: '照片删除失败',
							icon: 'none',
							mask: true
						});
					}
					
				});
				
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
		margin-top: 50rpx;
		/* margin: 10rpx; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.big-pic{
		width: 730rpx;
		height: 1000rpx;
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
	.uni-popup>uni-view{
		background-color: rgba(0, 0, 0, 1) !important;
	} 
</style>
