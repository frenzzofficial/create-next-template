import { Suspense } from "react";
import { Link } from "@/components/ui";
import ResetPasswordForm from "../ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <div
      className="w-full flex min-h-screen flex-col items-center gap-2 pt-12 pb-12 sm:pt-16 md:pt-20"
      style={{ marginTop: "100px" }}
    >
      <Link
        href="/"
        className="text-primary decoration-solid underline-offset-4 transition hover:underline"
      >
        Return to Homepage
      </Link>

      <div className="w-9/10 md:w-3/5 max-w-md">
        {/* ResetPasswordForm reads the token via useSearchParams(), which
            requires a Suspense boundary for proper streaming SSR. */}
        <Suspense fallback={null}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
