<template>
	<view class="content">
		<form @submit="submit">
			<view class="form-item">
				<view class="form-prefix-space">
					<text>透析机使用日期:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="date" fields="day" @change="setDate($event)">
						<input class="form-mid-space" disabled="true" type="text" v-model="data.usedate" name="usedate"/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>班次:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="banciRange"  @change="setShift">
						<input class="form-mid-space" disabled="true" type="text" v-model="data.banci_id" name="banci_id"/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>区域:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="roomRange"  @change="setSection">
						<input class="form-mid-space" disabled="true" type="text" v-model="data.dialysis_room_id" name="dialysis_room_id"/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>床位:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="bedRange"  @change="setBed">
						<input class="form-mid-space" disabled="true" type="text" v-model="data.bed_number" name="bed_number"/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>透析机编号/型号:</text>
				</view>
				<view class="form-cnt form-mid-space disable-style">
					<input class="form-mid-space" disabled="true" type="text" v-model="data.machine_name+'/'+data.machine_model"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>监测情况:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="watchRange" @change="setWatch">
						<input class="form-mid-space" disabled="true" type="text" v-model="data.machine_check" name="machine_check"/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>报警情况:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="alertRange"  @change="setAlert">
						<input class="form-mid-space" disabled="true" type="text" v-model="data.machine_alarm" name="machine_alarm"/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>消毒功能:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="sterilizeRange"  @change="setSterilize">
						<input class="form-mid-space" disabled="true" type="text" v-model="data.degassing" name="degassing"/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>运转情况:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="workRange" @change="setWork">
						<input class="form-mid-space" disabled="true" type="text" v-model="data.working" name="working"/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>使用时间(小时):</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="data.usertime" type="text" name="usertime"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>机器内部管路消毒:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="sterilizeInsideList" @radioClick="setRadio1"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>机器内部消毒方法:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="sterilizeInsideRange"  @change="setSterilizeInside">
						<input class="form-mid-space" disabled="true" type="text" v-model="data.class_way" name="class_way"/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>机器外部消毒:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="sterilizeOutsideList" @radioClick="setRadio2"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>机器外部消毒方法:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="sterilizeOutsideRange"  @change="setSterilizeOutside">
						<input class="form-mid-space" disabled="true" type="text" v-model="data.day_way" name="day_way"/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>处理:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" v-model="data.dealwith" name="dealwith"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>操作者:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="nurseRange"  @change="setNurse">
						<input class="form-mid-space" disabled="true" type="text" v-model="data.sign_name" name=""/>
					</picker>
				</view>
			</view>
			<button class="one-btn btn-margin" form-type="submit">保存</button>
			<button class="err-btn" @click="goBack">取消</button>
		</form>
	</view>
</template>

<script>
	import Store from '../../common/store.js'
	import MyRadioBox from '../../components/my-radios.vue'
	
	export default {
		data() {
			return {
				data:{
					usedate:"",
					banci_id:"",
					dialysis_room_id:"",
					bed_number:"",
					machine_name:"",
					machine_model:"",
					machine_check:"",
					machine_alarm:"",
					degassing:"",
					working:"",
					usertime:"",
					class_way:"",
					day_way:"",
					dealwith:"",
					sign_name:"",
				},
				userInfo:{},
				selectCondition:[],
				banciInfo:[],
				banciRange:[],
				roomInfo:[],
				roomRange:[],
				bedInfo:[],
				bedRange:[],
				nurseInfo:[],
				nurseRange:[],
				watchRange:["正常","异常"],
				alertRange:["正常","异常"],
				sterilizeRange:["正常","异常"],
				workRange:["正常","异常"],
				sterilizeInsideList:[
					{name:"是",check:false,value:1},
					{name:"否",check:false,value:0},
				],
				sterilizeOutsideList:[
					{name:"是",check:false,value:1},
					{name:"否",check:false,value:0},
				],
				sterilizeInsideRange:["化学热消毒","含氯制剂擦拭","卫生湿巾擦拭"],
				sterilizeOutsideRange:["化学热消毒","含氯制剂擦拭","卫生湿巾擦拭"],
				selectItem:{},
			}
		},
		components:{
			MyRadioBox
		},
		onLoad() {
			this.userInfo = Store.getStorageSync("userInfo");
			this.banciInfo = Store.getStorageSync("banciInfo");
			this.banciRange = Store.getStorageSync("banciRange");
			this.roomInfo = Store.getStorageSync("roomInfo");
			this.roomRange = Store.getStorageSync("roomRange");
			this.nurseInfo = Store.getStorageSync("nurseInfo");
			this.nurseRange = [];
			if(Array.isArray(this.nurseInfo)){
				for (let i = 0; i < this.nurseInfo.length; i++) {
					this.nurseRange.push(this.nurseInfo[i].name);
				}
			}
			this.selectCondition = Store.getStorageSync("selectCondition")
			//设置默认值
			this.data.sign_name = this.userInfo.user_name;
			
			console.log("userInfo",this.userInfo)
			console.log("banciInfo",this.banciInfo)
			console.log("roomInfo",this.roomInfo)
			console.log("nurseInfo",this.nurseInfo)
			console.log("selectCondition",this.selectCondition)
		},
		methods: {
			//新增透析机详情数据
			submitMachineDetailData(submitData){
				console.log("submitMachineDetailData")
				this.$myRequest({
					url:'/machine/newrecord',
					method:'POST',
					data:submitData,
					success: (res) => {
						if(res.data.code == 200){
							console.log("透析机新增",res.data.data)
							uni.showToast({
								title: "透析机记录新增成功!",
								icon: 'none',
								mask: true
							});
						}
					},
				});
			},
			setDate(e){
				this.data.usedate = e.detail.value;
			},
			setShift(e){
				this.data.banci_id = this.banciRange[e.detail.value];
			},
			setSection(e){
				this.data.dialysis_room_id = this.roomRange[e.detail.value];
				this.data.bed_number = "";
				this.data.machine_name = "";
				this.data.machine_model = "";
				//获取床位下拉菜单数据
				if(Array.isArray(this.selectCondition)){
					for (let k = 0; k < this.selectCondition.length; k++) {
						if(this.data.dialysis_room_id === this.selectCondition[k].quyu){
							this.bedInfo = this.selectCondition[k].bedList;
							this.bedRange = this.selectCondition[k].bedRange;
						}
					}
				}

			},
			setBed(e){
				this.data.bed_number = this.bedRange[e.detail.value];
				this.setMachine();
			},
			setMachine(){
				if(Array.isArray(this.bedInfo)){
					for (let a = 0; a < this.bedInfo.length; a++) {
						if(this.data.bed_number === this.bedInfo[a].bed_number){
							this.data.machine_name = this.bedInfo[a].machine_name;
							this.data.machine_model = this.bedInfo[a].machine_model;
						}
					}
				}
			},
			setWatch(e){
				this.data.machine_check = this.watchRange[e.detail.value];
			},
			setAlert(e){
				this.data.machine_alarm = this.alertRange[e.detail.value];
			},
			setSterilize(e){
				this.data.degassing = this.sterilizeRange[e.detail.value];
			},
			setWork(e){
				this.data.working = this.workRange[e.detail.value];
			},
			setRadio1(emitData){
				console.log("setRadio1",emitData)
				this.data.inner_degassing = emitData;
			},
			setRadio2(emitData){
				console.log("setRadio2",emitData)
				this.data.outer_degassing = emitData;
			},
			setSterilizeInside(e){
				this.data.class_way = this.sterilizeInsideRange[e.detail.value];
			},
			setSterilizeOutside(e){
				this.data.day_way = this.sterilizeOutsideRange[e.detail.value];
			},
			setNurse(e){
				this.data.sign_name = this.nurseRange[e.detail.value];
			},
			//提交修改按钮
			submit(){
				console.log("data",this.data)
				let submitData = {};
				submitData.usedate = this.data.usedate;
				//处理班次
				if(Array.isArray(this.banciInfo)){
					for (let submit1 = 0; submit1 < this.banciInfo.length; submit1++ ) {
						if(this.data.banci_id == this.banciInfo[submit1].item_name){
							submitData.banci_id = this.banciInfo[submit1].item_value;
						}
					}
				}
				//处理区域
				if(Array.isArray(this.roomInfo)){
					for (let submit2 = 0; submit2 < this.roomInfo.length; submit2++) {
						if(this.data.dialysis_room_id === this.roomInfo[submit2].item_name){
							submitData.dialysis_room_id = this.roomInfo[submit2].item_id;
						}
					}
				}
				//处理床位和机器信息
				if(Array.isArray(this.bedInfo)){
					for (let submit3 = 0; submit3 < this.bedInfo.length; submit3++) {
						if(this.data.bed_number === this.bedInfo[submit3].bed_number){
							submitData.bed_number = this.bedInfo[submit3].bed_id;
							submitData.machine_id = this.bedInfo[submit3].machine_id;
							submitData.machine_name = this.bedInfo[submit3].machine_name;
							submitData.machine_type = this.bedInfo[submit3].machine_type;
							submitData.machine_model = this.bedInfo[submit3].machine_model;
						}
					}
				}
				submitData.machine_check = this.data.machine_check;
				submitData.machine_alarm = this.data.machine_alarm;
				submitData.degassing = this.data.degassing;
				submitData.working = this.data.working;
				submitData.usertime = this.data.usertime;
				submitData.inner_degassing = this.data.inner_degassing;
				submitData.outer_degassing = this.data.outer_degassing;
				submitData.class_way = this.data.class_way;
				submitData.day_way = this.data.day_way;
				submitData.dealwith = this.data.dealwith;
				//处理操作者
				console.log("sign_name",this.data.sign_name)
				if(Array.isArray(this.nurseInfo)){
					for (let submit4 = 0; submit4 < this.nurseInfo.length; submit4++) {
						if (this.data.sign_name === this.nurseInfo[submit4].name) {
							submitData.sign_name = this.nurseInfo[submit4].emp_no;
						}
					}
				}
				console.log("submitData",submitData)
				this.submitMachineDetailData(submitData);
			},
			//返回
			goBack(){
				uni.navigateBack({
				    delta: 1
				});
			},
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
</style>
