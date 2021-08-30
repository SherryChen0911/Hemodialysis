// import urlConfig from './config.js'
import ipConfig from './ip.js'

export const myRequest = (httpConfig) => {
	// console.log(ipConfig.getIp() , httpConfig.url)
    return uni.request({
        url: ipConfig.getIp() + httpConfig.url,
        method: httpConfig.method || 'GET',
        data: httpConfig.data,
        dataType: 'json',
        header: httpConfig.headers || {'content-type': 'application/json'},
		success: (res) => {
			httpConfig.success(res);
		},
		fail: (err) => {
			console.log('request fail:', err);
			uni.showToast({
				title: "接口错误",
				icon: 'none',
				mask: true
			});
		},
    })
 }