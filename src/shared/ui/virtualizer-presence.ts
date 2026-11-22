import { sortBy } from "es-toolkit/fp";

export const LIST_ANIMATION_MS = 150;
export const MAX_MUTATION_EXITS = 2;

export type ExitingRow<TRow> = {
  readonly key: string | number;
  readonly row: TRow;
  readonly index: number;
};

type MergeExitingInput<TRow> = {
  readonly rows: readonly TRow[];
  readonly exiting: readonly ExitingRow<TRow>[];
  readonly getRowKey: (row: TRow) => string | number;
};

export const mergeExiting = <TRow>({
  rows,
  exiting,
  getRowKey,
}: MergeExitingInput<TRow>): readonly TRow[] => {
  const liveKeys = new Set(rows.map(getRowKey));
  const insertions = sortBy<ExitingRow<TRow>>(["index"])(
    exiting.filter((exitingRow) => !liveKeys.has(exitingRow.key)),
  );

  return insertions.reduce(
    (merged, exitingRow) =>
      merged.toSpliced(Math.min(exitingRow.index, merged.length), 0, exitingRow.row),
    [...rows],
  );
};

type NextExitingInput<TRow> = {
  readonly previousDisplayed: readonly TRow[];
  readonly nextRows: readonly TRow[];
  readonly previousExiting: readonly ExitingRow<TRow>[];
  readonly getRowKey: (row: TRow) => string | number;
  readonly prefersReducedMotion: boolean;
};

export const nextExiting = <TRow>({
  previousDisplayed,
  nextRows,
  previousExiting,
  getRowKey,
  prefersReducedMotion,
}: NextExitingInput<TRow>): readonly ExitingRow<TRow>[] => {
  if (prefersReducedMotion) return [];

  const nextKeys = new Set(nextRows.map(getRowKey));
  const previousExitingKeys = new Set(previousExiting.map((exitingRow) => exitingRow.key));
  const stillExiting = previousExiting.filter((exitingRow) => !nextKeys.has(exitingRow.key));
  const disappeared = previousDisplayed.flatMap((row, index) => {
    const key = getRowKey(row);

    if (nextKeys.has(key)) return [];

    return [{ key, row, index }];
  });

  if (disappeared.length > MAX_MUTATION_EXITS) return [];

  const removed = disappeared.filter((exitingRow) => !previousExitingKeys.has(exitingRow.key));

  return sortBy<ExitingRow<TRow>>(["index"])([...stillExiting, ...removed]);
};
