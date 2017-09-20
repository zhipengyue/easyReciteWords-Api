
var validate=require('../util/validate')
var baiduApi='http://api.fanyi.baidu.com/api/trans/vip/translate';
var youdaoApi='https://openapi.youdao.com/api'
var crypto = require('crypto');
//var Request=require('../util/Request')
var request=require('request')
var output=require('../util/output')
var translateModel=require('../model/translate')
var jsdom = require('jsdom').JSDOM
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

module.exports={
     translate:function(req,res){
        /*let params={
            word:req.body.q,
            from:req.body.from,
            index:req.body.index,
            size:req.body.size,
            userID:req.body.userID
        }
        if(validate.validateParams(params,['word','from','userID'])){
            if(params['from']=='zh'){
                params['word']=escape(params['word']).toLocaleLowerCase().replace(/%u/gi, 'u');
            }
            translateModel.getTranslateResult(params,function(error,data){
                if(!error){
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
            output.error(req,res,validate.getParamsError(params,['word','from','userID']))
        }*/
        request(
            {
                uri: 'http://fanyi.baidu.com/#zh/en/%E4%BC%A0%E6%9F%93',
                method: 'GET',
                json:null
            },
            function(error, response, body){
                if(!error){
                    let dom=new jsdom(body)
                    var $ = require('jquery')(dom.window)
                    //console.log($(dom.window.document).html())
                    //console.log(dom.window.document.querySelector(".ordinary-output").children[0])
                }
            });
    },
    addWordsToList:function(req,res){
        let params={
            wordID:req.body.id,
            means:req.body.means,
            voice:req.body.voice,
            userID:req.body.userID
        }
        if(validate.validateParams(params,['wordID','means','userID'])){
            translateModel.getWordFromList(params['wordID'],function(error,data){
                if(!error&&data[0]['count']==0){
                    translateModel.addWordsToList(params,function(error,data){
                        console.log(error,data)
                        if(!error){
                            output.success(req,res,data)
                        }else{
                            output.error(req,res,error)
                        }
                    })
                }else{
                    output.error(req,res,'已经在生词表中了')
                }
            })
        }else{
            output.error(req,res,validate.getParamsError(params,['wordID','means','userID']))
        }
    },
    getReciteWordsList:function(req,res){
        let params={
            index:req.body.index,
            size:req.body.size,
            labelName:req.body.labelName,
            userID:req.body.userID
        }
        if(validate.validateParams(params,['index','size'])){
            translateModel.getReciteWordsList(params,function(error,data){
                
                if(!error){
                    for(let i in data){
                        let means=JSON.parse(data[i]['means'])
                        means=unescape(means.replace(/u/gi, '%u'));
                        let date=new Date(data[i]['updatetime'])
                        //console.log(date.getMonth(),date.getDate(),date.getHours(),date.getMinutes())
                        data[i]['updatetimestr']=date.Format('yyyy-MM-dd hh:mm:ss')
                        data[i]['means']=means
                        data[i]['displaySwither']=false
                    }
                    translateModel.getReciteWordsTotal(params,function(error,pageInfo){
                        console.log(error,pageInfo)
                        if(!error&&pageInfo[0]['count']!==0){
                            res.end(JSON.stringify({error:null,data:{total:pageInfo[0]['count'],list:data}}))
                        }
                    })
                    //output.success(req,res,data)
                }else{
                    output.error(req,res,error)
                }
            })
        }else{
            output.error(req,res,validate.getParamsError(params,['index','size']))
        }
    },
    deleteWordFromReciteWordsList:function(req,res){
        let params={
            ID:req.body.ID,
            userID:req.body.userID
        }
        console.log(params)

        if(validate.validateParams(params,['ID'])){
            translateModel.deleteWordFromReciteWordsList(params,function(error,data){
                
                if(!error){
                    output.success(req,res,data)
                }else{
                    output.error(req,res,'已经删除了')
                }
            })
        }else{
            output.error(req,res,validate.getParamsError(params,['ID']))
        }
    },
    addLabelByUserId:function(req,res){
        let params={
            labelName:req.body.title,
            userID:req.body.userID
        }
        console.log(params)
        if(validate.validateParams(params,['labelName'])){
            translateModel.getLabelByLabelName(params,function(error,data){
                console.log(error,data)
                if(!error&&data[0]['count']==0){
                    translateModel.addLabelByUserId(params,function(error,data){
                        res.end(JSON.stringify({error:error,data:data}))
                    })
                }else{
                    res.end(JSON.stringify({error:'已经有这个标签了',data:null}))
                }
            })
            
        }else{
            output.error(req,res,validate.getParamsError(params,['labelName']))
        }
    },
    getLabelListByUserId:function(req,res){
        let params={
            index:req.body.index,
            size:req.body.size,
            userID:req.body.userID
        }
        if(validate.validateParams(params,['index','size'])){
            translateModel.getLabelListByUserId(params,function(error,data){
                if(!error){
                    translateModel.getLabelCountByUserId(params,function(error,pageInfo){
                        if(!error&&pageInfo[0]['count']!==0){
                            res.end(JSON.stringify({error:null,data:{total:pageInfo[0]['count'],list:data}}))
                        }
                    })
                    
                }
            })
        }else{
            output.error(req,res,validate.getParamsError(params,['index','size']))
        }
    },
    getReciteWordsInLabelByUserId:function(req,res){
        let params={
            index:req.body.index,
            size:req.body.size,
            labelID:req.body.labelID,
            userID:req.body.userID
        }
        console.log(params)
        if(validate.validateParams(params,['index','size'])){
            console.log('1111')
            translateModel.getReciteWordsInLabelByUserId(params,function(error,data){
                console.log(error,data)
                for(let i in data){
                    let means=JSON.parse(data[i]['means'])
                    means=unescape(means.replace(/u/gi, '%u'));
                    let date=new Date(data[i]['updatetime'])
                    data[i]['updatetimestr']=date.Format('yyyy-MM-dd hh:mm:ss')
                    data[i]['means']=means
                    data[i]['displaySwither']=false
                }
                if(!error){
                    translateModel.getReciteWordsInLabelCountByUserId(params,function(error,pageInfo){
                        if(!error){
                            res.end(JSON.stringify({error:null,data:{total:pageInfo[0]['count'],list:data}}))
                        }
                    })
                    
                }
            })
        }else{
            output.error(req,res,validate.getParamsError(params,['index','size']))
        }
    },
    addWordsToWordsLabelList:function(req,res){
        let params={
            labelID:req.body.labelID,
            wordID:req.body.wordID,
            userID:req.body.userID
        }
        if(validate.validateParams(params,['wordID','labelID'])){
            translateModel.selectWordsCountInWordsLabelList(params,function(error,data){
                if(!error&&data[0]['count']==0){
                    translateModel.addWordsToWordsLabelList(params,function(error,data){
                        if(!error){
                            output.success(req,res,data)
                        }else{
                            output.error(req,res,error)
                        }
                    })
                }else{
                    output.error(req,res,'已经在标签中了')
                }
            })
        }else{
            output.error(req,res,validate.getParamsError(params,['wordID','labelID']))
        }
    },
    deleteWordsFromWordsLabelList:function(req,res){
        let params={
            ID:req.body.ID,
            userID:req.body.userID
        }
        console.log('////////////////////')
        console.log(params)
        if(validate.validateParams(params,['ID'])){
            translateModel.deleteWordsFromWordsLabelList(params,function(error,data){
                console.log(error,data)
                if(!error){
                    output.success(req,res,data)
                }else{
                    output.error(req,res,'已经删除了')
                }
            })
        }else{
            output.error(req,res,validate.getParamsError(params,['ID']))
        }
    }

}