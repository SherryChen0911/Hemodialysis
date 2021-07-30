
var ipstate = null

class singletonIP {
	constructor() {
		let result = this
		if (ipstate) {
			result = ipstate
		}else{
			ipstate = this
			this.ip = 'http://192.168.0.46:8080'
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
