export const FORBIDDEN_ACTION_MESSAGE = "Please sign in to perform this action.";

const GENERIC_ACTION_ERROR_MESSAGE = "Something went wrong, try again later";

const readErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;

  if (error instanceof Error) return error.message;

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "";
};

export const getActionErrorMessage = (error: unknown): string => {
  if (readErrorMessage(error).includes(FORBIDDEN_ACTION_MESSAGE)) {
    return FORBIDDEN_ACTION_MESSAGE;
  }

  return GENERIC_ACTION_ERROR_MESSAGE;
};
