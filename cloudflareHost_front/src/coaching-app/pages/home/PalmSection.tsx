import { useTranslation } from 'react-i18next';
import palm from '../../../assets/palm.jpg';
import HomeButton from '../../components/button/HomeButton';


interface Stat {
  text: string;
  source: string;
}

export default function PalmSection() {
  const { t } = useTranslation();

  const palmStats = Array.isArray(t("HomePage.palmStats", { returnObjects: true }))
  ? t("HomePage.palmStats", { returnObjects: true }) as Stat[]
  : [];
const missionList = Array.isArray(t("HomePage.currentState", { returnObjects: true }))
  ? t("HomePage.currentState", { returnObjects: true }) as string[]
  : [];
const possibleState = Array.isArray(t("HomePage.possibleState", { returnObjects: true }))
  ? t("HomePage.possibleState", { returnObjects: true }) as string[]
  : [];

  return (
    <div className="relative md:px-10 bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${palm})` }}>
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70" />

   
      <div className="absolute top-20 left-10 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-amber-400/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-40 right-10 w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] bg-orange-400/10 rounded-full blur-3xl animate-float-delayed"></div>

      <div className="relative z-10 flex flex-col px-6 py-20 md:py-28">

  <div className="w-full text-center  max-w-none lg:max-w-[1200px] lg:mx-auto lg:pl-8 xl:pl-0">

  
    <h2 className="text-lg  sm:text-2xl flex md:text-3xl lg:text-3xl px-4 justify-center mb-8 font-light ms-auto tracking-tight text-amber-50 drop-shadow-2xl leading-tight text-center lg:text-left">
      {t("HomePage.palmSectionTitle")}
    </h2>


    <div className="space-y-6 text-center lg:text-left px-4">
      <p className=" text-center text-lg leading-relaxed text-amber-50 drop-shadow-lg">
        {t("HomePage.palmSectionText")}{t("HomePage.palmSectionText1")}
      </p>
      
      <p className="text-lg text-left ml-5 sm:text-2xl md:text-3xl lg:text-2xl leading-relaxed text-amber-50 italic mb-5 drop-shadow-lg">
        {t("HomePage.palmSectionText2")}
      </p>
    </div>


    <ul className="my-5 lg:space-y-0 text-center lg:text-left">
      {missionList.map((item, i) => (
        <li key={i} className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-amber-50 flex items-start justify-center lg:justify-start gap-6">
          <span className="text-amber-100 font-bold text-4xl lg:text-5xl mt-1">•</span>
          <span className="flex-1 max-w-none flex  my-auto  text-sm sm:text-lg md:text-lg lg:max-w-none text-left">{item}</span>
        </li>
      ))}
    </ul>

    <p className="text-lg ml-5 sm:text-2xl md:text-3xl lg:text-2xl text-left px-4 leading-relaxed text-amber-50 italic mb-5 drop-shadow-lg">
      {t("HomePage.message")}
    </p>

 
    <ul className="my-5  space-y-0 lg:space-y-0 text-center lg:text-left">
      {possibleState.map((item, i) => (
        <li key={i} className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-amber-50 flex items-start justify-center lg:justify-start gap-6">
          <span className="text-amber-100 font-bold text-4xl lg:text-5xl mt-1">•</span>
          <span className="flex-1 max-w-none flex  my-auto  text-sm sm:text-lg md:text-lg text-left lg:max-w-none">{item}</span>
        </li>
      ))}
    </ul>

    <p className="text-lg  sm:text-2xl flex mx-auto justify-center md:text-2xl px-4 text-center leading-relaxed text-amber-50  mb-16 drop-shadow-lg ">
      {t("HomePage.supportMessage")}
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto  ">
            {palmStats.map((stat, i) => (
              <div
                key={i}
                className="relative group bg-white/10 backdrop-blur-lg border border-white/20 hover:border-amber-400/50 p-8 text-center shadow-xl hover:shadow-2xl rounded-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/10 group-hover:to-orange-400/10 transition-all duration-500"></div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-amber-500/30 backdrop-blur-sm rounded-full flex items-center justify-center text-amber-200 font-bold border border-amber-400/30">
                  {i + 1}
                </div>
                <div className="relative z-10">
                  <div className="text-5xl text-amber-300/40 mb-4">"</div>
                  <p className="text-lg leading-relaxed text-amber-50 mb-5 font-light">
                    {stat.text}
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-5 border-t border-white/10">
                    <div className="w-10 h-px bg-linear-to-r from-transparent to-amber-400/50"></div>
                    <p className="text-gray-300 italic text-sm">{stat.source}</p>
                    <div className="w-10 h-px bg-linear-to-l from-transparent to-amber-400/50"></div>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-amber-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

<div className="mt-20  w-full">
          <div className="relative bg-linear-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/20 rounded-3xl px-8 py-13  md:p-12 shadow-2xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-linear-to-r from-transparent via-amber-400 to-transparent rounded-full"></div>
            <h3 className="text-lg  sm:text-2xl flex  justify-center md:text-3xl mb-4 font-light tracking-tight text-amber-50">
              {t("HomePage.palmReminderTitle")}
            </h3>
           
            <p className="text-base sm:text-lg md:text-xl mb-8 uppercase tracking-widest text-gray-200 font-light">
              {t("HomePage.palmReminderSubtitle")}{t("HomePage.palmReminderText")}
            </p>
            <HomeButton title="HomePage.palmReminderButton" />
          </div>
        </div>

 
    <div className="mt-16 flex items-center justify-center gap-6">
      <div className="w-20 h-0.5 bg-linear-to-r from-transparent to-amber-400/50"></div>
      <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
      <div className="w-20 h-0.5 bg-linear-to-l from-transparent to-amber-400/50"></div>
    </div>
  </div>
</div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite 2s; }
      `}</style>
    </div>
  );
}