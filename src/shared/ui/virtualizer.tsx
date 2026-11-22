import { useVirtualizer } from "@tanstack/react-virtual";
import type { Range } from "@tanstack/react-virtual";
import { range } from "es-toolkit/math";
import { motion, MotionConfig, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { LIST_ANIMATION_MS, mergeExiting, nextExiting } from "./virtualizer-presence";
import type { ExitingRow } from "./virtualizer-presence";

const MAX_RENDERED_ROWS = 30;
const ESTIMATED_ROW_SIZE = 88;
const INITIAL_RECT = { width: 1024, height: 800 } as const;
const LIST_ANIMATION_SECONDS = LIST_ANIMATION_MS / 1000;
const TWEEN_EASE = "easeOut" as const;

type VirtualizerProps<TRow> = {
  readonly rows: readonly TRow[];
  readonly getRowKey: (row: TRow) => string | number;
  readonly empty?: ReactNode;
  readonly children: (row: TRow, index: number) => ReactNode;
};

const estimateRowSizePx = (): number => ESTIMATED_ROW_SIZE;

const extractCappedRange = (virtualRange: Range): number[] => {
  const { startIndex, endIndex, count } = virtualRange;

  if (count === 0) return [];

  const budget = Math.min(count, MAX_RENDERED_ROWS);
  const visibleStart = Math.max(0, startIndex);
  const visibleEnd = Math.min(count - 1, Math.max(startIndex, endIndex));
  const visibleCount = visibleEnd - visibleStart + 1;
  const extra = Math.max(0, budget - Math.min(visibleCount, budget));
  const before = Math.min(visibleStart, Math.floor(extra / 2));
  const uncappedStart = visibleStart - before;
  const uncappedEnd = uncappedStart + budget - 1;
  const isOverflowing = uncappedEnd > count - 1;
  const end = isOverflowing ? count - 1 : uncappedEnd;
  const start = isOverflowing ? Math.max(0, end - budget + 1) : uncappedStart;

  return range(start, end + 1);
};

const rowKeysSignature = <TRow,>(
  rows: readonly TRow[],
  getRowKey: (row: TRow) => string | number,
): string => rows.map((row) => String(getRowKey(row))).join("\0");

const hasSameExitingKeys = <TRow,>(
  left: readonly ExitingRow<TRow>[],
  right: readonly ExitingRow<TRow>[],
): boolean => {
  if (left.length !== right.length) return false;

  return left.every(
    (exitingRow, index) =>
      exitingRow.key === right[index]?.key && exitingRow.index === right[index]?.index,
  );
};

export function Virtualizer<TRow>({
  rows,
  getRowKey,
  empty,
  children,
}: VirtualizerProps<TRow>): ReactNode {
  "use no memo";

  const parentRef = useRef<HTMLDivElement>(null);
  const displayedRef = useRef<readonly TRow[]>([]);
  const exitingRef = useRef<readonly ExitingRow<TRow>[]>([]);
  const rowKeysRef = useRef(rowKeysSignature(rows, getRowKey));
  const prefersReducedMotion = useReducedMotion() === true;
  const [exiting, setExiting] = useState<readonly ExitingRow<TRow>[]>([]);
  const rowKeys = rowKeysSignature(rows, getRowKey);
  const displayed = mergeExiting({
    rows,
    exiting: prefersReducedMotion ? [] : exiting,
    getRowKey,
  });
  const latestDisplayedRef = useRef(displayed);
  latestDisplayedRef.current = displayed;

  const getScrollElement = useCallback(() => parentRef.current, []);

  const getRowKeyAtIndex = useCallback(
    (index: number) => {
      const row = latestDisplayedRef.current[index];

      return row === undefined ? index : getRowKey(row);
    },
    [getRowKey],
  );

  // TanStack Virtual mutates its instance; this list is opted out of the compiler.
  // oxlint-disable-next-line react/incompatible-library
  const virtualizer = useVirtualizer({
    count: displayed.length,
    estimateSize: estimateRowSizePx,
    getItemKey: getRowKeyAtIndex,
    getScrollElement,
    initialRect: INITIAL_RECT,
    overscan: 0,
    rangeExtractor: extractCappedRange,
    useFlushSync: false,
  });

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      rowKeysRef.current = rowKeys;
      displayedRef.current = rows;
      exitingRef.current = [];
      setExiting((current) => (current.length === 0 ? current : []));

      return;
    }

    if (rowKeysRef.current !== rowKeys) {
      const next = nextExiting({
        previousDisplayed: displayedRef.current,
        nextRows: rows,
        previousExiting: exitingRef.current,
        getRowKey,
        prefersReducedMotion: false,
      });

      rowKeysRef.current = rowKeys;
      displayedRef.current = mergeExiting({ rows, exiting: next, getRowKey });
      exitingRef.current = next;
      setExiting((current) => (hasSameExitingKeys(next, current) ? current : next));

      return;
    }

    displayedRef.current = displayed;
    exitingRef.current = exiting;
  }, [displayed, exiting, getRowKey, rows, rowKeys, prefersReducedMotion]);

  useEffect(() => {
    if (exiting.length === 0) return;

    const timeoutId = window.setTimeout(() => {
      setExiting([]);
    }, LIST_ANIMATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [exiting]);

  const exitingKeySet = new Set(exiting.map((exitingRow) => exitingRow.key));
  const tweenDuration = prefersReducedMotion ? 0 : LIST_ANIMATION_SECONDS;
  const virtualRows = virtualizer.getVirtualItems();
  const offset = virtualRows[0]?.start ?? 0;

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={parentRef}
        className="scroll-fade no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain"
      >
        {displayed.length === 0 ? (
          empty
        ) : (
          <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
            <div
              className="absolute top-0 left-0 w-full"
              style={{ transform: `translateY(${String(offset)}px)` }}
            >
              {virtualRows.map((virtualRow) => {
                const row = displayed[virtualRow.index];

                if (row === undefined) return null;

                const isExiting = exitingKeySet.has(getRowKey(row));

                return (
                  <motion.div
                    key={virtualRow.key}
                    ref={virtualizer.measureElement}
                    data-index={virtualRow.index}
                    initial={false}
                    animate={isExiting ? { opacity: 0, height: 0 } : { opacity: 1 }}
                    transition={{
                      opacity: { type: "tween", duration: tweenDuration, ease: TWEEN_EASE },
                      height: { type: "tween", duration: tweenDuration, ease: TWEEN_EASE },
                    }}
                    style={{ overflow: isExiting ? "hidden" : undefined }}
                  >
                    {children(row, virtualRow.index)}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
