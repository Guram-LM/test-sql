import React from 'react'
import type { OfferApiCombined } from '../../components/interface/Interface'

interface CompanyLoaderProp {
    loading: boolean
    offers: OfferApiCombined[]
    cardThemes: any[]
}

const CompanyLoader:React.FC<CompanyLoaderProp> = ({loading, offers, cardThemes}) => {
  return (
    <>
    {loading && Array.from({ length: offers.length || 6 }).map((_, idx) => {
              const theme: any= cardThemes[idx % cardThemes.length];
              return (
                <div key={`skeleton-${idx}`} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 animate-pulse">
                  <div className={`bg-linear-to-br ${theme.gradient} p-8`}>
                    <div className="text-6xl opacity-20">{theme.icon}</div>
                    <div className="h-10 bg-white/30 rounded-lg w-4/5 mt-4" />
                    <div className="h-6 bg-white/20 rounded w-1/2 mt-3" />
                    <div className="h-12 bg-white/40 rounded-lg w-3/5 mt-4" />
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-7 h-7 bg-gray-300 rounded-full" />
                          <div className="h-4 bg-gray-200 rounded flex-1" />
                        </div>
                      ))}
                    </div>
                    <div className="bg-stone-50 rounded-xl p-6 space-y-3">
                      <div className="h-6 bg-gray-300 rounded w-24" />
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-11/12" />
                      </div>
                    </div>
                    <div className="h-12 bg-linear-to-r from-gray-400 to-gray-500 rounded-lg" />
                  </div>
                </div>
              );
            })}
    </>
  )
}

export default CompanyLoader