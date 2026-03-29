import { Helmet } from "react-helmet-async";
import ContactSection from "./ContactSection";
import CtaSection from "./CtaSection";
import ResultHeroSection from "./ResultHeroSection";
import ResultMethodsSection from "./ResultMethodsSection";
import ResultsSection from "./ResultsSection";
import FeedbackTwo from "./FeedbackTwo";


export default function ResultsPage() {
  return (
    <>
      <Helmet>
        <title>შედეგები და კეისები | ნუცა ბახტაძე</title>
        <meta
          name="description"
          content="რეალური კლიენტების ისტორიები და შედეგები: როგორ შეიცვალათ ურთიერთობები, სტრესის დონე და თვითშეფასება ქოუჩინგის შემდეგ."
        />
        <link rel="canonical" href="https://nutsabakhtadze.com/results/" />

        <meta property="og:title" content="შედეგები — ნუცა ბახტაძე" />
        <meta property="og:description" content="კლიენტების რეალური ტრანსფორმაცია ემოციური ინტელექტის ქოუჩინგის შემდეგ." />
        <meta property="og:image" content="https://nutsabakhtadze.com/cover-v2.jpeg" />
        <meta property="og:url" content="https://nutsabakhtadze.com/results/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EQ ქოუჩინგის შედეგები და ტესტიმონიალები" />
        <meta name="twitter:description" content="რეალური ისტორიები და წარმატებები კლიენტებისგან." />
        <meta name="twitter:image" content="https://nutsabakhtadze.com/cover-v2.jpeg" />
      </Helmet>
      <ResultHeroSection />
      <ResultMethodsSection />
      <ResultsSection />
      <FeedbackTwo />
      <CtaSection />
      <ContactSection />
    </>
  );
}