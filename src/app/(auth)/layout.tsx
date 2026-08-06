import { Suspense } from "react";
import { Link } from "@/components/ui";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 -translate-y-10 sm:-translate-y-12">
      <Link href="/">Return to Homepage</Link>

      <div className="w-9/10 md:w-3/5 mt-4 max-w-md mx-4">
        <Suspense fallback={null}>{children}</Suspense>
      </div>
    </div>
  );
};

export default AuthLayout;
