import { Link } from "@/components/ui";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <div
      className="w-full flex min-h-screen flex-col items-center gap-2 pt-12 pb-12 sm:pt-16 md:pt-20"
      style={{
        marginTop: "100px",
      }}
    >
      <Link href="/">Return to Homepage</Link>

      <div className="w-9/10 md:w-3/5 max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
