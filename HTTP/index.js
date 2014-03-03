require('http').createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' });//Brownser不知道服務器發送過來的內容是什麼
	res.end('Hello');

	setTimeout(function () {

		res.end('World');
	}, 500);
}).listen(3000);