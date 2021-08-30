<template>
	<view>
		<uni-nav-bar class="nav-style" statusBar="true" fixed="true" left-icon="back" right-icon="loop" :title="patient.name" color="#ffffff" background-color="#51D3C7" @clickLeft="toPatientList" @clickRight="reflesh"></uni-nav-bar>
		<view class="content">
			<form @submit="submitInfo">
				<uni-segmented-control v-show="segCtrlSelected === 0 || segCtrlSelected === 1" class="segment" :current="segCtrlSelected" :values="segCtrlItems" @clickItem="onClickItem" styleType="text" activeColor="#51D3C7"></uni-segmented-control>
				<view v-show="segCtrlSelected === 0">
					<view class="form-item">
						<view class="form-prefix-space">
							<text>上机前病情:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space2" style="margin-left: 10rpx;">
							<view class="my-radio" v-show="status1 === true" @click="setStatus1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="status1 === false" @click="setStatus1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="status2 === true" @click="setStatus2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="status2 === false" @click="setStatus2"></view>
							<text class="my-radio-cnt">无</text>
						</view>
						<view class="form-cnt form-mid-space" v-show="status1">
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
							<picker mode="selector" :range="treatmentRange" @change="setTreatment">
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
							<view class="my-radio" v-show="puncture1 === true" @click="setPuncture1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="puncture1 === false" @click="setPuncture1"></view>
							<text class="my-radio-cnt">钝针</text>
							
							<view class="my-radio" v-show="puncture2 === true" @click="setPuncture2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="puncture2 === false" @click="setPuncture2"></view>
							<text class="my-radio-cnt">锐针</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>方向:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="direction1 === true" @click="setDirection1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="direction1 === false" @click="setDirection1"></view>
							<text class="my-radio-cnt">向心</text>
							
							<view class="my-radio" v-show="direction2 === true" @click="setDirection2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="direction2 === false" @click="setDirection2"></view>
							<text class="my-radio-cnt">离心</text>
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
							<view class="my-radio" v-show="tremor1 === true" @click="setTremor1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="tremor1 === false" @click="setTremor1"></view>
							<text class="my-radio-cnt">强</text>
							
							<view class="my-radio" v-show="tremor2 === true" @click="setTremor2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="tremor2 === false" @click="setTremor2"></view>
							<text class="my-radio-cnt">中</text>
							
							<view class="my-radio" v-show="tremor3 === true" @click="setTremor3">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="tremor3 === false" @click="setTremor3"></view>
							<text class="my-radio-cnt">弱</text>
							
							<view class="my-radio" v-show="tremor4 === true" @click="setTremor4">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="tremor4 === false" @click="setTremor4"></view>
							<text class="my-radio-cnt">无</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>杂音:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="noise1 === true" @click="setNoise1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="noise1 === false" @click="setNoise1"></view>
							<text class="my-radio-cnt">强</text>
							
							<view class="my-radio" v-show="noise2 === true" @click="setNoise2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="noise2 === false" @click="setNoise2"></view>
							<text class="my-radio-cnt">中</text>
							
							<view class="my-radio" v-show="noise3 === true" @click="setNoise3">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="noise3 === false" @click="setNoise3"></view>
							<text class="my-radio-cnt">弱</text>
							
							<view class="my-radio" v-show="noise4 === true" @click="setNoise4">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="noise4 === false" @click="setNoise4"></view>
							<text class="my-radio-cnt">无</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>红肿:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="swell1 === true" @click="setSwell1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="swell1 === false" @click="setSwell1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="swell2 === true" @click="setSwell2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="swell2 === false" @click="setSwell2"></view>
							<text class="my-radio-cnt">无</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>狭窄:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="narrow1 === true" @click="setNarrow1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="narrow1 === false" @click="setNarrow1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="narrow2 === true" @click="setNarrow2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="narrow2 === false" @click="setNarrow2"></view>
							<text class="my-radio-cnt">无</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>瘤样扩张:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="expand1 === true" @click="setExpand1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="expand1 === false" @click="setExpand1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="expand2 === true" @click="setExpand2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="expand2 === false" @click="setExpand2"></view>
							<text class="my-radio-cnt">无</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>护理措施:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-checkbox" v-show="check1 === true" @click="setCheck1">
								<image src="../../static/checkpic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-checkbox" v-show="check1 === false" @click="setCheck1"></view>
							<text class="my-checkbox-cnt">无</text>
							
							<view class="my-checkbox" v-show="check2 === true" @click="setCheck2">
								<image src="../../static/checkpic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-checkbox" v-show="check2 === false" @click="setCheck2"></view>
							<text class="my-checkbox-cnt">热敷</text>
							
							<view class="my-checkbox" v-show="check3 === true" @click="setCheck3">
								<image src="../../static/checkpic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-checkbox" v-show="check3 === false" @click="setCheck3"></view>
							<text class="my-checkbox-cnt">喜疗妥</text>
							
							<view class="my-checkbox" v-show="check4 === true" @click="setCheck4">
								<image src="../../static/checkpic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-checkbox" v-show="check4 === false" @click="setCheck4"></view>
							<text class="my-checkbox-cnt">硫酸镁</text>
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
							<view class="my-radio" v-show="radio1 === true" @click="setRadio1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="radio1 === false" @click="setRadio1"></view>
							<text class="my-radio-cnt">平车</text>
							
							<view class="my-radio" v-show="radio2 === true" @click="setRadio2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="radio2 === false" @click="setRadio2"></view>
							<text class="my-radio-cnt">轮椅</text>
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
							<view class="my-radio" v-show="cruor1 === true" @click="setCruor1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="cruor1 === false" @click="setCruor1"></view>
							<text class="my-radio-cnt">0级</text>
							
							<view class="my-radio" v-show="cruor2 === true" @click="setCruor2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="cruor2 === false" @click="setCruor2"></view>
							<text class="my-radio-cnt">1级</text>
							
							<view class="my-radio" v-show="cruor3 === true" @click="setCruor3">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="cruor3 === false" @click="setCruor3"></view>
							<text class="my-radio-cnt">2级</text>
							
							<view class="my-radio" v-show="cruor4 === true" @click="setCruor4">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="cruor4 === false" @click="setCruor4"></view>
							<text class="my-radio-cnt">3级</text>
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
				<uni-segmented-control v-show="segCtrlSelected === 2 || segCtrlSelected === 3" class="segment" :current="segCtrlSelected - 2" :values="segCtrlItems" @clickItem="onClickItem2" styleType="text" activeColor="#51D3C7"></uni-segmented-control>
				<view v-show="segCtrlSelected === 2">
					<view class="form-item">
						<view class="form-prefix-space">
							<text>上机前病情:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space2" style="margin-left: 10rpx;">
							<view class="my-radio" v-show="status1 === true" @click="setStatus1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="status1 === false" @click="setStatus1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="status2 === true" @click="setStatus2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="status2 === false" @click="setStatus2"></view>
							<text class="my-radio-cnt">无</text>
						</view>
						<view class="form-cnt form-mid-space" v-show="status1">
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
							<picker mode="selector" :range="treatmentRange"
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
				<view v-show="segCtrlSelected === 3">
					<view class="form-item">
						<view class="form-prefix-space">
							<text>置管时间:</text>
						</view>
						<view class="form-cnt form-mid-space disable-style">
							<picker mode="time" disabled="true">
								<input class="form-mid-space" type="text" v-model="treatStateInfo.zhiguan_date" disabled="true" placeholder=""/>
							</picker>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>外露:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.in_basket_vascular_other" type="text" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space add-margin">
							<text>外移:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" type="text" v-model="treatStateInfo.daoguan_waiyi" placeholder="" />
						</view>
					</view>
						<view class="form-item">
						<view class="form-prefix-space">
							<text>固定牢固:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="fixed1 === true" @click="setFixed1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="fixed1 === false" @click="setFixed1"></view>
							<text class="my-radio-cnt">是</text>
							
							<view class="my-radio" v-show="fixed2 === true" @click="setFixed2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="fixed2 === false" @click="setFixed2"></view>
							<text class="my-radio-cnt">否</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>滑脱:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="slide1 === true" @click="setSlide1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="slide1 === false" @click="setSlide1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="slide2 === true" @click="setSlide2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="slide2 === false" @click="setSlide2"></view>
							<text class="my-radio-cnt">无</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>敷料:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-checkbox" v-show="dressing1 === true" @click="setDressing1">
								<image src="../../static/checkpic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-checkbox" v-show="dressing1 === false" @click="setDressing1"></view>
							<text class="my-checkbox-cnt">干燥完好</text>
							
							<view class="my-checkbox" v-show="dressing2 === true" @click="setDressing2">
								<image src="../../static/checkpic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-checkbox" v-show="dressing2 === false" @click="setDressing2"></view>
							<text class="my-checkbox-cnt">贴敷不紧密</text>
							
							<view class="my-checkbox" v-show="dressing3 === true" @click="setDressing3">
								<image src="../../static/checkpic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-checkbox" v-show="dressing3 === false" @click="setDressing3"></view>
							<text class="my-checkbox-cnt">缺失</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>置管口红肿:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="pipeSwell1 === true" @click="setPipeSwell1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="pipeSwell1 === false" @click="setPipeSwell1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="pipeSwell2 === true" @click="setPipeSwell2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="pipeSwell2 === false" @click="setPipeSwell2"></view>
							<text class="my-radio-cnt">无</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>渗血:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="bleedBlood1 === true" @click="setBleedBlood1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="bleedBlood1 === false" @click="setBleedBlood1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="bleedBlood2 === true" @click="setBleedBlood2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="bleedBlood2 === false" @click="setBleedBlood2"></view>
							<text class="my-radio-cnt">无</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>渗液:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="bleedLiquid1 === true" @click="setBleedLiquid1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="bleedLiquid1 === false" @click="setBleedLiquid1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="bleedLiquid2 === true" @click="setBleedLiquid2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="bleedLiquid2 === false" @click="setBleedLiquid2"></view>
							<text class="my-radio-cnt">无</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>血栓:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="thrombus1 === true" @click="setThrombus1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="thrombus1 === false" @click="setThrombus1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="thrombus2 === true" @click="setThrombus2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="thrombus2 === false" @click="setThrombus2"></view>
							<text class="my-radio-cnt">无</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>导管情况:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-checkbox" v-show="pipeStatus1 === true" @click="setPipeStatus1">
								<image src="../../static/checkpic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-checkbox" v-show="pipeStatus1 === false" @click="setPipeStatus1"></view>
							<text class="my-checkbox-cnt">通畅</text>
							
							<view class="my-checkbox" v-show="pipeStatus2 === true" @click="setPipeStatus2">
								<image src="../../static/checkpic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-checkbox" v-show="pipeStatus2 === false" @click="setPipeStatus2"></view>
							<text class="my-checkbox-cnt">动脉困难</text>
							
							<view class="my-checkbox" v-show="pipeStatus3 === true" @click="setPipeStatus3">
								<image src="../../static/checkpic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-checkbox" v-show="pipeStatus3 === false" @click="setPipeStatus3"></view>
							<text class="my-checkbox-cnt">静脉困难</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>溶栓:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="thrombolysis1 === true" @click="setThrombolysis1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="thrombolysis1 === false" @click="setThrombolysis1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="thrombolysis2 === true" @click="setThrombolysis2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="thrombolysis2 === false" @click="setThrombolysis2"></view>
							<text class="my-radio-cnt">无</text>
						</view>
					</view>					
					<view class="form-item">
						<view class="form-prefix-space">
							<text>对接方式:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="joinWay1 === true" @click="setJoinWay1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="joinWay1 === false" @click="setJoinWay1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="joinWay2 === true" @click="setJoinWay2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="joinWay2 === false" @click="setJoinWay2"></view>
							<text class="my-radio-cnt">无</text>
						</view>
					</view>	
					<view class="form-item">
						<view class="form-prefix-space">
							<text>血流感染:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="bleedInfection1 === true" @click="setBleedInfection1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="bleedInfection1 === false" @click="setBleedInfection1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="bleedInfection2 === true" @click="setBleedInfection2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="bleedInfection2 === false" @click="setBleedInfection2"></view>
							<text class="my-radio-cnt">无</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>使用抗生素:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="antibiotic1 === true" @click="setAntibiotic1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="antibiotic1 === false" @click="setAntibiotic1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="antibiotic2 === true" @click="setAntibiotic2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="antibiotic2 === false" @click="setAntibiotic2"></view>
							<text class="my-radio-cnt">无</text>
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>宣教指导:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="guide1 === true" @click="setGuide1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="guide1 === false" @click="setGuide1"></view>
							<text class="my-radio-cnt">有</text>
							
							<view class="my-radio" v-show="guide2 === true" @click="setGuide2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="guide2 === false" @click="setGuide2"></view>
							<text class="my-radio-cnt">无</text>
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
							<view class="my-radio" v-show="radio1 === true" @click="setRadio1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="radio1 === false" @click="setRadio1"></view>
							<text class="my-radio-cnt">平车</text>
							
							<view class="my-radio" v-show="radio2 === true" @click="setRadio2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="radio2 === false" @click="setRadio2"></view>
							<text class="my-radio-cnt">轮椅</text>
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
							<input class="form-mid-space" v-model="treatStateInfo.after_dry_weight" type="text" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>实际脱水Kg:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.dry_water_value" type="text" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>期望体重下降量Kg:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.hope_weight_lose" type="text" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>透前血压mmHg:</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.before_systolic_pressure" type="text" placeholder="" />
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
							<input class="form-mid-space" v-model="treatStateInfo.after_systolic_pressure" type="text"placeholder="" />
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
							<input class="form-mid-space" v-model="treatStateInfo.after_temperature" type="text" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>透后脉搏(次/min):</text>
						</view>
						<view class="form-cnt form-mid-space">
							<input class="form-mid-space" v-model="treatStateInfo.after_bp" type="text" placeholder="" />
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
							<input class="form-mid-space" v-model="treatStateInfo.actualdisplacement_liquid" type="text" placeholder="" />
						</view>
					</view>
					<view class="form-item">
						<view class="form-prefix-space">
							<text>透析器凝血:</text>
						</view>
						<view class="form-cnt-noborder form-mid-space">
							<view class="my-radio" v-show="cruor1 === true" @click="setCruor1">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="cruor1 === false" @click="setCruor1"></view>
							<text class="my-radio-cnt">0级</text>
							
							<view class="my-radio" v-show="cruor2 === true" @click="setCruor2">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="cruor2 === false" @click="setCruor2"></view>
							<text class="my-radio-cnt">1级</text>
							
							<view class="my-radio" v-show="cruor3 === true" @click="setCruor3">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="cruor3 === false" @click="setCruor3"></view>
							<text class="my-radio-cnt">2级</text>
							
							<view class="my-radio" v-show="cruor4 === true" @click="setCruor4">
								<image src="../../static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
							<view class="my-radio" v-show="cruor4 === false" @click="setCruor4"></view>
							<text class="my-radio-cnt">3级</text>
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
		cruor: [{name: '0级',checked: false,value: '0'}, {name: '1级',checked: false,value: '1'}, {name: '2级',checked: false,value: '2'}, {name: '3级',checked: false,value: '3'}, ],
		fixed: [{name: '是',checked: false,value: '1'}, {name: '否',checked: false,value: '0'}, ],
		slide: [{name: '有',checked: false,value: '1'}, {name: '无',checked: false,value: '0'}, ],
		dressing: [{name: '干燥完好',checked: false,value: '0'}, {name: '贴敷不紧密',checked: false,value: '1'},{name: '缺失',checked: false,value: '2'}, ],
		pipeSwell: [{name: '有',checked: false,value: '1'}, {name: '无',checked: false,value: '0'}, ],
		bleedBlood: [{name: '有',checked: false,value: '1'}, {name: '无',checked: false,value: '0'}, ],
		bleedLiquid: [{name: '有',checked: false,value: '1'}, {name: '无',checked: false,value: '0'}, ],
		thrombus: [{name: '有',checked: false,value: '1'}, {name: '无',checked: false,value: '0'}, ],
		pipeStatus: [{name: '畅通',checked: false,value: '0'}, {name: '动脉困难',checked: false,value: '1'}, {name: '静脉困难',checked: false,value: '2'}, ],
		thrombolysis: [{name: '有',checked: false,value: '1'}, {name: '无',checked: false,value: '0'}, ],
		joinWay: [{name: '正接',checked: false,value: '0'}, {name: '反接',checked: false,value: '1'}, ],
		bleedInfection: [{name: '有',checked: false,value: '1'}, {name: '无',checked: false,value: '0'}, ],
		antibiotic: [{name: '有',checked: false,value: '1'}, {name: '无',checked: false,value: '0'}, ],
		guide: [{name: '有',checked: false,value: '1'}, {name: '无',checked: false,value: '0'}, ],
	}
	export default {
		data() {
			return {
				//0内瘘 1置管
				infoType: -1,
				hackReset:false,
				segCtrlItems: ['透析信息', '评估与治疗情况'],
				segCtrlSelected: -1,
				status1: false,
				status2: false,
				puncture1: false,
				puncture2: false,
				direction1: false,
				direction2: false,
				tremor1: false,
				tremor2: false,
				tremor3: false,
				tremor4: false,
				noise1: false,
				noise2: false,
				noise3: false,
				noise4: false,
				swell1: false,
				swell2: false,
				narrow1: false,
				narrow2: false,
				expand1: false,
				expand2: false,
				cruor1: false,
				cruor2: false,
				cruor3: false,
				cruor4: false,
				check1: false,
				check2: false,
				check3: false,
				check4: false,
				radio1: false,
				radio2: false,
				fixed1: false,
				fixed2: false,
				slide1: false,
				slide2: false,
				pipeSwell1: false,
				pipeSwell2: false,
				bleedBlood1: false,
				bleedBlood2: false,
				bleedLiquid1: false,
				bleedLiquid2: false,
				thrombus1: false,
				thrombus2: false,
				thrombolysis1: false,
				thrombolysis2: false,
				joinWay1: false,
				joinWay2: false,
				bleedInfection1: false,
				bleedInfection2: false,
				antibiotic1: false,
				antibiotic2: false,
				guide1: false,
				guide2: false,
				dressing1: false,
				dressing2: false,
				dressing3: false,
				pipeStatus1: false,
				pipeStatus2: false,
				pipeStatus3: false,
				patient: {},
				date: "",
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
					primary_doctor: "",
					primary_nurse: "",
					check_nurse: "",
					puncture_nurse: "",
				},
				temp: {
					pipeTime:"",	
				}
			}
		},
		onShow: function() {
			try{
				this.dialysisInfo = {};
				this.treatStateInfo = {};
				this.status1 = false
				this.status2 = false
				this.puncture1 = false
				this.puncture2 = false
				this.direction1 = false
				this.direction2 = false
				this.tremor1 = false
				this.tremor2 = false
				this.tremor3 = false
				this.tremor4 = false
				this.noise1 = false
				this.noise2 = false
				this.noise3 = false
				this.noise4 = false
				this.swell1 = false
				this.swell2 = false
				this.narrow1 = false
				this.narrow2 = false
				this.expand1 = false
				this.expand2 = false
				this.cruor1 = false
				this.cruor2 = false
				this.cruor3 = false
				this.cruor4 = false
				this.check1 = false
				this.check2 = false
				this.check3 = false
				this.check4 = false
				this.radio1 = false
				this.radio2 = false
				this.fixed1 = false
				this.fixed2 = false
				this.slide1 = false
				this.slide2 = false
				this.pipeSwell1 = false
				this.pipeSwell2 = false
				this.bleedBlood1 = false
				this.bleedBlood2 = false
				this.bleedLiquid1 = false
				this.bleedLiquid2 = false
				this.thrombus1 = false
				this.thrombus2 = false
				this.thrombolysis1 = false
				this.thrombolysis2 = false
				this.joinWay1 = false
				this.joinWay2 = false
				this.bleedInfection1 = false
				this.bleedInfection2 = false
				this.antibiotic1 = false
				this.antibiotic2 = false
				this.guide1 = false
				this.guide2 = false
				this.dressing1 = false
				this.dressing2 = false
				this.dressing3 = false
				this.pipeStatus1 = false
				this.pipeStatus2 = false
				this.pipeStatus3 = false
				this.hackReset = false
				this.$nextTick(() => {
					this.hackReset = true;
				});
				
				//获取时间
				let searchInfo = Store.getStorageSync("searchInfo");
				this.date = searchInfo.date;
				//判断病人的类型：置管or内瘘
				this.patient = Store.getStorageSync("patient");
				let tempType = this.patient.vascularaccess.indexOf("内瘘");
				//控制置管tab页
				if(tempType == -1){
					this.infoType = 1;
					this.segCtrlSelected = 2;
				}
				//控制内瘘tab页
				else{
					this.infoType = 0;
					this.segCtrlSelected = 0;
				}
				//数据清理
				this.treatmentRange = [];
				this.fliterRange = [];
				this.bloodmethodRange = [];
				this.drugunitRange = [];
				this.drugunitRange = [];
				this.doctorRange = [];
				this.nurseRange = [];
				//在当前页从缓存中获取治疗方式
				this.treatmentInfo = Store.getStorageSync("treatmentInfo");
				if(Array.isArray(this.treatmentInfo)){
					for (let i = 0; i < this.treatmentInfo.length; i++) {
						this.treatmentRange.push(this.treatmentInfo[i].item_value);
					}
				}
				//在当前页从缓存中获取净化器列表
				this.fliterInfo = Store.getStorageSync("fliterInfo");
				if(Array.isArray(this.fliterInfo)){
					for (let i = 0; i < this.fliterInfo.length; i++) {
						this.fliterRange.push(this.fliterInfo[i].item_value);
					}
				}
				//在当前页从缓存中获取抗凝方式列表
				this.bloodmethodInfo = Store.getStorageSync("bloodmethodInfo");
				if(Array.isArray(this.bloodmethodInfo)){
					for (let i = 0; i < this.bloodmethodInfo.length; i++) {
						this.bloodmethodRange.push(this.bloodmethodInfo[i].item_name);
					}
				}
				//在当前页从缓存中获取药品单位列表
				this.drugunitInfo = Store.getStorageSync("drugunitInfo");
				if(Array.isArray(this.drugunitInfo)){
					for (let i = 0; i < this.drugunitInfo.length; i++) {
						this.drugunitRange.push(this.drugunitInfo[i].item_name);
					}
				}
				//在当前页从缓存中获取医生列表和护士列表
				this.doctorInfo = Store.getStorageSync("doctorInfo");
				if(Array.isArray(this.doctorInfo)){
					for (let i = 0; i < this.doctorInfo.length; i++) {
						this.doctorRange.push(this.doctorInfo[i].name);
					}
				}
				this.nurseInfo = Store.getStorageSync("nurseInfo");
				if(Array.isArray(this.nurseInfo)){
					for (let i = 0; i < this.nurseInfo.length; i++) {
						this.nurseRange.push(this.nurseInfo[i].name);
					}
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
				//获取透析信息数据
				this.getDialysisInfo();
				//判断类型获取治疗与评估状况数据
				if(this.infoType == 0){
					this.getTreatInfo();
				}
				else if(this.infoType == 1){
					this.getTreatInfoZG();
				}
				this.$forceUpdate()
			}catch(e){
			}
		},
		onHide() {
			this.infoType = -1;
			this.segCtrlSelected = -1;
			this.hackReset = false;
			this.$nextTick(() => {
				this.hackReset = true;
			});
		},
		methods: {
			//页面tab切换
			onClickItem(e) {
				if (this.segCtrlSelected !== e.currentIndex) {
					this.segCtrlSelected = e.currentIndex;
				}
			},
			//页面tab切换
			onClickItem2(e) {
				if (this.segCtrlSelected !== e.currentIndex+2) {
					this.segCtrlSelected = e.currentIndex+2;
				}
			},
			//导航返回按钮对应方法
			toPatientList() {
				uni.navigateTo({
					url: "../patient-list/patient-list",
				});
				this.infoType = -1;
				this.segCtrlSelected = -1;
				this.hackReset = false;
				this.$nextTick(() => {
					this.hackReset = true;
				});
			},
			//导航刷新按钮对应方法
			reflesh() {
				uni.showToast({
					title: 'loading',
					icon: 'loading',
					mask: true
				});
				console.log("进入 reflesh");
				this.status1 = false
				this.status2 = false
				this.puncture1 = false
				this.puncture2 = false
				this.direction1 = false
				this.direction2 = false
				this.tremor1 = false
				this.tremor2 = false
				this.tremor3 = false
				this.tremor4 = false
				this.noise1 = false
				this.noise2 = false
				this.noise3 = false
				this.noise4 = false
				this.swell1 = false
				this.swell2 = false
				this.narrow1 = false
				this.narrow2 = false
				this.expand1 = false
				this.expand2 = false
				this.cruor1 = false
				this.cruor2 = false
				this.cruor3 = false
				this.cruor4 = false
				this.check1 = false
				this.check2 = false
				this.check3 = false
				this.check4 = false
				this.radio1 = false
				this.radio2 = false
				this.fixed1 = false
				this.fixed2 = false
				this.slide1 = false
				this.slide2 = false
				this.pipeSwell1 = false
				this.pipeSwell2 = false
				this.bleedBlood1 = false
				this.bleedBlood2 = false
				this.bleedLiquid1 = false
				this.bleedLiquid2 = false
				this.thrombus1 = false
				this.thrombus2 = false
				this.thrombolysis1 = false
				this.thrombolysis2 = false
				this.joinWay1 = false
				this.joinWay2 = false
				this.bleedInfection1 = false
				this.bleedInfection2 = false
				this.antibiotic1 = false
				this.antibiotic2 = false
				this.guide1 = false
				this.guide2 = false
				this.dressing1 = false
				this.dressing2 = false
				this.dressing3 = false
				this.pipeStatus1 = false
				this.pipeStatus2 = false
				this.pipeStatus3 = false
				this.hackReset = false
				this.$nextTick(() => {
					this.hackReset = true;
				});
				//获取透析信息数据
				this.getDialysisInfo();
				//判断类型获取治疗与评估状况数据
				if(this.infoType == 0){
					this.getTreatInfo();
				}
				else if(this.infoType == 1){
					this.getTreatInfoZG();
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
			//选择变更：上机前病情
			setStatus1(){
				this.status1 = !this.status1
				if(this.status1 == true){
					this.status2 = false;
				}
			},
			setStatus2(){
				this.status2 = !this.status2
				if(this.status2 == true){
					this.status1 = false;
					this.dialysisInfo.special_state = "";
				}
			},
			//选择变更：穿刺
			setPuncture1(){
				this.puncture1 = !this.puncture1
				if(this.puncture1 == true){
					this.puncture2 = false;
				}
			},
			setPuncture2(){
				this.puncture2 = !this.puncture2
				if(this.puncture2 == true){
					this.puncture1 = false;
				}	
			},
			//选择变更：方向
			setDirection1(){
				this.direction1 = !this.direction1
				if(this.direction1 == true){
					this.direction2 = false;
				}
			},
			setDirection2(){
				this.direction2 = !this.direction2
				if(this.direction2 == true){
					this.direction1 = false;
				}	
			},
			//选择变更：内瘘震颤
			setTremor1(){
				this.tremor1 = !this.tremor1
				if(this.tremor1 == true){
					this.tremor2 = false;
					this.tremor3 = false;
					this.tremor4 = false;
				}
			},
			setTremor2(){
				this.tremor2 = !this.tremor2
				if(this.tremor2 == true){
					this.tremor1 = false;
					this.tremor3 = false;
					this.tremor4 = false;
				}	
			},
			setTremor3(){
				this.tremor3 = !this.tremor3
				if(this.tremor3 == true){
					this.tremor1 = false;
					this.tremor2 = false;
					this.tremor4 = false;
				}
			},
			setTremor4(){
				this.tremor4 = !this.tremor4
				if(this.tremor4 == true){
					this.tremor1 = false;
					this.tremor2 = false;
					this.tremor3 = false;
				}
			},
			//选择变更：杂音
			setNoise1(){
				this.noise1 = !this.noise1
				if(this.noise1 == true){
					this.noise2 = false;
					this.noise3 = false;
					this.noise4 = false;
				}
			},
			setNoise2(){
				this.noise2 = !this.noise2
				if(this.noise2 == true){
					this.noise1 = false;
					this.noise3 = false;
					this.noise4 = false;
				}	
			},
			setNoise3(){
				this.noise3 = !this.noise3
				if(this.noise3 == true){
					this.noise1 = false;
					this.noise2 = false;
					this.noise4 = false;
				}
			},
			setNoise4(){
				this.noise4 = !this.noise4
				if(this.noise4 == true){
					this.noise1 = false;
					this.noise2 = false;
					this.noise3 = false;
				}
			},
			//选择变更：红肿
			setSwell1(){
				this.swell1 = !this.swell1
				if(this.swell1 == true){
					this.swell2 = false;
				}
			},
			setSwell2(){
				this.swell2 = !this.swell2
				if(this.swell2 == true){
					this.swell1 = false;
				}	
			},
			//选择变更：狭窄
			setNarrow1(){
				this.narrow1 = !this.narrow1
				if(this.narrow1 == true){
					this.narrow2 = false;
				}
			},
			setNarrow2(){
				this.narrow2 = !this.narrow2
				if(this.narrow2 == true){
					this.narrow1 = false;
				}	
			},
			//选择变更：瘤样扩张
			setExpand1(){
				this.expand1 = !this.expand1
				if(this.expand1 == true){
					this.expand2 = false;
				}
			},
			setExpand2(){
				this.expand2 = !this.expand2
				if(this.expand2 == true){
					this.expand1 = false;
				}	
			},
			//选择变更：固定牢固
			setFixed1(){
				this.fixed1 = !this.fixed1
				if(this.fixed1 == true){
					this.fixed2 = false;
				}
			},
			setFixed2(){
				this.fixed2 = !this.fixed2
				if(this.fixed2 == true){
					this.fixed1 = false;
				}	
			},
			//选择变更：滑脱
			setSlide1(){
				this.slide1 = !this.slide1
				if(this.slide1 == true){
					this.slide2 = false;
				}
			},
			setSlide2(){
				this.slide2 = !this.slide2
				if(this.slide2 == true){
					this.slide1 = false;
				}	
			},
			//选择变更：置管口红肿
			setPipeSwell1(){
				this.pipeSwell1 = !this.pipeSwell1
				if(this.pipeSwell1 == true){
					this.pipeSwell2 = false;
				}
			},
			setPipeSwell2(){
				this.pipeSwell2 = !this.pipeSwell2
				if(this.pipeSwell2 == true){
					this.pipeSwell1 = false;
				}	
			},
			//选择变更：渗血
			setBleedBlood1(){
				this.bleedBlood1 = !this.bleedBlood1
				if(this.bleedBlood1 == true){
					this.bleedBlood2 = false;
				}
			},
			setBleedBlood2(){
				this.bleedBlood2 = !this.bleedBlood2
				if(this.bleedBlood2 == true){
					this.bleedBlood1 = false;
				}	
			},
			//选择变更：渗液
			setBleedLiquid1(){
				this.bleedLiquid1 = !this.bleedLiquid1
				if(this.bleedLiquid1 == true){
					this.bleedLiquid2 = false;
				}
			},
			setBleedLiquid2(){
				this.bleedLiquid2 = !this.bleedLiquid2
				if(this.bleedLiquid2 == true){
					this.bleedLiquid1 = false;
				}	
			},
			//选择变更：血栓
			setThrombus1(){
				this.thrombus1 = !this.thrombus1
				if(this.thrombus1 == true){
					this.thrombus2 = false;
				}
			},
			setThrombus2(){
				this.thrombus2 = !this.thrombus2
				if(this.thrombus2 == true){
					this.thrombus1 = false;
				}	
			},
			//选择变更：溶栓
			setThrombolysis1(){
				this.thrombolysis1 = !this.thrombolysis1
				if(this.thrombolysis1 == true){
					this.thrombolysis2 = false;
				}
			},
			setThrombolysis2(){
				this.thrombolysis2 = !this.thrombolysis2
				if(this.thrombolysis2 == true){
					this.thrombolysis1 = false;
				}	
			},
			//选择变更：对接方式
			setJoinWay1(){
				this.joinWay1 = !this.joinWay1
				if(this.joinWay1 == true){
					this.joinWay2 = false;
				}
			},
			setJoinWay2(){
				this.joinWay2 = !this.joinWay2
				if(this.joinWay2 == true){
					this.joinWay1 = false;
				}	
			},
			//选择变更：血流感染
			setBleedInfection1(){
				this.bleedInfection1 = !this.bleedInfection1
				if(this.bleedInfection1 == true){
					this.bleedInfection2 = false;
				}
			},
			setBleedInfection2(){
				this.bleedInfection2 = !this.bleedInfection2
				if(this.bleedInfection2 == true){
					this.bleedInfection1 = false;
				}	
			},
			//选择变更：使用抗生素
			setAntibiotic1(){
				this.antibiotic1 = !this.antibiotic1
				if(this.antibiotic1 == true){
					this.antibiotic2 = false;
				}
			},
			setAntibiotic2(){
				this.antibiotic2 = !this.antibiotic2
				if(this.antibiotic2 == true){
					this.antibiotic1 = false;
				}	
			},
			//选择变更：宣教指导
			setGuide1(){
				this.guide1 = !this.guide1
				if(this.guide1 == true){
					this.guide2 = false;
				}
			},
			setGuide2(){
				this.guide2 = !this.guide2
				if(this.guide2 == true){
					this.guide1 = false;
				}	
			},
			//选择变更：敷料
			setDressing1(){
				this.dressing1 = !this.dressing1;
			},
			setDressing2(){
				this.dressing2 = !this.dressing2;
			},
			setDressing3(){
				this.dressing3 = !this.dressing3;
			},
			//选择变更：导管情况
			setPipeStatus1(){
				this.pipeStatus1 = !this.pipeStatus1;
			},
			setPipeStatus2(){
				this.pipeStatus2 = !this.pipeStatus2;
			},
			setPipeStatus3(){
				this.pipeStatus3 = !this.pipeStatus3;
			},
			
			//选择变更：透析器凝血
			setCruor1(){
				this.cruor1 = !this.cruor1
				if(this.cruor1 == true){
					this.cruor2 = false;
					this.cruor3 = false;
					this.cruor4 = false;
				}
			},
			setCruor2(){
				this.cruor2 = !this.cruor2
				if(this.cruor2 == true){
					this.cruor1 = false;
					this.cruor3 = false;
					this.cruor4 = false;
				}	
			},
			setCruor3(){
				this.cruor3 = !this.cruor3
				if(this.cruor3 == true){
					this.cruor1 = false;
					this.cruor2 = false;
					this.cruor4 = false;
				}
			},
			setCruor4(){
				this.cruor4 = !this.cruor4
				if(this.cruor4 == true){
					this.cruor1 = false;
					this.cruor2 = false;
					this.cruor3 = false;
				}
			},
			//选择变更：护理措施
			setCheck1(){
				this.check1 = !this.check1;
				if(this.check1 == true){
					this.check2 = false;
					this.check3 = false;
					this.check4 = false;
				}
			},
			setCheck2(){
				this.check2 = !this.check2;
				if(this.check2 == true){
					this.check1 = false;
				}
				else{
					if(this.check3 == false && this.check4 == false){
						this.check1 = true;
					}
				}
			},
			setCheck3(){
				this.check3 = !this.check3;
				if(this.check3 == true){
					this.check1 = false;
				}
				else{
					if(this.check2 == false && this.check4 == false){
						this.check1 = true;
					}
				}
			},
			setCheck4(){
				this.check4 = !this.check4;
				if(this.check4 == true){
					this.check1 = false;
				}
				else{
					if(this.check2 == false && this.check3 == false){
						this.check1 = true;
					}
				}
			},
			//选择变更：平车轮椅
			setRadio1(){
				this.radio1 = !this.radio1
				if(this.radio1 == true){
					this.radio2 = false;
				}
			},
			setRadio2(){
				this.radio2 = !this.radio2
				if(this.radio2 == true){
					this.radio1 = false;
				}
			},
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
			submitInfo(e){
				if(this.infoType == 0){
					this.resetTreatInfo(e);
				}
				else if(this.infoType == 1){
					this.resetTreatInfoZG(e);
				}

			},
			//修改治疗信息(内瘘)
			resetTreatInfo(e) {
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
				//获取上机前病情状态值
				if(this.status1 == true){
					this.dialysisInfo.has_special_state = "1";
				}
				else if(this.status2 == true){
					this.dialysisInfo.has_special_state = "0";
				}
				//获取穿刺状态值
				if(this.puncture1 == true){
					this.dialysisInfo.chuanci_dunzhen = "0";
				}
				else if(this.puncture2 == true){
					this.dialysisInfo.chuanci_dunzhen = "1";
				}
				//获取方向状态值
				if(this.direction1 == true){
					this.dialysisInfo.chuanci_fangxiang = "0";
				}
				else if(this.direction2 == true){
					this.dialysisInfo.chuanci_fangxiang = "1";
				}
				//获取内瘘震颤状态值
				if(this.tremor1 == true){
					this.treatStateInfo.in_basket_wound_allergy = "0";
				}
				else if(this.tremor2 == true){
					this.treatStateInfo.in_basket_wound_allergy = "1";
				}
				else if(this.tremor3 == true){
					this.treatStateInfo.in_basket_wound_allergy = "2";
				}
				else if(this.tremor4 == true){
					this.treatStateInfo.in_basket_wound_allergy = "3";
				}
				//获取杂音状态值
				if(this.noise1 == true){
					this.treatStateInfo.in_basket_plaster_allergy = "0";
				}
				else if(this.noise2 == true){
					this.treatStateInfo.in_basket_plaster_allergy = "1";
				}
				else if(this.noise3 == true){
					this.treatStateInfo.in_basket_plaster_allergy = "2";
				}
				else if(this.noise4 == true){
					this.treatStateInfo.in_basket_plaster_allergy = "3";
				}
				//获取红肿状态值
				if(this.swell1 == true){
					this.treatStateInfo.in_basket_hongzhong = "1";
				}
				else if(this.swell2 == true){
					this.treatStateInfo.in_basket_hongzhong = "0";
				}
				//获取狭窄状态值
				if(this.narrow1 == true){
					this.treatStateInfo.in_basket_xiazhai = "1";
				}
				else if(this.narrow2 == true){
					this.treatStateInfo.in_basket_xiazhai = "0";
				}
				//获取瘤样扩张状态值
				if(this.expand1 == true){
					this.treatStateInfo.in_basket_liuyangkuozhang = "1";
				}
				else if(this.expand2 == true){
					this.treatStateInfo.in_basket_liuyangkuozhang = "0";
				}
				//获取透析器凝血状态值
				if(this.cruor1 == true){
					this.treatStateInfo.coagulation_in_dialyser = "0";
				}
				else if(this.cruor2 == true){
					this.treatStateInfo.coagulation_in_dialyser = "1";
				}
				else if(this.cruor3 == true){
					this.treatStateInfo.coagulation_in_dialyser = "2";
				}
				else if(this.cruor4 == true){
					this.treatStateInfo.coagulation_in_dialyser = "3";
				}
				//获取护理措施状态值
				if(this.check2 == true){
					this.treatStateInfo.in_basket_hulirefu = "1";
				}
				else{
					this.treatStateInfo.in_basket_hulirefu = "";
				}
				if(this.check3 == true){
					this.treatStateInfo.in_basket_hulixiliaotuo = "1";
				}
				else{
					this.treatStateInfo.in_basket_hulixiliaotuo = "";
				}
				if(this.check4 == true){
					this.treatStateInfo.in_basket_huliliusuanmei = "1";
				}
				else{
					this.treatStateInfo.in_basket_huliliusuanmei = "";
				}
				//获取平车轮椅状态值
				if (this.radio1 == true) {
					this.treatStateInfo.before_dry_weightpc = "1";
				}
				else {
					this.treatStateInfo.before_dry_weightpc = "";
				}
				if (this.radio2 == true) {
					this.treatStateInfo.before_dry_weightly = "1";
				}
				else {
					this.treatStateInfo.before_dry_weightly = "";
				}
				//治疗信息修改提交
				this.$myRequest({
					url: '/patient/update/treat',
					method: 'POST',
					data: {
						"cure_id": this.dialysisInfo.cure_id,
						"recipe_id": this.dialysisInfo.recipe_id,
						"has_special_state": this.dialysisInfo.has_special_state,
						"special_state": this.dialysisInfo.special_state,
						"frequency_hours": this.dialysisInfo.frequency_hours,
						"frequency_minute": this.dialysisInfo.frequency_minute,
						"clean_up_times": this.dialysisInfo.clean_up_times,
						"treatmentitems": this.pickerInfo.treatmentitems,
						"filter": this.pickerInfo.filter,
						"chuanci_dunzhen": this.dialysisInfo.chuanci_dunzhen,
						"chuanci_fangxiang": this.dialysisInfo.chuanci_fangxiang,
						"before_temperature": this.dialysisInfo.before_temperature,
						"before_bp": this.dialysisInfo.before_bp,
						"br": this.dialysisInfo.br,
						"calcium_ion": this.dialysisInfo.calcium_ion,
						"bloow_flow": this.dialysisInfo.bloow_flow,
						"dialysate_flow": this.dialysisInfo.dialysate_flow,
						"in_basket_wound_allergy": this.treatStateInfo.in_basket_wound_allergy,
						"in_basket_plaster_allergy": this.treatStateInfo.in_basket_plaster_allergy,
						"in_basket_hongzhong": this.treatStateInfo.in_basket_hongzhong,
						"in_basket_xiazhai": this.treatStateInfo.in_basket_xiazhai,
						"in_basket_liuyangkuozhang": this.treatStateInfo.in_basket_liuyangkuozhang,
						"in_basket_hulirefu": this.treatStateInfo.in_basket_hulirefu,
						"in_basket_hulixiliaotuo": this.treatStateInfo.in_basket_hulixiliaotuo,
						"in_basket_huliliusuanmei": this.treatStateInfo.in_basket_huliliusuanmei,
						"actual_cleanup_hour": this.treatStateInfo.actual_cleanup_hour,
						"actual_cleanup_minute": this.treatStateInfo.actual_cleanup_minute,
						"dry_weight": this.treatStateInfo.dry_weight,
						"last_time_dry_weight": this.treatStateInfo.last_time_dry_weight,
						"before_dry_weight": this.treatStateInfo.before_dry_weight,
						"before_dry_weightpc": this.treatStateInfo.before_dry_weightpc,
						"before_dry_weightly": this.treatStateInfo.before_dry_weightly,
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
						"coagulation_in_dialyser": this.treatStateInfo.coagulation_in_dialyser,
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
							Store.setStorageSync(
								"bloodPressure",
								{
									type:"内瘘",
									before_systolic_pressure:this.treatStateInfo.before_systolic_pressure,
									before_diastolic_pressure:this.treatStateInfo.before_diastolic_pressure,
								},
							);
						}
					},
				});
			},
			//修改治疗信息(置管)
			resetTreatInfoZG(e){
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
				//获取上机前病情态值
				if(this.status1 == true){
					this.dialysisInfo.has_special_state = "1";
				}
				else if(this.status2 == true){
					this.dialysisInfo.has_special_state = "0";
				}
				//获取固定牢固状态值
				if(this.fixed1 == true){
					this.treatStateInfo.ovascular_access_firm = "1";
				}
				else if(this.fixed2 == true){
					this.treatStateInfo.ovascular_access_firm = "0";
				}
				//获取滑脱状态值
				if(this.slide1 == true){
					this.treatStateInfo.vascular_access_shed = "1";
				}
				else if(this.slide2 == true){
					this.treatStateInfo.vascular_access_shed = "0";
				}
				//获取置管红肿状态值
				if(this.pipeSwell1 == true){
					this.treatStateInfo.vascular_access_swelling = "1";
				}
				else if(this.pipeSwell2 == true){
					this.treatStateInfo.vascular_access_swelling = "0";
				}
				//获取渗血状态值
				if(this.bleedBlood1 == true){
					this.treatStateInfo.vascular_access_errhyisis = "1";
				}
				else if(this.bleedBlood2 == true){
					this.treatStateInfo.vascular_access_errhyisis = "0";
				}
				//获取渗液状态值
				if(this.bleedLiquid1 == true){
					this.treatStateInfo.vascular_access_shenye = "1";
				}
				else if(this.bleedLiquid2 == true){
					this.treatStateInfo.vascular_access_shenye = "0";
				}
				//获取血栓状态值
				if(this.thrombus1 == true){
					this.treatStateInfo.vascular_access_thrombus = "1";
				}
				else if(this.thrombus2 == true){
					this.treatStateInfo.vascular_access_thrombus = "0";
				}
				//获取溶栓状态值
				if(this.thrombolysis1 == true){
					this.treatStateInfo.vascular_rongshuan = "1";
				}
				else if(this.thrombolysis2 == true){
					this.treatStateInfo.vascular_rongshuan = "0";
				}
				//获取对接方式状态值
				if(this.joinWay1 == true){
					this.treatStateInfo.vascular_duijiefangshi = "1";
				}
				else if(this.joinWay2 == true){
					this.treatStateInfo.vascular_duijiefangshi = "0";
				}
				//获取血流感染状态值
				if(this.bleedInfection1 == true){
					this.treatStateInfo.vascular_xueliuganran = "1";
				}
				else if(this.bleedInfection2 == true){
					this.treatStateInfo.vascular_xueliuganran = "0";
				}
				//获取使用抗生素状态值
				if(this.antibiotic1 == true){
					this.treatStateInfo.vascular_kangshengsu = "1";
				}
				else if(this.antibiotic2 == true){
					this.treatStateInfo.vascular_kangshengsu = "0";
				}
				//获取宣教指导状态值
				if(this.guide1 == true){
					this.treatStateInfo.vascular_xuanjiao = "1";
				}
				else if(this.guide2 == true){
					this.treatStateInfo.vascular_xuanjiao = "0";
				}
				//获取敷料状态值
				if(this.dressing1 == true){
					this.treatStateInfo.fuliao_ganzhaowanhao = "1";
				}
				else{
					this.treatStateInfo.fuliao_ganzhaowanhao = "";
				}
				if(this.dressing2 == true){
					this.treatStateInfo.fuliao_bujinmi = "1";
				}
				else{
					this.treatStateInfo.fuliao_bujinmi = "";
				}
				if(this.dressing3 == true){
					this.treatStateInfo.fuliao_queshi = "1";
				}
				else{
					this.treatStateInfo.fuliao_queshi = "";
				}
				//获取导管情况状态值
				if(this.pipeStatus1 == true){
					this.treatStateInfo.vascular_access_smooth = "1";
				}
				else{
					this.treatStateInfo.vascular_access_smooth = "";
				}
				if(this.pipeStatus2 == true){
					this.treatStateInfo.vascular_access_dmkunnan = "1";
				}
				else{
					this.treatStateInfo.vascular_access_dmkunnan = "";
				}
				if(this.pipeStatus3 == true){
					this.treatStateInfo.vascular_access_jmkunnan = "1";
				}
				else{
					this.treatStateInfo.vascular_access_jmkunnan = "";
				}
				//获取透析器凝血状态值
				if(this.cruor1 == true){
					this.treatStateInfo.coagulation_in_dialyser = "0";
				}
				else if(this.cruor2 == true){
					this.treatStateInfo.coagulation_in_dialyser = "1";
				}
				else if(this.cruor3 == true){
					this.treatStateInfo.coagulation_in_dialyser = "2";
				}
				else if(this.cruor4 == true){
					this.treatStateInfo.coagulation_in_dialyser = "3";
				}
				//获取平车轮椅状态值
				if (this.radio1 == true) {
					this.treatStateInfo.before_dry_weightpc = "1";
				}
				else {
					this.treatStateInfo.before_dry_weightpc = "";
				}
				if (this.radio2 == true) {
					this.treatStateInfo.before_dry_weightly = "1";
				}
				else {
					this.treatStateInfo.before_dry_weightly = "";
				}
				this.$myRequest({
					url: '/patient/update/zhiguantreat',
					method: 'POST',
					data: {
						"cure_id": this.dialysisInfo.cure_id,
						"recipe_id": this.dialysisInfo.recipe_id,
						"has_special_state": this.dialysisInfo.has_special_state,
						"special_state": this.dialysisInfo.special_state,
						"frequency_hours": this.dialysisInfo.frequency_hours,
						"frequency_minute": this.dialysisInfo.frequency_minute,
						"clean_up_times": this.dialysisInfo.clean_up_times,
						"treatmentitems": this.pickerInfo.treatmentitems,
						"filter": this.pickerInfo.filter,
						"before_temperature": this.dialysisInfo.before_temperature,
						"before_bp": this.dialysisInfo.before_bp,
						"br": this.dialysisInfo.br,
						"calcium_ion": this.dialysisInfo.calcium_ion,
						"bloow_flow": this.dialysisInfo.bloow_flow,
						"dialysate_flow": this.dialysisInfo.dialysate_flow,
						"in_basket_vascular_other": this.treatStateInfo.in_basket_vascular_other,
						"daoguan_waiyi": this.treatStateInfo.daoguan_waiyi,
						"ovascular_access_firm": this.treatStateInfo.ovascular_access_firm,
						"vascular_access_shed": this.treatStateInfo.vascular_access_shed,
						"fuliao_ganzhaowanhao": this.treatStateInfo.fuliao_ganzhaowanhao,
						"fuliao_bujinmi": this.treatStateInfo.fuliao_bujinmi,
						"fuliao_queshi": this.treatStateInfo.fuliao_queshi,
						"vascular_access_swelling": this.treatStateInfo.vascular_access_swelling,
						"vascular_access_errhyisis": this.treatStateInfo.vascular_access_errhyisis,
						"vascular_access_shenye": this.treatStateInfo.vascular_access_shenye,
						"vascular_access_thrombus": this.treatStateInfo.vascular_access_thrombus,
						"vascular_access_smooth": this.treatStateInfo.vascular_access_smooth,
						"vascular_access_dmkunnan": this.treatStateInfo.vascular_access_dmkunnan,
						"vascular_access_jmkunnan": this.treatStateInfo.vascular_access_jmkunnan,
						"vascular_rongshuan": this.treatStateInfo.vascular_rongshuan,
						"vascular_duijiefangshi": this.treatStateInfo.vascular_duijiefangshi,
						"vascular_xueliuganran": this.treatStateInfo.vascular_xueliuganran,
						"vascular_kangshengsu": this.treatStateInfo.vascular_kangshengsu,
						"vascular_xuanjiao": this.treatStateInfo.vascular_xuanjiao,
						"actual_cleanup_hour": this.treatStateInfo.actual_cleanup_hour,
						"actual_cleanup_minute": this.treatStateInfo.actual_cleanup_minute,
						"dry_weight": this.treatStateInfo.dry_weight,
						"last_time_dry_weight": this.treatStateInfo.last_time_dry_weight,
						"before_dry_weight": this.treatStateInfo.before_dry_weight,
						"before_dry_weightpc": this.treatStateInfo.before_dry_weightpc,
						"before_dry_weightly": this.treatStateInfo.before_dry_weightly,
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
						"coagulation_in_dialyser": this.treatStateInfo.coagulation_in_dialyser,
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
							Store.setStorageSync(
								"bloodPressure",
								{
									type:"置管",
									before_systolic_pressure:this.treatStateInfo.before_systolic_pressure,
									before_diastolic_pressure:this.treatStateInfo.before_diastolic_pressure,
								},
							);
						}
					},
				});
			},
			//获取患者透析信息接口数据
			getDialysisInfo(){
				let searchInfo = Store.getStorageSync("searchInfo");
				this.date = searchInfo.date;
				this.$myRequest({
					url: '/patient/dialysisinfo',
					method: 'POST',
					data: {
						patient_id: this.patient.patient_id,
						recipe_id: this.patient.recipe_id,
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.dialysisInfo = _.cloneDeep(res.data.data);
							console.log("透析信息:",res.data.data)
							//页面加载信息：上机前病情
							if (this.dialysisInfo.has_special_state == "1") {
								this.status1 = true;
								this.status2 = false;
							}
							else if (this.dialysisInfo.has_special_state == "0") {
								this.status2 = true;
								this.status1 = false;
							}
							//页面加载信息：穿刺
							if (this.dialysisInfo.chuanci_dunzhen == "0") {
								this.puncture1 = true;
								this.puncture2 = false;
							}
							else if (this.dialysisInfo.chuanci_dunzhen == "1") {
								this.puncture2 = true;
								this.puncture1 = false;
							}
							//页面加载信息：方向
							if (this.dialysisInfo.chuanci_fangxiang == "0") {
								this.direction1 = true;
								this.direction2 = false;
							}
							else if (this.dialysisInfo.chuanci_fangxiang == "1") {
								this.direction2 = true;
								this.direction1 = false;
							}
							//页面加载信息：抗凝方式
							if (this.dialysisInfo.therapeutic_method != "") {
								for (let i = 0; i < this.bloodmethodInfo.length; i++) {
									if (this.dialysisInfo.therapeutic_method == this.bloodmethodInfo[i].item_id) {
										this.antiFreeze = this.bloodmethodInfo[i].item_name;
										break;
									}
								}
							}
						}
					},
				});
			},
			//获取病人评估与治疗情况（内瘘）
			getTreatInfo(){
				console.log("enter 内瘘");
				this.$myRequest({
					url: '/patient/treatstate',
					method: 'POST',
					data: {
						patient_id: this.patient.patient_id,
						recipe_id: this.patient.recipe_id,
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.treatStateInfo = _.cloneDeep(res.data.data);
							Store.setStorageSync(
								"bloodPressure",
								{
									type:"内瘘",
									before_systolic_pressure:res.data.data.before_systolic_pressure,
									before_diastolic_pressure:res.data.data.before_diastolic_pressure,
								},
							);
							console.log("bloodPressure",Store.getStorageSync("bloodPressure"))
							console.log("评估与治疗情况(内瘘):",res.data.data)
							//页面加载信息：内瘘震颤
							if (this.treatStateInfo.in_basket_wound_allergy == "0") {
								this.tremor1 = true;
								this.tremor2 = false;
								this.tremor3 = false;
								this.tremor4 = false;
							}
							else if (this.treatStateInfo.in_basket_wound_allergy == "1") {
								this.tremor2 = true;
								this.tremor1 = false;
								this.tremor3 = false;
								this.tremor4 = false;
							}
							else if (this.treatStateInfo.in_basket_wound_allergy == "2") {
								this.tremor3 = true;
								this.tremor1 = false;
								this.tremor2 = false;
								this.tremor4 = false;
							}
							else if (this.treatStateInfo.in_basket_wound_allergy == "3") {
								this.tremor4 = true;
								this.tremor1 = false;
								this.tremor2 = false;
								this.tremor3 = false;
							}
							//页面加载信息：杂音
							if (this.treatStateInfo.in_basket_plaster_allergy == "0") {
								this.noise1 = true;
								this.noise2 = false;
								this.noise3 = false;
								this.noise4 = false;
							}
							else if (this.treatStateInfo.in_basket_plaster_allergy == "1") {
								this.noise2 = true;
								this.noise1 = false;
								this.noise3 = false;
								this.noise4 = false;
							}
							else if (this.treatStateInfo.in_basket_plaster_allergy == "2") {
								this.noise3 = true;
								this.noise1 = false;
								this.noise2 = false;
								this.noise4 = false;
							}
							else if (this.treatStateInfo.in_basket_plaster_allergy == "3") {
								this.noise4 = true;
								this.noise1 = false;
								this.noise2 = false;
								this.noise3 = false;
							}
							//页面加载信息：红肿
							if (this.treatStateInfo.in_basket_hongzhong == "1") {
								this.swell1 = true;
								this.swell2 = false;
							}
							else if (this.treatStateInfo.in_basket_hongzhong == "0") {
								this.swell2 = true;
								this.swell1 = false;
							}
							//页面加载信息：狭窄
							if (this.treatStateInfo.in_basket_xiazhai == "1") {
								this.narrow1 = true;
								this.narrow2 = false;
							}
							else if (this.treatStateInfo.in_basket_xiazhai == "0") {
								this.narrow2 = true;
								this.narrow1 = false;
							}
							//页面加载信息：瘤样扩张
							if (this.treatStateInfo.in_basket_liuyangkuozhang == "1") {
								this.expand1 = true;
								this.expand2 = false;
							}
							else if (this.treatStateInfo.in_basket_liuyangkuozhang == "0") {
								this.expand2 = true;
								this.expand1 = false;
							}
							//页面加载信息：护理措施
							this.check1 = false;
							this.check2 = false;
							this.check3 = false;
							this.check4 = false;
							if (this.treatStateInfo.in_basket_hulirefu != "1" && this.treatStateInfo.in_basket_hulixiliaotuo != "1" && this.treatStateInfo.in_basket_huliliusuanmei != "1") {
								this.check1 = true;
							} 
							else {
								this.check1 = false;
								if (this.treatStateInfo.in_basket_hulirefu == "1") {
									this.check2 = true;
								}
								if (this.treatStateInfo.in_basket_hulixiliaotuo == "1") {
									this.check3 = true;
								}
								if (this.treatStateInfo.in_basket_huliliusuanmei == "1") {
									this.check4 = true;
								}
							}
							//页面加载信息：平车/轮椅
							if (this.treatStateInfo.before_dry_weightpc == "1") {
								this.radio1 = true;
							}
							else{
								this.radio1 = false;
							}
							if (this.treatStateInfo.before_dry_weightly == "1") {
								this.radio2 = true;
							}
							else{
								this.radio2 = false;
							}
							//页面加载信息：透析器凝血
							if (this.treatStateInfo.coagulation_in_dialyser == "0") {
								this.cruor1 = true;
								this.cruor2 = false;
								this.cruor3 = false;
								this.cruor4 = false;
							}
							else if (this.treatStateInfo.coagulation_in_dialyser == "1") {
								this.cruor2 = true;
								this.cruor1 = false;
								this.cruor3 = false;
								this.cruor4 = false;
							}
							else if (this.treatStateInfo.coagulation_in_dialyser == "2") {
								this.cruor3 = true;
								this.cruor1 = false;
								this.cruor2 = false;
								this.cruor4 = false;
							}
							else if (this.treatStateInfo.coagulation_in_dialyser == "3") {
								this.cruor4 = true;
								this.cruor1 = false;
								this.cruor2 = false;
								this.cruor3 = false;
							}
							//获取核对医生名称
							for (let i = 0; i < this.doctorInfo.length; i++) {
								if (this.doctorInfo[i].emp_no == this.treatStateInfo.primary_doctor) {
									this.pickerInfo.primary_doctor = this.treatStateInfo.primary_doctor;
									this.treatStateInfo.primary_doctor = this.doctorInfo[i].name;
									break;
								}
							}
							//获取核对护士名称
							for (let i = 0; i < this.nurseInfo.length; i++) {
								if (this.nurseInfo[i].emp_no == this.treatStateInfo.primary_nurse) {
									this.pickerInfo.primary_nurse = this.treatStateInfo.primary_nurse;
									this.treatStateInfo.primary_nurse = this.nurseInfo[i].name;
								}
								if (this.nurseInfo[i].emp_no == this.treatStateInfo.check_nurse) {
									this.pickerInfo.check_nurse = this.treatStateInfo.check_nurse;
									this.treatStateInfo.check_nurse = this.nurseInfo[i].name;
								}
								if (this.nurseInfo[i].emp_no == this.treatStateInfo.puncture_nurse) {
									this.pickerInfo.puncture_nurse = this.treatStateInfo.puncture_nurse;
									this.treatStateInfo.puncture_nurse = this.nurseInfo[i].name;
								}
							}
						}
					},
				});
			},
			//获取病人评估与治疗情况(置管)
			getTreatInfoZG(){
				console.log("enter 置管");
				this.$myRequest({
					url: '/patient/zhiguantreatstate',
					method: 'POST',
					data: {
						patient_id: this.patient.patient_id,
						recipe_id: this.patient.recipe_id,
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.treatStateInfo = _.cloneDeep(res.data.data);
							Store.setStorageSync(
								"bloodPressure",
								{
									type:"置管",
									before_systolic_pressure:res.data.data.before_systolic_pressure,
									before_diastolic_pressure:res.data.data.before_diastolic_pressure,
								},
							);
							console.log("评估与治疗情况(置管):",res.data.data)
							//页面加载信息：固定牢固
							if (this.treatStateInfo.ovascular_access_firm == "1") {
								this.fixed1 = true;
								this.fixed2 = false;
							}
							else if (this.treatStateInfo.ovascular_access_firm == "0") {
								this.fixed2 = true;
								this.fixed1 = false;
							}
							//页面加载信息：滑脱
							if (this.treatStateInfo.vascular_access_shed == "1") {
								this.slide1 = true;
								this.slide2 = false;
							}
							else if (this.treatStateInfo.vascular_access_shed == "0") {
								this.slide2 = true;
								this.slide1 = false;
							}
							//页面加载信息：置管口红肿
							if (this.treatStateInfo.vascular_access_swelling == "1") {
								this.pipeSwell1 = true;
								this.pipeSwell2 = false;
							}
							else if (this.treatStateInfo.vascular_access_swelling == "0") {
								this.pipeSwell2 = true;
								this.pipeSwell1 = false;
							}
							//页面加载信息：渗血
							if (this.treatStateInfo.vascular_access_errhyisis == "1") {
								this.bleedBlood1 = true;
								this.bleedBlood2 = false;
							}
							else if (this.treatStateInfo.vascular_access_errhyisis == "0") {
								this.bleedBlood2 = true;
								this.bleedBlood1 = false;
							}
							//页面加载信息：渗液
							if (this.treatStateInfo.vascular_access_shenye == "1") {
								this.bleedLiquid1 = true;
								this.bleedLiquid2 = false;
							}
							else if (this.treatStateInfo.vascular_access_shenye == "0") {
								this.bleedLiquid2 = true;
								this.bleedLiquid1 = false;
							}
							//页面加载信息：血栓
							if (this.treatStateInfo.vascular_access_thrombus == "1") {
								this.thrombus1 = true;
								this.thrombus2 = false;
							}
							else if (this.treatStateInfo.vascular_access_thrombus == "0") {
								this.thrombus2 = true;
								this.thrombus1 = false;
							}
							//页面加载信息：溶栓
							if (this.treatStateInfo.vascular_rongshuan == "1") {
								this.thrombolysis1 = true;
								this.thrombolysis2 = false;
							}
							else if (this.treatStateInfo.vascular_rongshuan == "0") {
								this.thrombolysis2 = true;
								this.thrombolysis1 = false;
							}
							//页面加载信息：对接方式
							if (this.treatStateInfo.vascular_duijiefangshi == "1") {
								this.joinWay1 = true;
								this.joinWay2 = false;
							}
							else if (this.treatStateInfo.vascular_duijiefangshi == "0") {
								this.joinWay2 = true;
								this.joinWay1 = false;
							}
							//页面加载信息：血流感染
							if (this.treatStateInfo.vascular_xueliuganran == "1") {
								this.bleedInfection1 = true;
								this.bleedInfection2 = false;
							}
							else if (this.treatStateInfo.vascular_xueliuganran == "0") {
								this.bleedInfection2 = true;
								this.bleedInfection1 = false;
							}
							//页面加载信息：使用抗生素
							if (this.treatStateInfo.vascular_kangshengsu == "1") {
								this.antibiotic1 = true;
								this.antibiotic2 = false;
							}
							else if (this.treatStateInfo.vascular_kangshengsu == "0") {
								this.antibiotic2 = true;
								this.antibiotic1 = false;
							}
							//页面加载信息：宣教指导
							if (this.treatStateInfo.vascular_xuanjiao == "1") {
								this.guide1 = true;
								this.guide2 = false;
							}
							else if (this.treatStateInfo.vascular_xuanjiao == "0") {
								this.guide2 = true;
								this.guide1 = false;
							}
							//页面加载信息：敷料
							this.dressing1 = false;
							this.dressing2 = false;
							this.dressing3 = false;
							if (this.treatStateInfo.fuliao_ganzhaowanhao == "1") {
								this.dressing1 = true;
							}
							else{
								this.dressing1 = false;
							}
							if (this.treatStateInfo.fuliao_bujinmi == "1") {
								this.dressing2 = true;
							}
							else{
								this.dressing2 = false;
							}
							if (this.treatStateInfo.fuliao_queshi == "1") {
								this.dressing3 = true;
							}
							else{
								this.dressing2 = false;
							}
							//页面加载信息：导管情况
							this.pipeStatus1 = false;
							this.pipeStatus2 = false;
							this.pipeStatus3 = false;
							if (this.treatStateInfo.vascular_access_smooth == "1") {
								this.pipeStatus1 = true;
							}
							else{
								this.pipeStatus1 = false;
							}
							if (this.treatStateInfo.vascular_access_dmkunnan == "1") {
								this.pipeStatus2 = true;
							}
							else{
								this.pipeStatus2 = false;
							}
							if (this.treatStateInfo.vascular_access_jmkunnan == "1") {
								this.pipeStatus3 = true;
							}
							else{
								this.pipeStatus3 = false;
							}
							//页面加载信息：平车/轮椅
							if (this.treatStateInfo.before_dry_weightpc == "1") {
								this.radio1 = true;
							}
							else{
								this.radio1 = false;
							}
							if (this.treatStateInfo.before_dry_weightly == "1") {
								this.radio2 = true;
							}
							else{
								this.radio2 = false;
							}
							//页面加载信息：透析器凝血
							if (this.treatStateInfo.coagulation_in_dialyser == "0") {
								this.cruor1 = true;
								this.cruor2 = false;
								this.cruor3 = false;
								this.cruor4 = false;
							}
							else if (this.treatStateInfo.coagulation_in_dialyser == "1") {
								this.cruor2 = true;
								this.cruor1 = false;
								this.cruor3 = false;
								this.cruor4 = false;
							}
							else if (this.treatStateInfo.coagulation_in_dialyser == "2") {
								this.cruor3 = true;
								this.cruor1 = false;
								this.cruor2 = false;
								this.cruor4 = false;
							}
							else if (this.treatStateInfo.coagulation_in_dialyser == "3") {
								this.cruor4 = true;
								this.cruor1 = false;
								this.cruor2 = false;
								this.cruor3 = false;
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
			},
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");
	
	.a1{
		border-bottom: 1rpx solid #51D3C7;
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
	.my-checkbox{
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
		border: 1px solid;
		border-color: #C0C0C0;
		color: #51D3C7;
		text-align: center;
		line-height:30rpx
	}
	.my-checkbox-cnt{
		margin-right: 20rpx;
	}
	.my-radio{
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
		border: 1px solid;
		border-color: #C0C0C0;
		border-radius: 16rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.my-radio-cnt{
		margin-right: 20rpx;
	}
	.small-btn {
		border-radius: 20rpx;
		height: 60rpx;
		font-size: 28rpx;
	}
</style>
