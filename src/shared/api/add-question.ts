import * as v from "valibot";

export const addQuestionInputSchema = v.object({
  body: v.pipe(v.string(), v.trim(), v.minLength(1, "Question cannot be empty")),
});
