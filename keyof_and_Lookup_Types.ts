// interface 는 곧 타입 입니다.
// Person 이라는 타입을 하나 만듭니다.

interface Person {
    name: string;
    age: number;
    location: string;
}

// keyof 라는 타입 쿼리가 생겼습니다.
// 이 쿼리는 type alias 와 함께 쓰일수 있습니다.
// keyof T type 은 subtype of string 으로 간주됩니다.

type K1 = keyof Person;
// const k1: K1 = 'name';
// K1 이란 타입은 Person 의 property 인 'name' || 'age' || 'location' 을 나타냅니다.

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

// 또한 type alias 를 이용하면 property 의 타입을 찾아 낼 수 있습니다.

type P1 = Person['name'];           // string
type P2 = Person['name' | 'age'];   // string | number
type P3 = string['charAt'];         // (pos: number) => string
type P4 = string[]['push'];         // (...items: string[]) => number
type P5 = string[][0];              // string

// keyof 쿼리 와 type alias 를 이용하여,  type-safe lookups 시스템을 사용할 수 있습니다.

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