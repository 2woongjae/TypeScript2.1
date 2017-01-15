// Person 이란 타입이 하나 있습니다.
interface Person {
    name: string;
    age: number;
    location: string;
}

// Person 의 부분집합인 타입을 만들기 위해 그동안은 이런식으로 정의하여 만들었습니다.
interface PartialPerson1 {
    name?: string;
    age?: number;
    location?: string;
}

// 새로 Mapped 타입을 만드는 방식이 추가되었습니다.
type MakePartial<T> = {
    [P in keyof T]?: T[P];
};

type PartialPerson2 = MakePartial<Person>;

// 그리고 MakePartial 을 만들 필요 없이 제공해줍니다.
type PartialPerson3 = Partial<Person>;

// PartialPerson1, PartialPerson2, PartialPerson3 다 같은 의미의 타입입니다.