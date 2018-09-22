const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', require('./api/api.js'));

app.use('/image/:picName', function (req, res) {
    res.sendFile(path.join(__dirname, './image/' + req.params.picName));
})

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
})

const server = app.listen(8084, function (){
    const port = server.address().port;
    console.log("SERVER LISTENING AT PORT " + port);
})