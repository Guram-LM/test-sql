import { useState } from "react";
import { useContacts } from "../../component/hook/useContacts";
import { useDeleteContact } from "../../component/hook/useDeleteContact";
import ConfirmModal from "../../component/modal/confirmModal/ConfirmModal";
import AdminLoader from "../adminLoader/AdminLoader";
import AdminError from "../adminError/AdminError";
import EmptyState from "../emptyState/EmptyState";
import { formatTbilisiDate } from "../../component/date/Date";
import { TrashIconSimple } from "../../component/svgIcons/SvgIcons";

const ContactPage = () => {
  const { contacts, loading, error, fetchContacts } = useContacts();
  const { deleteContact } = useDeleteContact();
  const [showConfirm, setShowConfirm] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);



  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteContact(id);
      fetchContacts();
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
      setShowConfirm(null);
    }
  };

  if (loading) return <AdminLoader/>
  if (error) return <AdminError/>
  if (contacts.length === 0) return <EmptyState message="შეტყობინებები არ არის" />

  return (
    <div className="p-6 md:p-8 min-h-screen mt-12 xl:mt-0">

  <h2 className="text-xl sm:text-2xl md:text-3xl text-center bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400 pb-2 my-8  font-bold tracking-tight">
    შეტყობინებები
  </h2>

    <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {contacts.map((c) => (
        <li
          key={c.id}
          className="group relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-purple-300/30 hover:shadow-purple-500/40 hover:border-purple-400/50 transition-all duration-500 hover:-translate-y-3 overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-purple-600 via-pink-500 to-purple-600" />

          <div className="p-7 space-y-6 text-gray-800">
            <div className="space-y-5">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <span className="text-purple-700 font-bold text-sm md:text-lg uppercase tracking-wider min-w-fit">სახელი:</span>
                <p className="font-semibold text-gray-900 text-sm md:text-lg">{c.name}</p>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-4">
                <span className="text-purple-700 font-bold text-sm md:text-lg uppercase tracking-wider min-w-fit">ელ.ფოსტა:</span>
                <p className="text-gray-700 break-all text-sm md:text-lg">{c.email}</p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <span className="text-purple-700 font-bold text-sm md:text-lg uppercase tracking-wider min-w-fit">შეტყობინება:</span>
                <p className="text-gray-600 leading-relaxed text-sm md:text-lg">{c.message}</p>
              </div>

              <div className="pt-5 border-t border-purple-200 flex text-sm md:text-lg">
                <span className="text-purple-700 font-bold text-sm md:text-lg uppercase tracking-wider block mr-2">
                  თარიღი:
                </span>
                {formatTbilisiDate(c.created_at)}
              </div>
              
            </div>
         
          </div>


             <button
              onClick={() => setShowConfirm(c.id)}
              disabled={deletingId === c.id}
              className="
                absolute 
                bottom-2 right-5         
                md:top-3 md:right-3 md:bottom-auto 
                p-3.5 
                z-10
              "
              title="წაშლა"
            >
              <TrashIconSimple />
            </button>



          <div className="absolute inset-0 rounded-3xl ring-4 ring-purple-500/0 group-hover:ring-purple-500/30 transition-all duration-500 pointer-events-none" />
        </li>
      ))}
    </ul>

  {showConfirm !== null && (
    <ConfirmModal
      message="ნამდვილად გსურთ შეტყობინების წაშლა?"
      onConfirm={() => handleDelete(showConfirm)}
      onCancel={() => setShowConfirm(null)}
    />
  )}
</div>
  );
};

export default ContactPage;
