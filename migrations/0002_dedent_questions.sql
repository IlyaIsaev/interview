UPDATE questions SET body = 'Consider the following JavaScript code and determine what the output will be, with an explanation.

```js
function Foo() {
  this.value = 42;
}

Foo.prototype.getValue = function () {
  return this.value;
};

const obj1 = new Foo();
const obj2 = {
  value: 24,
  getValue: obj1.getValue,
};

console.log(obj1.getValue()); // A
console.log(obj2.getValue()); // B

setTimeout(function () {
  console.log(obj1.getValue()); // C
  obj2.value = 100;
  console.log(obj2.getValue()); // D
}, 0);

Promise.resolve().then(() => {
  obj1.value = 84;
  console.log(obj1.getValue()); // E
});

console.log(obj1.getValue()); // F
```

What will be printed at lines A, B, C, D, E, and F?' WHERE id = 47;
UPDATE questions SET body = 'What will be the output of this code, and why?

```js
function mysteryFunction(a) {
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result += (a[i] % 2 === 0) ? a[i] : 0;
  }
  return result;
}

console.log(mysteryFunction([1, 2, 3, 4, 5]));
```' WHERE id = 49;
UPDATE questions SET body = 'Given the box1, what is the width of box1 (including border and padding)?

```html
<html>
<head>
<meta name="viweport"/>
<style>
.box{
width:240px;
border:10px;
padding:20px;
}
@media(min-width:600px){
box1{
width:180px;
}
}
@media(max-width:600px){
box1{
width:260px;
}
}
</style>
</head>
<body>
<div id="box1" class="box">
</div>
<div id="box2" class="box">
</div>
<div id="box3" class="box">
</div>
</body>
</html>
```' WHERE id = 50;
UPDATE questions SET body = 'How will you optimize the following code? It gets an array of strings that contain numbers and should return an array of unique numbers.

```js
let res = [];
let numsArray = ["123", "546", "1", "2002", "1365", "1", "2002", "300"];
let pattern = "[^0-9]";
for (var num of numsArray) {
  if (pattern.test(num) {
    numsArray.push(num);
  }
}
```' WHERE id = 55;
UPDATE questions SET body = 'Given products and special offers, build a page that lists Black Friday products in decreasing order by total product count, showing each product’s title and price. Expected order: Boots $11, T-Shirt $35, Chess Board $19, 1984 $22.

```js
async function displayBlackFridayProducts() {
  const { products, offers } = await getProductsAndDeals();
}

displayBlackFridayProducts();

function getProductsAndDeals() {
  return new Promise((resolve, reject) => {
    resolve({
      products: [
        { id: "product_1", title: "Baker", category: "kitchen", price: 12, discount: 0, count: { warehouse: 2, store: 3, reserve: 5 } },
        { id: "product_2", title: "1984", category: "books", discount: 22, price: 22, count: { warehouse: 2 } },
        { id: "product_3", title: "T-Shirt", category: "clothing", discount: 5, price: 35, count: { store: 3, reserve: 5 } },
        { id: "product_4", title: "Boots", category: "clothing", discount: 34, price: 11, count: { warehouse: 6, store: 1, reserve: 3 } },
        { id: "product_5", title: "Chess Board", category: "games", discount: 0, price: 19, count: { warehouse: 2, store: 3 } },
        { id: "product_6", title: "Fifa 2023", category: "games", price: 64, discount: 12, count: { warehouse: 2, store: 3, reserve: 5 } },
        { id: "product_7", title: "God of War", category: "games", discount: 22, price: 44, count: { warehouse: 2, store: 3, reserve: 5 } },
      ],
      offers: [
        { id: "offer_1", title: "Black Friday Deals", code: "BF_2023", product: "product_5" },
        { id: "offer_2", title: "Black Friday Deals", code: "BF_2023", product: "product_2" },
        { id: "offer_3", title: "Black Friday Deals", code: "BF_2023", product: "product_4" },
        { id: "offer_4", title: "Christmas Deals", code: "CH_2023", product: "product_1" },
        { id: "offer_5", title: "Black Friday Deals", code: "BF_2023", product: "product_3" },
        { id: "offer_6", title: "Black Friday Deals", code: "BF_2023", product: "product_5" },
        { id: "offer_7", title: "Cyber Monday Deals", code: "CM_2023", product: "product_7" },
        { id: "offer_8", title: "Cyber Monday Deals", code: "CM_2023", product: "product_5" },
      ],
    });
  });
}
```' WHERE id = 57;
UPDATE questions SET body = 'What does this print?

```js
let str = "medium";
str[0] = "k";
console.log(str);
```' WHERE id = 88;
UPDATE questions SET body = 'What does this print?

```js
console.log(0.1 + 0.2 == 0.3);
```' WHERE id = 89;
UPDATE questions SET body = 'What does this print?

```js
(function () {
  var x = y = 3;
})();

console.log(typeof x !== "undefined");
console.log(typeof y !== "undefined");
```' WHERE id = 90;
UPDATE questions SET body = 'What does this print?

```js
let arr = [1, 2, 3];
arr[10] = 99;
console.log(arr.length);
console.log(arr);
```' WHERE id = 91;
UPDATE questions SET body = 'What does this print?

```js
const a = {};
const b = { key: "b" };
const c = { key: "c" };
a[b] = 123;
a[c] = 456;
console.log(a[b]);
```' WHERE id = 92;
UPDATE questions SET body = 'What does this print? How would you change the loop so it prints 0 through 4?

```js
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
```' WHERE id = 93;
UPDATE questions SET body = 'What does this print?

```js
var foo = function bar() {
  return 1;
};

console.log(typeof bar);
```' WHERE id = 95;
UPDATE questions SET body = 'What does this print?

```js
let x = 10;
let y = (x++, x + 1);
console.log(y);
```' WHERE id = 96;
UPDATE questions SET body = 'What does this print?

```js
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```' WHERE id = 97;
UPDATE questions SET body = 'What does this print?

```js
const a = [1, 2, 3];
const b = [1, 2, 3];
const c = "1,2,3";

console.log(a == c);
console.log(b == c);
console.log(a == b);
```' WHERE id = 98;
UPDATE questions SET body = 'What does this print?

```js
let obj1 = {};
let obj2 = {};
console.log(obj1 == obj2);
console.log(obj1 === obj2);
```' WHERE id = 117;
UPDATE questions SET body = 'What does this print?

```js
console.log("a");

setTimeout(() => {
  console.log("b");
}, 0);

const promise = new Promise((resolve) => {
  console.log("e");
  resolve("c");
});

promise.then((result) => {
  console.log(result);
});

console.log("d");
```' WHERE id = 118;
UPDATE questions SET body = 'What does this print?

```js
console.log(a);
var a = 10;
```' WHERE id = 145;
UPDATE questions SET body = 'What does this print?

```js
console.log(b);
let b = 10;
```' WHERE id = 146;
UPDATE questions SET body = 'What does this print?

```js
foo();
function foo() {
  console.log("Hello");
}
```' WHERE id = 147;
UPDATE questions SET body = 'What does this print?

```js
bar();
var bar = function () {
  console.log("Hi");
};
```' WHERE id = 148;
UPDATE questions SET body = 'What does each call return?

```js
const obj = {
  name: "JS",
  regular: function () {
    return this.name;
  },
  arrow: () => {
    return this.name;
  },
};

console.log(obj.regular());
console.log(obj.arrow());
```' WHERE id = 149;
UPDATE questions SET body = 'What does this print?

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```' WHERE id = 150;
UPDATE questions SET body = 'What does this print?

```js
console.log(0 == "0");
console.log(0 === "0");
```' WHERE id = 152;
UPDATE questions SET body = 'What does this print?

```js
const a = {};
const b = {};
a[b] = "hello";
console.log(a[b]);
```' WHERE id = 153;
UPDATE questions SET body = 'What does this print?

```js
console.log([] + []);
console.log([] + {});
console.log({} + []);
```' WHERE id = 154;
UPDATE questions SET body = 'What does this print, and in what order?

```js
console.log("start");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("end");
```' WHERE id = 155;
UPDATE questions SET body = 'What does this print?

```js
let x = 5;
function test() {
  let x = 10;
  console.log(x);
}
test();
console.log(x);
```' WHERE id = 156;
UPDATE questions SET body = 'What does this print?

```js
let obj1 = { name: "A" };
let obj2 = obj1;
obj2.name = "B";
console.log(obj1.name);
```' WHERE id = 157;
UPDATE questions SET body = 'What do the two calls print?

```js
function outer() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter();
counter();
```' WHERE id = 158;
UPDATE questions SET body = 'What does this print?

```js
(function () {
  var x = (y = 5);
})();

console.log(typeof x);
console.log(typeof y);
```' WHERE id = 159;
UPDATE questions SET body = 'What does this print?

```js
function foo(a, b) {
  arguments[0] = 99;
  console.log(a);
}

foo(1, 2);
```' WHERE id = 160;
UPDATE questions SET body = 'What does this print?

```js
const [a = 1, b = 2] = [undefined, null];
console.log(a, b);
```' WHERE id = 161;
UPDATE questions SET body = 'What does this print?

```js
const arr = [1, , 3];
console.log(arr.length);
console.log(arr[1]);
```' WHERE id = 162;
UPDATE questions SET body = 'What does this print?

```js
const person = {
  name: "Alice",
  greet: function () {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  },
};

person.greet();
```' WHERE id = 163;
UPDATE questions SET body = 'What does this print?

```js
const obj = Object.freeze({ name: "Test" });
obj.name = "Changed";
console.log(obj.name);
```' WHERE id = 164;
UPDATE questions SET body = 'What does this print?

```js
const { a, b } = { b: 1, a: 2 };
console.log(a, b);
```' WHERE id = 165;
UPDATE questions SET body = 'What does this print?

```js
const arr = [1, 2, 3];
const copy = [...arr];
copy[0] = 9;
console.log(arr[0]);
```' WHERE id = 166;
UPDATE questions SET body = 'Write `fetchKeys`. It walks a nested object or array and returns every path that points at a primitive.

`{ a: { b: { c: 1 }, d: 2 }, e: 3 }` → `["a.b.c", "a.d", "e"]`

`[1, { a: 2, b: [3, 4] }, 5]` → `["0", "1.a", "1.b.0", "1.b.1", "2"]`' WHERE id = 170;
UPDATE questions SET body = 'Write `processDomainOperation(operations)`. Each row is an operation with up to three strings: the op, a domain, and an IP.

- `PUT` stores a domain and its IP.
- `GET` returns that IP, or `"404"` if the domain is missing.
- `COUNT` counts domains that equal the query or end with `"." + query`.

Sample input:

```js
[
  ["PUT", "www.apple.com", "10.20.30.40"],
  ["PUT", "jobs.apple.com", "10.20.30.50"],
  ["PUT", "sites.google.com", "142.258.145.693"],
  ["GET", "sample.com"],
  ["GET", "www.apple.com"],
  ["COUNT", "apple.com"],
  ["COUNT", "com"],
]
```

Expected output: `["404", "10.20.30.40", "2", "3"]`' WHERE id = 171;
UPDATE questions SET body = 'What does this print?

```js
const p = new Promise((resolve) => {
  console.log("1");
  setTimeout(() => {
    resolve();
  });
});

Promise.resolve().then(() => console.log("2"));
setTimeout(() => console.log("3"));
p.then(() => console.log("4"));
setTimeout(() => console.log("5"));
```' WHERE id = 172;
UPDATE questions SET body = 'What do the two logs show?

```js
let person1 = {
  name: "Anil Kumar",
  address: { line1: "Patna", line2: "Bihar" },
};

let person2 = { ...person1 };
person1.name = "Ravi Kumar";
person1.address.line1 = "Hyderabad";

console.log(person1);
console.log(person2);
```' WHERE id = 173;
UPDATE questions SET body = 'What does this print?

```js
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
console.log(shape.perimeter());
```' WHERE id = 175;
UPDATE questions SET body = 'What does this print?

```js
function foo() {
  const bar = "bar";
  if (true) {
    console.log(bar);
    const bar = "bar1";
  }
}
```' WHERE id = 176;
UPDATE questions SET body = 'Starting from `{ foo: [1], switch: false }`, what is the state after these dispatches? The reducer cases are written `"SET FOO"` and `"PUSH FOO"` (with a space).

```js
dispatch({ type: "SET_FOO", foo: [1, 2] });
dispatch({ type: "PUSH_FOO", foo: 3 });
dispatch({ type: "PUSH_FOO", foo: 6 });
```

`SET FOO` replaces `foo` and sets `switch` to `true`. `PUSH FOO` appends to `foo` and flips `switch`.' WHERE id = 177;
UPDATE questions SET body = 'Which of these is true for React context in React 16.3 and later?

- Context can only be read in class components with `this.context`.
- A context is created with `React.createContext()`.
- The only way to read a context in a function component is the `Consumer` component.
- Context values must be primitive types.' WHERE id = 179;
UPDATE questions SET body = 'An arrow function that only returns a value can drop `return` and the braces, as in `() => 2`. Do the same for an object `{ a: 1 }`. What does this return, and why?

```js
const getObject = () => { a: 1 };
getObject();
```' WHERE id = 268;
UPDATE questions SET body = 'What does this print, and in what order?

```js
console.log("A");

setTimeout(() => {
  console.log("B");
  Promise.resolve().then(() => console.log("C"));
}, 0);

Promise.resolve().then(() => {
  console.log("D");
  setTimeout(() => console.log("E"), 0);
});

console.log("F");
```' WHERE id = 272;
UPDATE questions SET body = 'In React for the web, what happens if you pass an array to `style`?

```jsx
const styles = {
  container: { backgroundColor: "blue" },
  text: { color: "white" },
};

function Box() {
  return (
    <div style={[styles.container, styles.text]}>Hello World</div>
  );
}
```

- React merges the objects, like React Native.
- React throws or ignores the styles, because `style` wants one object.
- This only works with styled-components or Emotion.
- React applies only the first object.' WHERE id = 276;
UPDATE questions SET body = 'What shows on the screen?

```jsx
function App() {
  const data = [];
  const var1 = 10;
  const var2 = 0;

  return (
    <div>
      {data.length && <p>Data Loaded</p>}
      {var1 && <p>Var1 is {var1}</p>}
      {var2 && <p>Var2 is {var2}</p>}
    </div>
  );
}
```

- "Data Loaded", "Var1 is 10", and "Var2 is 0"
- Only "Var1 is 10"
- `0`, "Var1 is 10", `0`
- "Var1 is 10" and "Var2 is 0"' WHERE id = 277;
UPDATE questions SET body = 'Why is this `useEffect` invalid?

```jsx
useEffect(async () => {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  console.log(data);
}, []);
```

- React forbids `async` / `await` inside `useEffect`.
- An async function returns a Promise, and `useEffect` wants nothing or a cleanup function.
- `fetch` cannot run inside `useEffect`.
- Async functions block rendering.' WHERE id = 278;
UPDATE questions SET body = 'Is using `index` as the key correct here?

```jsx
function WeekDays() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <ul>
      {days.map((day, index) => (
        <li key={index}>{day}</li>
      ))}
    </ul>
  );
}
```

- Index keys always make React faster.
- Index keys are always wrong.
- Index keys are safe here because the list never changes order or shape.
- React throws if the key is an index.' WHERE id = 279;
UPDATE questions SET body = 'Why is this a syntax error?

```jsx
function App() {
  return (
    <h1>Hello</h1>
    <p>Welcome to React</p>
  );
}
```

- JSX becomes one `React.createElement` call, and a function can return only one value.
- The DOM needs a single root for the whole document.
- Components must use `render()` to show more than one element.
- Browsers cannot parse tags that are not inside a `div`.' WHERE id = 280;
UPDATE questions SET body = 'What happens to focus and the typed value when you click Swap?

```jsx
function App() {
  const [swap, setSwap] = useState(false);

  return (
    <>
      {swap ? (
        <input key="b" placeholder="B" />
      ) : (
        <input key="a" placeholder="A" />
      )}
      <button onClick={() => setSwap((s) => !s)}>Swap</button>
    </>
  );
}
```

- React sees two `input`s in the same place and keeps state and focus.
- The `key` changed, so React throws away the old input and makes a new one.
- Only the placeholder changes. The DOM node stays.
- `key` is only allowed inside `map`.' WHERE id = 281;
UPDATE questions SET body = 'What is wrong with `tax` here?

```jsx
function App() {
  const [price, setPrice] = useState(10);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    setTax(price * 2);
  }, [price]);

  return <p>Tax: {tax}</p>;
}
```

- The component crashes because `useEffect` cannot set state.
- `tax` stays one step behind `price` because `setTax` is async.
- The dependency array is missing `tax`, so this loops forever.
- `tax` is derived from `price`, so keeping it in state is unnecessary.' WHERE id = 282;
UPDATE questions SET body = 'In React 19, what happens to text typed into `Form` when `mode` goes from `"visible"` to `"hidden"` and back?

```jsx
function Form() {
  const [text, setText] = useState("");

  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type something"
    />
  );
}

function App() {
  const [mode, setMode] = useState("visible");

  return (
    <>
      <button
        onClick={() =>
          setMode((m) => (m === "visible" ? "hidden" : "visible"))
        }
      >
        Toggle
      </button>
      <Activity mode={mode}>
        <Form />
      </Activity>
    </>
  );
}
```

- The component stays mounted in the background and keeps `text`.
- The component unmounts and `text` resets to `""`.
- React throws because a component cannot render while hidden.
- `text` is saved, but the input DOM node is deleted and recreated.' WHERE id = 283;
UPDATE questions SET body = 'This runs without a thrown error, but the header never shows. What is wrong?

```jsx
import header from "./Header";

function App() {
  return (
    <div>
      <header />
    </div>
  );
}
```

- The import needs curly braces.
- React components must start with a capital letter.
- The component must be wrapped in a fragment inside the `div`.
- `header` is a reserved word.' WHERE id = 284;
UPDATE questions SET body = 'The modal flashes at the top, then jumps to the center. What is the best fix?

```jsx
function Modal() {
  const ref = useRef(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const height = ref.current.getBoundingClientRect().height;
    setTop(window.innerHeight / 2 - height / 2);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      Centered Modal
    </div>
  );
}
```

- Nothing is wrong. The jump is expected.
- Add more dependencies to `useEffect`.
- Measure in `useLayoutEffect` instead of `useEffect`.
- Delay the measurement with `setTimeout`.' WHERE id = 285;
UPDATE questions SET body = 'What happens when `print` is called?

```js
var obj = {
  value: 6,
  print: function () {
    console.log(this.value);
  },
};
```' WHERE id = 314;
UPDATE questions SET body = 'What do `data(0)` and `data(5)` return?

```js
const data = (x) => x * 2 || 100;
```' WHERE id = 333;
UPDATE questions SET body = 'Longest substring without repeating characters.

```
Input: "aaa"
Output: 1

Input: "abcdefabcbb"
Output: 6
```' WHERE id = 349;
UPDATE questions SET body = 'Reverse the vowels inside each word of a string.

```
Input: "helloworld"
Output: "hollowerld"

Input: "programming"
Output: "prigrammong"
```' WHERE id = 351;
UPDATE questions SET body = 'Take a number `n` and draw an `n` by `n` grid. Cells start empty. Click an empty cell and it becomes one more than the highest number already on the grid. Click a filled cell and it becomes that highest number.

```
_ _ _
_ _ _
_ _ _

click the first cell

1 _ _
_ _ _
_ _ _

click another empty cell

1 2 _
_ _ _
_ _ _

click the first cell again

2 2 _
_ _ _
_ _ _
```

While you build it, avoid extra renders, compute the max cheaply, and decide what is stored versus derived.' WHERE id = 411;
UPDATE questions SET body = 'Why does this child still re-render?

```jsx
const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});
```' WHERE id = 436;
UPDATE questions SET body = 'What does this print?

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```' WHERE id = 444;
UPDATE questions SET body = 'What does this interval log, and why?

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      console.log(count);
    }, 1000);

    return () => clearInterval(id);
  }, []);
}
```' WHERE id = 466;
UPDATE questions SET body = 'What is wrong here?

```ts
let value: unknown;
console.log(value.toUpperCase());
```' WHERE id = 507;
UPDATE questions SET body = 'Build a crypto portfolio tracker in React Native. The starter is a `FlatList` of coins with `name`, `symbol`, `price`, and `holdings`. Example rows: Bitcoin at 105000 with 0.5 held, Ethereum at 3500 with 10 held.

Show each coin''s name, symbol, price, holdings, and total value. Add up the portfolio. Format money with commas. Stay smooth when the data changes, including 1000+ assets.' WHERE id = 508;
UPDATE questions SET body = 'Build a prototype of an "AI Document Vault".

- A vault UI with a file and folder explorer.
- Upload one or more documents, including drag and drop.
- Show the selected document, plus an AI summary and a cleaned-up markdown version.
- A small backend that accepts uploads, stores the files (local disk is enough), and stores the summary and markdown next to each file.
- On upload, call an LLM to write a short summary and a markdown cleanup. The original, the summary, and the markdown must stay linked.' WHERE id = 516;
UPDATE questions SET body = 'How can you create a deep copy of an object in JavaScript?

- `Object.create(obj)`
- `JSON.parse(JSON.stringify(obj))`
- `Array.from(obj)`
- `Object.assign({}, obj)`' WHERE id = 564;
UPDATE questions SET body = 'What does this print?

```js
let x = 10;

(function () {
  console.log(x);
  let x = 20;
  console.log(x);
})();
```

- `10` and `undefined`
- `10` and `20`
- `undefined` and `20`
- `ReferenceError`' WHERE id = 565;
UPDATE questions SET body = 'What does this print?

```js
function delay() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

async function test() {
  console.log(1);
  await delay();
  console.log(2);
}

test();
console.log(3);
```

- `1 3 2`
- `1 2`, with a 1-second delay before `2`
- `1 2 3`
- `3 1 2`' WHERE id = 566;
UPDATE questions SET body = 'What does this print?

```js
const person1 = {
  firstName: "Ginny",
  getName: function () {
    return this.firstName;
  },
};

const person2 = {
  firstName: "Jhonny",
  getName: () => {
    return this.firstName;
  },
};

const getName1 = person1.getName;
const getName2 = person2.getName;

console.log(person1.getName(), getName1(), person2.getName(), getName2());
```

- `Ginny`, `undefined`, `undefined`, `undefined`
- `undefined`, `undefined`, `undefined`, `undefined`
- `Ginny`, `undefined`, `Jhonny`, `Jhonny`
- `Ginny`, `Ginny`, `Jhonny`, `Jhonny`' WHERE id = 567;
UPDATE questions SET body = 'Which `Array.prototype` methods return a new array every time?

- `map`, `filter`, `slice`
- `map`, `filter`, `sort`, `slice`, `splice`
- `map`, `filter`, `sort`
- `map`, `filter`, `sort`, `slice`' WHERE id = 568;
UPDATE questions SET body = 'What do `(4.98234).toFixed(1)` and `(4.1345).toFixed(1)` return?

- `"5.0"`, `"4.1"`
- `"4.9"`, `"4.1"`
- `"5"`, `"4"`
- `"5.0"`, `"4.2"`' WHERE id = 569;
UPDATE questions SET body = '`MatrixChallenge(strArr)` reads an `N × N` matrix (`N` from 2 to 5). Each string in `strArr` is one row, wrapped in parentheses. A `1` at row `X`, column `Y` means an edge from node `X` to node `Y`. The edge is one-way. Ignore self-edges.

Return `"transitive"` if, whenever `X → Y` and `Y → Z` exist, `X → Z` also exists. Otherwise return the missing edges in lexicographic order, like `(0,1)-(0,4)-(1,4)`.

`["(1,1,1)", "(1,0,0)", "(0,1,0)"]` means `0 → 0`, `0 → 1`, `0 → 2`, `1 → 0`, and `2 → 1`. The missing edges are `(1,2)-(2,0)`.

- `["(1,1,1)","(0,1,1)","(0,1,1)"]` → `transitive`
- `["(0,1,0,0)","(0,0,1,0)","(0,0,1,1)","(0,0,0,1)"]` → `(0,2)-(0,3)-(1,3)`' WHERE id = 570;
UPDATE questions SET body = 'Write `groupBy`. Group these users by `team` into `{ Payments: [...], Risk: [...] }`.

```js
const users = [
  { name: "John", team: "Payments" },
  { name: "Alice", team: "Risk" },
  { name: "Bob", team: "Payments" },
];
```' WHERE id = 575;
UPDATE questions SET body = 'The coding tasks sit on an existing travel app. There is no browser console.

Fix sorting for apartment listings. The sort modal offers price, rating, and title. Bugs were planted in the state, the handlers, and the comparators. Keep the chosen sort when the user leaves the page and comes back. Show the Sort button only on the homepage.' WHERE id = 607;
UPDATE questions SET body = 'Which of these pseudo-element rules are invalid?

- `p::first-line { ... }`
- `h1::first-letter { ... }`
- `span::last-line { ... }`
- `.header::after::first-line { ... }`' WHERE id = 628;
UPDATE questions SET body = 'Which of these are valid CSS transforms?

- `matrix()`
- `modify()`
- `skip()`
- `rotate()`' WHERE id = 629;
UPDATE questions SET body = 'Metadata defines ___ information.

- color
- links
- scripts
- character set' WHERE id = 630;
UPDATE questions SET body = 'Which of these arrived with HTML5?

- Drag and drop
- 2D drawing on a web page
- Timed media playback
- New elements such as `<section>`, `<article>`, and `<footer>`' WHERE id = 631;
UPDATE questions SET body = 'Review this search. What is wrong with the debounce, and would you approve the pull request?

```jsx
function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const debouncedSearchText = useDebounce(searchText, 10);

  const fetchSearchResults = useCallback(async (value) => {
    if (value.length > 0) {
      try {
        const baseURL = generateBaseURL();
        const response = await fetch(
          `${baseURL}/api/apartments/search?location=${value}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error retrieving search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  }, []);

  useEffect(() => {
    fetchSearchResults(debouncedSearchText);
  }, [debouncedSearchText, fetchSearchResults]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
    setShowResults(value.length > 0);
    setIsDropdownOpen(true);
    fetchSearchResults(value);
  };

  const handleApartmentClick = (apartmentId) => {
    navigate(`/apartments/detail/${apartmentId}`);
    setIsDropdownOpen(false);
    setSearchText("");
  };

  const memoizedSearchResults = useMemo(() => {
    return searchResults.length > 0 ? (
      searchResults.map((result) => (
        <p
          key={result._id}
          onClick={() => handleApartmentClick(result._id)}
        >
          {result.address}
        </p>
      ))
    ) : (
      <p className="no-results">No matching results found</p>
    );
  }, [searchResults]);

  return (
    <div className="search-bar">
      <input
        data-testid="search-input"
        type="text"
        className="search-input"
        placeholder="Search for a location"
        value={searchText}
        onChange={handleInputChange}
      />
      <button
        className="search-button"
        onClick={() => fetchSearchResults(searchText)}
      >
        <FaSearch />
      </button>
      {isDropdownOpen && showResults && (
        <div data-testid="search-div" className="results-dropdown">
          {memoizedSearchResults}
        </div>
      )}
    </div>
  );
}
```

```js
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    setDebouncedValue(value);
    const handler = setTimeout(() => {
      console.log("Debounce timer expired");
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```' WHERE id = 633;
UPDATE questions SET body = 'Build compound tabs in React and TypeScript. State lives in `useTabs`. Arrow keys move between tabs. Enter or Space activates one. Use `tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls`, and `aria-labelledby`. The active tab looks different, the focus ring is visible, and there is no `any`.

```tsx
<Tabs defaultTab="overview">
  <Tabs.List>
    <Tabs.Tab id="overview">Overview</Tabs.Tab>
    <Tabs.Tab id="transactions">Transactions</Tabs.Tab>
    <Tabs.Tab id="settings">Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel tabId="overview">Overview content here</Tabs.Panel>
  <Tabs.Panel tabId="transactions">Transactions content here</Tabs.Panel>
  <Tabs.Panel tabId="settings">Settings content here</Tabs.Panel>
</Tabs>
```' WHERE id = 634;
UPDATE questions SET body = 'Implement `Fetcher`. `get(id)` returns the object for that id, or throws if it is missing. `post(id, x)` stores `x` under `id`, or throws if `id` already exists. A `DB` class is already there. `read` and `create` each return a promise that resolves in 10 ms. The database starts empty. There are 1 to 500 queries. Type `1` is get, type `2` is post. `id` and `x` are 1 to 1000.

- `get 1`, `post 1 = 11`, `post 2 = 12`, `get 2` prints `-1` then `12`.
- `post 1 = 11`, `post 2 = 22`, `get 1` prints `11`.' WHERE id = 638;
UPDATE questions SET body = 'Which of these arrived with HTML5? Pick one or more.

- Drag and drop
- 2D drawing on a web page
- Timed media playback
- New elements such as `<section>`, `<article>`, and `<footer>`' WHERE id = 639;
UPDATE questions SET body = 'What is the minimum number of swaps to sort `[5, 3, 1, 7, 2, 6, 4]` ascending, and descending?

- `4, 5`
- `5, 4`
- `4, 4`
- `5, 5`' WHERE id = 641;
UPDATE questions SET body = 'What does this print?

```js
console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
console.log(4);
```' WHERE id = 643;
UPDATE questions SET body = 'What does this do?

```js
function Foo(x) {
  function bar() {
    return x;
  }

  this.baz = function () {
    return x;
  };
}

Foo.prototype.baz = function () {
  return x;
};

const obj = new Foo(10);
obj.baz();
obj.bar();
```

How would you expose `bar` and still keep `x` private?' WHERE id = 659;
UPDATE questions SET body = 'What does this print?

```js
const user = {
  name: "Gourav",
  getName() {
    return this.name;
  },
};

const getName = user.getName;

console.log(user.getName());
console.log(getName());
```' WHERE id = 760;
UPDATE questions SET body = '`POST /payments` with `{ "orderId": "ORD-991", "amount": 499 }`.

The client times out and retries. How do you avoid charging twice?' WHERE id = 783;
