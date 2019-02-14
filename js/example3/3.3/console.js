const string = 'abc';
const number = 1;
const bool = true;
const obj = {
	outside: {
		inside: {
			key: 'value',
		},
	},
};

console.time('전체시간');
console.log('일반 로그입니다. 쉽표로 구분하여 여러값을 찍을 수 있습니다.');
console.log(string, number, bool);
console.error('이건 에러메세지');

console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1});

console.time('시간측정');
for(let i = 0; i<100000; i++){
	continue;
}
console.timeEnd('시간측정');

function b(){
	console.trace('에러 위치 추적');
}

function a(){
	b();
}

a();

console.timeEnd('전체시간');