// 2.1 부터는 'keyof' 라는 타입 쿼리할수 있는 키워드가 생겼습니다.
// 이 키워드는 타입을 쿼리하여 새로운 타입으로 만들어주기 때문에
// type alias 와 함께 사용하여 확인할 수 있습니다.

// keyof 키워드를 타입 앞에 쓰면,
// 타입의 키 네임들만 벨류로 가질수 있는 새로운 타입이 만들어집니다.
// 그리고 그 새로운 type 은 subtype of string 으로 간주됩니다.
// 키 네임들의 집합이기 때문입니다.

// 인터페이스를 하나 만들고 keyof 키워드를 사용해 보도록 하겠습니다.
interface Person {
    name: string;
    age: number;
    location: string;
}

type K1 = keyof Person;
// const k1: K1 = 'name';
// K1 이란 타입은 subtype of string 이며,
// K1 타입이 가질수 있는 값은
// Person 의 property name 인 'name' || 'age' || 'location' 입니다.

type K2 = keyof Person[];
// const k2: K2 = 'name'; // (X)
// const k2: K2 = 'length';
// K2 란 타입은 subtype of string 이며,
// K2 타입이 가질수 있는 값은
// Array 의 property name 인 'length' | 'push' | 'pop' | 'concat' | ... 입니다.

type K3 = keyof { [x: string]: Person };
// const k3: K3 = 3; // (X)
// const k3: K3 = 'any';
// K3 란 타입은 subtype of string 이며,
// K3 타입이 가질수 있는 값은
// { [x: string]: Person } 이란 타입의 property name 이기 때문에
// 어떤 string 이라도 가능합니다.