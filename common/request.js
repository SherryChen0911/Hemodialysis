import urlConfig from './config.js'
    
export const myRequest = (httpConfig) => {
    return uni.request({
        url: urlConfig + httpConfig.url,
        method: httpConfig.method || 'GET',
        data: httpConfig.data,
        dataType: 'json',
        header: httpConfig.headers || {'content-type': 'application/json'},
		success: (res) => {
			httpConfig.success(res);
		},
		fail: (err) => {
			console.log('request fail', err);
		},
    })
 }