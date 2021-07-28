<script>
	import {myRequest} from './common/request.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//获取治疗方式
			this.$myRequest({
				url:'/common/treatment',
				success: (res) => {
					if(res.data.code == 200){
						// console.log(res.data.data);
						let treatmentInfo = res.data.data;
						uni.setStorageSync("treatmentInfo",treatmentInfo);
					}
					else{
						uni.setStorageSync("treatmentInfo","error");
					}
				},
			});
			//获取净化器列表
			this.$myRequest({
				url:'/common/fliterlist',
				success: (res) => {
					if(res.data.code == 200){
						// console.log(res.data.data);
						let fliterInfo = res.data.data;
						uni.setStorageSync("fliterInfo",fliterInfo);
					}
					else{
						uni.setStorageSync("fliterInfo","error");
					}
				},
			});
			//获取抗凝方式列表
			this.$myRequest({
				url:'/common/bloodmethod',
				success: (res) => {
					if(res.data.code == 200){
						// console.log(res.data.data);
						let bloodmethodInfo = res.data.data;
						uni.setStorageSync("bloodmethodInfo",bloodmethodInfo);
					}
					else{
						uni.setStorageSync("bloodmethodInfo","error");
					}
				},
			});
			//获取药品单位列表
			this.$myRequest({
				url:'/common/drugunit',
				success: (res) => {
					if(res.data.code == 200){
						// console.log(res.data.data);
						let drugunitInfo = res.data.data;
						uni.setStorageSync("drugunitInfo",drugunitInfo);
					}
					else{
						uni.setStorageSync("drugunitInfo","error");
					}
				},
			});
			//获取医生列表
			this.$myRequest({
				url:'/common/doctorlist',
				success: (res) => {
					if(res.data.code == 200){
						// console.log(res.data.data);
						let doctorInfo = res.data.data;
						uni.setStorageSync("doctorInfo",doctorInfo);
					}
					else{
						uni.setStorageSync("doctorInfo","error");
					}
				},
			});
			//获取护士列表
			this.$myRequest({
				url:'/common/nurselist',
				success: (res) => {
					if(res.data.code == 200){
						// console.log(res.data.data);
						let nurseInfo = res.data.data;
						uni.setStorageSync("nurseInfo",nurseInfo);
					}
					else{
						uni.setStorageSync("nurseInfo","error");
					}
				},
				fail: (err) => {
					console.log('request fail', err);
				},
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.uni-input-input{ font-size: 28rpx; }
</style>
