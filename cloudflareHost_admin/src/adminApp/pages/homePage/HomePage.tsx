import { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AnalogClock from "./AnalogClock";
import EventCalendar from "./EventCalendar";

const imageUrls = [
  "https://plus.unsplash.com/premium_photo-1675198764382-94d5c093df30?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2VyZW5lJTIwbGFuZHNjYXBlfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000",
  "https://images.unsplash.com/photo-1564249126826-e7a9efb81845?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1167",
  "https://images.unsplash.com/photo-1447955552776-56465b845d20?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1167",
  "https://images.unsplash.com/photo-1539667468225-eebb663053e6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1117", 
  "https://images.unsplash.com/photo-1718374804801-e32eec6b90c3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
  "https://images.unsplash.com/photo-1468413253725-0d5181091126?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1476673160081-cf065607f449?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172",
  "https://images.unsplash.com/photo-1677130147365-97a8b7a9d3fb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1443181994330-3e365ff8949e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=881",
  "https://images.unsplash.com/photo-1706007473828-6ebc84884d30?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
];

const HomePage = () => {

  const [date, setDate] = useState<Date | null>(new Date());
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
    }, 50000); 
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? imageUrls.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
  };

  return (
   <div className="min-h-screen  relative overflow-hidden">
  
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 text-center bg-linear-to-r from-purple-200 to-pink-100">

        <img
          src={imageUrls[currentIndex]}
          alt="Background slide"
          className="absolute inset-0 w-full h-full object-cover opacity-30 sm:opacity-40 transition-opacity duration-1000"
        />

        <div className="relative z-10 max-w-4xl mx-auto mt-15 md:mt-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-purple-900 mb-4 sm:mb-6 leading-tight">
            კეთილი იყოს თქვენი მობრძანება, ადმინ!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-purple-800 mb-6 sm:mb-8 max-w-xl mx-auto">
            მართე შენი ემოციური ქოუჩინგის აპლიკაცია მარტივად, ეფექტურად და კრეატიულად
          </p>

         
          <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-10 md:mb-10">
            <button
              onClick={prevSlide}
              className="bg-white/90 hover:bg-white text-purple-700 font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg border border-purple-300 shadow-md transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label="წინა სლაიდი"
            >
              ⟵
            </button>

            <button
              onClick={nextSlide}
              className="bg-white/90 hover:bg-white text-purple-700 font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg border border-purple-300 shadow-md transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label="შემდეგი სლაიდი"
            >
              ⟶
            </button>
          </div>
        </div>
      </section>

     
      <section className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 auto-rows-fr">

          
          <div className="h-auto">
            <EventCalendar />
          </div>

          <div
            className="
              flex justify-center items-center
              md:col-span-2
              xl:col-span-1
              md:order-3
              xl:order-0
              h-full
            "
          >
            <AnalogClock />
          </div>

          <div className="h-auto">
            <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition flex flex-col items-center justify-center h-full">
              <Calendar
                onChange={(value) => setDate(value as Date)}
                value={date}
                className="rounded-lg border border-purple-200 shadow-inner scale-90 mx-auto max-w-[220px]"
              />
              <p className="text-purple-700 mt-3 text-center text-sm">
                დღევანდელი თარიღი:{" "}
                {date ? date.toLocaleDateString() : "არაფერი არჩეულია"}
              </p>
            </div>
          </div>

        </div>
      </section>


    </div>
  );
}

export default HomePage;
