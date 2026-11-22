import { describe, expect, it } from "vite-plus/test";
import { pickRandom } from "./pick-random";

describe("pickRandom", () => {
  it("should return undefined when candidates is empty", () => {
    expect(pickRandom([])).toBeUndefined();
  });

  it("should return the only candidate when there is one element", () => {
    expect(pickRandom(["only"])).toBe("only");
  });

  it("should pick the candidate at the floored random index when there are several", () => {
    expect(pickRandom(["a", "b", "c"], () => 0)).toBe("a");
    expect(pickRandom(["a", "b", "c"], () => 0.5)).toBe("b");
    expect(pickRandom(["a", "b", "c"], () => 0.99)).toBe("c");
  });
});
