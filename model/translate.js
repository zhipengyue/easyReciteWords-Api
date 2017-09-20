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
                limit `+params['index']*params['size']+`,`+params['size']
            db.query(sql,{},callback);
        }else{
            //sql=`SELECT  *  FROM  words  as a left join means b on a.ID = b.wordID left join pos on pos.id=a.posID WHERE  a.word like '`+params['word']+`' ORDER BY	a.times DESC LIMIT 0,10`
            sql=`select words.id,words.voice,words.word,means.means,pos.means as typecn,pos.name as typeen from words 
                left join means on words.ID=means.wordID
                left join pos on pos.id=means.posID
                where words.word like '`+params['word']+`%' 
                ORDER BY words.times DESC
                limit `+params['index']*params['size']+`,`+params['size']
            db.query(sql,{},callback);
        }
    },
    addWordsToList:function(params,callback){
        let sql=`
        INSERT INTO recitewords 
        (wordID,userID,createtime,updatetime)
        values 
        (`+params['wordID']+`,`+params['userID']+`,NOW(),NOW())
        `
        console.log(sql)
        db.query(sql,{},callback)
    },
    getWordFromList:function(wordID,callback){
        let sql=`
        select count(*) as count from recitewords where wordID = `+wordID+` and userID=`+params['userID']
        db.query(sql,{},callback)
    },
    getReciteWordsList:function(params,callback){
        /*sql=`select recitewords.ID,recitewords.wordID,recitewords.createtime,words.voice,words.word,means.means,pos.means as typecn,pos.name as typeen from recitewords 
                left join words on words.ID=recitewords.wordID 
                left join means on words.ID=recitewords.wordID 
                left join pos on pos.id=means.posID
                
                ORDER BY recitewords.createtime DESC
                limit `+params['index']+`,`+params['size']*/

        sql=`select recitewords.*,words.voice,words.word,means.means,pos.means as typecn,pos.name as typeen from recitewords 
                left join words on recitewords.wordID=words.ID
                left join means on words.ID=means.wordID
                left join pos on means.posID=pos.ID
                
                where recitewords.userID=`+params['userID']+`
                ORDER BY recitewords.updatetime DESC
                limit `+params['index']*params['size']+`,`+params['size']


        db.query(sql,{},callback)
    },
    getReciteWordsTotal:function(params,callback){
        /*sql=`select recitewords.ID,recitewords.wordID,recitewords.createtime,words.voice,words.word,means.means,pos.means as typecn,pos.name as typeen from recitewords 
                left join words on words.ID=recitewords.wordID 
                left join means on words.ID=recitewords.wordID 
                left join pos on pos.id=means.posID
                
                ORDER BY recitewords.createtime DESC
                limit `+params['index']+`,`+params['size']*/

        sql=`select count(*) as count from recitewords 
                left join words on recitewords.wordID=words.ID
                left join means on words.ID=means.wordID
                left join pos on means.posID=pos.ID

                where recitewords.userID=`+params['userID']+`
            `
        
        db.query(sql,{},callback)
    },
    deleteWordFromReciteWordsList:function(params,callback){
        let sql=`
        delete from recitewords where ID=`+params['ID']+`
        and userID=`+params['userID']+`
        `
        db.query(sql,{},callback)
    },
    addLabelByUserId:function(params,callback){
        let sql=`
        INSERT INTO labelsList 
        (userID,labelName,createtime)
        values 
        (`+params['userID']+`,'`+params['labelName']+`',NOW())
        `
        db.query(sql,{},callback)
    },
    getLabelByLabelName:function(params,callback){
        let sql=`
        select count(ID) as count from labelsList where labelName='`+params['labelName']+`' and userID=`+params['userID']+`
        `
        db.query(sql,{},callback)
    },
    getLabelListByUserId:function(params,callback){
        let sql=`
        select * from labelsList 
        ORDER BY createtime DESC
        and userID=`+params['userID']+`
        limit `+params['index']*params['size']+`,`+params['size']
        db.query(sql,{},callback)
    },
    getLabelCountByUserId:function(params,callback){
        let sql=`
        select count(*) as count from labelsList 
        and userID=`+params['userID']+`
        `
        db.query(sql,{},callback)
    },
    getReciteWordsInLabelByUserId:function(params,callback){
       let sql=`select wordsLabelList.ID,wordsLabelList.updatetime,words.voice,words.word,means.means,pos.means as typecn,pos.name as typeen 
                from wordsLabelList
                left join words on words.ID=wordsLabelList.wordID
                left join means on words.ID=means.wordID
                left join pos on means.posID=pos.ID
                where wordsLabelList.labelID=`+params['labelID']+`
                and wordsLabelList.userID=`+params['userID']+`
                ORDER BY wordsLabelList.updatetime DESC
                limit `+params['index']*params['size']+`,`+params['size']

        console.log(sql)
        db.query(sql,{},callback)
    },
    getReciteWordsInLabelCountByUserId:function(params,callback){
       let sql=`select count(*) as count
                from wordsLabelList
                left join words on words.ID=wordsLabelList.wordID
                left join means on words.ID=means.wordID
                left join pos on means.posID=pos.ID
                where wordsLabelList.labelID=`+params['labelID']+`
                and wordsLabelList.userID=`+params['userID']+`
                ORDER BY wordsLabelList.updatetime DESC
                limit `+params['index']*params['size']+`,`+params['size']
        db.query(sql,{},callback)
    },
    addWordsToWordsLabelList:function(params,callback){
        let sql=`
        insert into wordslabellist 
        (userID,labelID,wordID,updatetime)
        values
        (`+params['userID']+`,`+params['labelID']+`,`+params['wordID']+`,NOW())
        `
        db.query(sql,{},callback)
    },
    selectWordsCountInWordsLabelList:function(params,callback){
        let sql=`
        select count(*) as count from wordsLabelList 
        where labelID='`+params['labelID']+`' AND wordID='`+params['wordID']+`' 
        and userID=`+params['userID']+`
        `
        db.query(sql,{},callback)
    },
    deleteWordsFromWordsLabelList:function(params,callback){
        let sql=`
        delete from wordsLabelList where ID=`+params['ID']+`
        and userID=`+params['userID']+`
        `

        console.log(sql)
        db.query(sql,{},callback)
    }
}
module.exports=translate