/**
* 模塊依賴
**/

var net = require('net')

/**
*創建服務器
**/

/*追蹤連接數*/
var count = 0;

var server = net.createServer(function (conn) {
	conn.setEncoding('utf8');//設定編碼方式
	conn.write(
		  '\n > welcome to node chat!'
		+ '\n > ' + count + ' other people are connected at this time.' 
		+ '\n > please write your name and press enter: '
		);
	count++;

	conn.on('data', function (data) {
		console.log(data);
	});
	conn.on('close', function () {
		count--;
	});
});

/**
* 監聽
**/

server.listen(3000, function () {
	console.log('\033[90m	server listening on *:3000\033[39m');
});