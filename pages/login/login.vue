<template>
	<view class="content">
		<form class="login"  @submit="formSubmit">
			<view class="form-item form-cnt login-item">
				<view class="form-prefix-space login-prefix">
					<uni-icons type="person" color="#FFFFFF" size="20"></uni-icons>
				</view>
				<view class="form-mid-space">
					<input type="text" v-model="userinfo.id" placeholder="请输入用户名" name="user"/>
				</view>
			</view>
			<view class="form-item form-cnt login-item">
				<view class="form-prefix-space login-prefix">
					<uni-icons type="locked" color="#FFFFFF" size="20"></uni-icons>
				</view>
				<view class="form-mid-space">
					<input type="password" v-model="userinfo.pswd" placeholder="请输入密码" name="password"/>
				</view>
			</view>
			<view class="btn-area">
				<button class="one-btn login-btn" form-type="submit">登录</button>
			</view>
		</form>
		<!-- input弹出框 -->
		<uni-popup id="dialogInput" ref="dialogInput" type="dialog">
			<uni-popup-dialog mode="input" title="IP地址设置" v-model="ipInfo" placeholder="请输入ip地址" @confirm="dialogInputConfirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import ipConfig from '../../common/ip.js'
	import md5 from "js-md5";
	export default {
		data() {
			return {
				ipInfo:"",
				userinfo:{
					id:"",
					pswd:""
				}
			}
		},
		onNavigationBarButtonTap(e){
			if(e.index == 0){
				this.$refs.dialogInput.open();
			}
		},
		onLoad() {
			this.ipInfo = this.getIP();

		},
		methods: {
			getIP(){
				return ipConfig.getIp()
			},
			formSubmit(e){
				//密码md5加密
				let psw = md5(e.detail.value.password).toUpperCase();
				this.$myRequest({
					url:'/user/login',
					method:'POST',
					data:{
						userid:e.detail.value.user,
						password:psw
					},
					success: (res) => {
						// console.log(res);
						if(res.data.code == 200){
							console.log(res.data.data.user_id);
							uni.setStorageSync("userid",res.data.data.user_id);
							uni.showToast({
								title: e.detail.value.user+'，登录成功',
								icon: 'none',
								mask: true
							});
							setTimeout(() => {
									uni.hideToast();
									//关闭提示后跳转
									uni.navigateTo({
										url: "../search-select/search-select"
									});
								}, 500);	
						}
						else if(res.data.code == 10001){
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								mask: true
							});
						}
						this.userinfo.id = "";
						this.userinfo.pswd = "";
					},
					fail: (err) => {
						console.log('fail', err);
					},
					
				});	
			},
			dialogInputConfirm(val){
				let ip = 'http://'+val
				if (val.indexOf('http')===0){
					 ip = val
				}
				ipConfig.setIp(ip)
				// console.log("configValue：",configValue);
				this.ipInfo = this.getIP();
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
