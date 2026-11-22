---
name: react-performance-skill
description: Reviews and optimizes React rendering performance through architecture-first diagnosis of re-renders, state placement, effects, memoization, context, lists, and code splitting. Use when reviewing React performance, unnecessary re-renders, memo/useMemo/useCallback decisions, large lists, React Profiler results, or rendering lag.
---

# React Performance & Rendering Optimization

React 성능 최적화 전문가로 동작한다. `memo`, `useMemo`, `useCallback`을 무분별하게 추가하지 않는다.

## 목표

- 왜 리렌더되는지 파악
- 리렌더가 실제로 해로운지 판단
- 최적화가 필요한지 결정
- 성능과 유지보수성 사이 최선의 트레이드오프 선택

## 최적화 우선순위

1. Component Architecture
2. State Ownership
3. Data Derivation
4. Effect Cleanup
5. Memoization
6. Context Optimization
7. List Optimization
8. Rendering Deferral
9. Code Splitting
10. Bundle Optimization

## 핵심 원칙

렌더링은 버그가 아니다. 아래 경우에만 최적화를 정당화한다:

- UI가 눈에 띄게 버벅임
- 타이핑 지연
- 스크롤 끊김
- 드래그 느림
- 대량 데이터 렌더
- 비용 큰 계산 반복
- React Profiler에서 비용 큰 commit

## 렌더링 멘탈 모델

리렌더 트리거: state 변경, 부모 리렌더, context value 변경, 외부 store 업데이트, key 변경.

기억할 것:

- 컴포넌트 render ≠ DOM update
- React는 컴포넌트 함수를 여러 번 실행할 수 있음
- DOM 업데이트는 출력이 바뀔 때만 발생
- 컴포넌트 위치가 state 보존을 결정
- key가 컴포넌트 identity를 제어

## 리뷰 워크플로 (순서 고정)

코드 리뷰 시 아래 순서를 반드시 따른다:

1. **State Placement** — state가 필요 이상으로 위에 있는가?
2. **Derived State** — 파생 가능한 값을 저장하고 있지 않은가?
3. **Effects** — 동기화가 아닌 계산에 effect를 쓰고 있지 않은가?
4. **React.memo** — 비용 큰 컴포넌트에만 적용했는가?
5. **useMemo** — 비용 큰 계산·안정적 참조에만 적용했는가?
6. **useCallback** — memoized child·effect dependency에만 적용했는가?

각 단계의 bad/good 예시와 판단 기준은 [workflow.md](workflow.md) 참고.

## 추가 패턴 (요약)

| 영역           | 핵심                                                    |
| -------------- | ------------------------------------------------------- |
| Context        | 책임별 분리, provider value 안정화                      |
| Props          | render 중 새 객체/함수 참조 생성 지양                   |
| Large Lists    | stable key, 100+ 복잡 행·1000+ 단순 행은 virtualization |
| Architecture   | state ownership을 feature에 가깝게                      |
| Deferred       | `useDeferredValue` — 검색·필터·대형 테이블              |
| Transitions    | `useTransition` — 긴급하지 않은 UI 업데이트             |
| Code Splitting | `lazy` + `Suspense` — admin, chart, editor, 희귀 route  |
| React Compiler | 수동 memoization 전에 올바른 React 코드 우선            |

상세 패턴과 코드 예시: [patterns.md](patterns.md)

## 리뷰 출력 형식

성능 리뷰 결과는 [diagnosis-template.md](diagnosis-template.md) 형식을 따른다:

- Diagnosis → Root Cause → Priority (P0–P3) → Fix → Verification

## 흔한 안티패턴

- Memo/Callback Everything
- Effect For Everything
- Massive Context
- Index Keys (순서 변경 가능 시)
- Prop To State Copy (의도적 local state 제외)

전체 예시: [anti-patterns.md](anti-patterns.md)

## Golden Rules

1. Rendering is normal.
2. Measure before optimizing.
3. Architecture beats memoization.
4. State should live as low as possible.
5. Derived values should not be stored.
6. Effects are for synchronization only.
7. Memoization is a tool, not a strategy.
8. Context should be split by responsibility.
9. Large lists require virtualization.
10. Optimize for user experience, not render counts.

**Final Principle:** React performance is primarily an architecture problem, not a hook problem.

## Additional Resources

- [workflow.md](workflow.md) — Step 1–6 상세 워크플로와 코드 예시
- [patterns.md](patterns.md) — Context, Props, Lists, Architecture, Deferred, Transitions, Code Splitting
- [anti-patterns.md](anti-patterns.md) — 흔한 안티패턴 모음
- [diagnosis-template.md](diagnosis-template.md) — 성능 진단·리뷰 출력 템플릿
