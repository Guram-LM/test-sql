import { useState, useEffect } from 'react';
import certificate_1 from "../../../assets/1.jpg";
import certificate_2 from "../../../assets/2.jpg";
import certificate_3 from "../../../assets/3.jpg";
import certificate_4 from "../../../assets/4.jpg";
import certificate_5 from "../../../assets/5.png";
import certificate_6 from "../../../assets/6.png";

export default function CertificateSlider() {
  const certificates = [
    {
      title: 'University of Michigan / Coursera',
      image: certificate_1
    },
    {
      title: 'Certified Belief Clearing Practitioner',
      image: certificate_2
    },
    {
      title: 'Network Leader 2025 – Six Seconds',
      image: certificate_3
    },
    {
      title: 'Global Sciences Foundation',
      image: certificate_4
    },
     {
      title: 'EQ Practitioner – Six Seconds',
      image: certificate_5
    },
     {
      title: 'Network Leader 2026 – Six Seconds',
      image: certificate_6
    },
  ];


  

  const totalSlides = certificates.length;


  const extendedCertificates = [
    certificates[totalSlides - 1],
    ...certificates,
    certificates[0]
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  useEffect(() => {
    if (!isTransitioning) return;

    if (currentIndex === totalSlides + 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 700);
    }

    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalSlides);
      }, 700);
    }
  }, [currentIndex, isTransitioning, totalSlides]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1); 
  };

  return (
    <div className="bg-linear-to-br from-amber-50 via-stone-100 to-amber-100 rounded-2xl md:p-8 p-1 border-l-4 border-amber-400 shadow-lg overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gray-800">
            <div
              className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedCertificates.map((cert, index) => (
                <div key={index} className="min-w-full flex items-center justify-center">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-[400px] object-contain p-6"
                  />
                </div>
              ))}
            </div>

         
            <button
              onClick={goToNext}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-amber-500/90 hover:bg-amber-400 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

          
            <button
              onClick={goToPrevious}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-amber-500/90 hover:bg-amber-400 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-lg font-medium text-amber-700 leading-relaxed">
              {certificates[(currentIndex - 1 + totalSlides) % totalSlides].title}
            </p>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === (currentIndex - 1 + totalSlides) % totalSlides
                    ? 'bg-amber-500 w-8 shadow-md'
                    : 'bg-amber-300/60 hover:bg-amber-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
