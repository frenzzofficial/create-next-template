"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import AuthForm from "@/components/features/auth/AuthForm";

const VerifyOtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [pending, startTransition] = useTransition();

  const submit = (data: unknown): void => {
    const otp = (data as { otp?: string }).otp ?? "";
    console.log("Verify-OTP form submitted data:", { email, otp });

    // Real flow: verify the OTP against the backend, which responds with
    // a short-lived reset token. No backend yet — carry the OTP forward
    // as a placeholder token so the URL contract ResetPasswordForm reads
    // from is already correct; swap this for the real token once that
    // call exists.
    startTransition(() => {
      router.push(
        `/forget-password/reset-password?token=${encodeURIComponent(otp)}`,
      );
    });
  };

  return (
    <AuthForm formKey="OTP_CONFIRM" onSubmit={submit} isLoading={pending} />
  );
};

export default VerifyOtpForm;
