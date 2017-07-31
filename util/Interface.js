/*
*   controller 的基类。处理规范化输出主要逻辑。
*/
//var logger = require('../log').logger;
//var RemoteDebug=require('./RemoteDebug')
let Interface = {
    call(interfaceName,interfaceDescription,callback){
        //1 日志 head
        console.log(this.getstrip().front+interfaceName+this.getstrip().end)
        console.log('/**')
        console.log('*'+interfaceDescription)
        console.log('**/')
        callback()
        console.log(this.getstrip().front+interfaceName+' ending'+this.getstrip().end)
    },
    getHead(interfaceName,interfaceDescription){
        console.log(this.getstrip().front+interfaceName+this.getstrip().end)
        console.log('/**')
        console.log('*'+interfaceDescription)
        console.log('**/')
    },
    getFoot(interfaceName){
        console.log(this.getstrip().front+interfaceName+' ending'+this.getstrip().end)
    },
    getstrip(){
        let strip = ''
        let stars=''
        for(let i=0;i<20;i++){
            strip+='-'
            stars+='*'
        }
        return{
            front:strip+'<',
            end:'>'+strip,
            stars:stars,
            strip:strip
        }
    },
    traceUrl(url){
        console.log('请求地址：'+url)
        //RemoteDebug.getInstance().init('远程测试地址：'+url)
    },
    traceRequest(data){
        console.log('请求参数：'+this.getstrip().strip)
        console.log(data)

    },
    requestResult(error,body,interfaceName,interfaceDescription){
        if(error){
            console.log('/*'+interfaceName+'*/')
            console.log('/*'+interfaceDescription+'*/')
            console.log('调用错误:'+this.getstrip().strip+this.getstrip().strip)
            console.log(error)
        }
        if(body){
            console.log('调用结果：'+this.getstrip().strip+this.getstrip().strip)
            console.log(body)
        }
    }
}
module.exports=Interface