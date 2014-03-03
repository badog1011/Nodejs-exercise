/**
* 模塊依賴
**/

var net = require('net')
/**
*創建服務器
**/

var server = net.createServer(function (conn) {
	// handle connection
	console.log('\033[90m	new connection!\033[39m');
});

/**
* 監聽
**/

server.listen(3000, function () {
	console.log('\033[90m	server listening on *:3000\033[39m');
});