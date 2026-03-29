import { useTranslation } from 'react-i18next';
import ContactForm from './ContactForm';
import ContactInfoCard from './ContactInfocards';
import { Helmet } from 'react-helmet-async';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>კონტაქტი — ნუცა ბახტაძე</title>
        <meta
          name="description"
          content="დაგვიკავშირდით — მოგვწერეთ ან დაგვირეკეთ ქოუჩინგის, ტრენინგების ან კურსების შესახებ. მზად ვარ დაგეხმაროთ."
        />
        <link rel="canonical" href="https://nutsabakhtadze.com/contact/" />

        <meta property="og:title" content="დაგვიკავშირდით — ნუცა ბახტაძე" />
        <meta property="og:description" content="მოგვწერეთ ან დაგვირეკეთ ქოუჩინგის, ტრენინგების ან კონსულტაციისთვის." />
        <meta property="og:image" content="https://nutsabakhtadze.com/cover-v2.jpeg" />
        <meta property="og:url" content="https://nutsabakhtadze.com/contact/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="კონტაქტი — ნუცა ბახტაძე" />
        <meta name="twitter:description" content="მოგვწერეთ ან დაგვირეკეთ." />
        <meta name="twitter:image" content="https://nutsabakhtadze.com/cover-v2.jpeg" />
      </Helmet>
    
      <section className="flex-1 py-12 lg:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-xl sm:text-2xl lg:text-2xl font-extrabold tracking-tight mb-6
              bg-linear-to-br from-stone-800 via-slate-700 to-stone-800
              bg-clip-text text-transparent">
              {t('connectWithCommunity.title')}
            </h1>
            <p className="text-lg lg:text-xl max-w-6xl mx-auto leading-relaxed text-stone-700">
              {t('connectWithCommunity.description')}
            </p>
          </div>

  
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-start">
            <div className="h-full">
              <ContactForm />
            </div>
            <div className="h-full">
              <ContactInfoCard />
            </div>
          </div>
        </div>
      </section>
  </>
  );
};

export default ContactPage;