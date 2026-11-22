# Performance Review Workflow

코드 리뷰 시 아래 순서를 정확히 따른다.

## Step 1 — State Placement

state가 필요 이상으로 위에 있는지 확인한다.

**Bad:**

- Global state for local UI
- Page-level state for component-only concerns
- One state object controlling unrelated features

**Preferred:**

- State lives as close as possible to where it is used
- Split state by update frequency
- Keep temporary UI state local

**Questions:**

- Can this state move down?
- Does this state affect the whole page?
- Is this global state actually global?

---

## Step 2 — Derived State

파생 가능한 데이터를 저장하지 않는다.

**Bad:**

```tsx
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

**Good:**

```tsx
const fullName = `${firstName} ${lastName}`;
```

최소 source of truth만 저장하고, 나머지는 계산한다.

---

## Step 3 — Effects

Effect는 React를 외부 시스템과 동기화할 때만 사용한다.

**Valid:**

- WebSocket
- Event listeners
- Timers
- Browser APIs
- Third-party libraries
- Network subscriptions

**Invalid:**

- Filtering
- Sorting
- Formatting
- Calculating derived values
- Prop-to-state synchronization

**Bad:**

```tsx
useEffect(() => {
  setFiltered(users.filter((u) => u.active));
}, [users]);
```

**Good:**

```tsx
const filtered = users.filter((u) => u.active);
```

---

## Step 4 — React.memo

아래 경우에만 사용:

- Component is expensive
- Parent re-renders frequently
- Props rarely change

**Bad:**

```tsx
const Label = memo(() => {
  return <span>Hello</span>;
});
```

**Good:**

```tsx
const DataGrid = memo(function DataGrid(props) {
  return (...);
});
```

**Rule:** 작은 컴포넌트를 근거 없이 memoize하지 않는다.

---

## Step 5 — useMemo

**Use for:**

- Expensive calculations
- Stable arrays
- Stable objects
- Memoized child props

**Good:**

```tsx
const filteredUsers = useMemo(() => {
  return users.filter(filterFn);
}, [users, filterFn]);
```

**Bad:**

```tsx
const countPlusOne = useMemo(() => count + 1, [count]);
```

**Rule:** 계산이 저렴하면 useMemo를 생략한다.

---

## Step 6 — useCallback

**Use only when:**

- Passing functions to memoized children
- Function is an Effect dependency
- Stable reference is required

**Good:**

```tsx
const handleClick = useCallback(() => {
  save();
}, [save]);
```

**Bad:**

```tsx
const handleClick = useCallback(() => {
  console.log("clicked");
}, []);
```

**Rule:** 함수는 기본적으로 useCallback이 필요하지 않다.
