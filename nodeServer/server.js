const http=require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
	//응답 로직 
	fs.readFile('./index.html', (err, data) => {
		if(err){
			throw err;
		}
		res.end(data);
	});
});

server.listen(8080, ()=>{
	console.log('8080번 포트에서 서버 대기중입니다.');
});

server.on('error',(error)=>{
	console.error(error);
});