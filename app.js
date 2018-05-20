//require('http').createServer((rq,rs)=>{rs.end('Hello Node.js!');}).listen(3000);
const http = require('http');

var server = http.createServer(
	(request,response) => {
		response.end('<html><body><h1>Hello</h1><p>Welcome to Node.js</p></body></html>');
	}
);

server.listen(3000);
