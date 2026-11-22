import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, redirect, useNavigate, useRouter } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import * as v from "valibot";
import { authClient, parseAuthRedirect } from "@/shared/auth";
import { STANDARD_FORM_OPTIONS, shouldShowFieldError } from "@/shared/ui/standard-form";
import { Button, buttonVariants } from "@/shared/ui-kit/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui-kit/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui-kit/components/ui/field";
import { Input } from "@/shared/ui-kit/components/ui/input";
import { Spinner } from "@/shared/ui-kit/components/ui/spinner";

const signUpInputSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1, "Name cannot be empty")),
  email: v.pipe(v.string(), v.trim(), v.email("Enter a valid email")),
  password: v.pipe(v.string(), v.minLength(8, "Password must be at least 8 characters")),
});

type SignUpSearch = {
  readonly redirect?: string;
};

type SignUpSearchInput = Record<string, unknown>;

const validateSignUpSearch = (search: SignUpSearchInput): SignUpSearch => {
  const redirect = parseAuthRedirect(search.redirect);

  return redirect !== undefined ? { redirect } : {};
};

export const Route = createFileRoute("/sign-up")({
  ssr: true,
  validateSearch: validateSignUpSearch,
  beforeLoad: async ({ context, search }) => {
    if (!context.session) return;

    if (search.redirect) throw redirect({ href: search.redirect });

    throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [{ title: "Sign up" }],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const { redirect: redirectPath } = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const form = useForm({
    ...STANDARD_FORM_OPTIONS,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onDynamic: signUpInputSchema,
    },
    onSubmit: async ({ value }) => {
      setFormError(undefined);

      const { error } = await authClient.signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      });

      if (error) {
        setFormError("Creating new accounts is temporarily disabled");

        return;
      }

      await router.invalidate();

      if (redirectPath) await navigate({ href: redirectPath, replace: true });

      if (!redirectPath) await navigate({ to: "/", replace: true });
    },
  });

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardAction>
            <Link
              to="/login"
              search={redirectPath ? { redirect: redirectPath } : undefined}
              className={buttonVariants({ variant: "link" })}
            >
              Log in
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-5"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <FieldGroup>
                  <form.Field name="name">
                    {(field) => {
                      const isInvalid = shouldShowFieldError(field);

                      return (
                        <Field
                          data-invalid={isInvalid || undefined}
                          data-disabled={isSubmitting || undefined}
                        >
                          <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            type="text"
                            autoComplete="name"
                            disabled={isSubmitting}
                            value={field.state.value}
                            aria-invalid={isInvalid || undefined}
                            onBlur={field.handleBlur}
                            onChange={(event) => {
                              field.handleChange(event.target.value);
                            }}
                          />
                          {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                        </Field>
                      );
                    }}
                  </form.Field>
                  <form.Field name="email">
                    {(field) => {
                      const isInvalid = shouldShowFieldError(field);

                      return (
                        <Field
                          data-invalid={isInvalid || undefined}
                          data-disabled={isSubmitting || undefined}
                        >
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            type="email"
                            autoComplete="email"
                            disabled={isSubmitting}
                            value={field.state.value}
                            aria-invalid={isInvalid || undefined}
                            onBlur={field.handleBlur}
                            onChange={(event) => {
                              field.handleChange(event.target.value);
                            }}
                          />
                          {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                        </Field>
                      );
                    }}
                  </form.Field>
                  <form.Field name="password">
                    {(field) => {
                      const isInvalid = shouldShowFieldError(field);

                      return (
                        <Field
                          data-invalid={isInvalid || undefined}
                          data-disabled={isSubmitting || undefined}
                        >
                          <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            type="password"
                            autoComplete="new-password"
                            disabled={isSubmitting}
                            value={field.state.value}
                            aria-invalid={isInvalid || undefined}
                            onBlur={field.handleBlur}
                            onChange={(event) => {
                              field.handleChange(event.target.value);
                            }}
                          />
                          {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                        </Field>
                      );
                    }}
                  </form.Field>
                  {formError ? <FieldError>{formError}</FieldError> : null}
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Spinner data-icon="inline-start" />
                    ) : (
                      <UserPlus data-icon="inline-start" />
                    )}
                    Sign up
                  </Button>
                </FieldGroup>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
