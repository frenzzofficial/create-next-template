"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import {
  type FieldError,
  type FieldErrors,
  type Resolver,
  type SubmitHandler,
  type UseFormRegister,
  useForm,
} from "react-hook-form";
import type { ZodType } from "zod";
import { Button, InputFactory, Link } from "@/components/ui";
import Card from "@/components/ui/card/Card";
import { DEFAULT_FORM_VALUES } from "@/packages/configs/forms.config";
import type { FormInputType, FormListType } from "@/packages/forms/form.types";
import { getAnimationStyle } from "@/packages/utils/animation";

export type DynamicFormProps = {
  formKey: string;
  formConfig: Record<string, FormListType>;
  schemaMap: Record<string, ZodType>;
  onSubmit: (data: Record<string, unknown>) => void;
  isLoading?: boolean;
  /** Merged into default values for schema-required fields that aren't rendered as a visible input. */
  extraValues?: Record<string, unknown>;
  className?: string;
};

type FormFieldsProps = {
  inputs: FormInputType[];
  register: UseFormRegister<Record<string, unknown>>;
  errors: FieldErrors<Record<string, unknown>>;
};

const buildDefaultValues = (
  form: FormListType,
  extraValues?: Record<string, unknown>,
): Record<string, unknown> => {
  const values: Record<string, unknown> = {};

  form.formInputs.forEach((field) => {
    const preset =
      DEFAULT_FORM_VALUES[field.id as keyof typeof DEFAULT_FORM_VALUES];
    values[field.id] =
      preset !== undefined ? preset : field.type === "checkbox" ? false : "";
  });

  return { ...values, ...extraValues };
};

const useDynamicForm = (
  form: FormListType,
  schema: ZodType,
  extraValues?: Record<string, unknown>,
) => {
  const defaultValues = buildDefaultValues(form, extraValues);
  const resolver = zodResolver(
    schema as Parameters<typeof zodResolver>[0],
  ) as unknown as Resolver<Record<string, unknown>>;

  return useForm<Record<string, unknown>>({
    resolver,
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
    shouldUnregister: false,
  });
};

const FormFields = ({ inputs, register, errors }: FormFieldsProps) => (
  <>
    {inputs.map((input) => {
      const rawError = errors[input.id];

      const errorMessage =
        rawError && typeof rawError === "object" && "message" in rawError
          ? String((rawError as FieldError).message ?? "")
          : "";

      return (
        <div key={input.key} className="flex flex-col gap-2 p-1">
          <InputFactory
            field={{
              ...input,
              register,
              error: errorMessage
                ? ({ message: errorMessage } as FieldError)
                : undefined,
            }}
          />
        </div>
      );
    })}
  </>
);

const FormLayout = ({
  form,
  children,
  className,
}: {
  form: FormListType;
  children: ReactNode;
  className?: string;
}) => {
  const { referTo } = form;

  return (
    <div
      style={{
        ...FORM_LAYOUT_CSS.container,
        ...getAnimationStyle("zoom", "none", { durationMs: 500 }),
      }}
      className={className}
    >
      <Card variants="static" flush className="overflow-hidden">
        <header style={FORM_LAYOUT_CSS.header}>
          {form.description && (
            <p style={FORM_LAYOUT_CSS.description}>{form.description}</p>
          )}
        </header>

        <section style={FORM_LAYOUT_CSS.content}>{children}</section>

        {referTo && (
          <footer style={FORM_LAYOUT_CSS.footer}>
            <p style={FORM_LAYOUT_CSS.footerText}>
              {referTo.label}{" "}
              <Link href={`/${referTo.href}`}>{referTo.href}</Link>
            </p>
          </footer>
        )}
      </Card>
    </div>
  );
};

/**
 * DynamicForm.tsx
 * --------------------------------------------------------------
 * The generic engine every auth/contact/profile form runs on — schema
 * validation, default values, Card-wrapped layout, field rendering.
 * Extracted out of what used to be auth-only AuthForm.tsx once a second
 * and third consumer (ContactForm, ProfileForm) needed the exact same
 * machinery; each is now a thin wrapper passing its own
 * `formConfig`/`schemaMap` in place of `authFormConfig`/`authSchemaMap`.
 *
 * `onSubmit` is required here (unlike AuthForm's public prop) — the
 * "no handler passed, just log it" fallback is AuthForm-specific
 * (toast included) and stays there, not in the shared engine.
 */
const DynamicForm = ({
  formKey,
  formConfig,
  schemaMap,
  onSubmit: externalSubmit,
  isLoading = false,
  extraValues,
  className,
}: DynamicFormProps) => {
  const form = formConfig[formKey];
  const schema = schemaMap[formKey];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useDynamicForm(form, schema, extraValues);

  const onSubmit: SubmitHandler<Record<string, unknown>> = (data) => {
    externalSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormLayout form={form} className={className}>
        <FormFields
          inputs={form.formInputs}
          register={register}
          errors={errors}
        />

        {form.submit && (
          <Button type="submit" disabled={isSubmitting}>
            {isLoading ? form.submit.onSubmitLabel : form.submit.label}
          </Button>
        )}
      </FormLayout>
    </form>
  );
};

export default DynamicForm;

const FORM_LAYOUT_CSS = {
  container: {
    width: "100%",
    maxWidth: "48rem",
    marginInline: "auto",
  } satisfies React.CSSProperties,

  header: {
    padding: "1.25rem 1.25rem",
    borderBottom: "1px solid var(--border)",
  } satisfies React.CSSProperties,

  description: {
    marginTop: "0.375rem",
    fontSize: "1rem",
    color: "var(--muted-foreground)",
  } satisfies React.CSSProperties,

  content: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    padding: "1.5rem",
  } satisfies React.CSSProperties,

  footer: {
    padding: "1rem 1.5rem",
    borderTop: "1px solid var(--border)",
  } satisfies React.CSSProperties,

  footerText: {
    margin: 0,
    textAlign: "center",
    fontSize: "0.875rem",
    color: "var(--muted-foreground)",
  } satisfies React.CSSProperties,
};
