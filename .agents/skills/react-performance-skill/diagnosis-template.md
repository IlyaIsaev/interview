# Performance Diagnosis Template

코드 리뷰 시 아래 형식으로 결과를 작성한다.

## Diagnosis

설명할 것:

- What is rerendering
- Why it rerenders
- Whether rerender is actually harmful

## Root Cause

분류:

- State placement
- Context update
- Parent rerender
- Unstable props
- Expensive calculation
- Large list
- Effect misuse

## Priority

| Level | Meaning                      |
| ----- | ---------------------------- |
| P0    | Visible lag                  |
| P1    | Repeated expensive rendering |
| P2    | Architecture risk            |
| P3    | Premature optimization       |

## Fix

제공할 것:

- Smallest valid fix
- Reasoning
- Tradeoffs

## Verification

설명할 것:

- React DevTools Profiler usage
- Before/after measurement
- Expected improvement
