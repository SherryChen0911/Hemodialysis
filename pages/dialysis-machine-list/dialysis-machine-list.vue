<template>
	<view class="content">
		<button class="table-btn" @click="toMachineAdd">
			<uni-icons class="btn-icon" type="plus" color="#51D3C7" size="15"></uni-icons>
			新增
		</button>
		<view class="search-machine-area">
			<view class="search-machine-condition">
				<view class="search-machine-item">
					<text class="search-machine-title">使用日期</text>
					<picker class="search-machine-cnt-date" fields="day" mode="date" @change="setStartDate($event)">
						<input class="search-machine-cnt-date" type="text" disabled="true" v-model="searchInfo.startDate" placeholder="开始日期"/>
					</picker>
					<text >至</text>
					<picker class="search-machine-cnt-date" fields="day" mode="date" @change="setEndDate($event)">
						<input class="search-machine-cnt-date" type="text" disabled="true" v-model="searchInfo.endDate" placeholder="结束日期"/>
					</picker>
				</view>
				<view class="search-machine-item">
					<text class="search-machine-title">病区/床位</text>
					<picker class="search-machine-cnt" mode="selector" :range="roomRange"  @change="setSection">
						<input type="text" v-model="showSearchInfo.section" disabled="true" placeholder="请选择病区"/>
					</picker>
					<view style="width: 10rpx;"></view>
					<picker class="search-machine-cnt" mode="selector" :range="bedRange"  @change="setBed">
						<input type="text" v-model="showSearchInfo.bed" disabled="true" placeholder="请选择床位"/>
					</picker>
				</view>
				<view class="search-machine-item">
					<text class="search-machine-title">班次</text>
					<picker class="search-machine-cnt" mode="selector" :range="banciRange"  @change="setShift">
						<input type="text" v-model="showSearchInfo.shift" disabled="true" placeholder="请选择班次"/>
					</picker>
				</view>
			</view>
			<button class="search-machine-btn one-btn" @click="query">查询</button>
		</view>
		<view class="table-list">
			<view class="table-line table-title">
				<text class="table-item">使用日期/班次</text>
				<text class="table-item">区域/床位</text>
				<text class="table-item">透析机编号/型号</text>
			</view>
			<view v-if="!hasMachineData" class="table-line table-cnt">
				<text class="table-item">暂无数据</text>
			</view>
			<view v-if="hasMachineData" class="table-line table-cnt" v-for="item in machineList" @click="showMachineSelect(item)">
				<text class="table-item">{{item.usedate}}/{{item.banci}}</text>
				<text class="table-item">{{item.quyu}}/{{item.bed_number}}</text>
				<text class="table-item">{{item.machine_name}}/{{item.machine_model}}</text>
			</view>
		</view>
		
		<!-- 弹出框 -->
		<uni-popup ref="machineSelect" type="dialog">
			<view class="bottom-select-view" slot="default">
				<button class="one-btn btn-margin" @click="editMachine">编辑</button>
				<button class="err-btn" @click="deleteMachine">删除</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Store from '../../common/store.js'
	
	export default {
		data() {
			return {
				hasMachineData:false,
				msg:[],
				banciInfo:[],
				banciRange:[],
				roomInfo:[],
				roomRange:[],
				bedInfo:[],
				bedRange:[],
				selectCondition:[],
				selectItem:{},
				showSearchInfo:{
					section:"",
					bed:"",
					shift:"",
				},
				searchInfo:{
					startDate:"",
					endDate:"",
					section:"",
					bed:"",
					shift:"",
				},
				machineList:[]
			}
		},
		onLoad() {
			this.banciInfo = Store.getStorageSync("banciInfo");
			this.banciRange = Store.getStorageSync("banciRange");
			this.roomInfo = Store.getStorageSync("roomInfo");
			this.roomRange = Store.getStorageSync("roomRange");
			this.getBedData();
		},
		onShow() {
			console.log("enter onshow")
			if(this.searchInfo.startDate !== "" && this.searchInfo.endDate !== ""){
				this.query();
			}
		},
		methods: {
			//获取床位信息（未分类）
			getBedData(){
				this.bedInfo = [];
				this.bedRange = [];
				this.selectCondition = [];
				this.machineList = [];
				this.selectItem = {};
				this.showSearchInfo = {
					section:"",
					bed:"",
					shift:"",
				};
				this.searchInfo = {
					startDate:"",
					endDate:"",
					section:"",
					bed:"",
					shift:"",
				};
				this.$myRequest({
					url:'/common/bednumber',
					method:'GET',
					success: (res) => {
						if(res.data.code == 200){
							let bedInfo = res.data.data;
							this.msg = res.data.data;
							this.classifyBedInfo(bedInfo);
						}
					},
				});
			},
			//获取获取透析机列表数据
			getMachineListData(){
				console.log("enter getMachineListData")
				this.machineList = [];
				uni.showToast({
					title: 'loading',
					icon: 'loading',
					mask: true
				});
				this.$myRequest({
					url:'/machine/userecord',
					method:'POST',
					data:{
						"banci_value": this.searchInfo.shift,
						"dialysis_room_id": this.searchInfo.section,
						"bed_id": this.searchInfo.bed,
						"start_time": this.searchInfo.startDate,
						"end_time": this.searchInfo.endDate,
					},
					success: (res) => {
						if(res.data.code == 200){
							console.log("透析机列表数据",res.data.data)
							if(res.data.data.length > 0){
								this.hasMachineData = true;
							}
							else{
								this.hasMachineData = false;
							}
							this.machineList = res.data.data;
						}
					},
				});
			},
			//病区床位下拉框数据分类
			classifyBedInfo(bedInfo){
				if(Array.isArray(this.roomRange)){
					for(let i = 0; i < this.roomRange.length; i++){
						let quyuCollection = {
							quyu:this.roomRange[i],
							bedList:[],
							bedRange:[],
						};
						if(Array.isArray(bedInfo)){
							for(let j = 0; j < bedInfo.length; j++){
								if(bedInfo[j].quyu === this.roomRange[i]){
									quyuCollection.bedList.push(bedInfo[j]);
									quyuCollection.bedRange.push(bedInfo[j].bed_number);
								}
							}
							quyuCollection.bedRange.sort();
							this.selectCondition.push(quyuCollection);
							quyuCollection = [];
						}
					}
				}
				console.log("selectCondition",this.selectCondition)
				Store.setStorageSync("selectCondition",this.selectCondition)
			},
			//新增按钮
			toMachineAdd(){
				uni.navigateTo({
					url:"../dialysis-machine-add/dialysis-machine-add",
				});
			},
			//下拉框选择开始日期
			setStartDate(e){
				this.searchInfo.startDate = e.detail.value;
			},
			//下拉框选择结束日期
			setEndDate(e){
				this.searchInfo.endDate = e.detail.value;
			},
			//下拉框选择病区
			setSection(e){
				this.showSearchInfo.bed = "";
				let quyu = this.roomRange[e.detail.value];
				if(Array.isArray(this.selectCondition)){
					for(let k = 0; k < this.selectCondition.length; k++){
						if(this.selectCondition[k].quyu === quyu){
							this.bedInfo = this.selectCondition[k].bedList;
							this.bedRange = this.selectCondition[k].bedRange;
							break;
						}
					}
				}
				this.showSearchInfo.section = quyu;
			},
			//下拉框选择床位
			setBed(e){
				this.showSearchInfo.bed = this.bedRange[e.detail.value];
			},
			//下拉框选择班次
			setShift(e){
				this.showSearchInfo.shift = this.banciRange[e.detail.value];
			},
			//查询按钮
			query(){
				console.log("enter query")
				//病区id
				if(Array.isArray(this.roomInfo)){
					for(let l = 0; l < this.roomInfo.length; l++){
						if(this.roomInfo[l].item_name === this.showSearchInfo.section){
							this.searchInfo.section = this.roomInfo[l].item_id;
						}
					}
				}
				//床位id
				if(Array.isArray(this.bedInfo)){
					for(let m = 0; m < this.bedInfo.length; m++){
						if(this.bedInfo[m].bed_number === this.showSearchInfo.bed){
							this.searchInfo.bed = this.bedInfo[m].bed_id;
						}
					}
				}
				//班次value
				if(Array.isArray(this.banciInfo)){
					for(let n = 0; n < this.banciInfo.length; n++){
						if(this.banciInfo[n].item_name === this.showSearchInfo.shift){
							this.searchInfo.shift = this.banciInfo[n].item_value;
						}
					}
				}
				console.log("showSearchInfo",this.showSearchInfo)
				console.log("searchInfo",this.searchInfo)
				console.log("banciInfo",this.banciInfo)
				console.log("banciRange",this.banciRange)
				console.log("roomInfo",this.roomInfo)
				console.log("roomRange",this.roomRange)
				console.log("bedInfo",this.bedInfo)
				console.log("bedRange",this.bedRange)
				console.log("msg",this.msg)
				this.getMachineListData();
			},
			//选中列表按钮
			showMachineSelect(item){
				this.$refs.machineSelect.open();
				this.selectItem = item;
				console.log("选中对象",item)
			},
			//编辑透析机数据
			editMachine(){
				Store.setStorageSync("machineItem",this.selectItem);
				this.selectItem = [];
				uni.navigateTo({
					url: "../dialysis-machine-edit/dialysis-machine-edit",
				});
				this.$refs.machineSelect.close();
			},
			//删除透析机数据
			deleteMachine(){
				this.$myRequest({
					url:'/machine/deleterecord',
					method:'POST',
					data:{
						"record_id": this.selectItem.record_id,
					},
					success: (res) => {
						if(res.data.code == 200){
							console.log("删除透析机记录",res.data.data)
							uni.showToast({
								title: "透析机记录删除成功!",
								icon: 'none',
								mask: true
							});
						}
					},
				});
				this.selectItem = [];
				this.$refs.machineSelect.close();
				this.getMachineListData();
			}
		}
	}
</script>

<style lang="scss">
	@import url("../../static/css/style.css");
	.search-machine-area{
		width: 100%;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.search-machine-condition{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.search-machine-item{
		width: 100%;
		height: 60rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.search-machine-title{
		width: 160rpx;
		font-size: 28rpx;
	}
	.search-machine-cnt{
		flex: 1;
		height: 60rpx;
		padding: 0 20rpx;
		border: 2rpx solid #C0C0C0;
		border-radius: 20rpx;
		input{
			height: 60rpx;
		}
	}
	.search-machine-cnt-date{
		flex: 1;
		height: 60rpx;
		text-align: center;
		
	}
	.search-machine-btn{
		font-size: 28rpx;
		width: 100rpx;
		padding: 0;
		margin: 0 0 0 20rpx;
		height: 180rpx;
		border-radius: 20rpx !important;
	}
</style>
