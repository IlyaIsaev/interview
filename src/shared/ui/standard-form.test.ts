import { describe, expect, it } from "vite-plus/test";
import { shouldShowFieldError } from "./standard-form";

const field = ({
  isValid,
  isBlurred,
  submissionAttempts,
}: {
  readonly isValid: boolean;
  readonly isBlurred: boolean;
  readonly submissionAttempts: number;
}) => ({
  state: { meta: { isValid, isBlurred } },
  form: { state: { submissionAttempts } },
});

describe("shouldShowFieldError", () => {
  it("should hide the error when the field is invalid and has not been blurred or submitted", () => {
    expect(
      shouldShowFieldError(field({ isValid: false, isBlurred: false, submissionAttempts: 0 })),
    ).toBe(false);
  });

  it("should show the error when the field is invalid and blurred", () => {
    expect(
      shouldShowFieldError(field({ isValid: false, isBlurred: true, submissionAttempts: 0 })),
    ).toBe(true);
  });

  it("should show the error when the field is invalid and the form has been submitted", () => {
    expect(
      shouldShowFieldError(field({ isValid: false, isBlurred: false, submissionAttempts: 1 })),
    ).toBe(true);
  });

  it("should hide the error when the field is valid even after blur and submit", () => {
    expect(
      shouldShowFieldError(field({ isValid: true, isBlurred: true, submissionAttempts: 1 })),
    ).toBe(false);
  });
});
