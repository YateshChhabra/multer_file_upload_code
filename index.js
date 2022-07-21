const express = require('express');
const app = express();
const fileUpload = require('./routes/fileUpload');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/fileUpload',fileUpload);


app.listen(1234, ()=>{
    console.log("Server Started at port 1234");
})