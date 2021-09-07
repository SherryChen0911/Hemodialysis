<template>
	<view class="content">
		<form @submit="submitDialysisParam">
			<view class="form-item">
				<view class="form-prefix-space">
					<text>记录时间:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="time" @change="setRecordTime($event)">
						<input class="form-mid-space" type="text" v-model="info.showTime" disabled="true" placeholder="请点击选择时间"/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>静脉压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="dialysisParamInfo.venous_pressure" type="text" name="venous_pressure"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>动脉压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="dialysisParamInfo.artery_pressure" type="text" name="artery_pressure"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>跨膜压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="dialysisParamInfo.transmembrane_pressure" type="text" name="transmembrane_pressure"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>血流量ml/min:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="dialysisParamInfo.blood_flow" type="text" name="blood_flow"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>体温℃:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="dialysisParamInfo.temperature" type="text" name="temperature"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>心率(次/min):</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="dialysisParamInfo.cardiotach" type="text" name="cardiotach"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>呼吸(次/min):</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="dialysisParamInfo.breath" type="text" name="breath"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>收缩压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="dialysisParamInfo.systolic_pressure" type="text" name="systolic_pressure"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>舒张压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="dialysisParamInfo.diastolic_pressure" type="text" name="diastolic_pressure"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>SpO2(%):</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="dialysisParamInfo.spo2" type="text" name="spo2"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>电导度ms/cm:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="dialysisParamInfo.conductivity" type="text" name="conductivity"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>超滤率ml/h:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="dialysisParamInfo.urf" type="text" name="urf"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>透析液温度℃:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" v-model="dialysisParamInfo.dialysate_temperature" type="text" name="dialysate_temperature"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>渗血:</text>
				</view>
				<view class="form-cnt-noborder form-mid-space">
					<radio-group name="vascular_access_errhyisis">
						<label  v-for="item in info.bleed" class="radio-item">
							<radio :value="item.value" :checked="item.checked" color="#51D3C7"  style="transform:scale(0.7)" />
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
					<input class="form-mid-space" v-model="dialysisParamInfo.clinical_manifestation" type="text" name="clinical_manifestation"/>
				</view>
			</view>
			<button class="one-btn" form-type="submit">保存</button>
			<button class="err-btn" @click="close">取消</button>
		</form>
		
	</view>
</template>

<script>
	import Store from '../../common/store.js'
	export default {
		data() {
			return {
				patient:{},
				nursePicker1:true,
				nurseRange:[],
				nurseInfo:[],
				dialysisParamInfo:{},
				info:{
					time:"",
					showTime:"",
					nurse:"",
					nurseid:"",
					bleed:[{name:"是", checked:false, value:"1"},{name:"否",  checked:false, value:"0"}],
					slide:[{name:"是", checked:false, value:"1"},{name:"否", checked:false, value:"0"}],
				},
			}
		},
		onBackPress() {
			this.patient = {};
			this.nursePicker1 = true;
			this.nurseRange = [];
			this.nurseInfo = [];
			this.dialysisParamInfo = {};
			this.info = {};
			Store.setStorageSync("dialysisParam",{});
			return false;
		},
		onLoad() {
			this.changeid ="";
			this.dialysisParamInfo = Store.getStorageSync("dialysisParam");
			console.log("dialysisParamInfo",this.dialysisParamInfo)
			//同步记录时间
			this.info.showTime = this.dialysisParamInfo.show_create_date;
			this.info.time = this.dialysisParamInfo.create_date;
			//同步责任护士
			this.info.nurse = this.dialysisParamInfo.recordnurse;
			//同步渗血
			if(this.dialysisParamInfo.vascular_access_errhyisis != ""){
				for(let i = 0; i < this.info.bleed.length; i++){
					if(this.dialysisParamInfo.vascular_access_errhyisis == this.info.bleed[i].value){
						this.info.bleed[i].checked = true;
						break;
					}
				}
			}
			//同步滑脱
			if(this.dialysisParamInfo.vascular_access_glide != ""){
				for(let i = 0; i < this.info.slide.length; i++){
					if(this.dialysisParamInfo.vascular_access_glide == this.info.slide[i].value){
						this.info.slide[i].checked = true;
						break;
					}
				}
			}
			this.patient = Store.getStorageSync("patient");
			this.nurseInfo = [];
			this.nurseInfo = Store.getStorageSync("nurseInfo");
			console.log("nurseInfo",this.nurseInfo)
			for (let i = 0; i < this.nurseInfo.length; i++) {
				this.nurseRange.push(this.nurseInfo[i].name);
			}
			if(this.nurseInfo == "error"){
				uni.showToast({
					title: '护士列表请求失败',
					icon: 'none',
					mask: true
				});
			}
			//在获取nurse名字以后循环获取nurseid
			else{
				for(let i = 0; i < this.nurseInfo.length; i++){
					if(this.nurseInfo[i].name == this.info.nurse)
					{
						this.info.nurseid = this.nurseInfo[i].emp_no;
						break;
					}
				}
			}
		},
		methods: {
			//设置记录时间
			setRecordTime(e){
				//获取当前时间
				let dateGetter = new Date();
				let year = dateGetter.getFullYear();
				let month = dateGetter.getMonth() + 1;
				let date = dateGetter.getDate();
				this.info.time = year + "-" + month + "-" + date + " " +  e.detail.value + ":00";
				this.info.showTime = e.detail.value;
			},
			//下拉框选择责任护士
			setNurese1(e){
				this.info.nurse = this.nurseRange[e.detail.value];
				console.log("nurse:",this.info.nurse)
				//将nurseid置为空，提交时再去获取id
				this.info.nurseid = "";
				console.log("nurseid:",this.info.nurseid)
			},
			//责任护士修改按钮,解除禁用
			ableNurse1(){
				this.nursePicker1 = !this.nursePicker1;
			},
			//保存按钮
			submitDialysisParam(e){
				let nurseSubmit = "";
				//如果一开始获取数据时没有nurse名字，且没变过
				if(this.info.nurse == ""){
				}
				else{
					if(this.info.nurseid != ""){
						nurseSubmit = this.info.nurseid;
					}
					else{
						// nurseSubmit = this.nurseInfo[e.detail.value.nurse_id].emp_no;
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
				}
				//修改透析参数
				this.$myRequest({
					url:'/patient/update/dialysisparam',
					method:'POST',
					data:{
						"id":this.dialysisParamInfo.hemodialysis_parameters_id,
						"cure_id":this.dialysisParamInfo.cure_id,
						"recipe_id":this.dialysisParamInfo.recipe_id,
						"create_date":this.info.time,
						"venous_pressure":this.dialysisParamInfo.venous_pressure,
						"artery_pressure":this.dialysisParamInfo.artery_pressure,
						"transmembrane_pressure":this.dialysisParamInfo.transmembrane_pressure,
						"blood_flow":this.dialysisParamInfo.blood_flow,
						"temperature":this.dialysisParamInfo.temperature,
						"cardiotach":this.dialysisParamInfo.cardiotach,
						"breath":this.dialysisParamInfo.breath,
						"systolic_pressure":this.dialysisParamInfo.systolic_pressure,
						"diastolic_pressure":this.dialysisParamInfo.diastolic_pressure,
						"spo2":this.dialysisParamInfo.spo2,
						"conductivity":this.dialysisParamInfo.conductivity,
						"urf":this.dialysisParamInfo.urf,
						"dialysate_temperature":this.dialysisParamInfo.dialysate_temperature,
						"vascular_access_errhyisis":e.detail.value.vascular_access_errhyisis,
						"vascular_access_glide":e.detail.value.vascular_access_glide,
						"nurse_id":nurseSubmit,
						"clinical_manifestation":this.dialysisParamInfo.clinical_manifestation,
					},
					success: (res) => {
						if(res.data.code == 200){
							uni.showToast({
								title: '透析参数修改成功',
								icon: 'none',
								mask: true
							},500);
							setTimeout(() => {
									uni.hideToast();
									关闭提示后跳转
									uni.switchTab({
										url:"../dialysis-param/dialysis-param",
									});
									this.dialysisParamInfo = {};
								}, 500);
						}
					},
				});
			},
			close(){
				uni.switchTab({
					url:"../dialysis-param/dialysis-param",
				});
				this.patient = {};
				this.nursePicker1 = true;
				this.nurseRange = [];
				this.nurseInfo = [];
				this.dialysisParamInfo = {};
				this.info = {};
				Store.setStorageSync("dialysisParam",{});
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
		font-size: 28rpx;
	}
	.form-prefix-space{
		justify-content: flex-start;
		padding-left: 0;
		width: 150rpx;
		height: 80rpx;
	}
	.form-cnt{
		margin-left: 10rpx;
		height: 80rpx;
		border-color: #C0C0C0;
	}
	.small-btn{
		border-radius: 20rpx;
		height: 60rpx;
		font-size: 28rpx;
	}
	.one-btn{
		margin-bottom: 20rpx;
	}
</style>
