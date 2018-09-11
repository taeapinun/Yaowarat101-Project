var express = require('express'); // Web Framework
var app = express();
var bodyParser = require('body-parser')
var cors = require('cors')
var mysql = require('mysql'); // mySql Server client

// Connection string parameters.
var connection = mysql.createConnection({
	user: 'root',
	password: 'rootroot',
	host: 'localhost',
	database: 'yaowarat101'
});

connection.connect(function(err) {
	if(err){
		console.log(err.code);
		console.log(err.fatal);
	}
});

// Start server and listen on http://localhost:8081/
var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port

	console.log("app listening at port %s", port)
});
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())



app.get('/products', function (req, res) {
	$query = 'SELECT * from ywr_products LIMIT 30';
	connection.query($query, function(err, rows, fields) {
		if(err){
            console.log(err);
            return;
        }
        res.end(JSON.stringify(rows));
    });
})

app.get('/products/:p_Id', function (req, res) {
	$query = 'SELECT * from ywr_products WHERE p_Id = ' + req.params.p_Id;
	connection.query($query, function(err, rows, fields) {
		if(err){
            console.log(err);
            return;
        }
        res.end(JSON.stringify(rows));
    });
})


app.post('/products', function (req, res) {
	$p_Id = req.body.p_Id.toString();
	$p_Type = req.body.p_Type.toString();
	$p_Name = req.body.p_Name.toString();
	$p_PercentGold = req.body.p_PercentGold.toString();
	$p_Weight = req.body.p_Weight.toString();
	$p_Length = req.body.p_Length.toString();

    $query = 'INSERT INTO ywr_products (p_Type, p_Name, p_PercentGold, p_Weight, p_Length, p_ImgName) VALUES ("' + $p_Type + '","' + $p_Name + '","' + $p_PercentGold + '","' + $p_Weight + '","' + $p_Length + '", "test")';
    connection.query($query, function(err, rows, fields){
    	if(err) console.log(err)
    	res.end(JSON.stringify('OK'))
    });
})


app.put('/products', function (req, res) {
	$p_Id = req.body.p_Id.toString();
	$p_Type = req.body.p_Type.toString();
	$p_Name = req.body.p_Name.toString();
	$p_PercentGold = req.body.p_PercentGold.toString();
	$p_Weight = req.body.p_Weight.toString();
	$p_Length = req.body.p_Length.toString();
	$p_ImgName = 'test';

    $query = 'UPDATE ywr_products SET p_Type = "'+ $p_Type + '", p_Name = "'+ $p_Name + '", p_PercentGold = "'+ $p_PercentGold + '", p_Weight = "'+ $p_Weight + '", p_Length = "'+ $p_Length + '", p_ImgName = "'+ $p_ImgName + '" WHERE p_Id = ' + $p_Id


    // console.log($query)
    connection.query($query, function(err, rows, fields){
    	if(err) console.log(err)
    	res.end(JSON.stringify('OK'))
    });
})


app.delete('/products', function (req, res) {
	$p_Id = req.body.p_Id.toString();
    $query = 'DELETE FROM ywr_products WHERE p_Id = ' + $p_Id


    // console.log($query)
    connection.query($query, function(err, rows, fields){
    	if(err) console.log(err)
    	res.end(JSON.stringify('OK'))
    });
})