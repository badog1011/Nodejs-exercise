var qs = require('querystring');
require('http').createServer(function (req, res) {
	if ('/' == req.url) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end([
			 '<form method="POST" action="/url">'//瀏覽器會透過<form>標籤中action屬性指定的HTTP方式將表單數據發送過去。
			,'<h1>My form<h1>'
			,'<fieldset>'
			,'<label>Personal information</label>'
			,'<p>What is your name?</p>'
			,'<input type="text" name="name">'
			,'<p><button>Submit</button></p>'
			,'</form>'
			].join(''));
		} else if ('/url' == req.url && 'POST'== req.method) {
			var body = '';
			req.on('data', function (chunk) {
				body += chunk;
			});
			req.on('end', function () {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end('<p>Your name is:<b>' + qs.parse(body).name + '</b></p>');//透過querystring丟字串
			});
		} else {
			res.writeHead(404);
			res.end('Not Found');
		}
}).listen(3000);