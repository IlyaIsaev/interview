/** Read a string `error` field from a JSON API payload, or return a fallback. */
export const readApiErrorMessage = (
  payload: unknown,
  fallbackMessage: string,
): string => {
  if (
    payload &&
    typeof payload === 'object' &&
    'error' in payload &&
    typeof payload.error === 'string'
  ) {
    return payload.error
  }

  return fallbackMessage
}

/** Normalize an unknown thrown value to a user-facing message. */
export const readUnknownErrorMessage = (
  error: unknown,
  fallbackMessage: string,
): string => {
  if (error instanceof Error) {
    return error.message
  }

  return fallbackMessage
}
