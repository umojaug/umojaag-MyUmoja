import { lazy } from "react";

const Landing = lazy(() => import("./landing/Landing"));
const AuthQRVerification = lazy(() => import("./pages/AuthQRVerification"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ResetPasswordNew = lazy(() => import("./pages/ResetPasswordNew"));
const ExitInterview = lazy(() => import("./pages/ExitInterview"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const SalaryReviewReply = lazy(() => import("./pages/SalaryReviewReply"));

export {
  Landing,
  ForgotPassword,
  ResetPassword,
  ResetPasswordNew,
  NotFound,
  ExitInterview,
  TermsOfService,
  PrivacyPolicy,
  AuthQRVerification,
  SalaryReviewReply,
};
