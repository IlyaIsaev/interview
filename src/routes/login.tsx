import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, redirect, useNavigate, useRouter } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
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

const loginInputSchema = v.object({
  email: v.pipe(v.string(), v.trim(), v.email("Enter a valid email")),
  password: v.pipe(v.string(), v.minLength(8, "Password must be at least 8 characters")),
});

type LoginSearch = {
  readonly redirect?: string;
};

type LoginSearchInput = Record<string, unknown>;

const validateLoginSearch = (search: LoginSearchInput): LoginSearch => {
  const redirect = parseAuthRedirect(search.redirect);

  return redirect !== undefined ? { redirect } : {};
};

export const Route = createFileRoute("/login")({
  ssr: true,
  validateSearch: validateLoginSearch,
  beforeLoad: async ({ context, search }) => {
    if (!context.session) return;

    if (search.redirect) throw redirect({ href: search.redirect });

    throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [{ title: "Log in" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { redirect: redirectPath } = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const form = useForm({
    ...STANDARD_FORM_OPTIONS,
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onDynamic: loginInputSchema,
    },
    onSubmit: async ({ value }) => {
      setFormError(undefined);

      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });

      if (error) {
        setFormError("Invalid email or password");

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
          <CardTitle>Log in</CardTitle>
          <CardAction>
            <Link
              to="/sign-up"
              search={redirectPath ? { redirect: redirectPath } : undefined}
              className={buttonVariants({ variant: "link" })}
            >
              Sign up
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
                            autoComplete="current-password"
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
                      <LogIn data-icon="inline-start" />
                    )}
                    Log in
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
