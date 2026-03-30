import React, { useState } from "react";
import type { OrderData } from "../../component/interface/interface";
import { useOrders } from "../../component/hook/useOrders";
import ConfirmModal from "../../component/modal/confirmModal/ConfirmModal";
import { useDeleteOrders } from "../../component/hook/useDeleteOrders";
import AdminLoader from "../adminLoader/AdminLoader";
import AdminError from "../adminError/AdminError";
import EmptyState from "../emptyState/EmptyState";
import { formatTbilisiDate } from "../../component/date/Date";
import { TrashIconSimple } from "../../component/svgIcons/SvgIcons";

const OrderPage: React.FC = () => {
  const { orders, loading, error, fetchOrders } = useOrders();
  const {deleteOrder} = useDeleteOrders()
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState<number | null>(null);

   const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
      setShowConfirm(null);
    }
  };

  if (loading) return <AdminLoader/>
  if (error) return <AdminError/>
  if (orders.length === 0) return <EmptyState message="ჯავშანი არ არის" />

  return (
    <>
      <div className="p-6 md:p-8 min-h-screen mt-12 xl:mt-0">

        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-center bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400 pb-2 my-8 font-bold tracking-tight">
            შეკვეთები
          </h1>

          
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-8">
              {orders.map((order: OrderData) => (
                <div
                  key={order.id}
                  className="group relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-purple-300/30 hover:shadow-purple-500/40 hover:border-purple-400/60 transition-all duration-500 hover:-translate-y-3 overflow-hidden"
                >
                
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-purple-600 via-pink-500 to-purple-600" />

                 
                 

                  <div className="p-8 space-y-6 text-gray-800">
            
                    <div className="flex flex-col md:flex-row items-start gap-4">
                      <span className="text-purple-700 font-bold text-sm uppercase tracking-wider min-w-fit md:text-lg">სახელი:</span>
                      <p className="text-sm  font-bold text-gray-900 md:text-lg">
                        {order.firstName} {order.lastName}
                      </p>
                    </div>

      
                    <div className="flex flex-col md:flex-row items-start gap-4">
                      <span className="text-purple-700 font-bold text-sm uppercase tracking-wider min-w-fit md:text-lg">ელ.ფოსტა:</span>
                      <p className="text-gray-700 break-all text-sm md:text-lg">{order.email}</p>
                    </div>

   
                    <div className="flex items-center gap-4">
                      <span className="text-purple-700 font-bold text-sm uppercase tracking-wider min-w-fit md:text-lg">ტელ:</span>
                      <p className="text-gray-800 font-medium text-sm md:text-lg ">{order.phone}</p>
                    </div>

         
                    <div className="flex flex-col items-start gap-4 pt-4 border-t border-purple-200">
                      <span className="text-purple-700 font-bold text-sm uppercase tracking-wider text-left md:text-lg">კურსი:</span>
                      <p className="text-sm font-bold text-emerald-700 md:text-lg">
                        {order.courseTitle} — ₾{order.coursePrice}
                      </p>
                    </div>

                    {order.message && (
                      <div className="pt-5 border-t border-purple-200">
                        <span className="text-purple-700 font-bold text-sm uppercase tracking-wider block mb-3 md:text-lg">
                          მომხმარებლის შეტყობინება:
                        </span>
                        <div className="p-5 bg-purple-50/80 rounded-2xl border border-purple-300/50">
                          <p className="text-purple-800 italic leading-relaxed text-sm md:text-lg">
                            "{order.message}"
                          </p>
                        </div>
                      </div>
                    )}

        
                    <div className="pt-5 border-t border-purple-200">
                      
                      <p className="text-gray-600 text-sm font-medium flex md:text-lg">
                        <span className="text-purple-700 font-bold text-sm uppercase tracking-wider block mr-2 md:text-lg">
                          თარიღი:
                        </span>
                            {formatTbilisiDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                   <button
                    onClick={() => setShowConfirm(order.id)}
                    disabled={deletingId === order.id}
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
                </div>
              ))}
            </div>
      
        </div>
      </div>

    
      {showConfirm !== null && (
        <ConfirmModal
          message="ნამდვილად გსურთ ამ შეკვეთის წაშლა?"
          onConfirm={() => handleDelete(showConfirm)}
          onCancel={() => setShowConfirm(null)}
        />
      )}
    </>
  );
};

export default OrderPage;

