import React from "react";
import type { FieldConfig } from "../interface/interface";

interface OfferFormProps {
  fields: FieldConfig[];
  formData: Record<string, any>;
  activities: { ka: string; en: string }[];
  results: { ka: string; en: string }[];
  onResultsChange: (index: number, lang: "ka" | "en", value: string) => void;
  onAddResult: () => void;
  onRemoveResult: (index: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onActivityChange: (index: number, lang: "ka" | "en", value: string) => void;
  onAddActivity: () => void;
  onRemoveActivity: (index: number) => void;
  submitButton?: React.ReactNode;
}

const OfferForm = ({
  fields,
  formData,
  activities,
  results,
  onResultsChange,
  onAddResult,
  onRemoveResult,
  onChange,
  onSubmit,
  onActivityChange,
  onAddActivity,
  onRemoveActivity,
  submitButton,
}: OfferFormProps) => {
  return (
    <form onSubmit={onSubmit} className="max-w-6xl mx-auto bg-linear-to-br from-purple-100 via-pink-100 to-indigo-100 rounded-3xl shadow-xl md:p-10 py-5 px-2 flex flex-col gap-8 mt-10">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(field => (
          <div key={field.name} className="flex-1">
            <label className="block font-semibold text-purple-700 mb-2">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              placeholder={field.placeholder}
              required={field.required ?? false}
              onChange={onChange}
              className="w-full p-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block font-semibold text-purple-700 mb-2">აღწერა (ქართული) ge</label>
            <textarea
              name="description_ka"
              value={formData.description_ka || ""}
              placeholder="შეიყვანეთ აღწერა ქართულად..."
              onChange={onChange}
              className="w-full h-28 p-4 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400 outline-none resize-none transition"
            />
          </div>
          <div>
            <label className="block font-semibold text-purple-700 mb-2">Description (English) en</label>
            <textarea
              name="description_en"
              value={formData.description_en || ""}
              placeholder="Enter description in English..."
              onChange={onChange}
              className="w-full h-28 p-4 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400 outline-none resize-none transition"
            />
          </div>
        </div>
      </div>

      <div className="bg-white/60 rounded-2xl md:p-6 py-5 px-2 shadow-inner">
        <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">შეთავაზებაში ჩართული აქტივობები / Included Activities</h3>
        <div className="space-y-6">
          {activities.map((act, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-purple-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-pink-500 text-xl font-bold">✓</span>
                <span className="font-semibold text-purple-600">აქტივობა {i + 1}</span>
                {activities.length > 1 && (
                  <button type="button" onClick={() => onRemoveActivity(i)} className="ml-auto px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                    წაშლა
                  </button>
                )}
              </div>
              <input type="text" value={act.ka} onChange={(e) => onActivityChange(i, "ka", e.target.value)} placeholder="აქტივობა ქართულად..." className="w-full p-2 rounded-lg border border-purple-200" />
              <input type="text" value={act.en} onChange={(e) => onActivityChange(i, "en", e.target.value)} placeholder="Activity in English..." className="w-full p-2 rounded-lg border border-purple-200" />
            </div>
          ))}
        </div>
        <button type="button" onClick={onAddActivity} className="mt-6 w-full bg-linear-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl">+ ახალი აქტივობის დამატება</button>
      </div>
      <div className="bg-white/60 rounded-2xl md:p-6 py-5 px-2 shadow-inner shadow-inner">
        <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">შედეგები / Results</h3>
        <div className="space-y-6">
          {results.map((res, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-purple-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-purple-500 text-xl font-bold">•</span>
                <span className="font-semibold text-purple-600">შედეგი {i + 1}</span>
                {results.length > 1 && (
                  <button type="button" onClick={() => onRemoveResult(i)} className="ml-auto px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                    წაშლა
                  </button>
                )}
              </div>
              <input type="text" value={res.ka} onChange={(e) => onResultsChange(i, "ka", e.target.value)} placeholder="შედეგი ქართულად..." className="w-full p-2 rounded-lg border border-purple-200" />
              <input type="text" value={res.en} onChange={(e) => onResultsChange(i, "en", e.target.value)} placeholder="Result in English..." className="w-full p-2 rounded-lg border border-purple-200" />
            </div>
          ))}
        </div>
        <button type="button" onClick={onAddResult} className="mt-6 w-full bg-linear-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl">+ ახალი შედეგის დამატება</button>
      </div>

      <div className="mt-6">{submitButton}</div>
    </form>
  );
};

export default OfferForm;
