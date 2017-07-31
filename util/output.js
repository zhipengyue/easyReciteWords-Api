
var output = {
    success: function (req,res,data)
    {
        //res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
        let result={
            error:null,
            data:data,
            errcode:0
        }
        res.end(JSON.stringify(result));
    },
    error: function (req,res,error)
    {
        //res.writeHead(200, {'Content-Type': 'app/plain;charset=utf-8'});
        let result={
            error:error,
            data:null,
            errcode:error
        }
        res.end(JSON.stringify(result));
    },
}
module.exports=output;