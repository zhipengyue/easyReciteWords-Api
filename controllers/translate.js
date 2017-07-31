
var validate=require('../util/validate')
var baiduApi='http://api.fanyi.baidu.com/api/trans/vip/translate';
var youdaoApi='https://openapi.youdao.com/api'
var crypto = require('crypto');
var Request=require('../util/Request')
var output=require('../util/output')
var translateModel=require('../model/translate')
module.exports={
     translate:function(req,res){
        /*let params={
            q:req.body.q,
            appid:'20170618000059212',
            code:'fnb5noANAYfutPc462QW',
            appKey:'5e70a52ac0b749df',
            code:'KujZfVJHoCurMyvkzMRopjbqIJHv7QPB',
            from:req.body.from,
            to:req.body.to,
            salt:(new Date).getTime()
     }*/
        /*
        let codestring=params.appKey.toString()+params.q+params.salt.toString()+params.code
        let sign=crypto.createHash('md5').update(codestring).digest('hex');
        params['sign']=sign
        params['q']=encodeURIComponent(params['q'])
        if(validate.validateParams(params,['q','from','to'])){
            delete params['code']
            Request.call(youdaoApi,params,false,'GET',
            function(error,body){
                if(!error){
                    output.success(req,res,body)
                }else{
                    output.error(req,res,error)
                }
            },'getBaidutranslatApi','获取百度API',true)
        }else{
            output.error(req,res,validate.getParamsError(params,['q','from','to']))
        }
        */
        let params={
            word:req.body.q,
            from:req.body.from,
            index:req.body.index,
            size:req.body.size
        }
        if(validate.validateParams(params,['word','from'])){
            if(params['from']=='zh'){
                params['word']=escape(params['word']).toLocaleLowerCase().replace(/%u/gi, 'u');
            }
            console.log(params)
            translateModel.getTranslateResult(params,function(error,data){
                if(!error){
                    console.log(data[0])
                    for(let i in data){
                        let means=JSON.parse(data[i]['means'])
                        means=unescape(means.replace(/u/gi, '%u'));
                        data[i]['means']=means
                    }
                    output.success(req,res,data)
                }else{
                    output.error(req,res,error)
                }
            })
        }else{
            output.error(req,res,validate.getParamsError(params,['word','from']))
        }
    }

}