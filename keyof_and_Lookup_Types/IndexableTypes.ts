// { [x: string]: Person } 과 같은 타입을
// Indexable Types 이라고 부릅니다.
// string 의 형태일 경우 자료구조의 Map 형태라고 생각하시면 됩니다.

interface Person {
    name: string;
    age: number;
    location: string;
}

interface PersonMap {
    [x: string]: Person;
}

const personMap: PersonMap = {
    me: {
        name: 'mark',
        age: 34,
        location: 'seoul'
    },
    wife: {
        name: 'anna',
        age: 23,
        location: 'seoul'
    }
};

console.log(personMap);

// index 가 number 타입인 경우 array 와 비슷한 타입이 생기지만,
// 다른점이 있습니다.

interface PersonArray {
    [x: number]: Person;
}

const personArray: PersonArray = [
    {name: 'anna', age: 23, location: 'seoul'},
    {name: 'mark', age: 34, location: 'seoul'}
];

console.log(personArray);
// console.log(personArray.length); // (X)

const personArrayOriginal: Person[] = [
    {name: 'anna', age: 23, location: 'seoul'},
    {name: 'mark', age: 34, location: 'seoul'}
];

console.log(personArrayOriginal);
console.log(personArrayOriginal.length);