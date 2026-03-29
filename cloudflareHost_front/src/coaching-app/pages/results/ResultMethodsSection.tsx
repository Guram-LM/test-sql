import { useTranslation } from 'react-i18next';

const icons = ['🧭', '📚', '🎤'];
const colors = ['from-stone-600 to-stone-500', 'from-zinc-700 to-zinc-600'
, 'from-gray-700 to-gray-600'];

export default function ResultMethodsSection() {
  const { t } = useTranslation();
  const methods = t('ResultsPage.methods', { returnObjects: true }) as Array<{ title: string; description: string }>;

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-light tracking-tight text-gray-800 mb-4">
            {t('ResultsPage.methodsSectionTitle')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('ResultsPage.methodsSectionText')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
          {methods.map((method, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl xl:hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 border border-gray-100/80 overflow-hidden"
            >
              <div className={`bg-linear-to-br ${colors[idx]} p-8 sm:p-10 md:p-12 text-white relative overflow-hidden`}>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-6xl sm:text-7xl md:text-8xl font-extralight text-white/10 select-none">
                  0{idx + 1}
                </div>

                <div className="text-5xl sm:text-6xl md:text-7xl mb-5 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {icons[idx]}
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-3xl font-light tracking-wide leading-tight">
                  {method.title}
                </h3>
              </div>

              <div className="p-6 sm:p-8 md:p-10">
                <p className="text-gray-600 leading-relaxed text-lg sm:text-xl md:text-xl lg:text-2xl">
                  {method.description}
                </p>
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}