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
						<text>日期:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="date" @change="setDate($event)">
						<input class="form-mid-space" disabled="true" type="text" v-model="submitInfo.date" name=""/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>时间:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="time" @change="setTime($event)">
						<input class="form-mid-space" disabled="true" type="text" v-model="submitInfo.time" name=""/>
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
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>照片:</text>
				</view>
				<view class="form-mid-space form-mid-space3">
					<uni-icons v-if="!submitInfo.hasPic" type="camera" color="#C0C0C0" size="50" @click="addPic()"></uni-icons>
					<image class="record-pic" v-if="submitInfo.hasPic" :src="submitInfo.url" mode="aspectFill" @click="bigPic"></image>
					<uni-icons v-if="submitInfo.hasPic" type="close" color="#c0c0c0" size="25" @click="delPic()"></uni-icons>
				</view>
			</view>
			<button class="one-btn btn-margin" form-type="submit">保存</button>
			<button class="err-btn">取消</button>
		</form>
		
		<!-- 弹出框 -->
		<uni-popup ref="bigPic" type="dialog">
			<view class="big-pic-area" slot="default" >
				<image class="big-pic" :src="submitInfo.url" mode="aspectFit"/>
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
				nurseInfo:[],
				nurseRange:[],
				holeRange:['插孔1','插孔2','插孔3','插孔4','插孔5','插孔6','插孔7','插孔8','插孔9','插孔10','插孔11','插孔12'],
				submitInfo:{
					hole:'',
					date:'',
					time:'',
					nurse:'',
					nurseid:'',
					comment:'',
					url:"../../static/vascular.png",
					hasPic:false,
				},
			}
		},
		onLoad() {
			this.userInfo = Store.getStorageSync("userInfo");
			this.nurseInfo = Store.getStorageSync("nurseInfo");
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
				
			},
			setHole(e){
				this.submitInfo.hole = this.holeRange[e.detail.value];
				
			},
			setDate(e){
				this.submitInfo.date = e.detail.value;
			},
			setTime(e){
				this.submitInfo.time = e.detail.value;
			},
			setNurse(e){
				this.submitInfo.nurse = this.nurseRange[e.detail.value];
			},
			addPic(){
				this.submitInfo.hasPic = true;
			},
			bigPic(){
				this.$refs.bigPic.open();
			},
			clocePopup(){
				this.$refs.bigPic.close();
			},
			delPic(){
				this.submitInfo.hasPic = false;
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
	.form-mid-space3{
		display: flex;
		align-items: flex-start;
	}
	.btn-margin{
		margin-bottom: 20rpx;
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
/* 	>>> .uni-popup uni-view{
		background-color: rgba(0, 0, 0, 0.7) !important;
	} */
</style>
