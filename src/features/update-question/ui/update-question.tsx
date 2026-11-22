import { useEventListener } from "@reactuses/core";
import { useForm } from "@tanstack/react-form";
import { Check, X } from "lucide-react";
import type { ReactNode } from "react";
import { useUpdateQuestion } from "../model/use-update-question";
import { updateQuestionFormSchema } from "@/shared/api/update-question";
import { STANDARD_FORM_OPTIONS, shouldShowFieldError } from "@/shared/ui/standard-form";
import { Button } from "@/shared/ui-kit/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui-kit/components/ui/field";
import { Spinner } from "@/shared/ui-kit/components/ui/spinner";
import { Textarea } from "@/shared/ui-kit/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui-kit/components/ui/tooltip";

type UpdateQuestionProps = {
  readonly id: number;
  readonly body: string;
};

export function UpdateQuestion({ id, body }: UpdateQuestionProps): ReactNode {
  const { question, onSave, onCancel } = useUpdateQuestion({ id, body });
  const form = useForm({
    ...STANDARD_FORM_OPTIONS,
    defaultValues: {
      body: question.body,
    },
    validators: {
      onDynamic: updateQuestionFormSchema,
    },
    onSubmit: async ({ value }) => {
      await onSave(value.body);
    },
  });

  useEventListener("keydown", (event) => {
    const shouldIgnoreEscape =
      event.key !== "Escape" || event.repeat || event.isComposing || event.defaultPrevented;

    if (shouldIgnoreEscape) return;

    if (form.state.isSubmitting) return;

    event.preventDefault();

    onCancel();
  });

  return (
    <form
      className="flex h-full flex-col"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <>
            <div className="absolute inset-x-0 bottom-full z-10 flex items-center justify-end gap-2 pb-2">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <span className="inline-flex">
                      <Button
                        type="submit"
                        variant="outline"
                        size="icon-sm"
                        aria-label="Accept"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Spinner data-icon="inline-start" />
                        ) : (
                          <Check data-icon="inline-start" />
                        )}
                      </Button>
                    </span>
                  }
                />
                <TooltipContent side="bottom">Save the question</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <span className="inline-flex">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label="Cancel"
                        disabled={isSubmitting}
                        onClick={onCancel}
                      >
                        <X data-icon="inline-start" />
                      </Button>
                    </span>
                  }
                />
                <TooltipContent side="bottom">Discard changes</TooltipContent>
              </Tooltip>
            </div>
            <FieldGroup className="h-full min-h-0 gap-2">
              <form.Field name="body">
                {(field) => {
                  const isInvalid = shouldShowFieldError(field);

                  return (
                    <Field
                      className="h-full min-h-0"
                      data-invalid={isInvalid || undefined}
                      data-disabled={isSubmitting || undefined}
                    >
                      <FieldLabel htmlFor={field.name} className="sr-only">
                        Question
                      </FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        autoFocus
                        disabled={isSubmitting}
                        value={field.state.value}
                        aria-invalid={isInvalid || undefined}
                        onBlur={field.handleBlur}
                        onChange={(event) => {
                          field.handleChange(event.target.value);
                        }}
                        onKeyDown={(event) => {
                          if (event.key !== "Enter" || event.shiftKey) return;
                          if (
                            event.repeat ||
                            event.nativeEvent.isComposing ||
                            event.defaultPrevented ||
                            event.metaKey ||
                            event.ctrlKey ||
                            event.altKey
                          ) {
                            return;
                          }
                          if (isSubmitting) return;

                          event.preventDefault();
                          void form.handleSubmit();
                        }}
                        className="min-h-0 flex-1 resize-none text-base md:text-base"
                      />
                      {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </>
        )}
      </form.Subscribe>
    </form>
  );
}
