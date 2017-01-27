// 타입스크립트의 타입이란 이런 오브젝트의 shape 을 의미합니다.

// interface 키워드를 사용하면,
// 자바스크립트 오브젝트의 shape 을 정의 할 수 있습니다.

// 다음과 같이 testFunc 함수의 파라미터로 쓰인 person 오브젝트의 모양을 정의 할 수 있습니다.
function testFunc(person: {name: string, age: number, location: string}): void {
    console.log(person.name);
}

// testFunc 함수는 다음과 같은 형태로 사용할 수 있습니다.
testFunc({name: 'Mark', age: 35, location: 'seoul'});
// 형태를 다르게 입력하면 제대로 트랜스파일이 되지 않습니다.
// 이런식으로 런타임 전에 타입 체크를 통해 런타임 시 오류가 날 가능성을 줄입니다.
// testFunc({name: 'Mark', age: '35', location: 'seoul'});

// 위에서 쓰인 person 오브젝트의 모양을
// 따로 인터페이스 키워드를 통하여, 미리 지정하고 사용할 수 있습니다.
interface Person {
    name: string;
    age: number;
    location: string;
}