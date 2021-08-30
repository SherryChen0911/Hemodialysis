import Vue from 'vue'
import App from './App'
import {myRequest} from './common/request.js'

let configValue = 'http://192.168.0.46:8083';
// export default configValue

Vue.config.productionTip = false;
Vue.prototype.$myRequest = myRequest;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
