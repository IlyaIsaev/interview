import * as v from "valibot";

export const questionIdSchema = v.pipe(v.number(), v.safeInteger(), v.minValue(1));

const questionPathIdSchema = v.pipe(
  v.string(),
  v.regex(/^[1-9]\d*$/),
  v.transform(Number),
  v.safeInteger(),
);

export const parseQuestionPathId = (id: string): number | null => {
  const parsed = v.safeParse(questionPathIdSchema, id);

  return parsed.success ? parsed.output : null;
};
