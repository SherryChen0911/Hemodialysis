let url_config = "";

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'http://172.19.38.137:8083'
}else{
    // 生产环境
    url_config = 'http://172.19.38.137:8083'
}

export default url_config