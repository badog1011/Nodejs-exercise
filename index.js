/**
*Module dependencies.
*/
var fs = require('fs')
  , stdin = process.stdin
  , stdout = process.stdout

fs.readdir(process.cwd(), function (err, files) {//process.cwd()為獲取當前目錄
	console.log('');

	if (!files.length) {
		return console.log('	\033[31m No files to show!\033[39m\n');// \033[31m和\033[39m是為了讓文本成現為紅色
	}

	console.log(' Select which file or directory you want to see\n');
	
	/**
	*讓每個元素接執行此函數
	**/
	var stats = [];
	function file(i) {
		var filename = files[i];//抓取檔案名稱
		
		fs.stat(__dirname + '/' + filename, function (err, stat) {
			stats[i] = stat;//為了避免再次執行fs.stat，將file函式中Stat對象保存下來
			if (stat.isDirectory()) {
				console.log('	'+i+'	\033[36m' + filename + '/\033[39m');//如果是目錄 文本用綠色顯示
			} else {
				console.log('	'+i+'	\033[90m' + filename + '\033[39m');//一般檔案則用 灰色顯示
			}

			
			if (++i == files.length) {
				read();
			} else {
				file(i);//執行函式 直到顯示所有檔案才結束 //採Recursive方式
			}
		});
	}

	//read user input when files are shown
	function read() {
		console.log('');
		process.stdout.write('	\033[33mEnter your choice: \33[39m');//利用console.log不用換行輸入
		process.stdin.resume();
		process.stdin.setEncoding('utf8'); //設置stream編碼為utf8即可支援特殊符號

		stdin.on('data', option);
	}

	//called with the option supplied by the user
	function option(data) {
		var filename = files[Number(data)];//抓取files[i]資料
		if (stats[Number(data)].isDirectory()) {
			fs.readdir(__dirname + '/' + filename, function (err, files) {
				console.log('');
				console.log('	(' + file.length + 'files)');
				files.forEach(function (file) {
					console.log('	-	' + file);
				});
				console.log('');
			});
			// stdout.write('	\033[31mEnter your choice: \33[39m');
		} else {
			// stdin.pause();
			fs.readFile(__dirname + '/' + filename, 'utf8', function (err, data) {//事先指定編碼，(utf8)這樣數據就可以得到相應的字串符號了
				console.log('');
				console.log('\033[90m' + data.replace(/(.*)/g, '	$1') + '\033[39m');//使用正規表達式來添加輔助縮寫後將文件內容進行輸出
			});
		}
	}



	file(0);
});