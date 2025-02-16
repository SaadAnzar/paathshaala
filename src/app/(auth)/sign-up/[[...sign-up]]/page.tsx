import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      path="/sign-up"
      fallbackRedirectUrl="/auth-callback"
      signInUrl="/sign-in"
    />
  );
}
