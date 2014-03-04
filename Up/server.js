module.exports = require('http').createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html'});
	res.end('<br>Hello <br>');
});