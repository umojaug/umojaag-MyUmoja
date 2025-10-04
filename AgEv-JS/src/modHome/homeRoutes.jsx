import { Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/layout/Layout";
import * as Home from "./index";

const homeRoutes = (
  <Route path="/*" element={<PublicRoute />}>
    <Route element={<Layout />}>
      <Route path="" element={<Home.Landing />} />
      <Route path="forgot-password" element={<Home.ForgotPassword />} />
      <Route path="reset-password/:id" element={<Home.ResetPassword />} />
      <Route path="exitinterview/:id" element={<Home.ExitInterview />} />
      <Route path="reset-password" element={<Home.ResetPasswordNew />} />
      {/* <Route path="privacypolicy" element={<Home.PrivacyPolicy />} />
    <Route path="termsofservice" element={<Home.TermsOfService />} /> */}
    <Route
        path="salaryreview/status/:ans/:id"
        element={<Home.SalaryReviewReply />}
      />
      <Route path="*" element={<Home.NotFound />} />
    </Route>
    <Route path="verify-2fa" element={<Home.AuthQRVerification />} />
  </Route>
);

export default homeRoutes;
