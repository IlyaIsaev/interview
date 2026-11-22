# Common Anti Patterns

## Memo Everything

```tsx
const text = useMemo(() => "hello", []);
```

저렴한 계산·상수에 useMemo를 쓰지 않는다.

---

## Callback Everything

```tsx
const fn = useCallback(() => {}, []);
```

memoized child나 effect dependency가 아니면 useCallback을 쓰지 않는다.

---

## Effect For Everything

```tsx
useEffect(() => {
  setCount(a + b);
}, [a, b]);
```

파생 값·동기 계산은 render 중에 처리한다.

---

## Massive Context

```tsx
GlobalContext;
```

전체 앱 state를 하나의 context에 넣지 않는다. 책임별로 분리한다.

---

## Index Keys

```tsx
key = { index };
```

순서가 바뀔 수 있는 리스트에 index key를 쓰지 않는다.

---

## Prop To State Copy

```tsx
const [name] = useState(props.name);
```

의도적으로 편집 가능한 local state를 만들 때가 아니면 props를 state로 복사하지 않는다.
