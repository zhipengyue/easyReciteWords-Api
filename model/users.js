var db=require('../util/mysql_db');
var mysql = require('mysql');

var userModel={
    createAccount:function(params,callback){
        let sql=`
        insert into userList 
        (userName,password,email)
        values
        ('`+params['userName']+`','`+params['password']+`','`+params['email']+`')
        `
        db.query(sql,{},callback)
    },
    selectEmailFromList:function(params,callback){
        let sql=`
        select count(*) as count from userList where email='`+params['email']+`'
        `
        db.query(sql,{},callback)
    },
    login:function(params,callback){
        let sql=`
        select * from userList where userName='`+params['userName']+`' And password='`+params['password']+`'
        `
        db.query(sql,{},callback)
    }
}
module.exports=userModel