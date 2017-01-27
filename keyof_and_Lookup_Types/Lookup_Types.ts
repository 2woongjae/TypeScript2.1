// keyof 를 이용한 Lookup Type 시스템이 왜 필요한지 먼저 생각해보도록 하겠습니다.

// 일반적으로 사용하는 프로퍼티의 value 를 가져오거나 저장하는 함수는 다음과 같습니다.
function getPropertyNoKeyof(obj, key) {
    return obj[key];  // Inferred type is T[K]
}

function setPropertyNoKeyof(obj, key, value) {
    obj[key] = value;
}

const x = { foo: 10, bar: 'hello!' };

// 컴파일 타임엔 에러가 없지만, 런타임에 문제가 생깁니다.
const getTest1 = getPropertyNoKeyof(x, 'notExistPropertyName');
console.log(getTest1); // undefined

// 역시 컴파일 타임엔 에러가 없지만 의도치 않게 오브젝트의 형태가 바뀝니다.
setPropertyNoKeyof(x, 'foo', 'setTest1');
console.log(x); // { foo: string, bar: string }

// 위와 같은 문제를 해결하기 위해서는 type-safe 한 Lookup Types 시스템이 필요합니다.
// 앞서 배운 keyof 쿼리 와 type alias 를 이용하여 함수를 수정하면 다음과 같습니다.
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];  // 추론돤 타입
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    obj[key] = value;
}

const y = { foo: 10, bar: 'hello!' };

// const getTest2 = getProperty(y, 'notExistPropertyName'); // (X)
// setProperty(y, 'foo', 'setTest2'); // (X)

const foo = getProperty(y, 'foo');
const bar = getProperty(y, 'bar');

console.log(typeof foo); // number
console.log(typeof bar); // string

// 오브젝트와 프로퍼티의 관계를 규정하지 않아서 발생할 수 있었던 오류를
// 극복하고자 나온 피쳐라고 생각합니다.