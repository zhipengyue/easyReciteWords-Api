var sendMail=require('./sendMail')
var validate=require('../util/validate')
var userMode=require('../model/users')
var jwt = require('jsonwebtoken')
var crypto=require('crypto')
module.exports={
    avalidateAccount:function(req,res){
        let params={
            userName:req.body.userName,
            password:req.body.password,
            email:req.body.email
        }
        if(validate.validateParams(params,['userName','password','email'])){
            userMode.selectEmailFromList(params,function(error,data){
                if(!error&&data[0]['count']==0){
                    let code=Math.random().toString(36).substr(2)
                    code=code.substring(0,8)
                    sendMail(params['email'],'轻松记单词-请激活您的账号',`
                    <h2>您好，请在APP中输入下面的秘钥完成注册</h2>
                    <p style="color:#387ef5">`+code+`</p>
                    `)
                    res.end(JSON.stringify({error:null,data:code}))
                }else{
                    output.error(req,res,'邮箱已经被占用')
                }
            })
            
        }else{
            output.error(req,res,validate.getParamsError(params,['userName','password','email']))
        }  
    },
    createAccount:function(req,res){
        let params={
            userName:req.body.userName,
            password:req.body.password,
            email:req.body.email
        }
        if(validate.validateParams(params,['userName','password','email'])){
            userMode.createAccount(params,function(error,data){
                res.end(JSON.stringify({error:error,data:data}))
            })
        }else{
            output.error(req,res,validate.getParamsError(params,['userName','password','email']))
        }  
    },
    login:function(req,res){
        let params={
            userName:req.body.userName,
            password:req.body.password
        }
        
        if(validate.validateParams(params,['userName','password'])){
            userMode.login(params,function(error,data){
                console.log(error,data)
                if(!error&&data[0]){
                    let user=data[0]
                    //res.end(JSON.stringify({error:error,data:data[0]}))
                    let token=jwt.sign(user, 'zhipengyue', {
                        'expiresIn': 60*60*24*30 // 设置过期时间
                    });
                    res.end(JSON.stringify({error:error,token:token}))
                }else{
                    res.end(JSON.stringify({error:error,data:'登录失败'}))
                }
            })
        }else{
            output.error(req,res,validate.getParamsError(params,['userName','password']))
        }  
    }

}