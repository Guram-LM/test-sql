import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../component/ProtectedRoute/ProtectedRoute";
import AppLayut from "../pages/AppLayut";
import DynamicHeader from "../component/dynamicHeader/DynamicHeader";
import AdminLoader from "../pages/adminLoader/AdminLoader";
import ScheduledPostForm from "../pages/scheduled/ScheduledPostForm";
import CreateFeedback from "../pages/feedback/CreateFeedback";



const HomePage = lazy(() => import("../pages/homePage/HomePage"));
const LoginPage = lazy(() => import("../pages/adminPage/LoginPage"));
const PasswordReset = lazy(() => import("../pages/Password/PasswordReset"));
const ChangePassword = lazy(() => import("../pages/Password/ChangePassword"));

const OffersDashboard = lazy(() => import("../pages/offersPage/offersPage/OffersDashboard"));
const CreateIndividualOffers = lazy(() => import("../pages/offersPage/CreateOffers/CreateIndividualOffers"));
const CreateCompanylOffers = lazy(() => import("../pages/offersPage/CreateOffers/CreateCompanylOffers"));
const IndividualeOffersList = lazy(() => import("../pages/offersPage/OffersList/IndividualeOffersList"));
const CompanyOffersList = lazy(() => import("../pages/offersPage/OffersList/CompanyOffersList"));
const Feedback = lazy(() => import("../pages/feedback/Feedback"));


const ContactPage = lazy(() => import("../pages/contact/ContactPage"));
const OrderPage = lazy(() => import("../pages/orderPage/OrdePage"));
const Pdfs = lazy(() => import("../pages/pdfs/Pdfs"))
const CreatePaidPdf = lazy(() => import("../pages/pdfs/paid_pdfs/CreatePaidPdf"))
const PaidPdfList = lazy(() => import("../pages/pdfs/paid_pdfs/PaidPdfList"))
const CreateFreePdf = lazy(() => import("../pages/pdfs/Free_pdf/CreateFreePdf"))
const FreePdfList = lazy(() => import("../pages/pdfs/Free_pdf/FreePdfList"))

const MediaPage = lazy(() => import("../pages/media/MediaPage"))
const ArticlesList = lazy(() => import("../pages/media/article/ArticlesList"))
const CreateArticle = lazy(() => import("../pages/media/article/CreateArticle"))
const CreateSocialMedia = lazy(() => import("../pages/media/socialMedia/CreateSocialMedia"))
const SocialMediaList = lazy(() => import("../pages/media/socialMedia/SocialMediaList"))
const CreateVideo = lazy(() => import("../pages/media/videos/CreateVideo"))
const VideosList = lazy(() => import("../pages/media/videos/VideosList"))

const FreePdfDownloadsStatistic = lazy(() => import("../pages/freePdfDownloadsStatustic/FreePdfDownloadsStatistic"))

const Events = lazy(() => import("../pages/events/Events"))
const CreateMyEvents = lazy(() => import("../pages/events/my-events/CreateMyEvents"))
const MyEventsList = lazy(() => import("../pages/events/my-events/MyEventsList"))
const CreatePartnetsEvents = lazy(() => import("../pages/events/partner-events/CreatePartnetsEvents"))
const PartnetsEventsList = lazy(() => import("../pages/events/partner-events/PartnetsEventsList"))

const ScheduledPostsList = lazy(() => import("../pages/scheduled/ScheduledPostsList"))

const UsersPage = lazy(() => import("../pages/users-page/UsersPage"))




const AppNavigation = () => {
  return (
    <Suspense fallback={<AdminLoader />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/passwordReset" element={<PasswordReset />} /> 

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayut />}>
            <Route index element={<HomePage />} />

            <Route element={<DynamicHeader />}>
              <Route path="offersPage" element={<OffersDashboard />} />
              <Route path="createIndividualOffers" element={<CreateIndividualOffers />} />
              <Route path="createCompanylOffers" element={<CreateCompanylOffers />} />
              <Route path="individualeOffersList" element={<IndividualeOffersList />} />
              <Route path="companyOffersList" element={<CompanyOffersList />} />
            </Route>
            
            <Route path="feedback" element={<Feedback />} />
            <Route path="create-feedback" element={<CreateFeedback />} />

            <Route path="contactPage" element={<ContactPage />} />
            <Route path="ordePage" element={<OrderPage />} />
            <Route path="changePassword" element={<ChangePassword />} />

            <Route path="pdfs" element={<Pdfs />} />
            <Route path="create-paidPdf" element={<CreatePaidPdf />} />
            <Route path="paid-pdfList" element={<PaidPdfList />} />
            <Route path="create-freePdf" element={<CreateFreePdf />} />
            <Route path="free-pdfList" element={<FreePdfList />} />

            <Route path="media-page" element={<MediaPage />} />
            <Route path="articles-list" element={<ArticlesList />} />
            <Route path="create-article" element={<CreateArticle />} />
            <Route path="create-socialMedia" element={<CreateSocialMedia />} />
            <Route path="social-mediaList" element={<SocialMediaList />} />
            <Route path="create-video" element={<CreateVideo />} />
            <Route path="videos-list" element={<VideosList />} />

            <Route path="freePdf-downloads-statistic" element={<FreePdfDownloadsStatistic />} />

            <Route path="events" element={<Events />} />
            <Route path="create-my-events" element={<CreateMyEvents />} />
            <Route path="my-events-list" element={<MyEventsList />} />
            <Route path="create-partnets-events" element={<CreatePartnetsEvents />} />
            <Route path="partnets-events-list" element={<PartnetsEventsList />} />

            <Route path="scheduled" element={<ScheduledPostsList />} />
            <Route path="admin/scheduled-posts/new" element={<ScheduledPostForm />} />
            <Route path="admin/scheduled-posts/:id" element={<ScheduledPostForm />} />

            <Route path="users-page" element={<UsersPage />} />

          </Route>
        </Route>

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppNavigation;
