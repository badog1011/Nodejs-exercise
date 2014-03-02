/**
*Module dependencies.
*/
var fs = require('fs')
  , stdin = process.stdin
  , stdout = process.stdout

fs.readdir(process.cwd(), function (err, files) {
	console.log('');

	if (!files.length) {
		return console.log('	\033[31m No files to show!\033[39m\n');// \033[31m和\033[39m是為了讓文本成現為紅色
	}

	console.log(' Select which file or directory you want to see\n');
	
	/**
	*讓每個元素接執行此函數
	**/
	function file(i) {
		var filename = files[i];//抓取檔案名稱

		fs.stat(__dirname + '/' + filename, function (err, stat) {
			if (stat.isDirectory()) {
				console.log('	'+i+'	\033[36m' + filename + '/\033[39m');//如果是目錄 文本用綠色顯示
			} else {
				console.log('	'+i+'	\033[90m' + filename + '\033[39m');//一般檔案則用 灰色顯示
			}

			
			if (++i == files.length) {
				read();
			} else {
				file(i);//執行函式 直到顯示所有檔案才結束
			}
		});
	}

	//read user input when files are shown
	function read() {
		console.log('');
		process.stdout.write('	\033[33mEnter your choice: \33[39m');
		process.stdin.resume();
		process.stdin.setEncoding('utf8'); //設置stream編碼為utf8即可支援特殊符號

		stdin.on('data', option);
	}

	//called with the option supplied by the user
	function option(data) {
		var filename = files[Number(data)];
		if (!files[Number(data)]) {
			stdout.write('	\033[31mEnter your choice: \33[39m');
		} else {
			stdin.pause();
			fs.readFile(__dirname + '/' + filename, 'utf8', function (err, data) {//事先指定編碼，(utf8)這樣數據就可以得到相應的字串符號了
				console.log('');
				console.log('\033[90m' + data.replace(/(.*)/g, '	$1') + '\033[39m');//使用正規表達式來添加輔助縮寫後將文件內容進行輸出
			});
		}
	}



	file(0);
});