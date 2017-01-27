interface Person {
    name: string;
    age: number;
    location: string;
}

// type alias 와 ['프로퍼티의 key 이름'] 을 이용하면 해당 property 의 타입을 찾아 낼 수 있습니다.
type P1 = Person['name'];           // string
type P2 = Person['name' | 'age'];   // string | number
type P3 = string['charAt'];         // (pos: number) => string
type P4 = string[]['push'];         // (...items: string[]) => number
type P5 = string[][0];              // string