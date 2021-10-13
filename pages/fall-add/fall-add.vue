<template>
	<view class="content">
		<form @submit="submit">
			<view class="form-item">
				<view class="form-prefix-space">
					<text>评估日期:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="date" @change="setDate($event)">
						<input class="form-mid-space" disabled="true" type="text" v-model="data.assess_date" name="usedate"/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>患者姓名:</text>
				</view>
				<view class="form-cnt form-mid-space2">
					<picker mode="selector" :range="patientListRange"  @change="setPatient">
						<input class="form-mid-space" disabled="true" type="text" v-model="data.patient_id + ' ' + data.patient_name" name="usedate" placeholder-style="font-size:28rpx;" placeholder="搜索患者"/>
					</picker>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name="usedate" placeholder="搜索患者"  placeholder-style="font-size:28rpx;" @input="inputChange"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>评估护士:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="nurseRange" @change="setNurse($event)">
						<input class="form-mid-space" disabled="true" type="text" v-model="data.assess_nurse_name" name="usedate"/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space2">
					<text>年龄评分:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box-column :radioList="ageList" @radioClick="setAge"></my-radio-box-column>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space2">
					<text>跌倒史评分:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box-column :radioList="fallList" @radioClick="setFall"></my-radio-box-column>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space2">
					<text>意识状况评分:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box-column :radioList="consciousList" @radioClick="setConcious"></my-radio-box-column>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space2">
					<text>活动情况评分:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box-column :radioList="moveList" @radioClick="setMove"></my-radio-box-column>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space2">
					<text>视力评分:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box-column :radioList="sightList" @radioClick="setSight"></my-radio-box-column>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space2">
					<text>疾病因素评分:低血压(包括体位性低血压), 眩晕症, 帕金森综合征, 癫痫, 贫血, 短暂性脑缺血发作(TIA), 关节炎</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box-column :radioList="diseaseList" @radioClick="setDisease"></my-radio-box-column>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space2">
					<text>药物因素评分:麻醉药物, 抗组胺类, 利尿剂, 降压药, 降糖药, 抗惊厥药物, 抗抑郁药物, 镇静催眠药物</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box-column :radioList="drugList" @radioClick="setDrug"></my-radio-box-column>
				</view>
			</view>
			<view class="rank-area">
				<text>风险等级:</text>
				<text>1-7分:低风险;</text>
				<text>8-14分:中风险;</text>
				<text>15-21分:高风险;</text>
			</view>
			<button class="one-btn btn-margin" form-type="submit">保存</button>
			<button class="err-btn" @click="toFallList">取消</button>
		</form>	
	</view>
</template>

<script>
	import Store from '../../common/store.js'
	import MyRadioBoxColumn from '../../components/my-radios-column.vue'
	
	export default {
		data() {
			return {
				userInfo:{},
				patientListInfo:[],
				patientListRange:[],
				nurseInfo:[],
				nurseRange:[],
				data:{
					assess_date:"",
					patient_name:"",
					patient_id:"",
					hemodialysis_id:"",
					age_score:"",
					fall_history_score:"",
					mobility_score:"",
					conscious_score:"",
					eyesight_score:"",
					disease_score:"",
					drug_score:"",
					assess_nurse_name:"",
					assess_nurse_id:"",
				},
				ageList:[
					{name:"0分 <65岁",check:false,value:'0'},
					{name:"1分 65-70岁",check:false,value:'1'},
					{name:"2分 71-79岁",check:false,value:'2'},
					{name:"3分 ≧80岁",check:false,value:'3'},
				],
				fallList:[
					{name:"0分 入院前一年内未跌倒",check:false,value:'0'},
					{name:"1分 入院前一年内跌倒过1次",check:false,value:'1'},
					{name:"2分 入院前一年内跌倒过2-3次",check:false,value:'2'},
					{name:"3分 入院前一年内跌倒过4次或以上",check:false,value:'3'},
				],
				consciousList:[
					{name:"0分 意识清醒",check:false,value:'0'},
					{name:"1分 昏睡或昏迷",check:false,value:'1'},
					{name:"2分 嗜睡",check:false,value:'2'},
					{name:"3分 意识模糊或反正不安或痴呆",check:false,value:'3'},
				],
				moveList:[
					{name:"0分 正常活动",check:false,value:'0'},
					{name:"1分 仅能床上活动",check:false,value:'1'},
					{name:"2分 行走需要帮助或使用辅助工具或步态紊乱",check:false,value:'2'},
					{name:"3分 站立时平衡障碍",check:false,value:'3'},
				],
				sightList:[
					{name:"0分 双眼矫正视力大于0.3",check:false,value:'0'},
					{name:"1分 单眼或双眼矫正视力小于0.3",check:false,value:'1'},
					{name:"2分 单盲",check:false,value:'2'},
					{name:"3分 双盲",check:false,value:'3'},
				],
				diseaseList:[
					{name:"0分 无前述疾病",check:false,value:'0'},
					{name:"1分 任意一种疾病",check:false,value:'1'},
					{name:"2分 任意两种疾病",check:false,value:'2'},
					{name:"3分 任意三种或以上疾病",check:false,value:'3'},
				],
				drugList:[
					{name:"0分 无用药",check:false,value:'0'},
					{name:"1分 任意一类药物",check:false,value:'1'},
					{name:"2分 任意两类药物",check:false,value:'2'},
					{name:"3分 任意三种或以上药物",check:false,value:'3'},
				],
			}
		},
		components:{
			MyRadioBoxColumn,
		},
		onLoad() {
			//获取user信息
			// this.userInfo = Store.getStorageSync("userInfo");
			// console.log("userinfo",this.userInfo);
			//获取默认患者列表
			this.searchPatient("");
			console.log("patientList",this.patientListInfo)
			console.log("patientRange",this.patientListRange)
			//获取护士列表
			this.nurseInfo = Store.getStorageSync("nurseInfo");
			this.nurseRange = [];
			if(Array.isArray(this.nurseInfo)){
				for (let j = 0; j < this.nurseInfo.length; j++) {
					this.nurseRange.push(this.nurseInfo[j].name);
				}
			}
			console.log("nurseInfo",this.nurseInfo)
			console.log("nurseRange",this.nurseRange)
		},
		methods: {
			//患者列表模糊搜索接口
			searchPatient(search){
				console.log("searchPatient")
				this.$myRequest({
					url:'/fallrisk/fuzzysearch',
					method:'POST',
					data:{
						"text": search,
					},
					success: (res) => {
						if(res.data.code == 200){
							console.log("模糊搜索列表",res.data.data)
							this.patientListInfo = [];
							this.patientListRange = [];
							this.patientListInfo = res.data.data;
							if(Array.isArray(this.patientListInfo)){
								for (let i = 0; i < this.patientListInfo.length; i++) {
									this.patientListRange.push(this.patientListInfo[i].name);
								}
							}
							console.log("patientListRange:",this.patientListRange)
							if(search !== ""){
								this.data.patient_id = this.patientListInfo[0].patient_id;
								this.data.patient_name = this.patientListInfo[0].name;
								this.data.hemodialysis_id = this.patientListInfo[0].hemodialysis_id;
							}
						}
					},
				});
			},
			//新增跌倒风险评估接口
			submitFallDetail(){
				console.log("submitFallDetail")
				this.$myRequest({
					url:'/fallrisk/new',
					method:'POST',
					data:{
						"assess_date":this.data.assess_date,
						"patient_name":this.data.patient_name,
						"hemodialysis_id":this.data.hemodialysis_id,
						"age_score":this.data.age_score,
						"fall_history_score":this.data.fall_history_score,
						"mobility_score":this.data.mobility_score,
						"conscious_score":this.data.conscious_score,
						"eyesight_score":this.data.eyesight_score,
						"disease_score":this.data.disease_score,
						"drug_score":this.data.drug_score,
						"assess_nurse_name":this.data.assess_nurse_name,
						"assess_nurse_id":this.data.assess_nurse_id,
					},
					success: (res) => {
						if(res.data.code == 200){
							console.log("添加跌倒风险评估",res.data.data);
							uni.showToast({
								title: '跌倒风险评估添加成功！',
								icon: 'none',
								mask: true
							});
						}
						else{
							uni.showToast({
								title: '跌倒风险评估添加失败！',
								icon: 'none',
								mask: true
							});
						}
					},
				});
			},
			//下拉框选择评估日期
			setDate(e){
				this.data.assess_date = e.detail.value;
			},
			//输入框进行缓则模糊搜索
			inputChange(e){
				this.data.patient_id = '';
				this.data.patient_name = '';
				console.log(e.detail.value)
				this.searchPatient(e.detail.value);
			},
			//输入框绑定患者信息
			setPatient(e){
				this.data.patient_name = this.patientListRange[e.detail.value];
				console.log(this.data.patient_name);
				console.log(this.patientListInfo)
				if(Array.isArray(this.patientListInfo)){
					for (let submit1 = 0; submit1 < this.patientListInfo.length; submit1++) {
						if(this.data.patient_name == this.patientListInfo[submit1].name){
							this.data.patient_id = this.patientListInfo[submit1].patient_id;
							this.data.hemodialysis_id =  this.patientListInfo[submit1].hemodialysis_id;
							break;
						}
					}
				}
			},
			//选择变更：评估护士
			setNurse(e){
				this.data.assess_nurse_name = this.nurseRange[e.detail.value];
				if(Array.isArray(this.nurseInfo)){
					for (let submit2 = 0; submit2 < this.nurseInfo.length; submit2++) {
						if(this.data.assess_nurse_name == this.nurseInfo[submit2].name){
							this.data.assess_nurse_id = this.nurseInfo[submit2].emp_no;
							break;
						}
					}
				}
			},
			//选择变更：年龄评分
			setAge(e){
				this.data.age_score = e;
			},
			//选择变更：跌倒史评分
			setFall(e){
				this.data.fall_history_score = e;
			},
			//选择变更：意识评分
			setConcious(e){
				this.data.conscious_score = e;
			},
			//选择变更：活动评分
			setMove(e){
				this.data.mobility_score = e;
			},
			//选择变更：视力评分
			setSight(e){
				this.data.eyesight_score = e;
			},
			//选择变更：疾病
			setDisease(e){
				this.data.disease_score = e;
			},
			//选择变更：用药评分
			setDrug(e){
				this.data.drug_score = e;
			},
			//新增跌倒风险评估按钮
			submit(){
				console.log(this.data);
				this.submitFallDetail()
			},
			//返回
			toFallList(){
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
	.form-prefix-space2{
		justify-content: flex-start;
		padding-left: 0;
		padding-right: 10rpx;
		width: 200rpx;
	}
	.form-cnt{
		margin-left: 10rpx;
		height: 60rpx;
		border-color: #C0C0C0;
	}
	.rank-area{
		display: flex;
		flex-direction: column;
		padding-top: 20rpx;
		padding-bottom: 40rpx;
		font-size: 24rpx;
	}
</style>
