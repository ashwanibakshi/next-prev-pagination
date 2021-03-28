const { render } = require('ejs');
const connect = require('../config/dbconnect');
const db = require('../config/dboperations');

module.exports.home =(req,res)=>{
    db.getData((err,data)=>{
        if(err){
          console.log('error',err);
          res.render('../views/index',{data:''});
        }
        else{
          console.log('data',data);
          res.render('../views/index',{data:data});
        }
     });
}

module.exports.article = (req,res)=>{
           db.article(req.params.id,(err,data,previous,next)=>{
             if(err){
               console.log(err);
               res.render('../views/article',{data:'',next:'',previous:''});
             }
             else{
               console.log(next,previous);
               res.render('../views/article',{data:data,next:next,previous:previous});
             }
           });
}