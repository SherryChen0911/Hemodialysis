<template>
	<view class="content">
		<form @submit="submit">
			<view class="form-item">
				<view class="form-prefix-space">
					<text>插孔编号:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="holeRange"  @change="setHole">
					<input class="form-mid-space" disabled="true" type="text" v-model="submitInfo.hole" name=""/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>插孔护士:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="nurseRange"  @change="setNurse">
						<input class="form-mid-space" disabled="true" type="text" v-model="submitInfo.nurse" name=""/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>备注:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="recordItem.remark" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>照片:</text>
				</view>
			</view>
			<view class="record-pic-area">
				<view v-for="item in imgList">
					<image class="record-pic"  :src="item" mode="aspectFill" @click="bigPic(item)"></image>
					<!-- <uni-icons type="close" color="#c0c0c0" size="25" style="margin-right: 40rpx;" @click="delPic()"></uni-icons> -->
				</view>
				<uni-icons type="camera" color="#C0C0C0" size="50" style="line-height: 200rpx; margin-left: 50rpx;" @click="addPic()"></uni-icons>
			</view>
			<button class="one-btn btn-margin" form-type="submit">保存</button>
			<button class="err-btn">取消</button>
		</form>
		
		<!-- 弹出框 -->
		<uni-popup ref="bigPic" type="dialog">
			<view class="big-pic-area" slot="default" >
				<image class="big-pic" :src="selectImg" mode="aspectFit"/>
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
	
	let that = null;
	export default {
		data() {
			return {
				vasuclarItem:{},
				recordItem:{
					position_id:"",
					pic_id:"",
					remark:"",
					nurse_id:"",
					key:"",
					
				},
				pointList:[],
				nurseInfo:[],
				nurseRange:[],
				holeRange:[],
				imgList:[],
				selectImg:"",
				submitInfo:{
					hole:'',
					date:'',
					time:'',
					nurse:'',
					nurseid:'',
					comment:'',
				},
			}
		},
		onLoad() {
			//获取图片对象
			this.vasuclarItem = Store.getStorageSync("vasuclarItem");
			//获取插孔列表的下拉菜单
			this.pointList = Store.getStorageSync("pointList");
			this.holeRange = [];
			for(let i = 0; i < this.pointList.length; i++){
				let index = i+1;
				let holeName = "插孔"+ index.toString();
				this.holeRange.push(holeName);
			}
			console.log("holeRange",this.holeRange)
			this.userInfo = Store.getStorageSync("userInfo");
			this.nurseInfo = Store.getStorageSync("nurseInfo");
			console.log("vasuclarItem",this.vasuclarItem)
			console.log("pointList",this.pointList)
			console.log("userInfo",this.userInfo)
			console.log("nurseInfo",this.nurseInfo)
			this.recordItem.nurse_id = this.userInfo.user_id;
			this.recordItem.pic_id = this.vasuclarItem.pic_id;
			this.nurseRange = [];
			if(Array.isArray(this.nurseInfo)){
				for (let i = 0; i < this.nurseInfo.length; i++) {
					this.nurseRange.push(this.nurseInfo[i].name);
				}
			}
			//设置默认值
			this.submitInfo.nurse = this.userInfo.user_name;

		},
		methods: {
			submit(){
				console.log("recordItem",this.recordItem)
				this.$myRequest({
					url:'/vascularposition/newdesc',
					method:'POST',
					data:this.recordItem,
					success: (res) => {
						if(res.data.code == 200){
							console.log("新增血管通路记录",res.data.data)
							for(let a = 0; a < this.imgList.length; a++){
								this.addPicAPI(this.imgList[a],res.data.data.desc_id);
							}
							uni.showToast({
								title: "血管通路记录新增成功!",
								icon: 'none',
								mask: true
							});
						}
					},
					fail:(err)=>{
						console.error("新增血管通路记录失败",err);
					}
				});
			},
			setHole(e){
				this.submitInfo.hole = this.holeRange[e.detail.value];
				this.recordItem.position_id = this.pointList[e.detail.value].position_id;
				this.recordItem.key = this.pointList[e.detail.value].key;
				console.log("recordItem",this.recordItem)
			},
			setNurse(e){
				this.submitInfo.nurse = this.nurseRange[e.detail.value];
				this.recordItem.nurse_id = this.nurseInfo[e.detail.value].emp_no;
				console.log("recordItem",this.recordItem)
			},
			addPic(){
				that = this;
				uni.chooseImage({
					count: 1,
					success: function (res) {
						console.log("chooseImage",res)
						console.log("chooseImage",res.tempFilePaths[0])
						that.imgList.push(res.tempFilePaths[0]);
						console.log("imgList",that.imgList)
					},
					fail: function (err) {
						console.log("chooseImage 失败",err);
					}
				});
			},
			addPicAPI(item,id){
				console.log("enter addPicAPI")
				console.log("url:",item)
				uni.uploadFile({
					// url:"http://192.168.0.46:8083/vascularposition/new/vascularpic",
					url:"http://192.168.0.46:8083/vascularposition/new/vascularpic",
					filePath:item,
					fileType:'image',
					name:'file',
					formData:{
						'desc_id':id,
					},
					success:(res)=>{
						console.log("uploadFile",res)
					},
					fail:(err1)=>{
						console.log("uploadFile",err1)
						console.error("uploadFile 失败",err1);
					}
				})
			},
			bigPic(item){
				this.selectImg = item;
				this.$refs.bigPic.open();
			},
			clocePopup(){
				this.$refs.bigPic.close();
			},
			delPic(){
				this.$refs.bigPic.close();
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");
	
	form{
		width: 100%;
	}
	.form-item{
		align-items: center;
		font-size: 24rpx;
	}
	.form-prefix-space{
		justify-content: flex-start;
		padding-left: 0;
		width: 120rpx;
		height: 60rpx;
	}
	.form-cnt{
		margin-left: 10rpx;
		height: 60rpx;
		border-color: #C0C0C0;
	}
	.record-pic{
		width: 200rpx;
		height: 200rpx;
	}
	.record-pic-area{
		margin-left: 50rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
	}
	.btn-margin{
		margin-bottom: 20rpx;
	}
	.big-pic-area{
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
/* 	>>> .uni-popup uni-view{
		background-color: rgba(0, 0, 0, 0.7) !important;
	} */
</style>
