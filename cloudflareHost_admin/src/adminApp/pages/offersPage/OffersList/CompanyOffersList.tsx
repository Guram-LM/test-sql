import { useState } from "react";
import { useOffers } from "../../../component/hook/useOffers";
import { useDeleteOffer } from "../../../component/hook/useDeleteOffer";
import { useUpdateOffer } from "../../../component/hook/useUpdateOffer";
import ConfirmModal from "../../../component/modal/confirmModal/ConfirmModal";
import UpdateOfferModal from "../../../component/modal/updateOfferModal/UpdateOfferModal";
import type { OfferApiCombined } from "../../../component/interface/interface";
import AdminError from "../../adminError/AdminError";
import AdminLoader from "../../adminLoader/AdminLoader";
import SuccessModal from "../../../component/modal/successModal/SuccessModal";
import EmptyState from "../../emptyState/EmptyState";

const CompanyOffersList = () => {
  const { offers, loading, error, fetchOffers } = useOffers("companyoffers");
  const { deleteOffer } = useDeleteOffer();
  const { updateOffer, loading: updateLoading } = useUpdateOffer();

  const [editingOffer, setEditingOffer] = useState<OfferApiCombined | null>(null);
  const [showConfirm, setShowConfirm] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteOffer("companyoffers", id);
      fetchOffers();
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
      setShowConfirm(null);
    }
  };

  const handleEdit = (offer: OfferApiCombined) => {
    setEditingOffer(offer);
  };

  const handleUpdate = async (data: FormData) => {
    if (!editingOffer?.id) return;
    await updateOffer("companyoffers", editingOffer.id, data);
    fetchOffers();
  };

  if (loading) return <AdminLoader />;
  if (error) return <AdminError />;
  if (offers.length === 0) return <EmptyState message="ჯერ არ არსებობს შეთავაზებები" />

  return (
    <>
      <div className="p-8 min-h-screen mx-auto">
        <h2 className="text-4xl pb-2 md:text-5xl font-extrabold text-center bg-clip-text text-white mb-16 leading-tight">
          კომპანიის შეთავაზებები
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
  {!loading && !error &&
    offers.map((offer) => {
   
      let activitiesKA: string[] = [];
      if (offer.activities) {
        try {
          const parsed = JSON.parse(offer.activities);
          if (Array.isArray(parsed)) {
            activitiesKA = parsed
              .map((a) => a?.ka)
              .filter((v): v is string => typeof v === "string" && v.trim() !== "");
          }
        } catch {}
      }
   
      let resultsKA: string[] = [];
      if (offer.results) {
        try {
          const parsed = JSON.parse(offer.results);
          if (Array.isArray(parsed)) {
            resultsKA = parsed
              .map((r) => r?.ka)
              .filter((v): v is string => typeof v === "string" && v.trim() !== "");
          }
        } catch {}
      }

      const hasActivities = activitiesKA.length > 0;
      const hasResults = resultsKA.length > 0;
      const hasDescription =
        typeof offer.description_ka === "string" &&
        offer.description_ka.trim() !== "";

      return (
        <div
          key={offer.id}
          className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group"
        >
  
          <div
            className="p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-700 transition-all duration-500" />

            <div className="relative z-10 mt-7">
              <h3 className="md:text-2xl text-xl font-bold mb-2">
                {offer.title_ka}
              </h3>

              {offer.programDuration_ka && (
                <p className="md:text-lg text-sm opacity-90 mb-4">
                  {offer.programDuration_ka}
                </p>
              )}

              {offer.price && (
                <div className="md:text-2xl text-xl font-bold mb-2 text-emerald-300">
                  ₾ {offer.price}
                </div>
              )}

              {offer.totalHours_ka && (
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <span className="text-4xl">⏱️</span>
                  <span className="md:text-lg text-sm">
                    {offer.totalHours_ka}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="md:p-8 p-4">

            {hasActivities && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-8">
                <h4 className="text-xl font-medium text-gray-800 mb-4">
                  პროგრამა მოიცავს
                </h4>
                <ul className="space-y-3">
                  {activitiesKA.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold text-lg">✓</span>
                      <p className="md:text-lg text-sm text-gray-600">
                        {act}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(hasResults || hasDescription) && (
              <div className="bg-stone-50 rounded-xl flex flex-col gap-5 p-4 mb-6">
                {hasResults && (
                  <>
                    <p className="text-xl font-medium text-gray-800">
                      შედეგები
                    </p>

                    
                    {offer.benefit_ka && (
                      <p className="md:text-lg text-sm text-gray-600 ">{offer.benefit_ka}</p>
                    )}

                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                      <ul className="space-y-3">
                        {resultsKA.map((res, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-600 font-bold">●</span>
                            <p className="md:text-lg text-sm text-gray-600">
                              {res}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {hasDescription && (
                  <p className="md:text-lg text-sm text-gray-600 whitespace-pre-line">
                    {offer.description_ka}
                  </p>
                )}
              </div>
            )}

            
               <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => handleEdit(offer)} 
                      className="flex-1 bg-gray-700 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                      შეცვლა
                    </button>

                    <button
                      onClick={() => setShowConfirm(offer.id!)}
                      disabled={deletingId === offer.id}
                      className={`flex-1 bg-rose-600 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md ${
                        deletingId === offer.id ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {deletingId === offer.id ? "მიმდინარეობს..." : "წაშლა"}
                    </button>
               </div>
          </div>
        </div>
      );
    })}
</div>

      </div>

      {showConfirm !== null && (
        <ConfirmModal
          message="ნამდვილად გსურთ ამ შეთავაზების წაშლა?"
          onConfirm={() => handleDelete(showConfirm)}
          onCancel={() => setShowConfirm(null)}
        />
      )}

      {editingOffer && (
        <UpdateOfferModal
          offer={{
            ...editingOffer,
            price: String(editingOffer.price ?? ""),
          }}
          setUpdateSuccess={setUpdateSuccess}
          resource="companyoffers"
          isOpen={true}
          onClose={() => setEditingOffer(null)}
          onSubmit={handleUpdate}
          loading={updateLoading}
        />
      )}

      {updateSuccess && (
        <SuccessModal
          onClose={() => setUpdateSuccess(false)}
          message="განახლება წარმატებით დასრულდა"
        />
      )}
    </>
  );
};

export default CompanyOffersList;
