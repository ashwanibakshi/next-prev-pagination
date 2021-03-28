    const express       = require('express');
    const bodyparser    = require('body-parser');
    const path          = require('path');
    const http          = require('http');
    const connection    = require('./config/dbconnect');
    

    const app = express();
    var con;
    //connection to db
    connection.getConnection((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('connected to db');
        }
    });

    //ejs
    app.set('view engine','ejs');

    //fetch data
    app.use(bodyparser.urlencoded({extended:false}));
    app.use(bodyparser.json());

     

    //routes
    app.use('/',require('./routes/article'));

    app.use((req,res,next)=>{
        const error = new Error('404 page not found');
        error.status= 404;
        next(error);
   });

   app.use((error,req,res,next)=>{
        res.status(error.status || 500);
        res.send(error.message);
   });


    http.createServer(app).listen(3000,()=>console.log('sever run at port'+3000));