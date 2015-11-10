var express = require('express');
var app = express();

app.get("/", function(req, res) {
	res.send('Welcome');
});

var port = 3000;
app.listen(port, function() {
	console.log("listening to port "+ port);
});
