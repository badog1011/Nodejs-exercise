/**
* 模塊依賴
**/

var net = require('net')

/**
*創建服務器
**/



/*追蹤連接數*/
var count = 0
   ,users = {}

var server = net.createServer(function (conn) {
	var nickname;
	conn.setEncoding('utf8');//設定編碼方式
	
	conn.write(
		  '\n > welcome to \033[92mnode-chat\033[39m!'
		+ '\n > ' + count + ' other people are connected at this time.'
		+ '\n > please write your name and press enter: '
		);
	count++;
	
	conn.on('data', function (data) {
		data = data.replace('\r\n', '');
		if (!nickname) {
			if (users[data]) {
				conn.write('\n\033[93m> nickname already in use. try again:\033[39m ');
				return;
			} else {
				nickname = data;
				users[nickname] = conn;

				for (var i in users) {
					users[i].write('\033[90m > ' + nickname + ' joined the room\033[39m\n');
				}
			}
		}
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