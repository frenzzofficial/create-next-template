"use client";

import { toast } from "sonner";
import DynamicForm from "@/components/layouts/DynamicForm";

import {
  type AuthSchemaKey,
  authFormConfig,
  authSchemaMap,
} from "@/packages/forms/auth.forms";

type AuthFormProps = {
  formKey: AuthSchemaKey;
  onSubmit?: (data: unknown) => void;
  isLoading?: boolean;
  extraValues?: Record<string, unknown>;
};

/**
 * AuthForm.tsx
 * --------------------------------------------------------------
 * Thin wrapper around the generic DynamicForm engine, scoped to auth's
 * form config/schemas. `onSubmit` stays optional here (unlike
 * DynamicForm's) — falling back to a console.log + toast so a page
 * under active development still shows visible feedback before its
 * real submit handler exists.
 */
const AuthForm = ({
  formKey,
  onSubmit,
  isLoading,
  extraValues,
}: AuthFormProps) => {
  const handleSubmit = (data: Record<string, unknown>) => {
    if (onSubmit) {
      onSubmit(data);
      return;
    }

    console.log(`[${formKey}] submitted:`, data);
    setTimeout(() => toast.success(`${formKey.toLowerCase()} submitted`), 3000);
  };

  return (
    <DynamicForm
      formKey={formKey}
      formConfig={authFormConfig}
      schemaMap={authSchemaMap}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      extraValues={extraValues}
    />
  );
};

export default AuthForm;
