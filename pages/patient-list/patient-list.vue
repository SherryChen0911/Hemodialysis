<template>
	<view class="content">
		<view class="list-view">
			<view class="list-item" v-for="item in patientList">
				<view class="header">
					<view class="list-head-left">
						<image class="patient-pic" :src="item.pic" mode="aspectFill"></image>
						<text>{{item.name}} {{item.sex}}</text>
						<view class="patient-status">
							<text v-show="item.isfinish">已完成</text>
						</view>
					</view>
					<view class="list-head-right">
						<text>ID: {{item.id}}</text>
						<text>透析号: {{item.dialysisId}}</text>
						<text>治疗项目: {{item.treatment}}</text>
						<text>传染病: {{item.epidemic}}</text>
						<text>净化器: {{item.depurator}}</text>
						<text>预订时间: {{item.time}}小时</text>
						<text>预计脱水: {{item.dehydration}}Kg</text>
						<text>抗凝方式: {{item.antiFreezing}}</text>
						<text>首计: {{item.first}}u</text>
						<text>追加: {{item.add}}u</text>
					</view>
				</view>
				<view v-show="!item.isfinish" class="footer">
					<button class="btn">患者拍照</button>
					<button class="btn" @click="doTreatment">执行治疗</button>
					<button class="btn" @click="endTreatment(item)">结束治疗</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				patientList:[
					{
						name:"筱燕秋",
						sex:"男",
						pic:"../../static/patient1.jpg",
						id:"350204198001101234",
						dialysisId:"2005150004",
						treatment:"HD",
						epidemic:"",
						depurator:"德朗14H",
						time:"4",
						dehydration:"3.7",
						antiFreezing:"低分子肝素钙",
						first:"4000",
						add:"",
						isfinish:true,
					},
					{
						name:"林晓梅",
						sex:"女",
						pic:"../../static/patient1.jpg",
						id:"350204198001101234",
						dialysisId:"2005150004",
						treatment:"HD",
						epidemic:"",
						depurator:"德朗14H",
						time:"4",
						dehydration:"3.7",
						antiFreezing:"低分子肝素钙",
						first:"4000",
						add:"",
						isfinish:false,
					},
					{
						name:"宁浩",
						sex:"男",
						pic:"../../static/patient1.jpg",
						id:"350204198001101234",
						dialysisId:"2005150004",
						treatment:"HD",
						epidemic:"",
						depurator:"德朗14H",
						time:"4",
						dehydration:"3.7",
						antiFreezing:"低分子肝素钙",
						first:"4000",
						add:"",
						isfinish:true,
					}										
				],
				
			}
		},
		methods: {
			doTreatment(){
				uni.switchTab({
					url: "../treat-info/treat-info"
				})
			},
			endTreatment(item){
				if(item.isfinish == false){
					item.isfinish = true;
				}
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");	
	.list-view{
		width: 100%;
	}
	.list-item{
		padding: 20rpx;
		margin-bottom: 20rpx;
		width: calc(100% - 40rpx);
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4);
	}
	.header{
		display: flex;
		flex-direction: row;
	}
	.list-head-left{
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}	
	.patient-pic{
		width: 200rpx;
		height: 300rpx;
	}
	.patient-status{
		margin-top: 5rpx;
		width: 120rpx;
		color: #FFFFFF;
		background-color: #C0C0C0;
		border-radius: 20rpx;
		font-size: 28rpx;
	}
	.list-head-right{
		margin-left: 20rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
	}
	.footer{
		margin-top: 20rpx;
		border-top: 2rpx solid;
		border-color: #51D3C7;
		padding-top: 20rpx;
		display: flex;
		justify-content: center;
	}
	button::after{
		border: none;
	}
	.btn {
	    display: flex;
	    align-items: center;
	    justify-content: center;
		background-color: #51D3C7;
		/* border: 2rpx solid; */
	    /* border-color: #51D3C7; */
		color: #FFFFFF;
		font-size: 28upx;
	    border-radius: 20rpx;
	    box-shadow: 1px 2px 5px rgba(28, 42, 134, 0.4);
		height: 50rpx;
	}
</style>
