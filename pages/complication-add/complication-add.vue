<template>
	<view class="content">
		<form @submit="submit">
			<view class="form-item">
				<view class="form-prefix-space">
					<text>日期:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="date" fields="day" @change="setDate($event)">
						<input class="form-mid-space" v-model="complicationInfo.work_date" type="text" disabled="true" name=""/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>班次:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="banciRange" @change="setShift">
					<input class="form-mid-space" v-model="complicationShowInfo.shift" type="text" disabled="true" name=""/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>护士:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="nurseRange" @change="setNurse">
					<input class="form-mid-space" v-model="complicationShowInfo.nurse" type="text" disabled="true" name=""/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>穿刺失误:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="punctureMiss" @radioClick="setRadioccsw"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>穿刺处血肿:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="punctureSwell" @radioClick="setRadiocccsz"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>血管通路感染、堵塞:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="infection" @radioClick="setRadioxgtlgr"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>穿刺针脱落或自拔:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="needleSlide" @radioClick="setRadioccztl"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>人工肾凝固:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="kidneyFreeze" @radioClick="setRadiorgsng"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>高血钾:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="kalium" @radioClick="setRadiogxj"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>失血:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="bleed" @radioClick="setRadiosx"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>透析器破膜:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="dialysisBreak" @radioClick="setRadiotxqpm"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>输液排空:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="evacuate" @radioClick="setRadiosypk"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>头晕、头痛:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="dizzy" @radioClick="setRadiotytt"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>恶心、呕吐:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="nausea" @radioClick="setRadioexot"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>体温升高:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="temperature" @radioClick="setRadiotwsg"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>皮肤瘙痒:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="itchy" @radioClick="setRadiopfsy"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>过敏:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="allergy" @radioClick="setRadiogm"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>胸闷、胸痛:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="distress" @radioClick="setRadioxmxt"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>腹痛:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="stomachache" @radioClick="setRadioft"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>肌肉痉挛:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="spasm" @radioClick="setRadiojrjl"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>低血糖:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="glycopenia" @radioClick="setRadiodxt"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>血压下降休克:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="lowPressure" @radioClick="setRadioxyxjxk"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>血压升高:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="highPressure" @radioClick="setRadioxysg"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>心律失常:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="arrhythmia" @radioClick="setRadioxlsc"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>心衰:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="heartFailure" @radioClick="setRadioxs"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>抽搐:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="tic" @radioClick="setRadiocc"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>意识反应迟钝:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="slowResponse" @radioClick="setRadioysfycd"></my-radio-box>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>脱水误差≧1Kg:</text>
				</view>
				<view class="form-mid-space">
					<my-radio-box :radioList="dehydration" @radioClick="setRadiotswz"></my-radio-box>
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
				patient:{},
				complicationInfo:{
					ccsw:"",
					cccsz:"",
					xgtlgr:"",
					ccztl:"",
					rgsng:"",
					gxj:"",
					sx:"",
					txqpm:"",
					sypk:"",
					tytt:"",
					exot:"",
					twsg:"",
					pfsy:"",
					gm:"",
					xmxt:"",
					ft:"",
					jrjl:"",
					dxt:"",
					xyxjxk:"",
					xysg:"",
					xlsc:"",
					xs:"",
					cc:"",
					ysfycd:"",
					tswz:"",
					work_date:"",
					work_classnum:"",
					hemodialysis_id:"",
					cure_id:"",
					nurse_id:"",
				},
				complicationShowInfo:{
					shift:"",
					nurse:"",
				},
				banciInfo:[],
				banciRange:[],
				nurseInfo:[],
				nurseRange:[],
				punctureMiss:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				punctureSwell:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				infection:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				needleSlide:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				kidneyFreeze:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				kalium:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				bleed:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				dialysisBreak:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				evacuate:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				dizzy:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				nausea:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				temperature:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				itchy:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				allergy:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				distress:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				stomachache:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				spasm:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				glycopenia:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				lowPressure:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				highPressure:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				arrhythmia:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				heartFailure:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				tic:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				slowResponse:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
				dehydration:[
					{name:"是",check:false,value:"是"},
					{name:"否",check:false,value:"否"},
				],
			}
		},
		components:{
			MyRadioBox
		},
		onLoad() {
			//获取患者信息
			this.patient = Store.getStorageSync("patient");
			console.log("patient",this.patient)
			this.complicationInfo.cure_id = this.patient.cure_id;
			this.complicationInfo.hemodialysis_id = this.patient.hemodialysis_id;
			//获取班次列表
			this.banciInfo = Store.getStorageSync("banciInfo");
			console.log("banciInfo",this.banciInfo)
			this.banciRange = Store.getStorageSync("banciRange");
			console.log("banciRange",this.banciRange)
			//获取护士列表
			this.nurseInfo = Store.getStorageSync("nurseInfo");
			this.nurseRange = [];
			if(Array.isArray(this.nurseInfo)){
				for (let a = 0; a < this.nurseInfo.length; a++) {
					this.nurseRange.push(this.nurseInfo[a].name);
				}
			}
			console.log("nurseInfo",this.nurseInfo)
			console.log("nurseRange",this.nurseRange)
		},
		methods: {
			setDate(e){
				console.log(e)
				this.complicationInfo.work_date = e.detail.value;
			},
			setShift(e){
				console.log(e)
				this.complicationShowInfo.shift = this.banciRange[e.detail.value]
				for(let i = 0; i < this.banciInfo.length; i++){
					if(this.banciInfo[i].item_name == this.banciRange[e.detail.value]){
						this.complicationInfo.work_classnum = this.banciInfo[i].item_id;
					}
				}
			},
			setNurse(e){
				console.log(e)
				this.complicationShowInfo.nurse = this.nurseRange[e.detail.value]
				for(let j = 0; j < this.nurseInfo.length; j++){
					if(this.nurseInfo[j].name == this.nurseRange[e.detail.value]){
						this.complicationInfo.nurse_id = this.nurseInfo[j].emp_no;
					}
				}
			},
			setRadioccsw(e){
				console.log("setRadioccsw",e)
				this.complicationInfo.ccsw = e;
			},
			setRadiocccsz(e){
				console.log("setRadiocccsz",e)
				this.complicationInfo.cccsz = e;
			},
			setRadioxgtlgr(e){
				console.log("setRadioxgtlgr",e)
				this.complicationInfo.xgtlgr = e;
			},
			setRadioccztl(e){
				console.log("setRadioccztl",e)
				this.complicationInfo.ccztl = e;
			},
			setRadiorgsng(e){
				console.log("setRadiorgsng",e)
				this.complicationInfo.rgsng = e;
			},
			setRadiogxj(e){
				console.log("setRadiogxj",e)
				this.complicationInfo.gxj = e;
			},
			setRadiosx(e){
				console.log("setRadiosx",e)
				this.complicationInfo.sx = e;
			},
			setRadiotxqpm(e){
				console.log("setRadiotxqpm",e)
				this.complicationInfo.txqpm = e;
			},
			setRadiosypk(e){
				console.log("setRadiosypk",e)
				this.complicationInfo.sypk = e;
			},
			setRadiotytt(e){
				console.log("setRadiotytt",e)
				this.complicationInfo.tytt = e;
			},
			setRadioexot(e){
				console.log("setRadioexot",e)
				this.complicationInfo.exot = e;
			},
			setRadiotwsg(e){
				console.log("setRadiotwsg",e)
				this.complicationInfo.twsg = e;
			},
			setRadiopfsy(e){
				console.log("setRadiopfsy",e)
				this.complicationInfo.pfsy = e;
			},
			setRadiogm(e){
				console.log("setRadiogm",e)
				this.complicationInfo.gm = e;
			},
			setRadioxmxt(e){
				console.log("setRadioxmxt",e)
				this.complicationInfo.xmxt = e;
			},
			setRadioft(e){
				console.log("setRadioft",e)
				this.complicationInfo.ft = e;
			},
			setRadiojrjl(e){
				console.log("setRadiojrjl",e)
				this.complicationInfo.jrjl = e;
			},
			setRadiodxt(e){
				console.log("setRadiodxt",e)
				this.complicationInfo.dxt = e;
			},
			setRadioxyxjxk(e){
				console.log("setRadioxyxjxk",e)
				this.complicationInfo.xyxjxk = e;
			},
			setRadioxysg(e){
				console.log("setRadioxysg",e)
				this.complicationInfo.xysg = e;
			},
			setRadioxlsc(e){
				console.log("setRadioxlsc",e)
				this.complicationInfo.xlsc = e;
			},
			setRadioxs(e){
				console.log("setRadioxs",e)
				this.complicationInfo.xs = e;
			},
			setRadiocc(e){
				console.log("setRadiocc",e)
				this.complicationInfo.cc = e;
			},
			setRadioysfycd(e){
				console.log("setRadioysfycd",e)
				this.complicationInfo.ysfycd = e;
			},
			setRadiotswz(e){
				console.log("setRadiotswz",e)
				this.complicationInfo.tswz = e;
			},
			submit(){
				console.log("complicationInfo",this.complicationInfo)
				console.log("complicationShowInfo",this.complicationShowInfo)
				//添加并发症详情
				this.$myRequest({
					url:'/complication/newcomplication',
					method:'POST',
					data:this.complicationInfo,
					success: (res) => {
						if(res.data.code == 200){
							console.log("新增并发症",res.data.data)
							uni.showToast({
								title: "并发症记录新增成功!",
								icon: 'none',
								mask: true
							});
						}
					},
				});
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
	.btn-margin{
		margin-bottom: 20rpx;
	}
</style>
