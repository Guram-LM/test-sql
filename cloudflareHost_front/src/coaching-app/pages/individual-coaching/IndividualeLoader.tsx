import React from 'react'

interface IndividualeLoaderProp {
    loading: boolean
}
const IndividualeLoader:React.FC<IndividualeLoaderProp> = ({loading}) => {
  return (
    <>
    {loading &&
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="bg-linear-to-br from-stone-50 to-gray-50 rounded-3xl shadow-xl p-10 border border-gray-200 animate-pulse"
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-gray-300 rounded-2xl" />
                    <div className="h-8 bg-gray-300 rounded-lg w-3/4" />
                    <div className="h-6 bg-gray-200 rounded w-1/2" />

                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-11/12" />
                      <div className="h-4 bg-gray-200 rounded w-10/12" />
                    </div>

                    <div className="bg-white/80 rounded-2xl p-6 border border-gray-100">
                      <div className="h-6 bg-gray-300 rounded w-1/2 mb-4" />
                      <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-gray-300 rounded" />
                            <div className="h-4 bg-gray-200 rounded flex-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="h-6 bg-gray-300 rounded w-1/3" />
                    <div className="h-10 bg-gray-300 rounded-lg w-1/2" />
                  </div>
                  <div className="mt-8 h-14 bg-linear-to-r from-gray-300 to-gray-400 rounded-xl" />
                </div>
              </div>
            ))}
    </>
  )
}

export default IndividualeLoader