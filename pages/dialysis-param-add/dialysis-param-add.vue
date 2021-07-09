<template>
	<view class="content">
		<form>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>记录时间:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" placeholder=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>静脉压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" placeholder=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>动脉压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" placeholder=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>跨膜压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" placeholder=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>血流量ml/min:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" placeholder=""/>
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
					<text>心率(次/min):</text>
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
					<text>收缩压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" placeholder=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>舒张压mmHg:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" placeholder=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>SpO2(%):</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" placeholder=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>电导度ms/cm:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" placeholder=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>超滤率ml/h:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" placeholder=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>透析液温度℃:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" placeholder=""/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-prefix-space">
					<text>渗血:</text>
				</view>
				<view class="form-cnt-noborder form-mid-space">
					<radio-group name="beforeCondition">
						<label  v-for="item in info.bleed" class="radio-item">
							<radio :value="item.value" color="#51D3C7"  style="transform:scale(0.7)" />
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
					<radio-group name="beforeCondition">
						<label  v-for="item in info.slide" class="radio-item">
							<radio :value="item.value" color="#51D3C7"  style="transform:scale(0.7)" />
							{{item.name}}
						</label>					
					</radio-group>	
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
					<text>症状及处理:</text>
				</view>
				<view class="form-cnt form-mid-space">
					<input class="form-mid-space" type="text" placeholder=""/>
				</view>
			</view>
			<button class="one-btn">保存</button>
			<button class="err-btn">取消</button>
		</form>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					bleed:[{name:"是",value:"1"},{name:"否",value:"2"}],
					slide:[{name:"是",value:"1"},{name:"否",value:"2"}],
				},
			}
		},
		methods: {
			
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
