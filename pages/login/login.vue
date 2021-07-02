<template>
	<view class="content">
		<form class="login">
			<view class="form-item form-cnt login-item">
				<view class="form-prefix-space login-prefix">
					<uni-icons type="person" color="#FFFFFF" size="20"></uni-icons>
				</view>
				<view class="form-mid-space">
					<input type="text" placeholder="请输入用户名"/>
				</view>
			</view>
			<view class="form-item form-cnt login-item">
				<view class="form-prefix-space login-prefix">
					<uni-icons type="locked" color="#FFFFFF" size="20"></uni-icons>
				</view>
				<view class="form-mid-space">
					<input type="password" placeholder="请输入密码"/>
				</view>
			</view>
			<view class="btn-area">
				<button class="one-btn login-btn" @click="login">登录</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginInfo:{
					name:"",
					psw:""
				}
			}
		},
		onLoad() {

		},
		methods: {
			login(){
				uni.navigateTo({
					url: "../search-select/search-select"
				});
			}
		}
	}
</script>

<style>
	@import url("../../static/css/style.css");
	.login{
		position: absolute;
		top: 400rpx;
		width: calc(100% - 80rpx);
		margin: 0 20rpx 0 20rpx;
	}
	.login-item{
		border-color: #51D3C7;
	}
	.login-prefix{
		width: 80rpx;
		justify-content: center;
		background-color: #51D3C7;
		border-radius: 20rpx 0 0 20rpx;
		padding-left: 0;
	}



	.login-btn{
		position: absolute;
		top: 300rpx;
		margin: 50rpx auto;
		width: calc(100% - 40rpx);
		height: 100rpx;
	}

</style>
