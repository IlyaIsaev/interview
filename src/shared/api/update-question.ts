import * as v from "valibot";
import { questionIdSchema } from "@/shared/api/question";

export const updateQuestionInputSchema = v.object({
  id: questionIdSchema,
  body: v.pipe(v.string(), v.trim(), v.minLength(1, "Question cannot be empty")),
});

export const updateQuestionFormSchema = v.pick(updateQuestionInputSchema, ["body"]);
