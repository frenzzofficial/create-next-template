"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import AuthForm from "@/components/features/auth/AuthForm";

const ForgetPasswordForm = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const submit = (data: unknown): void => {
    console.log("Forget-Password form submitted data:", data); // 👈 log the data

    // Real flow: request a reset code from the backend here. No backend
    // yet (frontend-only for now) — move straight to the OTP step,
    // carrying the email forward via a URL param so VerifyOtpForm can
    // reference it. Swap the router.push for the real API call later;
    // nothing else in this flow needs to change.
    startTransition(() => {
      const email = (data as { email?: string }).email ?? "";
      router.push(
        `/forget-password/verify-otp?email=${encodeURIComponent(email)}`,
      );
    });
  };

  return (
    <AuthForm formKey="FORGOT_PASSWORD" onSubmit={submit} isLoading={pending} />
  );
};

export default ForgetPasswordForm;
