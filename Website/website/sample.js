/**
*
* 模塊依賴
*
**/

var connect = require('connect')
	, time = require('./request-time')

/**
*
* 建立服務器
*
**/

var server = connect.createServer();

/**
*
* 紀錄請求情況
*
**/

server.use(connect.log('dev'));

/**
*
* 實現中間物
*
**/

server.use(time( {time:500 }));

/**
*
* 快速回應
*
**/

server.use(function(req, res, next) {
	if ('a/' == req.url) {
		res.writeHead(200);
		res.end('Fast!');
	} else {
		next();
	}
});

/**
*
* 慢速回應
*
**/

server.use(function(req, res,) {
	if ('b/' == req.url) {
		setTimeout(function() {
			res.writeHead(200);
			res.end('Slow!');
		}, 1000);
	} else {
		next();
	}
});

server.listen(3000);