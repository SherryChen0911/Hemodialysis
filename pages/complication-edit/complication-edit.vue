<template>
	<view class="content">
		<form @submit="submit">
			<view class="form-item">
				<view class="form-prefix-space">
					<text>日期:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>班次:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>穿刺失误:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>穿刺处血肿:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>血管通路感染、堵塞:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>穿刺针脱落或自拔:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>人工肾凝固:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>高血钾:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>失血:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>透析器破膜:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>输液排空:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>头晕、头痛:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>恶心、呕吐:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>体温升高:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>皮肤瘙痒:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>过敏:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>胸闷、胸痛:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>腹痛:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>肌肉痉挛:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>低血糖:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>血压下降休克:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>血压升高:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>心律失常:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>心衰:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>抽搐:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>意识反应迟钝:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>脱水误差≧1Kg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" name=""/>
				</view>
			</view>
			<button class="one-btn btn-margin" form-type="submit">保存</button>
			<button class="err-btn">取消</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			submit(){
				
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
	.btn-margin{
		margin-bottom: 20rpx;
	}
</style>
