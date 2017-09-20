var validate=require('../util/validate')
var jwt = require('jsonwebtoken')
var middleWare={
    getToken:function(req,res,next){
        let params={
            token:req.body.token
        }
        if(validate.validateParams(params,['token'])){
            jwt.verify(params['token'], 'zhipengyue', function(err, decoded) {
                req.body['userID']=decoded['userID']
                next();
            });
        }else{
            res.end(JSON.stringify({error:null,data:validate.getParamsError(params,['token'])}))
        }
    }
}
module.exports=middleWare