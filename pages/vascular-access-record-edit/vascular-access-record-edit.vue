<template>
	<view class="content">
		<form @submit="submit">
			<view class="form-item">
				<view class="form-prefix-space">
					<text>插孔编号:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="holeRange"  @change="setHole">
						<input class="form-mid-space" disabled="true" type="text" v-model="recordInfo.holeNo" name=""/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
						<text>日期:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="date" fields="day" @change="setDate">
						<input class="form-mid-space" type="text" disabled="true" v-model="date"/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>时间:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="time" @change="setTime">
						<input class="form-mid-space" disabled="true" type="text" :value="time" name=""/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>插孔护士:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="nurseRange"  @change="setNurse">
						<input class="form-mid-space" disabled="true" type="text" v-model="recordInfo.nurse" name=""/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>备注:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" v-model="recordInfo.remark" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>照片:</text>
				</view>
			</view>
			<view class="record-pic-area">
				<view v-for="item in imgList">
					<image class="record-pic"  :src="item.url" mode="aspectFill" @click="bigPic(item)"></image>
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
				<image class="big-pic" :src="selectImg.url" mode="aspectFit"/>
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
				date:"",
				time:"",
				recordInfo:{},
				pointList:[],
				holeRange:[],
				nurseInfo:[],
				nurseRange:[],
				imgList:[],
				imgListPost:[],
				selectImg:{},
			}
		},
		onLoad() {
			//获取血管通路记录信息
			this.recordInfo = Store.getStorageSync("selectRecord");
			let tempTime = this.recordInfo.create_time.split(" ");
			this.date = tempTime[0];
			this.time = tempTime[1];
			console.log("recordInfo",this.recordInfo);
			//获取插孔列表的下拉菜单
			this.pointList = Store.getStorageSync("pointList");
			this.holeRange = [];
			for(let i = 0; i < this.pointList.length; i++){
				let index = i+1;
				let holeName = "插孔"+ index.toString();
				this.holeRange.push(holeName);
			}
			//获取护士列表
			this.nurseInfo = Store.getStorageSync("nurseInfo");
			console.log(this.nurseInfo)
			this.nurseRange = [];
			if(Array.isArray(this.nurseInfo)){
				for (let j = 0; j < this.nurseInfo.length; j++) {
					this.nurseRange.push(this.nurseInfo[j].name);
				}
			}
			this.getPic();
		},
		methods: {
			submit(){
				console.log("recordInfo",this.recordInfo)
				this.$myRequest({
					url:'/vascularposition/updatedesc',
					method:'POST',
					data:{
						desc_id: this.recordInfo.desc_id,
						position_id: this.recordInfo.position_id,
						remark: this.recordInfo.remark,
						nurse_id: this.recordInfo.nurse_id,
						key: this.recordInfo.key,
						create_time:this.date + " " + this.time,
					},
					success: (res) => {
						if(res.data.code == 200){
							console.log("修改血管通路记录",res.data.data)
							for(let a = 0; a < this.imgListPost.length; a++){
								this.addPicAPI(this.imgListPost[a]);
							}
							uni.showToast({
								title: "血管通路记录修改成功!",
								icon: 'none',
								mask: true
							});
						}
					},
					fail:(err)=>{
						console.error("修改血管通路记录失败",err);
					}
				});
			},
			setHole(e){
				this.recordInfo.holeNo = this.holeRange[e.detail.value];
				this.recordInfo.position_id = this.pointList[e.detail.value].position_id;
				this.recordInfo.key = this.pointList[e.detail.value].key;
			},
			setDate(e){
				// this.a = e.detail.value;
				console.log(e.detail.value)
				this.date = e.detail.value;
				console.log("date",this.date)
			},
			setTime(e){
				// this.b = e.detail.value;
				console.log(e.detail.value)
				this.time = e.detail.value + ":00";
				console.log("time",this.time)
			},
			setNurse(e){
				this.recordInfo.nurse = this.nurseRange[e.detail.value];
				this.recordInfo.nurse_id = this.nurseInfo[e.detail.value].emp_no;
			},
			getPic(){
				this.$myRequest({
					url:'/vascularposition/listdescpic',
					method:'POST',
					data:{
						desc_id: this.recordInfo.desc_id,
					},
					success: (res) => {
						if(res.data.code == 200){
							console.log("获取血管通路记录图片",res.data.data)
							this.imgList = res.data.data;
						}
					},
					fail:(err)=>{
						console.error("修改血管通路记录失败",err);
					}
				});
			},
			addPic(){
				that = this;
				uni.chooseImage({
					count: 1,
					success: function (res) {
						console.log("chooseImage",res)
						console.log("chooseImage",res.tempFilePaths[0])
						let picData = {url:res.tempFilePaths[0]}
						console.log("picData",picData);
						that.imgList.push(picData);
						that.imgListPost.push(picData);
						console.log("imgList",that.imgList)
						console.log("imgListPost",that.imgListPost)
					},
					fail: function (err) {
						console.log("chooseImage 失败",err);
					}
				});
			},
			addPicAPI(item){
				console.log("enter addPicAPI")
				console.log("url:",item)
				uni.uploadFile({
					// url:"http://192.168.0.46:8083/vascularposition/new/vascularpic",
					url:"http://192.168.0.46:8083/vascularposition/new/vascularpic",
					filePath:item.url,
					fileType:'image',
					name:'file',
					formData:{
						'desc_id':this.recordInfo.desc_id,
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
		margin-right: 10rpx;
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
