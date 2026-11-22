import { formOptions, revalidateLogic, type AnyFormApi } from "@tanstack/react-form";

type FieldErrorVisibility = {
  readonly state: {
    readonly meta: {
      readonly isValid: boolean;
      readonly isBlurred: boolean;
    };
  };
  readonly form: {
    readonly state: {
      readonly submissionAttempts: number;
    };
  };
};

export const shouldShowFieldError = (field: FieldErrorVisibility): boolean =>
  !field.state.meta.isValid &&
  (field.state.meta.isBlurred || field.form.state.submissionAttempts > 0);

const focusInvalidControl = (formApi: AnyFormApi): void => {
  const firstInvalidName = Object.keys(formApi.state.values).find((name) => {
    const meta = formApi.getFieldMeta(name);

    return meta !== undefined && (!meta.isValid || meta.errors.length > 0);
  });

  const byId = firstInvalidName === undefined ? null : document.getElementById(firstInvalidName);

  (byId ?? document.querySelector<HTMLElement>("[aria-invalid='true']"))?.focus();
};

export const focusFirstInvalidField = ({ formApi }: { formApi: AnyFormApi }): void => {
  focusInvalidControl(formApi);
  queueMicrotask(() => {
    focusInvalidControl(formApi);
  });
  requestAnimationFrame(() => {
    focusInvalidControl(formApi);
  });
};

export const STANDARD_FORM_OPTIONS = formOptions({
  canSubmitWhenInvalid: true,
  validationLogic: revalidateLogic({
    mode: "blur",
    modeAfterSubmission: "change",
  }),
  onSubmitInvalid: focusFirstInvalidField,
});
