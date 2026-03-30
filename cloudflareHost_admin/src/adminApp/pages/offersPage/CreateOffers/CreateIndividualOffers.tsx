import { useState } from "react";
import OfferForm from "../../../component/dynamicForm/OfferForm";
import { useCreateOffer } from "../../../component/hook/useCreateOffer";
import SuccessModal from "../../../component/modal/successModal/SuccessModal";
import { Link } from "react-router-dom";

const CreateIndividualOffers = () => {
  const { createOffer, loading } = useCreateOffer("individualoffersOrder");

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [activities, setActivities] = useState<{ ka: string; en: string }[]>([
    { ka: "", en: "" },
  ]);
  const [results, setResults] = useState<{ ka: string; en: string }[]>([
    { ka: "", en: "" },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const fields = [
    { name: "title_ka", label: "სათაური (ქარ.)", type: "text" as const, required: true },
    { name: "title_en", label: "Title (Eng.)", type: "text" as const, required: true },
    { name: "Program_ka", label: "პროგრამის დასახელება(ქარ.)", type: "text" as const, required: false },
    { name: "Program_en", label: "Program Name (Eng.)", type: "text" as const, required: false },
    { name: "programDuration_ka", label: "ხანგრძლივობა (ქარ.)", type: "text" as const, required: true },
    { name: "programDuration_en", label: "Duration (Eng.)", type: "text" as const, required: true },
    { name: "price", label: "ფასი", type: "text" as const, required: true },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleActivityChange = (
    i: number,
    lang: "ka" | "en",
    value: string
  ) => {
    const updated = [...activities];
    updated[i][lang] = value;
    setActivities(updated);
  };

  const addActivity = () =>
    setActivities([...activities, { ka: "", en: "" }]);

  const removeActivity = (i: number) =>
    setActivities(activities.filter((_, idx) => idx !== i));

  const handleResultChange = (
    i: number,
    lang: "ka" | "en",
    value: string
  ) => {
    const updated = [...results];
    updated[i][lang] = value;
    setResults(updated);
  };

  const addResult = () =>
    setResults([...results, { ka: "", en: "" }]);

  const removeResult = (i: number) =>
    setResults(results.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();

    Object.keys(formData).forEach((k) =>
      submitData.append(k, formData[k] || "")
    );

    submitData.append("activities", JSON.stringify(activities));
    submitData.append("results", JSON.stringify(results));

    try {
      await createOffer(submitData);
      setShowSuccess(true);
      setFormData({});
      setActivities([{ ka: "", en: "" }]);
      setResults([{ ka: "", en: "" }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2 className="text-xl sm:text-2xl md:text-3xl text-center bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400 pb-2 my-8 sm:my-10 font-bold tracking-tight">
        შექმენი კომპანიის შეთავაზებები
      </h2>


  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">

      <OfferForm
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        activities={activities}
        onActivityChange={handleActivityChange}
        onAddActivity={addActivity}
        onRemoveActivity={removeActivity}
        results={results}
        onResultsChange={handleResultChange}
        onAddResult={addResult}
        onRemoveResult={removeResult}
        submitButton={

          <div className="mt-0 sm:mt-10 flex flex-col sm:flex-row sm:justify-end items-center gap-4">
          <button
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "მიმდინარეობს..." : "დამატება"}
          </button>

          <Link
            to={"/offersPage" }
            className="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-900 transition shadow-lg hover:shadow-xl text-center"
          >
            გაუქმება
          </Link>
        </div>
        }
      />
      </div>
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </>
  );
};

export default CreateIndividualOffers;
