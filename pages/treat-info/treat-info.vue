<template>
	<view>
		<!-- <uni-nav-bar class="nav-style" left-icon="back" right-icon="loop" :title="patient.name" color="#ffffff" background-color="#51D3C7" ></uni-nav-bar> -->
		<uni-nav-bar class="nav-style" left-icon="back" right-icon="loop" :title="patient.name" color="#ffffff" background-color="#51D3C7" @clickLeft="toPatientList"></uni-nav-bar>
		<form class="content">
		<uni-segmented-control class="segment" :current="segCtrlSelected" :values="segCtrlItems" @clickItem="onClickItem" styleType="text" activeColor="#51D3C7"></uni-segmented-control>
			<view v-show="segCtrlSelected === 0">
				<view class="form-item">
					<view class="form-prefix-space">
						<text>上机前病情:</text>
					</view>
					<view class="form-cnt-noborder form-mid-space">
						<radio-group name="beforeCondition">
							<label  v-for="item in info.status" class="radio-item">
								<radio :value="item.value" color="#51D3C7"  style="transform:scale(0.7)" />
								{{item.name}}
							</label>					
						</radio-group>	
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>治疗时间:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
						<text>h</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input type="text" placeholder=""/>
						<text>min</text>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>净化次数:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>治疗方式:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>净化器类型:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>血管通路:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>穿刺:</text>
					</view>
					<view class="form-cnt-noborder form-mid-space">
						<radio-group name="puncture">
							<label  v-for="item in info.puncture" class="radio-item">
								<radio :value="item.value" color="#51D3C7"  style="transform:scale(0.7)" />
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
						<radio-group name="puncture">
							<label  v-for="item in info.direction" class="radio-item">
								<radio :value="item.value" color="#51D3C7"  style="transform:scale(0.7)" />
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
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>脉搏(次/min):</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>呼吸(次/min):</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>抗凝方式:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>首剂:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
						<picker  class="form-suffix-space" mode="selector" :range="doseRange"  @change="setDoseRange1">
							<text class="suffix-text">{{info.dose1}}</text>
							<uni-icons type="arrowdown" color="#808080" size="20"></uni-icons>
						</picker>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>追加:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
						<picker class="form-suffix-space" mode="selector" :range="doseRange"  @change="setDoseRange2">
							<text class="suffix-text">{{info.dose2}}</text>
							<uni-icons type="arrowdown" color="#808080" size="20"></uni-icons>
						</picker>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>钙mmol/L:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input type="text" placeholder=""/>
					</view>
				</view>		
						
				<view class="form-item">
					<view class="form-prefix-space">
						<text>血流量ml/min:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input type="text" placeholder=""/>
					</view>
				</view>	
	
				<view class="form-item">
					<view class="form-prefix-space">
						<text>透析液流量ml/h:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input type="text" placeholder=""/>
					</view>
				</view>											
				
			</view>
			<view v-show="segCtrlSelected === 1">
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>内瘘震颤:</text>
					</view>
					<view class="form-cnt-noborder form-mid-space">
						<radio-group name="beforeCondition">
							<label  v-for="item in info.tremor" class="radio-item">
								<radio :value="item.value" color="#51D3C7"  style="transform:scale(0.7)" />
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
						<radio-group name="beforeCondition">
							<label  v-for="item in info.noise" class="radio-item">
								<radio :value="item.value" color="#51D3C7"  style="transform:scale(0.7)" />
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
						<radio-group name="beforeCondition">
							<label  v-for="item in info.swell" class="radio-item">
								<radio :value="item.value" color="#51D3C7"  style="transform:scale(0.7)" />
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
						<radio-group name="beforeCondition">
							<label  v-for="item in info.narrow" class="radio-item">
								<radio :value="item.value" color="#51D3C7"  style="transform:scale(0.7)" />
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
						<radio-group name="beforeCondition">
							<label  v-for="item in info.expand" class="radio-item">
								<radio :value="item.value" color="#51D3C7"  style="transform:scale(0.7)" />
								{{item.name}}
							</label>					
						</radio-group>	
					</view>
				</view>	

				<view class="form-item">
					<view class="form-prefix-space">
						<text>护理措施:</text>
					</view>
					<view class="form-cnt-noborder form-mid-space">
						<radio-group name="beforeCondition">
							<label  v-for="item in info.medicare" class="radio-item">
								<radio :value="item.value" color="#51D3C7"  style="transform:scale(0.7)" />
								{{item.name}}
							</label>					
						</radio-group>	
					</view>
				</view>	

				<view class="form-item">
					<view class="form-prefix-space">
						<text>实际治疗时间:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
						<text>h</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input type="text" placeholder=""/>
						<text>min</text>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>干体重Kg:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>上次透后体重Kg:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>				

				<view class="form-item">
					<view class="form-prefix-space">
						<text>透前体重Kg:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>	

				<view class="form-item">
					<view class="form-prefix-space">
						<text>体重增加Kg:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>	

				<view class="form-item">
					<view class="form-prefix-space">
						<text>体重增加Kg:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>	

				<view class="form-item">
					<view class="form-prefix-space">
						<text>较干体重增加Kg:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>	

				<view class="form-item">
					<view class="form-prefix-space">
						<text>预计脱水Kg:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>	

				<view class="form-item">
					<view class="form-prefix-space">
						<text>透后体重Kg:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>	

				<view class="form-item">
					<view class="form-prefix-space">
						<text>实际脱水Kg:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>期望体重下降量Kg:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>	

				<view class="form-item">
					<view class="form-prefix-space">
						<text>透前血压mmHg:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
					<text>/</text>
					<view class="form-cnt form-mid-space">
						<input type="text" placeholder=""/>
					</view>
				</view>

				<view class="form-item">
					<view class="form-prefix-space">
						<text>透后血压mmHg:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
					<text>/</text>
					<view class="form-cnt form-mid-space">
						<input type="text" placeholder=""/>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>透后体温℃:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>				
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>透后脉搏(次/min):</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>透后呼吸(次/min):</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>
				
				<view class="form-item">
					<view class="form-prefix-space">
						<text>透析器凝血:</text>
					</view>
					<view class="form-cnt-noborder form-mid-space">
						<radio-group name="beforeCondition">
							<label  v-for="item in info.cruor" class="radio-item">
								<radio :value="item.value" color="#51D3C7"  style="transform:scale(0.7)" />
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
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
				</view>

				<view class="form-item">
					<view class="form-prefix-space">
						<text>责任护士:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
					<view class="form-cnt-noborder form-mid-space">
						<button class="one-btn small-btn">修改签名</button>
					</view>
				</view>										

				<view class="form-item">
					<view class="form-prefix-space">
						<text>核对护士:</text>
					</view>
					<view class="form-cnt form-mid-space">
						<input class="form-mid-space" type="text" placeholder=""/>
					</view>
					<view class="form-cnt-noborder form-mid-space">
						<button class="one-btn small-btn">修改签名</button>
					</view>
				</view>	
				
				<button class="one-btn">保存</button>
				
			</view>
			
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				patient:{},
				segCtrlItems:['透析信息', '评估与治疗情况'],
				segCtrlSelected:0,
				info:{
					status:[{name:'有',value:'1'},{name:'无',value:'2'}],
					puncture:[{name:'钝针',value:'1'},{name:'锐针',value:'2'}],
					direction:[{name:'向心',value:'1'},{name:'离心',value:'2'}],
					dose1:"u",
					dose2:"u",
					tremor:[{name:'强',value:'1'},{name:'中',value:'2'},{name:'弱',value:'3'},{name:'无',value:'4'},],
					noise:[{name:'强',value:'1'},{name:'中',value:'2'},{name:'弱',value:'3'},{name:'无',value:'4'},],
					swell:[{name:'有',value:'1'},{name:'无',value:'2'},],
					narrow:[{name:'有',value:'1'},{name:'无',value:'2'},],
					expand:[{name:'有',value:'1'},{name:'无',value:'2'},],
					medicare:[{name:'无',value:'1'},{name:'热敷',value:'2'},{name:'喜疗妥',value:'3'},{name:'硫酸镁',value:'4'},],
					cruor:[{name:'0级',value:'1'},{name:'1级',value:'2'},{name:'2级',value:'3'},{name:'3级',value:'4'},],
				},
				doseRange:["u","u1","u2"]		
			}
		},
		onShow: function () {
			console.log("这里是治疗信息页面",uni.getStorageSync("patient"))
			this.patient = uni.getStorageSync("patient");
			console.log(this.patient);
		},
		methods: {
			toPatientList(){
				uni.navigateTo({
					url: "../patient-list/patient-list",
				});
			},
			onClickItem(e) {
				if (this.segCtrlSelected !== e.currentIndex) {
					this.segCtrlSelected = e.currentIndex;
				}
			},
			setDoseRange1(e){
				this.info.dose1 = this.doseRange[e.detail.value];
			},
			setDoseRange2(e){
				this.info.dose2 = this.doseRange[e.detail.value];
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");
	.uni-navbar--border{
		border-bottom-color: #007AFF;
	}
	.segment{
		width: calc(100% - 40rpx);
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
</style>
