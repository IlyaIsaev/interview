# Advanced Performance Patterns

## Context Optimization

Context 업데이트는 모든 consumer를 리렌더한다.

**Bad:**

```tsx
<AppContext.Provider
  value={{
    user,
    theme,
    modal,
    notification
  }}
>
```

**Good:**

```tsx
<UserContext.Provider>
<ThemeContext.Provider>
<ModalContext.Provider>
```

책임별로 context를 분리하고, provider value를 안정화한다:

```tsx
const value = useMemo(() => ({ user, updateUser }), [user, updateUser]);
```

---

## Props Stability

render 중 새 참조를 만들지 않는다.

**Bad:**

```tsx
<Chart options={{ darkMode: true }} />
```

**Good:**

```tsx
const options = useMemo(
  () => ({
    darkMode: true,
  }),
  [],
);

<Chart options={options} />;
```

**Bad:**

```tsx
<List onSelect={(id) => setId(id)} />
```

필요할 때만 안정화한다.

---

## Large Lists

항상 stable key를 사용한다.

**Bad:**

```tsx
items.map((item, index) => <Row key={index} />);
```

**Good:**

```tsx
items.map((item) => <Row key={item.id} />);
```

**Virtualization 기준:**

- 100+ complex rows
- 1000+ simple rows

**Recommended:** react-window, react-virtualized, TanStack Virtual

---

## Component Architecture

격리를 우선한다.

**Bad:**

```tsx
<Page>
  <Sidebar />
  <Dashboard />
</Page>
```

Sidebar state가 바뀌고 Page가 모든 state를 소유하면:

```tsx
Page rerenders
Dashboard rerenders
```

**Better:**

```tsx
<Page>
  <SidebarController />
  <Dashboard />
</Page>
```

state ownership을 feature에 가깝게 이동한다.

---

## Expensive Search — useDeferredValue

```tsx
const deferredKeyword = useDeferredValue(keyword);
```

**Use for:** Search UI, heavy filtering, large tables

---

## Transitions — useTransition

```tsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setResults(newResults);
});
```

**Use when:** Search results, large table updates, complex filtering, heavy visual changes

**Do not use for:** Input value updates, form typing

---

## Code Splitting

```tsx
const AdminPage = lazy(() => import("./AdminPage"));
```

**Use for:** Admin pages, charts, rich text editors, heavy modals, rarely visited routes

```tsx
<Suspense fallback={<Loading />}>
```

---

## React Compiler Awareness

React Compiler가 자동 최적화할 수 있는 항목:

- memo
- useMemo
- useCallback

수동 memoization은 필요할 때만 추가한다. 올바른 React 코드를 먼저 작성하고, 측정 후 최적화한다.
