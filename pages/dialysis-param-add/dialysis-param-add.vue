<template>
	<view class="content">
		<form @submit="submitDialysisParam">
		<!-- <view class="form-item">
				<view class="form-prefix-space">
					<text>记录时间:</text>
				</view>
				<view class="form-cnt form-mid-space disable-style">
					<picker mode="time" disabled="true" @change="setRecordTime($event)">
						<input class="form-mid-space" type="text" v-model="info.showTime" disabled="true" placeholder="提交时生成记录时间"/>
					</picker>
				</view>
			</view> -->
			<view class="form-item">
				<view class="form-prefix-space">
					<text>静脉压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name="venous_pressure"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>动脉压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="defaultInfo.artery_pressure" type="text" name="artery_pressure"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>跨膜压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name="transmembrane_pressure"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>血流量ml/min:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="defaultInfo.blood_flow" type="text" name="blood_flow"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>体温℃:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name="temperature"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>心率(次/min):</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name="cardiotach"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>呼吸(次/min):</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name="breath"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>收缩压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="defaultInfo.systolic_pressure" type="text" name="systolic_pressure"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>舒张压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="defaultInfo.diastolic_pressure" type="text" name="diastolic_pressure"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>SpO2(%):</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="defaultInfo.spo2" type="text" name="spo2"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>电导度ms/cm:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="defaultInfo.conductivity" type="text" name="conductivity"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>超滤率ml/h:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="defaultInfo.urf" type="text" name="urf"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>透析液温度℃:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="defaultInfo.dialysate_temperature" type="text" name="dialysate_temperature"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>渗血:</text>
				</view>
				<view class="form-cnt-noborder form-mid-space">
					<radio-group name="vascular_access_errhyisis">
						<label  v-for="item in info.bleed" class="radio-item">
							<radio :value="item.value" :checked="item.checked" color="#51D3C7" style="transform:scale(0.7)" />
							{{item.name}}
						</label>					
					</radio-group>	
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>滑脱:</text>
				</view>
				<view class="form-cnt-noborder form-mid-space">
					<radio-group name="vascular_access_glide">
						<label  v-for="item in info.slide" class="radio-item">
							<radio :value="item.value" :checked="item.checked" color="#51D3C7"  style="transform:scale(0.7)" />
							{{item.name}}
						</label>					
					</radio-group>	
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>责任护士:</text>
				</view>
				<view class="form-cnt form-mid-space" :class="{'disable-style' : nursePicker1}">
					<picker mode="selector" :disabled="nursePicker1" :range="nurseRange"  @change="setNurese1" name="nurse_id">
						<input class="form-mid-space" v-model="info.nurse" disabled="true" type="text" />
					</picker>
				</view>
				<view class="form-cnt-noborder form-mid-space">
					<button :class="nursePicker1 ?'one-btn small-btn':'err-btn small-btn'" @click="ableNurse1">修改签名</button>
				</view>
			</view>				
			<view class="form-item">
				<view class="form-prefix-space">
					<text>症状及处理:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name="clinical_manifestation"/>
				</view>
			</view>
			<button class="one-btn btn-margin" form-type="submit">保存</button>
			<button class="err-btn">取消</button>
		</form>
		
	</view>
</template>

<script>
	import Store from '../../common/store.js'
	import _ from "lodash"
	import moment from "moment"
	
	let defaultInfo = {
		artery_pressure: "0",
		blood_flow: "250",
		spo2: "0",
		conductivity: "14.0",
		urf: "550",
		dialysate_temperature: "37",
		systolic_pressure: "",
		diastolic_pressure: "",
	}
	export default {
		data() {
			return {
				user:{},
				patient:{},
				nursePicker1:true,
				nurseRange:[],
				nurseInfo:[],
				info:{
					time:"",
					showTime:"",
					nurse:"",
					nurseId:"",
					bleed:[{name:"是",value:"1",checked:false},{name:"否",value:"0",checked:true}],
					slide:[{name:"是",value:"1",checked:false},{name:"否",value:"0",checked:true}],
				},
				defaultInfo: _.cloneDeep(defaultInfo),
			}
		},
		onLoad() {
			this.user = Store.getStorageSync("userInfo");
			console.log("user",this.user)
			this.info.nurse = this.user.user_name;
			this.info.nurseId = this.user.user_id;
			this.patient = Store.getStorageSync("patient");
			this.nurseInfo = Store.getStorageSync("nurseInfo");
			this.defaultInfo = _.cloneDeep(defaultInfo);
			let defaultBP = Store.getStorageSync("defaultBP")
			console.log("defaultBP",defaultBP);
			if(defaultBP === 0){
				let bpData = Store.getStorageSync("bloodPressure")
				console.log("bloodPressure:",bpData);
				this.defaultInfo.systolic_pressure = bpData.before_systolic_pressure;
				this.defaultInfo.diastolic_pressure = bpData.before_diastolic_pressure;
			}
			this.nurseRange = [];
			if(Array.isArray( this.nurseInfo)){
				for (let i = 0; i < this.nurseInfo.length; i++) {
					this.nurseRange.push(this.nurseInfo[i].name);
				}
			}
			if(this.nurseInfo == "error"){
				uni.showToast({
					title: '护士列表请求失败',
					icon: 'none',
					mask: true
				});
			}
		},
		methods: {
			// //设置记录时间
			// setRecordTime(e){
			// 	//获取当前时间
			// 	let dateGetter = new Date();
			// 	let year = dateGetter.getFullYear();
			// 	let month = dateGetter.getMonth() + 1;
			// 	let date = dateGetter.getDate();
			// 	this.info.time = year + "-" + month + "-" + date + " " +  e.detail.value + ":00";
			// 	this.info.showTime = e.detail.value;
			// },
			//下拉框选择责任护士
			setNurese1(e){
				this.info.nurse = this.nurseRange[e.detail.value];
				this.info.nurseId = "";
			},
			//责任护士修改按钮,解除禁用
			ableNurse1(){
				this.nursePicker1 = !this.nursePicker1;
			},
			//保存按钮
			submitDialysisParam(e){
				console.log("e",e)
				let nurseSubmit = "";
				if(this.info.nurseId == ""){
					if(Array.isArray( this.nurseInfo)){
						for(let i = 0; i < this.nurseInfo.length; i++){
							if(this.nurseInfo[i].name == this.info.nurse)
							{
								nurseSubmit = this.nurseInfo[i].emp_no;
								break;
							}
						}
					}
				}
				else{
					nurseSubmit = this.info.nurseId;
				}
				console.log("nurseId",this.info.nurseId)
				console.log("nurse",this.info.nurse)
				let currTime = moment().format('YYYY-MM-DD HH:mm:ss')
				console.log("currTime:",currTime)
				// 新增透析参数
				this.$myRequest({
					url:'/patient/new/dialysisparam',
					method:'POST',
					data:{
						cure_id: this.patient.cure_id,
						recipe_id: this.patient.recipe_id,
						create_date: currTime,
						venous_pressure: e.detail.value.venous_pressure,
						artery_pressure: e.detail.value.artery_pressure,
						transmembrane_pressure: e.detail.value.transmembrane_pressure,
						blood_flow: e.detail.value.blood_flow,
						temperature: e.detail.value.temperature,
						cardiotach: e.detail.value.cardiotach,
						breath: e.detail.value.breath,
						systolic_pressure: e.detail.value.systolic_pressure,
						diastolic_pressure: e.detail.value.diastolic_pressure,
						spo2: e.detail.value.spo2,
						conductivity: e.detail.value.conductivity,
						urf: e.detail.value.urf,
						dialysate_temperature: e.detail.value.dialysate_temperature,
						vascular_access_errhyisis: e.detail.value.vascular_access_errhyisis,
						vascular_access_glide: e.detail.value.vascular_access_glide,
						nurse_id: nurseSubmit,
						clinical_manifestation: e.detail.value.clinical_manifestation,
					},
					success: (res) => {
						if(res.data.code == 200){
							uni.showToast({
								title: '透析参数添加成功',
								icon: 'none',
								mask: true
							},500);
							setTimeout(() => {
									uni.hideToast();
									//关闭提示后跳转
									uni.switchTab({
										url:"../dialysis-param/dialysis-param",
									});
								}, 500);
						}
					},
					fail: (err) => {
						console.log('request fail', err);
						uni.showToast({
							title: '透析参数添加失败',
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
	.small-btn{
		border-radius: 20rpx;
		height: 60rpx;
		font-size: 28rpx;
	}
</style>
