import { describe, expect, it } from "vite-plus/test";
import { FORBIDDEN_ACTION_MESSAGE, getActionErrorMessage } from "./action-error";

describe("getActionErrorMessage", () => {
  it("should return the sign-in message when the backend forbids the action", () => {
    expect(getActionErrorMessage(new Error(FORBIDDEN_ACTION_MESSAGE))).toBe(
      FORBIDDEN_ACTION_MESSAGE,
    );
  });

  it("should return the sign-in message when a serialized error includes it", () => {
    expect(getActionErrorMessage({ message: `Server Fn Error! ${FORBIDDEN_ACTION_MESSAGE}` })).toBe(
      FORBIDDEN_ACTION_MESSAGE,
    );
  });

  it("should return a generic message when the error is unrelated", () => {
    expect(getActionErrorMessage(new Error("Question not found"))).toBe(
      "Something went wrong, try again later",
    );
  });
});
