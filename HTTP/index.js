require('http').createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'image/png' });//Brownser不知道服務器發送過來的內容是什麼
	var stream = require('fs').createReadStream('image.png');
	stream.on('data', function (data) {
		res.write(data);
	});
	stream.on('end', function (){
		res.end();
	});

	
}).listen(3000);