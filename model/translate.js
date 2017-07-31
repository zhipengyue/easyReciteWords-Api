var db=require('../util/mysql_db');
var mysql = require('mysql');
var translate={
    getTranslateResult:function(params,callback){
        let sql=''
        if(params['from']=='zh'){
            //sql=`SELECT  *  FROM  words as a left join means b on a.ID = b.wordID left join pos on pos.id=a.posID WHERE  b.means like '%`+params['word']+`%' ORDER BY a.times DESC LIMIT 0,10`
            sql=`select words.id,words.voice,words.word,means.means,pos.means as typecn,pos.name as typeen from words 
                left join means on words.ID=means.wordID
                left join pos on pos.id=means.posID
                where means.means like '%`+params['word']+`%' 
                ORDER BY words.times DESC
                limit `+params['index']+`,`+params['size']
            db.query(sql,{},callback);
        }else{
            //sql=`SELECT  *  FROM  words  as a left join means b on a.ID = b.wordID left join pos on pos.id=a.posID WHERE  a.word like '`+params['word']+`' ORDER BY	a.times DESC LIMIT 0,10`
            sql=`select words.id,words.voice,words.word,means.means,pos.means as typecn,pos.name as typeen from words 
                left join means on words.ID=means.wordID
                left join pos on pos.id=means.posID
                where words.word like '`+params['word']+`%' 
                ORDER BY words.times DESC
                limit `+params['index']+`,`+params['size']
            db.query(sql,{},callback);
        }
        
    }
}
module.exports=translate