require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (_req, res) => {
	res.send("Welcome to Nikshop API");
});

app.use('/', require('./routes/entry'));
app.use('/user', require("./routes/user"));
app.use('/produk', require('./routes/produk'));
app.use('/paket', require('./routes/paket'));
app.use('/transaksi', require('./routes/transaksi'));
app.use('/purchase', require('./routes/purchase'));

app.use((err, _req, res, _next) => {
	res.status(500).json({"message": "Internal server error"});
	console.error(err);
});

app.listen(port, () => console.log(`Listening at port ${port}`));
