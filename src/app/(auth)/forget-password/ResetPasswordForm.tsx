"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import AuthForm from "@/components/features/auth/AuthForm";
import { appConfig } from "@/packages/configs/app.config";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Real flow: this comes from the OTP step's verified response, not the
  // URL directly — but with no backend yet, it's carried across steps via
  // search params so the wiring (AuthForm's `extraValues`) is already in
  // place once that call exists. `resetPasswordSchema` requires `token`,
  // but it's not a visible field — extraValues merges it into the form's
  // registered values without rendering an input for it.
  const token = searchParams.get("token") ?? "";
  const [pending, startTransition] = useTransition();

  const submit = (data: unknown): void => {
    console.log("Reset-Password form submitted data:", data);

    startTransition(() => {
      router.push(appConfig.routes.signin);
    });
  };

  return (
    <AuthForm
      formKey="RESET_PASSWORD"
      onSubmit={submit}
      isLoading={pending}
      extraValues={{ token }}
    />
  );
};

export default ResetPasswordForm;
