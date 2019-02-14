const http	= require('http');
const fs 		= require('fs');
const url		= require('url');
const qs		= require('querystring');	

// 쿠키 생성
const parseCookies = (cookie = '') =>
	cookie
		.split(';')
		.map(v => v.split('='))
		.map(([k, ...vs]) => [k,vs.join('=')])
		.reduce((acc, [k, v]) => {
			acc[k.trim()] = decodeURIComponent(v);
			return acc;
		}, {});
// 쿠키 생성

const session = {};

// 서버 로직
const server = http.createServer((req, res)=>{
	const cookies = parseCookies(req.headers.cookie); // 쿠키생성.
	console.log('Cookies Session : ', `${cookies.session}`); // 쿠키이름 로그
	if(req.url.startsWith('/login')){ // 로그인시
		const { query } = url.parse(req.url); // url 가져오기
		const { name } = qs.parse(query); // 
		const expires = new Date(); // 오늘날짜
		expires.setMinutes(expires.getMinutes() + 5); // 5분 뒤
		
		const randomInt = +new Date(); // 날짜 int형
		session[randomInt] = { 
			name,
			expires,
		};
		
		res.writeHead(302, {
			Location: '/main',
			'Set-Cookie' : `session=${randomInt};Expires=${expires.toGMTString()};httpOnly;path=/`,
		});
		res.end();
	}else if(req.url.startsWith('/main')){
		if(cookies.session && session[cookies.session].expires > new Date()){
			res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
			res.end(`${session[cookies.session].name}님 안녕하세요.`);
		}
		
	}else{
		fs.readFile('./cookieLogin.html',(err, data) =>{
			if(err){
				throw err;
			}
			res.end(data);
		})
	}
});

server.listen(8080, ()=>{
	console.log('8080번 포트에서 서버 대기중입니다.');
});

server.on('error',(error)=>{
	console.error(error);
});