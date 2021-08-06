<template>
	<view>
		<uni-nav-bar class="nav-style" statusBar="true" fixed="true" left-icon="back" right-icon="loop" :title="patient.name" color="#ffffff" background-color="#51D3C7" @clickLeft="toPatientList" @clickRight="reflesh"></uni-nav-bar>
		<view class="test">
			0000
			<view @click="oneFun" v-show="testOne == false" class="test_one_k"></view>
			<view @click="oneFun" v-show="testOne == true" class="test_one_y"></view>
		</view>
		=====================
		<view class="">
			111
			<view >
				<view @click="TwoFun" v-show="testTwo == false" class="test_one_k"></view>
				<view @click="TwoFun" v-show="testTwo == true" class="test_one_y"></view>
			</view>
			111
			<view >
				<view @click="threeFun" v-show="testThree == false" class="test_one_k"></view>
				<view @click="threeFun" v-show="testThree == true" class="test_one_y"></view>
			</view>
			111
			<view >
				<view v-show="testFour == false" class="test_one_k"></view>
				<view v-show="testFour == true" class="test_one_y"></view>
			</view>
		</view>
		<view class="content">
			
			<form @submit="resetTreatInfo">
				<uni-segmented-control class="segment" :current="segCtrlSelected" :values="segCtrlItems"
					@clickItem="onClickItem" styleType="text" activeColor="#51D3C7"></uni-segmented-control>
				<view v-show="segCtrlSelected === 0">
					<view class="form-item">
						<view class="form-prefix-space">
							<text>上机前病情:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space2">
							<radio-group name="has_special_state" @change="showStatusInput" v-if="hackReset">
								<label v-for="(item,index) in info.status" class="radio-item" :key="item.value">
									<radio :value="item.value" :checked="index===info.statusChecked" color="#51D3C7"
										style="transform:scale(0.7)" />
									{{item.name}}
								</label>
							</radio-group>
						</view>
						<view class="form-cnt form-mid-space" v-show="statusInput">
							<input class="form-mid-space" v-model="dialysisInfo.special_state" type="text"
								placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>治疗时间:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="dialysisInfo.frequency_hours" type="text"
								placeholder="" />
							<text>h</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input type="text" v-model="dialysisInfo.frequency_minute" placeholder="" />
							<text>min</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>净化次数:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="dialysisInfo.clean_up_times" type="text"
								placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>治疗方式:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<picker mode="selector" name="treatmentitems" :range="treatmentRange"
								@change="setTreatment">
								<input class="form-mid-space" disabled="true" v-model="dialysisInfo.treatmentitems"
									type="text" placeholder="" />
							</picker>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>净化器类型:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<picker mode="selector" :range="fliterRange" @change="setFliter">
								<input class="form-mid-space" disabled="true" v-model="dialysisInfo.filter" type="text"
									placeholder="" />
							</picker>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>血管通路:</text>
						</view>
						<view class="form-cnt form-mid-space disable-style">
							<input class="form-mid-space" v-model="dialysisInfo.allvascularaccess" disabled="true"
								type="text" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>穿刺:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<radio-group name="chuanci_dunzhen" v-if="hackReset">
								<label v-for="(item,index) in info.puncture" class="radio-item">
									<radio v-model="item.value" :checked="index===info.punctureChecked" color="#51D3C7"
										style="transform:scale(0.7)" />
									{{item.name}}
								</label>
							</radio-group>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>方向:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<radio-group name="chuanci_fangxiang" v-if="hackReset">
								<label v-for="item in info.direction" class="radio-item">
									<radio v-model="item.value" :checked="item.checked" color="#51D3C7"
										style="transform:scale(0.7)" />
									{{item.name}}
								</label>
							</radio-group>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>体温℃:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="dialysisInfo.before_temperature" type="text"
								placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>脉搏(次/min):</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="dialysisInfo.before_bp" type="text" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>呼吸(次/min):</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="dialysisInfo.br" type="text" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>抗凝方式:</text>
						</view>
						<view class="form-cnt form-mid-space disable-style">
							<picker mode="selector" disabled="true" :range="bloodmethodRange" @change="setBloodmethod">
								<input class="form-mid-space" disabled="true" v-model="antiFreeze" type="text"
									placeholder="" />
							</picker>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>首剂:</text>
						</view>
						<view class="form-cnt form-mid-space disable-style">
							<input class="form-mid-space" disabled="true" v-model="dialysisInfo.first_drug_dosage"
								type="text" placeholder="" />
							<picker class="form-suffix-space" mode="selector" disabled="true" :range="drugunitRange"
								@change="setDoseRange1">
								<text class="suffix-text">{{dialysisInfo.first_drug_unit}}</text>
								<uni-icons type="arrowdown" color="#808080" size="20"></uni-icons>
							</picker>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>追加:</text>
						</view>
						<view class="form-cnt form-mid-space disable-style">
							<input class="form-mid-space" disabled="true" v-model="dialysisInfo.second_drug_dosage"
								type="text" placeholder="" />
							<picker class="form-suffix-space" mode="selector" disabled="true" :range="drugunitRange"
								@change="setDoseRange2">
								<text class="suffix-text">{{dialysisInfo.second_drug_unit}}</text>
								<uni-icons type="arrowdown" color="#808080" size="20"></uni-icons>
							</picker>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>钙mmol/L:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input type="text" v-model="dialysisInfo.calcium_ion" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>血流量ml/min:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input type="text" v-model="dialysisInfo.bloow_flow" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>透析液流量ml/h:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input type="text" v-model="dialysisInfo.dialysate_flow" placeholder="" />
						</view>
					</view>
				</view>
				<view v-show="segCtrlSelected === 1">
					<view class="form-item">
						<view class="form-prefix-space">
							<text>内瘘震颤:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<radio-group name="in_basket_wound_allergy" @change="setTremor"  v-if="hackReset">
								<label v-for="item in info.tremor" class="radio-item">
									<radio v-model="item.value" :checked="item.checked" color="#51D3C7"
										style="transform:scale(0.7)" />
									{{item.name}}
								</label>
							</radio-group>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>杂音:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<radio-group name="in_basket_plaster_allergy" @change="setNoise" v-if="hackReset">
								<label v-for="item in info.noise" class="radio-item">
									<radio v-model="item.value" :checked="item.checked" color="#51D3C7"
										style="transform:scale(0.7)" />
									{{item.name}}
								</label>
							</radio-group>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>红肿:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<radio-group name="in_basket_hongzhong" @change="setSwell" v-if="hackReset">
								<label v-for="item in info.swell" class="radio-item">
									<radio v-model="item.value" :checked="item.checked" color="#51D3C7"
										style="transform:scale(0.7)" />
									{{item.name}}
								</label>
							</radio-group>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>狭窄:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<radio-group name="in_basket_xiazhai" @change="setNarrow" v-if="hackReset">
								<label v-for="item in info.narrow" class="radio-item">
									<radio v-model="item.value" :checked="item.checked" color="#51D3C7"
										style="transform:scale(0.7)" />
									{{item.name}}
								</label>
							</radio-group>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>瘤样扩张:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<radio-group name="in_basket_liuyangkuozhang" @change="setExpand" v-if="hackReset">
								<label v-for="item in info.expand" class="radio-item">
									<radio v-model="item.value" :checked="item.checked" color="#51D3C7"
										style="transform:scale(0.7)" />
									{{item.name}}
								</label>
							</radio-group>
						</view>
					</view>
					medicare1
					<view class="form-item">
						<view class="form-prefix-space">
							<text>护理措施:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<checkbox-group name="huli" @change="setmedicare1" v-if="resetMed1">
								<label class="radio-item">
									<checkbox v-model="info.medicare1.value" :checked="info.medicare1.checked" color="#51D3C7" style="transform:scale(0.7)" />
									<text>{{info.medicare1.name}}</text>
								</label>
							</checkbox-group>
							<checkbox-group name="huli" @change="setmedicare2" v-if="resetMed2">
								<label v-for="item in info.medicare2" class="radio-item">
									<checkbox v-model="item.value" :checked="item.checked" color="#51D3C7" style="transform:scale(0.7)" />
									<text>{{item.name}}</text>
								</label>
							</checkbox-group>
							<!-- <checkbox-group name="huli" @change="setmedicare2" v-if="resetMed2">
								<label v-for="item in info.medicare2" class="radio-item">
									<checkbox v-model="item.value" :checked="item.checked" color="#51D3C7" style="transform:scale(0.7)" />
									<text>{{item.name}}</text>
								</label>
							</checkbox-group> -->
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>实际治疗时间:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.actual_cleanup_hour" type="text"
								placeholder="" />
							<text>h</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input type="text" v-model="treatStateInfo.actual_cleanup_minute" placeholder="" />
							<text>min</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>干体重Kg:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.dry_weight" type="text"
								placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>上次透后体重Kg:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.last_time_dry_weight" type="text"
								placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>透前体重Kg:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.before_dry_weight" type="text"
								placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<!-- 平车轮椅 -->
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<radio-group name="pcly" @change="setExpand" v-if="hackReset">
								<label v-for="item in info.transfer" class="radio-item">
									<radio v-model="item.value" :checked="item.checked" color="#51D3C7"
										style="transform:scale(0.7)" />
									{{item.name}}
								</label>
							</radio-group>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>体重增加Kg:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.dry_weight_tag" type="text"
								placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>较干体重增加Kg:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.dry_weight_add" type="text"
								placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>预计脱水Kg:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.ufr" type="text" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>透后体重Kg:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.after_dry_weight" type="text"
								placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>实际脱水Kg:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.dry_water_value" type="text"
								placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>期望体重下降量Kg:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.hope_weight_lose" type="text"
								placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>透前血压mmHg:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.before_systolic_pressure" type="text"
								placeholder="" />
						</view>
						<text>/</text>
						<view class="form-cnt form-mid-space">
							<input type="text" v-model="treatStateInfo.before_diastolic_pressure" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>透后血压mmHg:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.after_systolic_pressure" type="text"
								placeholder="" />
						</view>
						<text>/</text>
						<view class="form-cnt form-mid-space">
							<input type="text" v-model="treatStateInfo.after_diastolic_pressure" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>透后体温℃:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.after_temperature" type="text"
								placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>透后脉搏(次/min):</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.after_bp" type="text"
								placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>透后呼吸(次/min):</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.afterbr" type="text" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>置换液总量:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.actualdisplacement_liquid" type="text"
								placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>透析器凝血:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<radio-group name="coagulation_in_dialyser">
								<label v-for="item in info.cruor" class="radio-item">
									<radio v-model="item.value" :checked="item.checked" color="#51D3C7"
										style="transform:scale(0.7)" />
									{{item.name}}
								</label>
							</radio-group>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>责任医生:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<picker mode="selector" :range="doctorRange" @change="setDoctor">
								<input class="form-mid-space" v-model="treatStateInfo.primary_doctor" disabled="true"
									type="text" placeholder="" />
							</picker>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>责任护士:</text>
						</view>
						<view class="form-cnt form-mid-space" :class="{'disable-style' : nursePicker1}">
							<picker mode="selector" :disabled="nursePicker1" :range="nurseRange" @change="setNurese1">
								<input class="form-mid-space" v-model="treatStateInfo.primary_nurse" disabled="true"
									type="text" placeholder="" />
							</picker>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<button :class="nursePicker1 ?'one-btn small-btn':'err-btn small-btn'"
								@click="ableNurse1">修改签名</button>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>核对护士:</text>
						</view>
						<view
							:class="nursePicker2 ? 'form-cnt form-mid-space disable-style' :'form-cnt form-mid-space'">
							<picker mode="selector" :disabled="nursePicker2" :range="nurseRange" @change="setNurese2">
								<input class="form-mid-space" v-model="treatStateInfo.check_nurse" disabled="true"
									type="text" placeholder="" />
							</picker>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<button :class="nursePicker2 ?'one-btn small-btn':'err-btn small-btn'"
								@click="ableNurse2">修改签名</button>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>穿刺护士:</text>
						</view>
						<view class="form-cnt form-mid-space" :class="{'disable-style' : nursePicker3}">
							<picker mode="selector" :disabled="nursePicker3" :range="nurseRange" @change="setNurese3">
								<input class="form-mid-space" v-model="treatStateInfo.puncture_nurse" disabled="true"
									type="text" placeholder="" />
							</picker>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<button :class="nursePicker3 ?'one-btn small-btn':'err-btn small-btn'"
								@click="ableNurse3">修改签名</button>
						</view>
					</view>
					<button class="one-btn" form-type="submit">保存</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import Store from '../../common/store.js'
	import _ from "lodash"

	let infoInit = {
		status: [{name: '有',value: '1'}, {name: '无',value: '0'}, ],
		statusChecked: -1,
		puncture: [{name: '钝针',value: '0'}, {name: '锐针',value: '1'}],
		punctureChecked:-1,
		direction: [{name: '向心',checked: false,value: '0'}, {name: '离心',checked: false,value: '1'}],
		tremor: [{name: '强',checked: false,value: '0'}, {name: '中',checked: false,value: '1'}, {name: '弱',checked: false,value: '2'}, {name: '无',checked: false,value: '3'}, ],
		noise: [{name: '强',checked: false,value: '0'}, {name: '中',checked: false,value: '1'}, {name: '弱',checked: false,value: '2'}, {name: '无',checked: false,value: '3'}, ],
		swell: [{name: '有',checked: false,value: '0'}, {name: '无',checked: false,value: '1'}, ],
		narrow: [{name: '有',checked: false,value: '0'}, {name: '无',checked: false,value: '1'}, ],
		expand: [{name: '有',checked: false,value: '0'}, {name: '无',checked: false,value: '1'}, ],
		medicare1: {name: '无',checked: false,value: 'wu'},
		medicare2: [ {name: '无',checked: false,value: 'wu'},{name: '热敷',checked: false,value: 'refu'}, {name: '喜疗妥',checked: false,value: 'xiliaotuo'}, {name: '硫酸镁',checked: false,value: 'liusuanmei'}, ],
		transfer: [{name: '平车',checked: false,value: '0'}, {name: '轮椅',checked: false,value: '1'}, ],
		cruor: [{name: '0级',checked: false,value: '0'}, {name: '1级',checked: false,value: '1'}, {name: '2级',checked: false,value: '2'}, {name: '3级',checked: false,value: '3'}, ],
	}
	export default {
		data() {
			return {
				testOne: true,
				testTwo: false,
				testThree: false,
				testFour: false,
				
				
				hackReset:false,
				resetMed1:false,
				resetMed2:false,
				segCtrlItems: ['透析信息', '评估与治疗情况'],
				segCtrlSelected: 0,
				patient: {},
				date: "",
				statusInput: false,
				antiFreeze: "",
				treatmentRange: [],
				treatmentInfo: [],
				fliterRange: [],
				fliterInfo: [],
				bloodmethodRange: [],
				bloodmethodInfo: [],
				drugunitRange: [],
				drugunitInfo: [],
				doctorRange: [],
				doctorInfo: [],
				nurseRange: [],
				nurseInfo: [],
				nursePicker1: true,
				nursePicker2: true,
				nursePicker3: true,
				dialysisInfo: {},
				treatStateInfo: {},
				info: _.cloneDeep(infoInit),
				pickerInfo: {
					treatmentitems: "",
					filter: "",
					in_basket_hulirefu: "",
					in_basket_hulixiliaotuo: "",
					in_basket_huliliusuanmei: "",
					before_dry_weightpc: "",
					before_dry_weightly: "",
					primary_doctor: "",
					primary_nurse: "",
					check_nurse: "",
					puncture_nurse: "",
				}
			}
		},
		onShow: function() {
			this.hackReset = false;
			this.resetMed1 = false;
			this.resetMed2 = false;
			this.$nextTick(() => {
				this.hackReset = true;
				this.resetMed1 = true;
				console.log("setmed2刷新")
				this.resetMed2 = true;
			});
			this.patient = Store.getStorageSync("patient");
			console.log("patient:", this.patient);
			//在当前页从缓存中获取治疗方式
			this.treatmentInfo = Store.getStorageSync("treatmentInfo");
			for (let i = 0; i < this.treatmentInfo.length; i++) {
				this.treatmentRange.push(this.treatmentInfo[i].item_value);
			}
			//在当前页从缓存中获取净化器列表
			this.fliterInfo = Store.getStorageSync("fliterInfo");
			for (let i = 0; i < this.fliterInfo.length; i++) {
				this.fliterRange.push(this.fliterInfo[i].item_value);
			}
			//在当前页从缓存中获取抗凝方式列表
			this.bloodmethodInfo = Store.getStorageSync("bloodmethodInfo");
			for (let i = 0; i < this.bloodmethodInfo.length; i++) {
				this.bloodmethodRange.push(this.bloodmethodInfo[i].item_name);
			}
			//在当前页从缓存中获取药品单位列表
			this.drugunitInfo = Store.getStorageSync("drugunitInfo");
			for (let i = 0; i < this.drugunitInfo.length; i++) {
				this.drugunitRange.push(this.drugunitInfo[i].item_name);
			}
			//在当前页从缓存中获取医生列表和护士列表
			this.doctorInfo = Store.getStorageSync("doctorInfo");
			for (let i = 0; i < this.doctorInfo.length; i++) {
				this.doctorRange.push(this.doctorInfo[i].name);
			}
			this.nurseInfo = Store.getStorageSync("nurseInfo");
			for (let i = 0; i < this.nurseInfo.length; i++) {
				this.nurseRange.push(this.nurseInfo[i].name);
			}
			if (this.treatmentInfo == "error") {
				uni.showToast({
					title: '治疗方式请求失败',
					icon: 'none',
					mask: true
				});
			}
			if (this.fliterInfo == "error") {
				uni.showToast({
					title: '净化器列表请求失败',
					icon: 'none',
					mask: true
				});
			}
			if (this.bloodmethodInfo == "error") {
				uni.showToast({
					title: '抗凝方式列表请求失败',
					icon: 'none',
					mask: true
				});
			}
			if (this.drugunitInfo == "error") {
				uni.showToast({
					title: '药品单位列表请求失败',
					icon: 'none',
					mask: true
				});
			}
			if (this.nurseInfo == "error") {
				uni.showToast({
					title: '护士列表请求失败',
					icon: 'none',
					mask: true
				});
			}
			if (this.doctorInfo == "error") {
				uni.showToast({
					title: '医生列表请求失败',
					icon: 'none',
					mask: true
				});
			}
			this.getTreatInfo();
		},
		methods: {
			oneFun() {
				if(this.testOne){
					this.testTwo = false
					this.testThree = false
					this.testFour = false
				}else {
					this.testOne = !this.testOne
					this.testTwo = false
					this.testThree = false
					this.testFour = false
					
				}
			},
			TwoFun() {
				this.testOne = false
				this.testTwo = !this.testTwo
				this.checkBoxAllFun()
			},
			threeFun() {
				this.testOne = false
				this.testThree = !this.testThree
				this.checkBoxAllFun()
			},
			checkBoxAllFun() {
				if(!this.testTwo  && !this.testThree){
					this.testOne = true
				}
			},
			
			
			
			//页面tab切换
			onClickItem(e) {
				if (this.segCtrlSelected !== e.currentIndex) {
					this.segCtrlSelected = e.currentIndex;
				}
			},
			//导航返回按钮对应方法
			toPatientList() {
				uni.navigateTo({
					url: "../patient-list/patient-list",
				});
			},
			//导航刷新按钮对应方法
			reflesh() {
				uni.showToast({
					title: 'loading',
					icon: 'loading',
					mask: true
				});
				this.getTreatInfo();
			},
			//上机前病情input框
			showStatusInput(e){
				if(e.detail.value == "1"){
					this.statusInput = true;
				}
				else{
					this.statusInput = false;
					this.dialysisInfo.special_state = "";
				}
			},
			//下拉框选择治疗方式
			setTreatment(e) {
				this.dialysisInfo.treatmentitems = this.treatmentRange[e.detail.value];
				this.pickerInfo.treatmentitems = this.treatmentInfo[e.detail.value].item_id;
			},
			//下拉框选择净化器
			setFliter(e) {
				this.dialysisInfo.filter = this.fliterRange[e.detail.value];
				this.pickerInfo.filter = this.fliterInfo[e.detail.value].item_id;
			},
			//下拉框选择抗凝方式
			setBloodmethod(e) {},
			//下拉框选择首剂药品单位
			setDoseRange1(e) {
				this.dialysisInfo.first_drug_unit = this.drugunitRange[e.detail.value];
			},
			//下拉框选择追加药品单位
			setDoseRange2(e) {
				this.dialysisInfo.second_drug_unit = this.drugunitRange[e.detail.value];
			},
			//选择变更：内瘘震颤
			setTremor(e) {
				this.treatStateInfo.in_basket_wound_allergy = e.detail.value;
			},
			//选择变更：杂音
			setNoise(e) {
				this.treatStateInfo.in_basket_plaster_allergy = e.detail.value;
			},
			//选择变更：红肿
			setSwell(e) {
				this.treatStateInfo.in_basket_hongzhong = e.detail.value;
			},
			//选择变更：狭窄
			setNarrow(e) {
				this.treatStateInfo.in_basket_xiazhai = e.detail.value;
			},
			//选择变更：瘤样扩张
			setExpand(e) {
				this.treatStateInfo.in_basket_liuyangkuozhang = e.detail.value;
			},
			//选择变更：护理措施
			setmedicare1(e) {
				console.log("setmed1:::::",e);
				if(e.detail.value.length == 1){
					console.log("enter if 1");
					this.resetMed1 = false;
					this.resetMed2 = false;
					this.info.medicare2[0].checked = false;
					this.info.medicare2[1].checked = false;
					this.info.medicare2[2].checked = false;
					this.resetMed1 = true;
					this.resetMed2 = true;
				}
				// if(e.detail.value[0]="wu"){
				// 	this.hackReset = false;
				// 	console.log("enter if");
				// 	this.info.medicare[0].checked = true;
				// 	this.info.medicare[1].checked = false;
				// 	this.info.medicare[2].checked = false;
				// 	this.info.medicare[3].checked = false;
				// 	this.hackReset = true;
				// }
				// else{
				// 	this.info.medicare[0].checked = false;
				// 	for(let i = 0; i < e.detail.value.length; i++){
				// 		if(e.detail.value[i] == "refu"){
				// 			this.info.medicare[1].checked = true;
				// 		}
				// 		else if(e.detail.value[i] == "xiliaotuo"){
				// 			this.info.medicare[2].checked = true;
				// 		}
				// 		else if(e.detail.value[i] == "liusuanmei"){
				// 			this.info.medicare[3].checked = true;
				// 		}
				// 	}
				// }
			},
			setmedicare2(e) {
				// console.log("setmed2:::::",e);
				// let select = e.detail.value;
				// this.resetMed2 = false;
				// if(select.length>=0){
				// 	let findrefu = select.indexOf('refu');
				// 	if(findrefu > -1){
				// 		this.info.medicare2[0].checked = false;
				// 		this.info.medicare2[1].checked = true;
				// 	}
				// 	let findxiliaotuo = select.indexOf('xiliaotuo');
				// 	if(findxiliaotuo > -1){
				// 		this.info.medicare2[0].checked = false;
				// 		this.info.medicare2[2].checked = true;
				// 	}
				// 	let findliusuanmei = select.indexOf('liusuanmei');
				// 	if(findliusuanmei > -1){
				// 		this.info.medicare2[0].checked = false;
				// 		this.info.medicare2[3].checked = true;
				// 	}
				// 	if(findrefu == -1 && findxiliaotuo == -1 && findliusuanmei == -1){
				// 		this.info.medicare2[0].checked = true;
				// 	}
				// 	let findwu = select.indexOf('wu');
				// 	if(findwu > -1){
				// 		if(findrefu > -1 || findliusuanmei > -1 || findxiliaotuo > -1){
				// 			this.info.medicare2[0].checked = false;
				// 		}else if(findrefu > -1 || findliusuanmei > -1 || findxiliaotuo > -1){
							
				// 		}else{
				// 			this.info.medicare2[0].checked = true;
				// 		}
				// 		// this.info.medicare2[0].checked = true;
				// 		// this.info.medicare2[1].checked = false;
				// 		// this.info.medicare2[2].checked = false;
				// 		// this.info.medicare2[3].checked = false;
				// 	}
				// 	this.resetMed2 = true;
				// }
				console.log("setmed2:::::",e);
					if(e.detail.value.length != 0){
						console.log("enter if 2");
						this.resetMed1 = false;
						this.resetMed2 = false;
						this.info.medicare1.checked = false;
						this.resetMed1 = true;
						this.resetMed2 = true;
						console.log("enter if 22222",this.info.medicare1);
					}
			},
			// 	if(e.detail.value.length != 0){
			// 		console.log("enter if 2");
			// 		this.resetMed1 = false;
			// 		this.info.medicare1.checked = false;
			// 		this.resetMed1 = true;
			// 	}
			// },
			//下拉框选择医生
			setDoctor(e) {
				this.treatStateInfo.primary_doctor = this.doctorRange[e.detail.value];
				this.pickerInfo.primary_doctor = this.doctorInfo[e.detail.value].emp_no;
			},
			//责任护士修改按钮,解除禁用
			ableNurse1() {
				this.nursePicker1 = !this.nursePicker1;
			},
			//核对护士修改按钮,解除禁用
			ableNurse2() {
				this.nursePicker2 = !this.nursePicker2;
			},
			//穿刺护士修改按钮,解除禁用
			ableNurse3() {
				this.nursePicker3 = !this.nursePicker3;
			},
			//下拉框选择责任护士
			setNurese1(e) {
				this.treatStateInfo.primary_nurse = this.nurseRange[e.detail.value];
				this.pickerInfo.primary_nurse = this.nurseInfo[e.detail.value].emp_no;
			},
			//下拉框选择核对护士
			setNurese2(e) {
				this.treatStateInfo.check_nurse = this.nurseRange[e.detail.value];
				this.pickerInfo.check_nurse = this.nurseInfo[e.detail.value].emp_no;
			},
			//下拉框选择穿刺护士
			setNurese3(e) {
				this.treatStateInfo.puncture_nurse = this.nurseRange[e.detail.value];
				this.pickerInfo.puncture_nurse = this.nurseInfo[e.detail.value].emp_no;
			},
			//修改治疗信息
			resetTreatInfo(e) {
				console.log(e);
				//获取治疗方式id
				if (this.pickerInfo.treatmentitems == "") {
					for (let i = 0; i < this.treatmentInfo.length; i++) {
						if (this.treatmentInfo[i].item_name == this.dialysisInfo.treatmentitems) {
							this.pickerInfo.treatmentitems = this.treatmentInfo[i].item_id;
							break;
						}
					}
				}
				//获取净化器类型id
				if (this.pickerInfo.filter == "") {
					for (let i = 0; i < this.fliterInfo.length; i++) {
						if (this.fliterInfo[i].item_name == this.dialysisInfo.filter) {
							this.pickerInfo.filter = this.fliterInfo[i].item_id;
							break;
						}
					}
				}
				//获取护理措施状态值
				// this.pickerInfo.in_basket_hulirefu = "";
				// this.pickerInfo.in_basket_hulixiliaotuo = "";
				// this.pickerInfo.in_basket_huliliusuanmei = "";
				// for (let i = 0; i < e.detail.value.huli.length; i++) {
				// 	if (e.detail.value.huli[i] == "refu") {
				// 		this.pickerInfo.in_basket_hulirefu = "1";
				// 	} 
				// 	else if (e.detail.value.huli[i] == "xiliaotuo") {
				// 		this.pickerInfo.in_basket_hulixiliaotuo = "1";
				// 	} 
				// 	else if (e.detail.value.huli[i] == "liusuanmei") {
				// 		this.pickerInfo.in_basket_huliliusuanmei = "1";
				// 	}
				// }
				console.log("this.pickerInfo.in_basket_hulirefu",this.pickerInfo.in_basket_hulirefu);
				console.log("this.pickerInfo.in_basket_hulixiliaotuo",this.pickerInfo.in_basket_hulixiliaotuo);
				console.log("this.pickerInfo.in_basket_huliliusuanmei",this.pickerInfo.in_basket_huliliusuanmei);
				// //获取平车轮椅状态值
				if (e.detail.value.pcly == "0") {
					this.pickerInfo.before_dry_weightpc = "1";
				} else if (e.detail.value.pcly == "1") {
					this.pickerInfo.before_dry_weightly = "1";
				}
				//治疗信息修改提交
				this.$myRequest({
					url: '/patient/update/treat',
					method: 'POST',
					data: {
						"cure_id": this.patient.cure_id,
						"recipe_id": this.patient.recipe_id,
						"has_special_state": e.detail.value.has_special_state,
						"special_state": this.dialysisInfo.special_state,
						"frequency_hours": this.dialysisInfo.frequency_hours,
						"frequency_minute": this.dialysisInfo.frequency_minute,
						"clean_up_times": this.dialysisInfo.clean_up_times,
						"treatmentitems": this.pickerInfo.treatmentitems,
						"filter": this.pickerInfo.filter,
						"chuanci_dunzhen": e.detail.value.chuanci_dunzhen,
						"chuanci_fangxiang": e.detail.value.chuanci_fangxiang,
						"before_temperature": this.dialysisInfo.before_temperature,
						"before_bp": this.dialysisInfo.before_bp,
						"br": this.dialysisInfo.br,
						"calcium_ion": this.dialysisInfo.calcium_ion,
						"bloow_flow": this.dialysisInfo.bloow_flow,
						"dialysate_flow": this.dialysisInfo.dialysate_flow,
						"in_basket_wound_allergy": e.detail.value.in_basket_wound_allergy,
						"in_basket_plaster_allergy": e.detail.value.in_basket_plaster_allergy,
						"in_basket_hongzhong": e.detail.value.in_basket_hongzhong,
						"in_basket_xiazhai": e.detail.value.in_basket_xiazhai,
						"in_basket_liuyangkuozhang": e.detail.value.in_basket_liuyangkuozhang,
						"in_basket_hulirefu": this.pickerInfo.in_basket_hulirefu,
						"in_basket_hulixiliaotuo": this.pickerInfo.in_basket_hulixiliaotuo,
						"in_basket_huliliusuanmei": this.pickerInfo.in_basket_huliliusuanmei,
						"actual_cleanup_hour": this.treatStateInfo.actual_cleanup_hour,
						"actual_cleanup_minute": this.treatStateInfo.actual_cleanup_minute,
						"dry_weight": this.treatStateInfo.dry_weight,
						"last_time_dry_weight": this.treatStateInfo.dry_weight,
						"before_dry_weight": this.treatStateInfo.before_dry_weight,
						"before_dry_weightpc": this.pickerInfo.before_dry_weightpc,
						"before_dry_weightly": this.pickerInfo.before_dry_weightly,
						"dry_weight_tag": this.treatStateInfo.dry_weight_tag,
						"dry_weight_add": this.treatStateInfo.dry_weight_add,
						"ufr": this.treatStateInfo.ufr,
						"after_dry_weight": this.treatStateInfo.after_dry_weight,
						"dry_water_value": this.treatStateInfo.dry_water_value,
						"hope_weight_lose": this.treatStateInfo.hope_weight_lose,
						"before_systolic_pressure": this.treatStateInfo.before_systolic_pressure,
						"before_diastolic_pressure": this.treatStateInfo.before_diastolic_pressure,
						"after_systolic_pressure": this.treatStateInfo.after_systolic_pressure,
						"after_diastolic_pressure": this.treatStateInfo.after_diastolic_pressure,
						"after_temperature": this.treatStateInfo.after_temperature,
						"after_bp": this.treatStateInfo.after_bp,
						"afterbr": this.treatStateInfo.afterbr,
						"actualdisplacement_liquid": this.treatStateInfo.actualdisplacement_liquid,
						"coagulation_in_dialyser": e.detail.value.coagulation_in_dialyser,
						"primary_doctor": this.pickerInfo.primary_doctor,
						"primary_nurse": this.pickerInfo.primary_nurse,
						"check_nurse": this.pickerInfo.check_nurse,
						"puncture_nurse": this.pickerInfo.puncture_nurse,
					},
					success: (res) => {
						if (res.data.code == 200) {
							uni.showToast({
								title: '治疗信息修改成功',
								icon: 'none',
								mask: true
							});
						}
					},
				});
			},
			//获取患者治疗信息接口数据
			getTreatInfo(){
				//获取病人透析信息
				let searchInfo = Store.getStorageSync("searchInfo");
				this.date = searchInfo.date;
				this.$myRequest({
					url: '/patient/dialysisinfo',
					method: 'POST',
					data: {
						patient_id: this.patient.patient_id,
						date: this.date,
					},
					success: (res) => {
						if (res.data.code == 200) {
							console.log("透析信息:", res.data.data);
							this.dialysisInfo = res.data.data;
							//页面加载信息：上机前病情
							for (let i = 0; i < this.info.status.length; i++) {
								if (this.info.status[i].value == this.dialysisInfo.has_special_state) {
									this.info.statusChecked = i;
								}
							}
							if (this.dialysisInfo.has_special_state == "1") {
								this.statusInput = true;
							}
							else {
								this.statusInput = false;
							}
							//页面加载信息：穿刺
							for (let i = 0; i < this.info.puncture.length; i++) {
								if (this.info.puncture[i].value == this.dialysisInfo.chuanci_dunzhen) {
									this.info.punctureChecked = i;
								}
							}
							//页面加载信息：方向
							for (let i = 0; i < this.info.direction.length; i++) {
								if (this.info.direction[i].value == this.dialysisInfo
									.chuanci_fangxiang) {
									this.info.direction[i].checked = true;
								} else {
									this.info.direction[i].checked = false
								}
							}
							//页面加载信息：抗凝方式
							if (this.dialysisInfo.therapeutic_method != "") {
								for (let i = 0; i < this.bloodmethodInfo.length; i++) {
									if (this.dialysisInfo.therapeutic_method == this
										.bloodmethodInfo[i].item_id) {
										this.antiFreeze = this.bloodmethodInfo[i].item_name;
										break;
									}
								}
							}
						}
					},
				});
				//获取病人评估与治疗情况
				this.$myRequest({
					url: '/patient/treatstate',
					method: 'POST',
					data: {
						patient_id: this.patient.patient_id,
						date: this.date,
					},
					success: (res) => {
						if (res.data.code == 200) {
							console.log("病人评估与治疗情况:", res.data.data);
							this.treatStateInfo = _.cloneDeep(res.data.data);
							//页面加载信息：内瘘震颤
							for (let i = 0; i < this.info.tremor.length; i++) {
								if (this.info.tremor[i].value == this.treatStateInfo
									.in_basket_wound_allergy) {
									this.info.tremor[i].checked = true;
									break;
								}
							}
							//页面加载信息：杂音
							for (let i = 0; i < this.info.noise.length; i++) {
								if (this.info.noise[i].value == this.treatStateInfo
									.in_basket_plaster_allergy) {
									this.info.noise[i].checked = true;
									break;
								}
							}
							//页面加载信息：红肿
							for (let i = 0; i < this.info.swell.length; i++) {
								if (this.info.swell[i].value == this.treatStateInfo
									.in_basket_hongzhong) {
									this.info.swell[i].checked = true;
									break;
								}
							}
							//页面加载信息：狭窄
							for (let i = 0; i < this.info.narrow.length; i++) {
								if (this.info.narrow[i].value == this.treatStateInfo
									.in_basket_xiazhai) {
									this.info.narrow[i].checked = true;
									break;
								}
							}
							//页面加载信息：瘤样扩张
							for (let i = 0; i < this.info.expand.length; i++) {
								if (this.info.expand[i].value == this.treatStateInfo
									.in_basket_liuyangkuozhang) {
									this.info.expand[i].checked = true;
									break;
								}
							}
							// console.log("变更前",this.info.medicare);
							// if (this.treatStateInfo.in_basket_hulirefu == "" && this.treatStateInfo.in_basket_hulixiliaotuo == "" && this.treatStateInfo.in_basket_huliliusuanmei == "") {
							// 	this.info.medicare2[0].checked = true;
							// } 
							// else {
							// 	this.info.medicare2[0].checked = false;
							// 	if (this.treatStateInfo.in_basket_hulirefu == "1") {
							// 		this.info.medicare2[1].checked = true;
							// 	}
							// 	if (this.treatStateInfo.in_basket_hulixiliaotuo == "1") {
							// 		this.info.medicare2[2].checked = true;
							// 	}
							// 	if (this.treatStateInfo.in_basket_huliliusuanmei == "1") {
							// 		this.info.medicare2[3].checked = true;
							// 	}
							// 	console.log("变更后",this.info.medicare);
							// }
							//页面加载信息：护理措施
							if (this.treatStateInfo.in_basket_hulirefu == "" && this.treatStateInfo.in_basket_hulixiliaotuo == "" && this.treatStateInfo.in_basket_huliliusuanmei == "") {
								this.info.medicare1.checked = true;
							} 
							else {
								this.info.medicare1.checked = false;
								if (this.treatStateInfo.in_basket_hulirefu == "1") {
									this.info.medicare2[0].checked = true;
								}
								if (this.treatStateInfo.in_basket_hulixiliaotuo == "1") {
									this.info.medicare2[1].checked = true;
								}
								if (this.treatStateInfo.in_basket_huliliusuanmei == "1") {
									this.info.medicare2[2].checked = true;
								}
								console.log("medicare1：",this.info.medicare1);
								console.log("medicare2：",this.info.medicare2);
							}
							//页面加载信息：平车/轮椅
							if (this.treatStateInfo.before_dry_weightpc == "1") {
								this.info.transfer[0].checked = true;
							}
							if (this.treatStateInfo.before_dry_weightly == "1") {
								this.info.transfer[1].checked = true;
							}
							//页面加载信息：透析器凝血
							for (let i = 0; i < this.info.expand.length; i++) {
								if (this.info.cruor[i].value == this.treatStateInfo
									.coagulation_in_dialyser) {
									this.info.cruor[i].checked = true;
									break;
								}
							}
							//获取核对医生名称
							for (let i = 0; i < this.doctorInfo.length; i++) {
								if (this.doctorInfo[i].emp_no == this.treatStateInfo
									.primary_doctor) {
									this.pickerInfo.primary_doctor = this.treatStateInfo
										.primary_doctor;
									this.treatStateInfo.primary_doctor = this.doctorInfo[i].name;
									break;
								}
							}
							//获取核对护士名称
							for (let i = 0; i < this.nurseInfo.length; i++) {
								if (this.nurseInfo[i].emp_no == this.treatStateInfo
									.primary_nurse) {
									this.pickerInfo.primary_nurse = this.treatStateInfo
										.primary_nurse;
									this.treatStateInfo.primary_nurse = this.nurseInfo[i].name;
								}
								if (this.nurseInfo[i].emp_no == this.treatStateInfo.check_nurse) {
									this.pickerInfo.check_nurse = this.treatStateInfo.check_nurse;
									this.treatStateInfo.check_nurse = this.nurseInfo[i].name;
								}
								if (this.nurseInfo[i].emp_no == this.treatStateInfo
									.puncture_nurse) {
									this.pickerInfo.puncture_nurse = this.treatStateInfo
										.puncture_nurse;
									this.treatStateInfo.puncture_nurse = this.nurseInfo[i].name;
								}
							}
						}
					},
				});
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");
	
	.test_one_k {
		width: 20rpx;
		height: 20rpx;
		border: 3rpx solid blue;
	}
	.test_one_y {
		width: 20rpx;
		height: 20rpx;
		border: 3rpx solid red;
	}
	
	form {
		width: 100%;
	}

	.uni-navbar--border {
		border-bottom-color: #007AFF;
	}

	.segment {
		width: calc(100% - 40rpx);
	}

	.form-item {
		align-items: center;
		font-size: 28rpx;
	}

	.form-prefix-space {
		justify-content: flex-start;
		padding-left: 0;
		width: 150rpx;
		height: 80rpx;
	}

	.form-mid-space2 {
		padding: 0;
	}

	.form-cnt {
		margin-left: 10rpx;
		height: 80rpx;
		border-color: #C0C0C0;
	}

	.small-btn {
		border-radius: 20rpx;
		height: 60rpx;
		font-size: 28rpx;
	}
</style>
