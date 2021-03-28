    const connect = require('../config/dbconnect');

    var dbCon ;  
    connect.getConnection((err,connection)=>{
            if(err){
                console.log(err);
            }
            else{
                dbCon=connection;
            }  
    });

    module.exports.getData=(cb)=>{
        try {
                    dbCon.query('select * from post limit ?,?',[0,7],(err,data)=>{
                        
                        if(data){
                            return cb(null,data);
                        }
                        else{
                            
                            return cb(err,null);
                        }
                        dbCon.release();
                    });
        } catch (error) {
            console.log(error)
            return cb(error,null);
        }
    }

    module.exports.article= (id,cb)=>{
        try {
        dbCon.query('select * from post where pid=?',[id],(err,data)=>{
                if(err){
                return cb(err); 
                }
                else{
                    // return cb(null,data);
                    
                dbCon.query('select pid from post where pid<? order by pid desc limit ?',[parseInt(id),1],(err,previous)=>{
                    if(err){
                        return cb(err);
                    }
                    else{
                        dbCon.query('select pid from post where pid>? order by pid limit ?',[parseInt(id),1],(err,next)=>{
                           dbCon.release();
                            if(err){
                            return cb(err);
                        }
                        else{
                            console.log('next',next);
                                 if(err){
                                     return cb(err)
                                 }
                                 else{
                                     
                                    return cb(null,data,previous,next);      
                                 }
                            }
                        });
                    }

                });
                }
        });
        } catch (error) {
            return cb(error,null);
        }
    }