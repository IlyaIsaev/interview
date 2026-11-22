import * as v from "valibot";

export const QUESTION_QUERY_MAX_LENGTH = 200;

export const questionsInputSchema = v.object({
  query: v.pipe(v.string(), v.trim(), v.maxLength(QUESTION_QUERY_MAX_LENGTH)),
});

const trimmedQuestionQuery = (query: string): string | undefined => {
  const trimmed = query.trim().slice(0, QUESTION_QUERY_MAX_LENGTH);

  return trimmed.length > 0 ? trimmed : undefined;
};

export const readQuestionQuery = (search: Record<string, unknown>): string | undefined => {
  const { q } = search;

  if (typeof q === "string") return trimmedQuestionQuery(q);

  if (typeof q === "number" && Number.isFinite(q)) return trimmedQuestionQuery(String(q));

  return undefined;
};
