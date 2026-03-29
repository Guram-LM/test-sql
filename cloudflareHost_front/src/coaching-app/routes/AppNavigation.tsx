import { lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./PageWrapper";
import { ProtectedRoute } from "../components/protected-route/ProtectedRoute";

const Leyout = lazy(() => import("../pages/Layout"));
const HomePage = lazy(() => import("../pages/home/HomePage"));
const AboutPage = lazy(() => import("../pages/about/AboutPage"));
const Contact = lazy(() => import("../pages/contact/Contact"));
const Forcompanies = lazy(() => import("../pages/for-companies/ForCompaniesPage"));
const IndividualCoachingPage = lazy(() => import("../pages/individual-coaching/IndividualCoachingPage"));
const ResultsPage = lazy(() => import("../pages/results/ResultsPage"));
const PrivacyPolicy = lazy(() => import("../pages/privacy/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("../pages/privacy/TermsOfUse"));
const TermsOfService = lazy(() => import("../pages/privacy/TermsOfService"));
const ErrorPage404 = lazy(() => import("../pages/error/ErrorPage404"));

// ── დაამატე lazy imports-ს ───────────────────────────────────────
const LoginPage           = lazy(() => import("../pages/user/login-page/LoginPage"));
const RegisterPage        = lazy(() => import("../pages/user/register-page/RegisterPage"));
const VerifyEmailPage     = lazy(() => import("../pages/user/verify-email/VerifyEmailPage"));
const ProfilePage         = lazy(() => import("../pages/user/profile-page/ProfilePage"));
const ForgotPasswordPage  = lazy(() => import("../pages/user/forgot-password/ForgotPasswordPage"));
const ChangePasswordPage  = lazy(() => import("../pages/user/change-password/ChangePasswordPage"));

// ── დაამატე Routes-ში Layout-ის გარეთ ──────────────────────────

const AppNavigation = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<Leyout />}>
          <Route
            index
            element={
              <PageWrapper locationKey={location.pathname}>
                <HomePage />
              </PageWrapper>
            }
          />
          <Route
            path="about"
            element={
              <PageWrapper locationKey={location.pathname}>
                <AboutPage />
              </PageWrapper>
            }
          />
          <Route
            path="contact"
            element={
              <PageWrapper locationKey={location.pathname}>
                <Contact />
              </PageWrapper>
            }
          />
          <Route
            path="individual-coaching"
            element={
              <PageWrapper locationKey={location.pathname}>
                <IndividualCoachingPage />
              </PageWrapper>
            }
          />
          <Route
            path="for-companies"
            element={
              <PageWrapper locationKey={location.pathname}>
                <Forcompanies />
              </PageWrapper>
            }
          />
          <Route
            path="results"
            element={
              <PageWrapper locationKey={location.pathname}>
                <ResultsPage />
              </PageWrapper>
            }
          />
          <Route
            path="privacy"
            element={
              <PageWrapper locationKey={location.pathname}>
                <PrivacyPolicy />
              </PageWrapper>
            }
          />
          <Route
            path="terms-of-use"
            element={
              <PageWrapper locationKey={location.pathname}>
                <TermsOfUse />
              </PageWrapper>
            }
          />
          <Route
            path="terms-of-service"
            element={
              <PageWrapper locationKey={location.pathname}>
                <TermsOfService />
              </PageWrapper>
            }
          />
         
          <Route path="login"           element={<PageWrapper locationKey={location.pathname}><LoginPage /></PageWrapper>} />
<Route path="register"        element={<PageWrapper locationKey={location.pathname}><RegisterPage /></PageWrapper>} />
<Route path="verify-email"    element={<PageWrapper locationKey={location.pathname}><VerifyEmailPage /></PageWrapper>} />
<Route path="forgot-password" element={<PageWrapper locationKey={location.pathname}><ForgotPasswordPage /></PageWrapper>} />


<Route path="profile"         element={<ProtectedRoute><PageWrapper locationKey={location.pathname}><ProfilePage /></PageWrapper></ProtectedRoute>} />
<Route path="change-password" element={<ProtectedRoute><PageWrapper locationKey={location.pathname}><ChangePasswordPage /></PageWrapper></ProtectedRoute>} />

        </Route>

        

        <Route
          path="*"
          element={
            <PageWrapper locationKey={location.pathname}>
              <ErrorPage404 />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppNavigation;
