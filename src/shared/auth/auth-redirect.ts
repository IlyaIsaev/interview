export const parseAuthRedirect = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;

  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return undefined;
  }

  return value;
};
