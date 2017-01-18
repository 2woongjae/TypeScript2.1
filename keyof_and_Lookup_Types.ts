// interface 키워드를 사용해서 값의 shape 를 정의하여 가져다 쓰는 형태입니다.
function testFunc(person: {name: string, age: number, location: string}) {
    console.log(person.name);
}

testFunc({name: 'Mark', age: 35, location: 'seoul'});
// {name: string, age: number, location: string} => 인터페이스 키워드를 이용하여 타입 지정하게 됩니다.

// Person 이라는 타입을 하나 만듭니다.
interface Person {
    name: string;
    age: number;
    location: string;
}

// keyof 라는 타입 쿼리 키워드가 생겼습니다.
// 이 키워드는 type alias 와 함께 쓰일수 있습니다.
// keyof T type 은 subtype of string 으로 간주됩니다.
// 결과의 형태가 문자열이라는 말입니다.

type K1 = keyof Person;
// const k1: K1 = 'name';
// K1 이란 타입은 Person 의 property 인 'name' || 'age' || 'location' 을 나타냅니다. (subtype of string)

type K2 = keyof Person[];
// const k2: K2 = 'name';
// const k2: K2 = 'length';
// K2 란 타입은 Person 이 담긴 Array 이므로 그 Array 의 property 인 'length' | 'push' | 'pop' | 'concat' | ... 등을 나타냅니다.

type K3 = keyof { [x: string]: Person };
// const k3: K3 = 3;
// const k3: K3 = 'any';
// K3 란 타입은 { [x: string]: Person } 이란 타입의 property 이기 때문에 string 인 타입을 나타냅니다.

// * 잠시 { [x: string]: Person } 을 알아보면,
// Indexable Types 이라고 부릅니다.
// string 의 형태일 경우 자료구조의 Map 형태라고 생각하시면 됩니다.
/*
interface PersonMap {
    [x: string]: Person;
}

const p: PersonMap = {};

p['me'] = {
    name: 'mark',
    age: 34,
    location: 'seoul'
};

p['wife'] = {
    name: 'anna',
    age: 23,
    location: 'seoul'
};

console.log(p);
*/

// 또한 type alias 와 ['프로퍼티 네임'] 을 이용하면 property 의 타입을 찾아 낼 수 있습니다.

type P1 = Person['name'];           // string
type P2 = Person['name' | 'age'];   // string | number
type P3 = string['charAt'];         // (pos: number) => string
type P4 = string[]['push'];         // (...items: string[]) => number
type P5 = string[][0];              // string

// keyof 쿼리 와 type alias 를 이용하여,  type-safe 한 lookups 시스템을 사용할 수 있습니다.

function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];  // 추론돤 타입
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    obj[key] = value;
}

function getPropertyNoKeyof(obj, key) {
    return obj[key];  // Inferred type is T[K]
}

function setPropertyNoKeyof(obj, key, value) {
    obj[key] = value;
}

const x = { foo: 10, bar: 'hello!' };

const foo = getProperty(x, 'foo');
const bar = getProperty(x, 'bar');

console.log(typeof foo); // number
console.log(typeof bar); // string

// const oops = getPropertyNoKeyof(x, 'wargarbl'); // 컴파일 타임엔 에러가 없지만, 런타임에 문제가 생깁니다.
// console.log(oops); // undefined
// const oops = getProperty(x, 'wargarbl'); // 컴파일 타임에 에러 Error! "wargarbl" is not "foo" | "bar"
// setPropertyNoKeyof(x, 'foo', 'string'); // 컴파일 타임엔 에러가 없지만 의도치 않게 타입이 바뀝니다.
// setProperty(x, 'foo', 'string'); // 컴파일 타임에 에러 Error!, string expected number

// 위와 같은 이유로 인해
// 함수의 인자로 들어가는 객체와 프로퍼티의 관계를 모를수밖에 없었던 그 동안의 단점을 극복하고자 나온 피쳐라 생각하면 됩니다.