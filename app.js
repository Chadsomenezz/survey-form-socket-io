const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();
const server = app.listen(8080,()=>{
    console.log('listening at port 8080')
});
const io = require('socket.io')(server);

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.render('index');
})

io.on('connection',(socket)=>{
    console.log(socket.id)
    socket.emit('greeting',{greet:'Thank you for using this application'})

    socket.on('surveySubmit',(data)=>{
        socket.broadcast.emit('submittedForm',data);
    })
})