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
	conn.write(
		  '\n > welcome to \033[92mnode-chat\033[39m!'
		+ '\n >' + count + ' other people are connected at this time.'
		+ '\n > please write your name and press enter: '
		);
	count++;
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