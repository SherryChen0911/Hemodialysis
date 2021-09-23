<template>
	<view class="my-radio-area">
		<view class="my-radio-item" v-for="(item, index) in radioList">
			<view class="my-radio-circle" @click="itemClick(index)">
				<image v-if="item.check" src="@/static/radiopic.png" style="width: 30rpx; height: 30rpx;"></image>
			</view>
			<text>{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			radioList: {
			  type: Array,
			  default() {
				return [];
			  },
			},
		},
		methods:{
			itemClick(index){
				this.radioList[index].check = !this.radioList[index].check;
				for (let z = 0; z < this.radioList.length; z++)
				{
					if(z !== index){
						this.radioList[z].check = false;
					}
					if(this.radioList[z].check == true){
						this.$emit("radioClick",this.radioList[z].value)
					}
				}
				
			}
		},
	}
</script>

<style>
	.my-radio-area{
		/* background-color: #007AFF; */
		display: flex;
		align-items: center;
		font-size: 24rpx;
		flex-wrap: wrap;
	}
	.my-radio-item{
		height: 60rpx;
		display: flex;
		align-items: center;
		margin-right: 20rpx;
	}
	.my-radio-circle{
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
</style>
