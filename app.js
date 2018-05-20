const http = require('http');
const fs = require('fs');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

// ここまでメインプログラム

//createServerの処理
function getFromClient(request,response){
	fs.readFile('./index.html','UTF-8',
			(error,data)=>{
			console.log('1');
			var content = data.
			replace(/dummy_title/g, 'タイトルです').
			replace(/dummy_content/g, 'これがコンテンツです。');
			console.log('2');
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(data);
			response.end();
			console.log('3');
			}
		   );
}
