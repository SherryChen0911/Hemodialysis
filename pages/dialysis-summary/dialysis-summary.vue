<template>
	<view>
		<uni-nav-bar class="nav-style" left-icon="back" right-icon="loop" :title="patient.name" color="#ffffff" background-color="#51D3C7" @clickLeft="toPatientList"></uni-nav-bar>
		<view class="content">
				<button class="table-btn" @click="setTemplate">
					<uni-icons class="btn-icon" type="plus" color="#51D3C7" size="15"></uni-icons>
					使用模板
				</button>
			<view class="texarea-border">
				<textarea :value="summary" placeholder="" />
			</view>
			<button class="one-btn">保存</button>
		</view>

		<!-- input弹出框 -->
		<uni-popup id="dialogInput" ref="templates" type="dialog">
			<view class="template-list" slot="default">
				<scroll-view scroll-y="true" >
				<view class="template-item" scroll-y="true" v-for="item in templateList" @click="selectTemplate(item)">
						<text>{{item}}</text>
				</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				patient:{},
				summary:"",
				templateList:[
					"0本次透析过程顺利,平安离室",
					"1患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"2患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"3患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"4患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"5患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"6患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"7患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"8患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"9患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"10患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"11患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"12患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"13患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"14患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"15患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"16患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"17患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"18患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"19患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
					"20患者透析中出现血压低,予取头低位,血压仍较前下降,予暂停超滤处理。",
				],
			}
		},
		onShow: function () {
			console.log("这里是透析小结页面",uni.getStorageSync("patient"));
			this.patient = uni.getStorageSync("patient");
			console.log(this.patient);
		},
		methods: {
			toPatientList(){
				uni.navigateTo({
					url: "../patient-list/patient-list",
				});
			},
			setTemplate(){
				this.$refs.templates.open();
			},
			selectTemplate(item){
				this.summary = item;
				this.$refs.templates.close();
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");
	.texarea-border{
		width: calc(100% - 44rpx);
		padding: 20rpx;
		border: 2rpx solid;
		border-color: #C0C0C0;
		border-radius: 20rpx;
	}
	textarea{
		width: 100%;
		height: 1000rpx;
	}
	.one-btn{
		width: 100%;
		margin: 20rpx 0;
	}
	.table-btn{
		width: 180rpx;
	}
	.template-list{
		margin: 20rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.template-item{
		padding: 10rpx 0 ;
		border-bottom: 2rpx solid;
		border-color: #C0C0C0;
		font-size: 28rpx;
	}
	scroll-view{
		height: 1000rpx;
	}
</style>
