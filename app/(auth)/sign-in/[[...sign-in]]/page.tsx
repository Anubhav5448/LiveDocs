import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="auth-page">
      <SignIn />
    </div>
  );
};
export default SignInPage;
