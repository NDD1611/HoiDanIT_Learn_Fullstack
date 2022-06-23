
import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
require('dotenv').config();


let app = express();

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

//PORT
let port = process.env.PORT || 6969;
//PORT === undefine => PORT=6969

app.listen(port, ()=>{
    console.log('Backend NODEJS is running on the port: '+ port);
    console.log("localhost:8080")
})