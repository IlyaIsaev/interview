import { describe, expect, it } from "vite-plus/test";
import { mergeExiting, nextExiting } from "./virtualizer-presence";

type Row = {
  id: number;
  label: string;
};

const rowKey = (row: Row): number => row.id;

const rowA = { id: 1, label: "a" };
const rowB = { id: 2, label: "b" };
const rowC = { id: 3, label: "c" };
const rowD = { id: 4, label: "d" };
const rowE = { id: 5, label: "e" };

describe("mergeExiting", () => {
  it("should return rows unchanged when exiting is empty", () => {
    const rows = [rowA, rowB, rowC];

    expect(mergeExiting({ rows, exiting: [], getRowKey: rowKey })).toEqual(rows);
  });

  it("should splice an exiting row at its previous index when it was removed", () => {
    const merged = mergeExiting({
      rows: [rowA, rowC],
      exiting: [{ key: rowB.id, row: rowB, index: 1 }],
      getRowKey: rowKey,
    });

    expect(merged).toEqual([rowA, rowB, rowC]);
  });

  it("should splice multiple exiting rows in index order when they were removed", () => {
    const merged = mergeExiting({
      rows: [rowA],
      exiting: [
        { key: rowC.id, row: rowC, index: 2 },
        { key: rowB.id, row: rowB, index: 1 },
      ],
      getRowKey: rowKey,
    });

    expect(merged).toEqual([rowA, rowB, rowC]);
  });

  it("should skip an exiting row when it is still in rows", () => {
    const merged = mergeExiting({
      rows: [rowA, rowB, rowC],
      exiting: [{ key: rowB.id, row: rowB, index: 1 }],
      getRowKey: rowKey,
    });

    expect(merged).toEqual([rowA, rowB, rowC]);
  });

  it("should clamp the splice index when it is past the end of rows", () => {
    const merged = mergeExiting({
      rows: [rowA],
      exiting: [{ key: rowC.id, row: rowC, index: 5 }],
      getRowKey: rowKey,
    });

    expect(merged).toEqual([rowA, rowC]);
  });
});

describe("nextExiting", () => {
  it("should return a single exiting row when one key is removed", () => {
    const exiting = nextExiting({
      previousDisplayed: [rowA, rowB, rowC],
      nextRows: [rowA, rowC],
      previousExiting: [],
      getRowKey: rowKey,
      prefersReducedMotion: false,
    });

    expect(exiting).toEqual([{ key: rowB.id, row: rowB, index: 1 }]);
  });

  it("should return two exiting rows when two keys are removed", () => {
    const exiting = nextExiting({
      previousDisplayed: [rowA, rowB, rowC],
      nextRows: [rowA],
      previousExiting: [],
      getRowKey: rowKey,
      prefersReducedMotion: false,
    });

    expect(exiting).toEqual([
      { key: rowB.id, row: rowB, index: 1 },
      { key: rowC.id, row: rowC, index: 2 },
    ]);
  });

  it("should keep an in-flight exit and add a new one when another key is removed", () => {
    const exiting = nextExiting({
      previousDisplayed: [rowA, rowB, rowC],
      nextRows: [rowA],
      previousExiting: [{ key: rowB.id, row: rowB, index: 1 }],
      getRowKey: rowKey,
      prefersReducedMotion: false,
    });

    expect(exiting).toEqual([
      { key: rowB.id, row: rowB, index: 1 },
      { key: rowC.id, row: rowC, index: 2 },
    ]);
  });

  it("should return no exits when more than two keys disappear", () => {
    const exiting = nextExiting({
      previousDisplayed: [rowA, rowB, rowC, rowD],
      nextRows: [rowE],
      previousExiting: [],
      getRowKey: rowKey,
      prefersReducedMotion: false,
    });

    expect(exiting).toEqual([]);
  });

  it("should return no exits when more than two keys disappear including an in-flight exit", () => {
    const exiting = nextExiting({
      previousDisplayed: [rowA, rowB, rowC, rowD],
      nextRows: [],
      previousExiting: [{ key: rowA.id, row: rowA, index: 0 }],
      getRowKey: rowKey,
      prefersReducedMotion: false,
    });

    expect(exiting).toEqual([]);
  });

  it("should drop an exiting row when its key reappears", () => {
    const exiting = nextExiting({
      previousDisplayed: [rowA, rowB, rowC],
      nextRows: [rowA, rowB, rowC],
      previousExiting: [{ key: rowB.id, row: rowB, index: 1 }],
      getRowKey: rowKey,
      prefersReducedMotion: false,
    });

    expect(exiting).toEqual([]);
  });

  it("should return no exits when reduced motion is preferred", () => {
    const exiting = nextExiting({
      previousDisplayed: [rowA, rowB, rowC],
      nextRows: [rowA, rowC],
      previousExiting: [],
      getRowKey: rowKey,
      prefersReducedMotion: true,
    });

    expect(exiting).toEqual([]);
  });

  it("should return no exits when nothing was removed", () => {
    const exiting = nextExiting({
      previousDisplayed: [rowA, rowB],
      nextRows: [rowA, rowB, rowC],
      previousExiting: [],
      getRowKey: rowKey,
      prefersReducedMotion: false,
    });

    expect(exiting).toEqual([]);
  });
});
