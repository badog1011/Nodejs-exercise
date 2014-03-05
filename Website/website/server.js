/**
* Module dependence
**/

var connect = require('connect')
   ,fs = require('fs')

/**
* Create Server
**/

var server = connect.createServer();
//使用use()來添加static中間物
server.use(connect.static(__dirname + '/subwebsite'));



server.use(function(req, res, next) {
	//紀錄日誌
	console.log(' %s %s ', req.method, req.url);
});

server.use(function(req, res, next) {
	if ('GET' == req.method && '/images' == req.url.substr(0, 7)) {//判斷是否為正確圖片路徑
		fs.stat(__dirname + req.url, function (err, stat) {//此處避免使用同步，否則阻礙其他請求!!!
			if (err || !stat.isFile()) {
				res.writeHead(404);
				res.end('Not Found');
				return;
			}
			serve(__dirname + req.url, 'application/jpg');
		});
	} else {
		next();
	}
});

server.use(function(res, req, next) {
	if ('GET' == req.method && '/' == req.url) {
		serve(__dirname + '/index.html', 'text/html');//跳至index
	} else {
		next();
	}
});

server.use(function(req, res,next) {
	res.writeHead(404);//顯示錯誤訊息
		res.end('Not found');
});

	//app.use(connect.logger('dev'));
	function serve (path, type) {
		res.writeHead(200, { 'Content-Type': type});
		fs.createReadStream(path).pipe(res);
	}
/**
* Listen
**/

server.listen('3000');