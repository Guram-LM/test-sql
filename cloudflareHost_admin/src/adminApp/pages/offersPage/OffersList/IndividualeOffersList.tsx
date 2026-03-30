import { useState } from "react";
import { useOffers } from "../../../component/hook/useOffers";
import { useDeleteOffer } from "../../../component/hook/useDeleteOffer";
import { useUpdateOffer } from "../../../component/hook/useUpdateOffer";
import ConfirmModal from "../../../component/modal/confirmModal/ConfirmModal";
import UpdateOfferModal from "../../../component/modal/updateOfferModal/UpdateOfferModal";
import type { OfferApiCombined } from "../../../component/interface/interface";
import AdminLoader from "../../adminLoader/AdminLoader";
import AdminError from "../../adminError/AdminError";
import SuccessModal from "../../../component/modal/successModal/SuccessModal";
import EmptyState from "../../emptyState/EmptyState";

const IndividualOffersList = () => {
  const { offers, loading, error, fetchOffers } = useOffers("individualoffersOrder");
  const { deleteOffer } = useDeleteOffer();
  const { updateOffer, loading: updateLoading } = useUpdateOffer();

  const [editingOffer, setEditingOffer] = useState<OfferApiCombined | null>(null);
  const [showConfirm, setShowConfirm] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteOffer("individualoffersOrder", id);
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
    await updateOffer("individualoffersOrder", editingOffer.id, data);
    fetchOffers();
    setEditingOffer(null);
  };

  if (loading) return <AdminLoader/>
  if (error) return <AdminError/>
  if (offers.length === 0) return <EmptyState message="ჯერ არ არსებობს შეთავაზებები" />

  return (
    <>
      <div className="p-8 min-h-screen">
        <h2 className="text-4xl md:text-5xl pb-2 font-extrabold text-center text-white mb-16 leading-tight">
          ინდივიდუალური შეთავაზებები
        </h2>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
  {!loading &&
    offers.map((offer) => {

      let activitiesKa: string[] = [];
      if (offer.activities) {
        try {
          const parsed = JSON.parse(offer.activities);
          if (Array.isArray(parsed)) {
            activitiesKa = parsed
              .map((a) => a?.ka)
              .filter((v): v is string => typeof v === "string" && v.trim() !== "");
          }
        } catch {}
      }

      let resultsKa: string[] = [];
      if (offer.results) {
        try {
          const parsed = JSON.parse(offer.results);
          if (Array.isArray(parsed)) {
            resultsKa = parsed
              .map((r) => r?.ka)
              .filter((v): v is string => typeof v === "string" && v.trim() !== "");
          }
        } catch {}
      }

      const hasActivities = activitiesKa.length > 0;
      const hasResults = resultsKa.length > 0;
      const hasDescription =
        typeof offer.description_ka === "string" &&
        offer.description_ka.trim() !== "";

      return (
        <div
          key={offer.id}
          className="cursor-pointer bg-linear-to-br from-stone-50 to-gray-50 rounded-3xl shadow-xl md:p-10 px-4 py-5 border border-gray-200 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
        >
          <div>

            <div className="w-16 h-16 bg-linear-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl mb-6">
              👥
            </div>

            <h3 className="text-2xl font-medium text-gray-800 mb-2">
              {offer.title_ka}
            </h3>

            <h3 className="text-2xl font-medium text-gray-800 mb-2">
              {offer.Program_ka}
            </h3>

            {hasDescription && (
              <p className="text-lg font-light text-gray-600 mb-8 whitespace-pre-line">
                {offer.description_ka}
              </p>
            )}

            {hasActivities && (
              <div className="bg-stone-50 rounded-xl flex flex-col gap-5  mb-6">
                <p className="text-xl font-medium text-gray-800">
                  პროგრამა მოიცავს
                </p>

                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <ul className="space-y-3">
                    {activitiesKa.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold text-lg">✓</span>
                        <p className="md:text-lg text-sm font-light text-gray-600">
                          {act}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

           

  
            {(hasResults || hasDescription) && (
              <div className="bg-stone-50 rounded-xl flex flex-col gap-5 mb-6">
                {hasResults && (
                  <>
                    <p className="text-xl font-medium text-gray-800">
                      შედეგები
                    </p>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                      <ul className="space-y-3">
                        {resultsKa.map((res, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-600 font-bold">●</span>
                            <p className="md:text-lg text-sm font-light text-gray-600">
                              {res}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            )}

             {offer.programDuration_ka && (
              <div className="font-medium text-gray-800 mb-6 text-lg">
                ხანგრძლივობა:  <span className="font-light text-gray-700 ">{offer.programDuration_ka}</span>
              </div>
            )}

            {offer.price && (
              <div className="text-3xl font-light text-gray-800 mb-6">
                 {offer.price} ₾ 
              </div>
            )}
          </div>

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
          resource="individualoffersOrder"
          isOpen={true}
          onClose={() => setEditingOffer(null)}
          onSubmit={handleUpdate}
          loading={updateLoading}
        />
      )}

      {updateSuccess &&  <SuccessModal onClose={() => setUpdateSuccess(false)} message="განახლება წარმატებით დასეულდა"/>}
    </>
  );
};

export default IndividualOffersList;
