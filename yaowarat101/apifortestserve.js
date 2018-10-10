const express = require('express'); // Web Framework
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql'); // mySql Server client
const path = require('path');
const fs = require('fs');
const multer = require('multer');




/////////////////////// start config server mysql ////////////////////
const connection = mysql.createConnection({
	user: 'root',
	password: 'rootroot',
	host: 'localhost',
	database: 'yaowarat101'
});

connection.connect(function (err) {
	if (err) {
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
	// origin: 'http://192.168.1.198:4200',
	origin: 'http://192.168.1.198:4200',
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())


/////////////////////// end config server mysql ////////////////////

////////////////// start config directory file upload ////////////////
const dirProducts = './image/products';
var fileName = '';

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, dirProducts);
	},
	filename: (req, file, cb) => {
		cb(null, fileName + path.extname(file.originalname));
	}
})
let upload = multer({ storage: storage });

app.post('/upload', upload.single('photo'), function (req, res) {
	if (!req.file) {
		console.log("No file received");
		return res.send({
			success: false
		});

	} else {
		console.log('file received');
		return res.send({
			success: true
		})
	}

});
////////////////// end config directory file upload ////////////////



////////////////////// start api for product table //////////////////////


///////////////////////// get all product
app.get('/products', function (req, res) {
	$query = 'SELECT * from ywr_products';
	connection.query($query, function (err, rows, fields) {
		if (err) {
			console.log(err);
			return;
		}
		res.json(rows);
	});
})

//Search by Name
// app.get('/products/search/:value', function (req, res) {
// 	$query = 'SELECT * from ywr_products WHERE p_Name LIKE "%' + req.params.value + '%" OR p_Id LIKE "%' + req.params.value + '%" OR p_Type LIKE "%' + req.params.value + '%"';
// 	// console.log($query)
// 	connection.query($query, function(err, rows, fields) {
// 		if(err){
//             console.log(err);
//             return;
//         }
//         res.end(JSON.stringify(rows));
//     });
// })


/////////////////////// get product by product id
app.get('/products/:p_Id', function (req, res) {
	$query = 'SELECT * from ywr_products WHERE p_Id = ' + req.params.p_Id;
	connection.query($query, function (err, rows, fields) {
		if (err) {
			console.log(err);
			return;
		}
		res.json(rows);
	});
})



/////////////////////// insert product
app.post('/products', function (req, res) {
	$p_Name = req.body.p_Name.toString();
	$p_Type = req.body.p_Type.toString();
	$p_PercentGold = req.body.p_PercentGold.toString();
	$p_Weight = req.body.p_Weight.toString();
	$p_Length = req.body.p_Length.toString();
	$p_Price = req.body.p_Price.toString();

	$query = 'INSERT INTO ywr_products (p_Type, p_Name, p_PercentGold, p_Weight, p_Length, p_Price) VALUES ("' + $p_Type + '","' + $p_Name + '","' + $p_PercentGold + '","' + $p_Weight + '","' + $p_Length + '","' + $p_Price + '")';
	connection.query($query, function (err, rows, fields) {
		if (err) console.log(err)
		res.json(rows);
		fileName = rows;
		fileName = fileName.insertId
	});
})


////////////////////// update product by product id
app.put('/products', function (req, res) {
	$p_Id = req.body.p_Id.toString();
	$p_Name = req.body.p_Name.toString();
	$p_Type = req.body.p_Type.toString();
	$p_PercentGold = req.body.p_PercentGold.toString();
	$p_Weight = req.body.p_Weight.toString();
	$p_Length = req.body.p_Length.toString();
	$p_Price = req.body.p_Price.toString();

	$query = 'UPDATE ywr_products SET p_Type = "' + $p_Type + '", p_Name = "' + $p_Name + '", p_PercentGold = "' + $p_PercentGold + '", p_Weight = "' + $p_Weight + '", p_Length = "' + $p_Length + '", p_Price = "' + $p_Price + '" WHERE p_Id = ' + $p_Id


	connection.query($query, function (err, rows, fields) {
		if (err) console.log(err)
		res.json(rows);
	});
})


/////////////////////// delete product by product id
app.delete('/products/:p_Id', function (req, res) {
	$p_Id = req.params.p_Id.toString();
	$query = 'DELETE FROM ywr_products WHERE p_Id = ' + $p_Id


	// console.log($query)
	connection.query($query, function (err, rows, fields) {
		if (err) console.log(err)
		res.json(rows);
	});
})

////////////////////// end api for product table //////////////////////



















////////////////////// start api for cart table //////////////////////


////////////////////// get product in cart by user id
app.get('/carts/:u_Id', function (req, res) {
	$query = 'SELECT * from ywr_cart WHERE u_Id = ' + req.params.u_Id;
	connection.query($query, function (err, rows, fields) {
		if (err) {
			console.log(err);
			return;
		}
		res.json(rows);
	});
})


///////////////////// insert product in cart by user id
app.post('/carts/:u_Id', function (req, res) {
	$u_Id = req.params.u_Id;
	$p_Id = req.body.p_Id.toString();
	$p_Name = req.body.p_Name.toString();
	$p_Amount = req.body.p_Amount.toString();
	$p_Price = req.body.p_Price.toString();

	$query = 'INSERT INTO ywr_cart (u_Id, p_Id, p_Name, p_Amount, p_Price) VALUES ("' + $u_Id + '","' + $p_Id + '","' + $p_Name + '","' + $p_Amount + '","' + $p_Price + '")';
	connection.query($query, function (err, rows, fields) {
		if (err) console.log(err)
		res.json(rows);
	});
})




////////////////////// update product by user id and product id
app.put('/carts/:u_Id', function (req, res) {
	$u_Id = req.params.u_Id;
	$p_Id = req.body.p_Id.toString();
	$p_Amount = req.body.p_Amount.toString();

	$query = 'UPDATE ywr_cart SET p_Amount = "' + $p_Amount + '" WHERE u_Id = ' + $u_Id + ' AND p_Id = ' + $p_Id;


	connection.query($query, function (err, rows, fields) {
		if (err) console.log(err)
		res.json(rows);
	});
})



/////////////////////// delete product in cart by user id and product Id
app.delete('/carts/:u_Id/:p_Id', function (req, res) {
	$p_Id = req.params.p_Id.toString();
	$u_Id = req.params.u_Id.toString();
	$query = 'DELETE FROM ywr_cart WHERE p_Id = ' + $p_Id + ' AND u_Id = ' + $u_Id;


	// console.log($query)
	connection.query($query, function (err, rows, fields) {
		if (err) console.log(err)
		res.json(rows);
	});
})

////////////////////// end api for cart table ///////////////////////









////////////////////// start api for user table /////////////////////


app.get('/user', function (req, res) {
	$query = 'SELECT * from ywr_user';
	connection.query($query, function (err, rows, fields) {
		if (err) {
			console.log(err);
			return;
		}
		res.json(rows);
	});
})


app.post('/user', function (req, res) {
	$u_Email = req.body.u_Email.toString();
	$u_Name = req.body.u_Name.toString();
	$u_Tel = req.body.u_Tel.toString();
	$u_Gender = req.body.u_Gender.toString();
	$u_Address = req.body.u_Address.toString();

	$query = 'INSERT INTO ywr_user (u_Email, u_Name, u_Tel, u_Gender, u_Address) VALUES ("' + $u_Email + '","' + $u_Name + '","' + $u_Tel + '","' + $u_Gender + '","' + $u_Address + '")';
	connection.query($query, function (err, rows, fields) {
		if (err) console.log(err)
		res.json(rows);
	});
})


app.get('/user/email', function (req, res) {
	$query = 'SELECT u_Email,COUNT(u_Email),u_Role from ywr_user GROUP BY u_Email';
	connection.query($query, function (err, rows, fields) {
		if (err) {
			console.log(err);
			return;
		}
		res.json(rows);
	});
})


app.get('/user/id/:id', function (req, res) {
	$query = 'SELECT * from ywr_user WHERE u_Id = ' + req.params.id;
	connection.query($query, function (err, rows, fields) {
		if (err) {
			console.log(err);
			return;
		}
		res.json(rows);
	});
})

////////////////////// end api for user table /////////////////////

////////////////////// start api for get image /////////////////////

app.use('/image/products/:picName', function (req, res) {
	res.sendFile(path.join(__dirname, './image/products/' + req.params.picName));
})

app.use('/image/:picName', function (req, res) {
	res.sendFile(path.join(__dirname, './image/' + req.params.picName));
})


////////////////////// end api for get image /////////////////////




/////////////////////////////// end insert data order /////////////////////////////
// app.post('/checkout/', function (req, res) {
// 	var productlist;
// 	var userData;
// 	var orderId;
// 	var date = new Date().toLocaleString().slice(0, 19).replace('T', ' ');
// 	$query = 'SELECT * from ywr_user WHERE u_Id = ' + req.params.u_Id;

// 	connection.query($query, function (err, rows, fields) {
// 		if (err) {
// 			console.log(err);
// 			return;
// 		}
// 		userData = rows
// 		$queryforaddorder = 'INSERT INTO ywr_order (u_Id, u_Name, u_Address, u_Tel, o_Datetime, o_Status) VALUES ("' + userData[0].u_Id + '","' + userData[0].u_Name + '","' + userData[0].u_Address + '","' + userData[0].u_Tel + '","' + date + '","' + 'confirm checkout' + '")';
// 		connection.query($queryforaddorder, function (err, rows, fields) {
// 			if (err) console.log(err)
// 				orderId = rows.insertId
// 			$queryforproduct = 'SELECT * from ywr_cart WHERE u_Id = ' + req.params.u_Id;
// 			connection.query($queryforproduct, function (err, rows, fields) {
// 				if (err) {
// 					console.log(err);
// 					return;
// 				}
// 				productlist = rows

// 				for(i in productlist){

// 					$queryforaddorderproduct = 'INSERT INTO ywr_orderproduct (o_Id, p_Id) VALUES ("' + orderId +'","'+ productlist[i].p_Id + '")'
// 					connection.query($queryforaddorderproduct, function(err, rows, fields){
// 						if (err) {
// 							console.log(err);
// 							return;
// 						}
// 						res.end("succesfully")
// 					})
// 				}

// 			});

// 		});
// 	});
// })

/////////////////////////////// end insert data order /////////////////////////////



app.post('/checkout/', function (req, res) {
	var productlist;
	var userData;
	var orderId;
	var date = new Date().toLocaleString().slice(0, 19).replace('T', ' ');
	$query = '     INSERT INTO ywr_order (u_Id, u_Name, u_Address, u_Tel, o_Datetime, o_Status) VALUES                     ';

	connection.query($query, function (err, rows, fields) {
		if (err) {
			console.log(err);
		}

	});
})

/////////////////////////////// end insert data order /////////////////////////////



/////////////////////////////// get data order /////////////////////////////
app.get('/checkout/:u_Id', function (req, res) {
	var productlist;
	var userData;
	var orderId;
	var date = new Date().toLocaleString().slice(0, 19).replace('T', ' ');
	$query = 'SELECT * FROM ywr_order INNER JOIN ywr_orderproduct ON ywr_orderproduct.o_Id = ywr_order.o_Id INNER JOIN ywr_products ON ywr_products.p_Id = ywr_orderproduct.p_Id WHERE u_Id = ' + req.params.u_Id;
	// console.log($query)

	connection.query($query, function (err, rows, fields) {
		if (err) {
			console.log(err);
			return;
		}
		res.json(rows);
	});
})

app.get('/checkout/orders/:u_Id', function (req, res) {
	var productlist;
	var userData;
	var orderId;
	var date = new Date().toLocaleString().slice(0, 19).replace('T', ' ');
	$query = 'SELECT * FROM ywr_order WHERE u_Id = ' + req.params.u_Id;
	// console.log($query)

	connection.query($query, function (err, rows, fields) {
		if (err) {
			console.log(err);
			return;
		}
		res.json(rows);
	});
})

/////////////////////////////// get data order /////////////////////////////


/////////////////////////////// get data order /////////////////////////////
var o_Id;
app.post('/checkout/order/', function (req, res) {

	$u_Id = req.body.u_Id.toString();
	$u_Name = req.body.u_Name.toString();
	$u_Address = req.body.u_Address.toString();
	$u_Tel = req.body.u_Tel.toString();
	var date = new Date().toLocaleString().slice(0, 19).replace('T', ' ');

	$query = 'INSERT INTO ywr_order (u_Id, u_Name, u_Address, u_Tel, o_Datetime, o_Status) VALUES ("' + $u_Id + '", "' + $u_Name + '", "' + $u_Address + '", "' + $u_Tel + '", "' + date + '", "confirm checkout")';

	// console.log($query)

	connection.query($query, function (err, rows, fields) {
		if (err) {
			console.log(err);
		}
		o_Id = rows.insertId;
		res.json(rows)
	});
})

app.post('/checkout/orderproduct/', function (req, res) {
	// console.log(o_Id)
	req.body.forEach(data => {
		// console.log(data.c_Id)
		// console.log(data)
		$query2 = 'INSERT INTO ywr_orderproduct (o_Id,p_Id,op_Amount) VALUES ("' + o_Id + '", "' + data.p_Id + '", "' + data.p_Amount + '")';

		connection.query($query2, function (err, rows, fields) {
			if (err) {
				console.log(err);
			}
			res.end("ok")
		});
	});

})



/////////////////////////////// get data order /////////////////////////////


