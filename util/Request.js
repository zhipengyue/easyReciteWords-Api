var request = require('request');
var Interface=require('./Interface')
let mhRequest={
    call(url,requestData,needBaseJson,requestMethod,callback,interfaceName,interfaceDescription,needLog=false){
                if(needLog) Interface.getHead(interfaceName,interfaceDescription)
                if(needLog) Interface.traceUrl(url)
                jsondata=requestData
                if(needLog) Interface.traceRequest(jsondata)
                request(
                    {
                        uri: url,
                        method: requestMethod,
                        dataType:'jsonp',
                        json:jsondata
                    },
                    function(error, response, body){
                        if(needLog){
                            Interface.requestResult(error,body,interfaceName,interfaceDescription)
                            callback(error,body,function(){
                                Interface.getFoot(interfaceName)
                            })
                            
                        }else{
                        
                            callback(error,body,function(){})
                        }
                        if(error){
                            console.log(error)
                        }

                });
        
    }
}

module.exports=mhRequest