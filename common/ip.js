
var ipstate = null

class singletonIP {
	constructor() {
		let result = this
		if (ipstate) {
			result = ipstate
		}else{
			ipstate = this
			this.ip = 'http://172.19.38.137:8083'
			// this.ip = 'http://192.168.0.46:8083'
		}
		return result
	}
	setIp(ip) {
		this.ip = ip;
	}
	getIp() {
		return this.ip;
	}
}

export default new singletonIP()
