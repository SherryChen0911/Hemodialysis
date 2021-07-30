
var storeState = null

class store {
	constructor() {
		let result = this
		if (storeState) {
			result = storeState
		}else{
			storeState = this
		}
		return result
	}
	setStorageSync(name,data) {
		this[name] = data;
	}
	getStorageSync(name) {
		return this[name];
	}
}

export default new store()
