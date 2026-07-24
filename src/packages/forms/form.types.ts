import type { InputFactoryType } from "@/types/app";

/**
 * form.types.ts
 * --------------------------------------------------------------
 * Shared shape every form config (auth.forms.ts, contact.forms.ts,
 * profile.forms.ts) is built from, and that DynamicForm.tsx renders
 * generically. Previously declared inline in auth.forms.ts only —
 * pulled out here once a second and third consumer needed the same shape.
 */

export type FormInputType = {
  key: string;
  id: string;
  label: string;
  type: InputFactoryType;
  placeholder: string;
  options?: { label: string; value: string }[];
  required: boolean;
  errorMessage: string;
};

export type ReferToType = {
  href: string;
  label: string;
};

export type SubmitType = {
  label: string;
  onSubmitLabel: string;
};

export type FormListType = {
  key: string;
  title: string;
  description: string;
  icon?: string;
  submit?: SubmitType;
  referTo?: ReferToType;
  formInputs: FormInputType[];
};
