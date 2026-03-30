import React from "react";
import { useNavigate } from "react-router-dom";

const Events: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden px-10 py-28 2xl:py-10 2xl:pb-22">



      <div className="relative z-10 max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 pb-2 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
            ივენთების მართვა
          </h1>
          <p className="text-purple-200 text-lg">
            შექმენი და მართე შენი და პარტნიორი კომპანიების ივენთები
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          <div
            onClick={() => navigate("/create-my-events")}
            className="group cursor-pointer overflow-hidden rounded-3xl bg-linear-to-r from-purple-600 to-pink-600 p-1 shadow-2xl transition-all duration-500 hover:scale-105"
          >
            <div className="relative h-full rounded-3xl bg-linear-to-r from-purple-600/90 to-pink-600/90 p-8">
              
              <div className="relative z-10">
                <div className="inline-block p-3 bg-white/20 rounded-2xl mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  ჩემი ივენთის შექმნა
                </h3>

                <p className="text-white/90">
                  შექმენი ახალი ივენთი შენი კომპანიისთვის
                </p>

                <div className="mt-6 flex items-center">
                  <span>შექმნა</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition">
                    <path stroke="currentColor" strokeWidth="2" d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => navigate("/create-partnets-events")}
            className="group cursor-pointer overflow-hidden rounded-3xl bg-linear-to-r from-blue-500 to-indigo-600 p-1 shadow-2xl transition-all duration-500 hover:scale-105"
          >
            <div className="relative h-full rounded-3xl bg-linear-to-r from-blue-500/90 to-indigo-600/90 p-8">
              
              <div className="relative z-10">
                <div className="inline-block p-3 bg-white/20 rounded-2xl mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M17 20h5V4H2v16h5m10 0v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6m10 0H7"/>
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  პარტნიორის ივენთი
                </h3>

                <p className="text-white/90">
                  შექმენი ივენთი სხვა კომპანიის პლატფორმაზე
                </p>

                <div className="mt-6 flex items-center">
                  <span>შექმნა</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition">
                    <path stroke="currentColor" strokeWidth="2" d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div
            onClick={() => navigate("/my-events-list")}
            className="group cursor-pointer rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 transition-all duration-500 hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-500 rounded-xl mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold">ჩემი ივენთები</h3>
            </div>

            <p className="text-purple-200">
              ნახე და მართე შენი შექმნილი ივენთები
            </p>
          </div>

          <div
            onClick={() => navigate("/partnets-events-list")}
            className="group cursor-pointer rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 transition-all duration-500 hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-500 rounded-xl mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M17 20h5V4H2v16h5"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold">პარტნიორების ივენთები</h3>
            </div>

            <p className="text-purple-200">
              ყველა პარტნიორის ივენთის სია ერთ სივრცეში
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Events;