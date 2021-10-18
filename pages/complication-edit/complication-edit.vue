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
					<input class="form-mid-space" v-model="complicationInfo.work_classnum" type="text" disabled="true" name=""/>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>护士:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<picker mode="selector" :range="nurseRange" @change="setNurse">
					<input class="form-mid-space" v-model="complicationInfo.nurse_name" type="text" disabled="true" name=""/>
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
				complicationInfo:{},
				complicationSubmitInfo:{
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
			//获取并发症详情
			this.complicationInfo = Store.getStorageSync("complicationItem")
			console.log("complicationInfo",this.complicationInfo)
			for(let b1 = 0; b1 < this.punctureMiss.length; b1++) {
				if(this.punctureMiss[b1].value == this.complicationInfo.ccsw){
					this.punctureMiss[b1].check = true;
				}
			}
			for(let b2 = 0; b2 < this.punctureSwell.length; b2++) {
				if(this.punctureSwell[b2].value == this.complicationInfo.cccsz){
					this.punctureSwell[b2].check = true;
				}
			}
			for(let b3 = 0; b3 < this.infection.length; b3++) {
				if(this.infection[b3].value == this.complicationInfo.xgtlgr){
					this.infection[b3].check = true;
				}
			}
			for(let b4 = 0; b4 < this.needleSlide.length; b4++) {
				if(this.needleSlide[b4].value == this.complicationInfo.ccztl){
					this.needleSlide[b4].check = true;
				}
			}
			for(let b5 = 0; b5 < this.kidneyFreeze.length; b5++) {
				if(this.kidneyFreeze[b5].value == this.complicationInfo.rgsng){
					this.kidneyFreeze[b5].check = true;
				}
			}
			for(let b6 = 0; b6 < this.kalium.length; b6++) {
				if(this.kalium[b6].value == this.complicationInfo.gxj){
					this.kalium[b6].check = true;
				}
			}
			for(let b7 = 0; b7 < this.bleed.length; b7++) {
				if(this.bleed[b7].value == this.complicationInfo.sx){
					this.bleed[b7].check = true;
				}
			}
			for(let b8 = 0; b8 < this.dialysisBreak.length; b8++) {
				if(this.dialysisBreak[b8].value == this.complicationInfo.txqpm){
					this.dialysisBreak[b8].check = true;
				}
			}
			for(let b9 = 0; b9 < this.evacuate.length; b9++) {
				if(this.evacuate[b9].value == this.complicationInfo.sypk){
					this.evacuate[b9].check = true;
				}
			}
			for(let b10 = 0; b10 < this.dizzy.length; b10++) {
				if(this.dizzy[b10].value == this.complicationInfo.tytt){
					this.dizzy[b10].check = true;
				}
			}
			for(let b11 = 0; b11 < this.nausea.length; b11++) {
				if(this.nausea[b11].value == this.complicationInfo.exot){
					this.nausea[b11].check = true;
				}
			}
			for(let b12 = 0; b12 < this.temperature.length; b12++) {
				if(this.temperature[b12].value == this.complicationInfo.twsg){
					this.temperature[b12].check = true;
				}
			}
			for(let b13 = 0; b13 < this.itchy.length; b13++) {
				if(this.itchy[b13].value == this.complicationInfo.pfsy){
					this.itchy[b13].check = true;
				}
			}
			for(let b14 = 0; b14 < this.allergy.length; b14++) {
				if(this.allergy[b14].value == this.complicationInfo.gm){
					this.allergy[b14].check = true;
				}
			}
			for(let b15 = 0; b15 < this.distress.length; b15++) {
				if(this.distress[b15].value == this.complicationInfo.xmxt){
					this.distress[b15].check = true;
				}
			}
			for(let b16 = 0; b16 < this.stomachache.length; b16++) {
				if(this.stomachache[b16].value == this.complicationInfo.ft){
					this.stomachache[b16].check = true;
				}
			}
			for(let b17 = 0; b17 < this.spasm.length; b17++) {
				if(this.spasm[b17].value == this.complicationInfo.jrjl){
					this.spasm[b17].check = true;
				}
			}
			for(let b18 = 0; b18 < this.glycopenia.length; b18++) {
				if(this.glycopenia[b18].value == this.complicationInfo.dxt){
					this.glycopenia[b18].check = true;
				}
			}
			for(let b19 = 0; b19 < this.lowPressure.length; b19++) {
				if(this.lowPressure[b19].value == this.complicationInfo.xyxjxk){
					this.lowPressure[b19].check = true;
				}
			}
			for(let b20 = 0; b20 < this.highPressure.length; b20++) {
				if(this.highPressure[b20].value == this.complicationInfo.xysg){
					this.highPressure[b20].check = true;
				}
			}
			for(let b21 = 0; b21 < this.arrhythmia.length; b21++) {
				if(this.arrhythmia[b21].value == this.complicationInfo.xlsc){
					this.arrhythmia[b21].check = true;
				}
			}
			for(let b22 = 0; b22 < this.heartFailure.length; b22++) {
				if(this.heartFailure[b22].value == this.complicationInfo.xs){
					this.heartFailure[b22].check = true;
				}
			}
			for(let b23 = 0; b23 < this.tic.length; b23++) {
				if(this.tic[b23].value == this.complicationInfo.cc){
					this.tic[b23].check = true;
				}
			}
			for(let b24 = 0; b24 < this.slowResponse.length; b24++) {
				if(this.slowResponse[b24].value == this.complicationInfo.ysfycd){
					this.slowResponse[b24].check = true;
				}
			}
			for(let b25 = 0; b25 < this.dehydration.length; b25++) {
				if(this.dehydration[b25].value == this.complicationInfo.tswz){
					this.dehydration[b25].check = true;
				}
			}
		},
		methods: {
			setDate(e){
				console.log(e)
				this.complicationInfo.work_date = e.detail.value;
			},
			setShift(e){
				console.log(e)
				this.complicationInfo.work_classnum = this.banciRange[e.detail.value]
				for(let i = 0; i < this.banciInfo.length; i++){
					if(this.banciInfo[i].item_name == this.banciRange[e.detail.value]){
						this.complicationSubmitInfo.shift = this.banciInfo[i].item_id;
						break;
					}
				}
			},
			setNurse(e){
				console.log(e)
				this.complicationInfo.nurse_name = this.nurseRange[e.detail.value]
				for(let j = 0; j < this.nurseInfo.length; j++){
					if(this.nurseInfo[j].name == this.nurseRange[e.detail.value]){
						this.complicationSubmitInfo.nurse = this.nurseInfo[j].emp_no;
						break;
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
				if(this.complicationSubmitInfo.shift == ""){
					for (let k = 0; k < this.banciInfo.length; k++) {
						if(this.banciInfo[k].item_name == this.complicationInfo.work_classnum){
							this.complicationSubmitInfo.shift = this.banciInfo[k].item_id;
							
						}
					}
				}
				if(this.complicationSubmitInfo.nurse == ""){
					this.complicationSubmitInfo.nurse = this.complicationInfo.nurse_id;
				}
				console.log("complicationInfo",this.complicationInfo)
				console.log("complicationSubmitInfo",this.complicationSubmitInfo)
				//修改并发症详情
				this.$myRequest({
					url:'/complication/updatecomplication',
					method:'POST',
					data:{
						id:this.complicationInfo.id,
						ccsw:this.complicationInfo.ccsw,
						cccsz:this.complicationInfo.cccsz,
						xgtlgr:this.complicationInfo.xgtlgr,
						ccztl:this.complicationInfo.ccztl,
						rgsng:this.complicationInfo.rgsng,
						gxj:this.complicationInfo.gxj,
						sx:this.complicationInfo.sx,
						txqpm:this.complicationInfo.txqpm,
						sypk:this.complicationInfo.sypk,
						tytt:this.complicationInfo.tytt,
						exot:this.complicationInfo.exot,
						twsg:this.complicationInfo.twsg,
						pfsy:this.complicationInfo.pfsy,
						gm:this.complicationInfo.gm,
						xmxt:this.complicationInfo.xmxt,
						ft:this.complicationInfo.ft,
						jrjl:this.complicationInfo.jrjl,
						dxt:this.complicationInfo.dxt,
						xyxjxk:this.complicationInfo.xyxjxk,
						xysg:this.complicationInfo.xysg,
						xlsc:this.complicationInfo.xlsc,
						xs:this.complicationInfo.xs,
						cc:this.complicationInfo.cc,
						ysfycd:this.complicationInfo.ysfycd,
						tswz:this.complicationInfo.tswz,
						work_date:this.complicationInfo.work_date,
						work_classnum:this.complicationSubmitInfo.shift,
						nurse_id:this.complicationSubmitInfo.nurse,
					},
					success: (res) => {
						if(res.data.code == 200){
							console.log("修改并发症",res.data.data)
							uni.showToast({
								title: "并发症记录修改成功!",
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
