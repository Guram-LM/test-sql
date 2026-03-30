import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import OfferForm from "../../dynamicForm/OfferForm";
import type { FieldConfig, OfferApiCombined } from "../../interface/interface";
import ErrorModal from "../errorModal/ErrorModal";
import { companyFields } from "../../fields/CompanyFields";
import { individualFields } from "../../fields/IndividualFields";

interface UpdateOfferModalProps {
  offer: OfferApiCombined;
  resource: "individualoffersOrder" | "companyoffers";
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  setUpdateSuccess: (result: boolean) => void;
  loading?: boolean;
}

const UpdateOfferModal = ({
  offer,
  resource,
  isOpen,
  onClose,
  onSubmit,
  setUpdateSuccess,
  loading = false,
}: UpdateOfferModalProps) => {
  const fields: FieldConfig[] =
    resource === "companyoffers" ? companyFields : individualFields;

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [activities, setActivities] = useState<{ ka: string; en: string }[]>([]);
  const [results, setResults] = useState<{ ka: string; en: string }[]>([]);
  const [updateError, setUpdateError] = useState(false);

  useEffect(() => {
    if (!offer) return;

    if (Object.keys(formData).length === 0) {
      const init: Record<string, string> = {};
      fields.forEach((f) => {
        const raw = (offer as any)[f.name];
        init[f.name] = typeof raw === "object" && raw !== null ? JSON.stringify(raw) : raw ?? "";
      });

      init.description_ka = offer.description_ka || "";
      init.description_en = offer.description_en || "";
      setFormData(init);

      const parse = (val: any) => {
        if (!val) return [];
        if (typeof val === "string") {
          try { return JSON.parse(val); } 
          catch { return []; }
        }
        return val;
      };

      const acts = parse(offer.activities);
      const res = parse(offer.results);

      setActivities(
        Array.isArray(acts)
          ? acts.map(a => typeof a === "string" ? { ka: a, en: "" } : { ka: a?.ka || "", en: a?.en || "" })
          : []
      );

      setResults(
        Array.isArray(res)
          ? res.map(r => typeof r === "string" ? { ka: r, en: "" } : { ka: r?.ka || "", en: r?.en || "" })
          : []
      );
    }
  }, [offer, fields]);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const onActivityChange = (index: number, lang: "ka" | "en", value: string) => {
    const updated = [...activities];
    updated[index][lang] = value;
    setActivities(updated);
  };
  const onAddActivity = () => setActivities([...activities, { ka: "", en: "" }]);
  const onRemoveActivity = (index: number) =>
    setActivities(activities.filter((_, i) => i !== index));

  const onResultsChange = (index: number, lang: "ka" | "en", value: string) => {
    const updated = [...results];
    updated[index][lang] = value;
    setResults(updated);
  };
  const onAddResult = () => setResults([...results, { ka: "", en: "" }]);
  const onRemoveResult = (index: number) =>
    setResults(results.filter((_, i) => i !== index));


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.entries(formData).forEach(([k, v]) => submitData.append(k, v));

    if (resource === "companyoffers" || resource === "individualoffersOrder") {
      submitData.append("activities", JSON.stringify(activities));
      submitData.append("results", JSON.stringify(results));
    }

    try {
      await onSubmit(submitData);
      setUpdateSuccess(true);
      onClose();
    } catch {
      setUpdateError(true);
    }
  };

  if (!isOpen) return null;

  return (
   <>
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 lg:p-8">
    <div className="bg-linear-to-r from-white via-purple-50 to-indigo-50 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-gray-100 flex flex-col">
      
     
      <div className="sticky top-0 z-10 border-b border-gray-200 px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between bg-white/80 backdrop-blur-md shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-purple-700">შეთავაზების რედაქტირება</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-purple-700 text-5xl font-bold transition"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8">
        <OfferForm
          fields={fields}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          activities={activities}
          onActivityChange={onActivityChange}
          onAddActivity={onAddActivity}
          onRemoveActivity={onRemoveActivity}
          results={results}
          onResultsChange={onResultsChange}
          onAddResult={onAddResult}
          onRemoveResult={onRemoveResult}
          submitButton={
            <div className="flex flex-col sm:flex-row justify-end gap-3 md:mt-6 mt-0 z-10">

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-linear-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition font-medium"
              >
                {loading ? "იტვირთება..." : "განახლება"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-medium shadow-sm"
                disabled={loading}
              >
                გაუქმება
              </button>
              
            </div>

          }
        />
      </div>
    </div>
  </div>

  {updateError && (
    <ErrorModal onClose={() => setUpdateError(false)} message="განახლება ვერ შესრულდა" />
  )}
</>
  );
};

export default UpdateOfferModal;
