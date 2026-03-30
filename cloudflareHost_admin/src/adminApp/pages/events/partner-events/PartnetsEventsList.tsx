import { useState } from "react";
import ConfirmModal from "../../../component/modal/confirmModal/ConfirmModal";
import SuccessModal from "../../../component/modal/successModal/SuccessModal";
import ErrorModal from "../../../component/modal/errorModal/ErrorModal";
import EventFormPage from "../events-form/Eventformpage";
import { useFetchPartnerEvents } from "../../../services/queries/events/useFetchEvents";
import { useDeletePartnerEvent } from "../../../services/queries/events/useDeleteEvent";
import BackButton from "../../../component/back-button/BackButton";

const PartnerEventsList = () => {
  const { data: events, isLoading } = useFetchPartnerEvents();
  const deleteEvent = useDeletePartnerEvent();
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteEvent.mutateAsync(confirmDeleteId);
      setSuccessMsg("ივენთი წარმატებით წაიშალა!");
    } catch {
      setErrorMsg("ივენთის წაშლა ვერ მოხერხდა.");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const isPast = (eventUtc: string) => new Date(eventUtc) < new Date();

  if (editingId !== null) {
    return (
      <EventFormPage
        type="partner"
        id={String(editingId)}
      />
    );
  }

  return (
    <div className="min-h-screen px-10 py-28 2xl:py-10 2xl:pb-22">
      <div className="max-w-4xl mx-auto">

      <BackButton/>

        <div className="mb-8 flex items-center gap-3">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-200 flex-shrink-0">
            <span className="text-xl sm:text-2xl">🤝</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">პარტნიორის ივენთები</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Partner Events</p>
          </div>
          <span className="ml-auto flex-shrink-0 bg-pink-100 text-pink-700 text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1 rounded-full">
            {events?.length || 0} სულ
          </span>
        </div>


        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
          </div>
        )}


        {!isLoading && (!events || events.length === 0) && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-20">📭</div>
            <p className="text-gray-400 font-medium">პარტნიორის ივენთები არ არის</p>
            <p className="text-gray-300 text-sm mt-1">No partner events found</p>
          </div>
        )}


        <div className="space-y-4">
          {events?.map((event) => {
            const past = isPast(event.eventUtc);
            return (
              <div
                key={event.id}
                className={`relative bg-white rounded-2xl border transition-all duration-200 hover:shadow-md overflow-hidden
                  ${past ? "border-gray-100" : "border-pink-100 hover:border-pink-200"}`}
              >

                <div className={`absolute left-0 top-0 bottom-0 w-1
                  ${past ? "bg-gray-200" : "bg-gradient-to-b from-pink-500 to-rose-500"}`}
                />

                <div className="pl-5 pr-3 sm:pl-6 sm:pr-4 py-4 sm:py-5">
                  <div className="flex items-start gap-3 sm:gap-4">

                    <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center text-white shadow-md
                      ${past
                        ? "bg-gradient-to-br from-gray-300 to-gray-400"
                        : "bg-gradient-to-br from-pink-500 to-rose-500 shadow-pink-200"}`}
                    >
                      <span className="text-base sm:text-lg font-bold leading-none">
                        {new Date(event.event_date).getDate()}
                      </span>
                      <span className="text-xs opacity-90 mt-0.5">
                        {new Date(event.event_date).toLocaleDateString("ka-GE", { month: "short" })}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">

                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className={`font-bold text-sm sm:text-base leading-snug ${past ? "text-gray-400" : "text-gray-900"}`}>
                            {event.title_ka}
                          </h3>
                          <p className={`text-xs sm:text-sm ${past ? "text-gray-300" : "text-gray-400"}`}>
                            {event.title_en}
                          </p>
                        </div>
                        <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
                          past ? "bg-gray-100 text-gray-400" : "bg-pink-50 text-pink-600"
                        }`}>
                          {past ? "✅ გავლილი" : "🤝 დაგეგმილი"}
                        </span>
                      </div>

                      {event.description_ka && (
                        <p className={`text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed ${
                          past ? "text-gray-300" : "text-gray-500"
                        }`}>
                          {event.description_ka}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1.5 mt-2.5">

                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-medium ${
                          past ? "bg-gray-50 text-gray-400" : "bg-pink-50 text-pink-700"
                        }`}>
                          🕐 {event.event_time}
                        </span>

                        {event.timezone && (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-gray-50 text-gray-400">
                            🌍 {event.timezone}
                          </span>
                        )}

                        {event.reminderMinutes ? (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-amber-50 text-amber-600 font-medium">
                            ⏰ {event.reminderMinutes} წთ
                          </span>
                        ) : null}

                        {event.meeting_type === "online" && event.platform && (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-blue-50 text-blue-600 font-medium">
                            🌐 {event.platform}
                          </span>
                        )}

                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      {!past && (
                        <button
                          onClick={() => setEditingId(event.id)}
                          className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors text-sm"
                          title="რედაქტირება"
                        >
                          ✏️
                        </button>
                      )}
                      <button
                        onClick={() => setConfirmDeleteId(event.id)}
                        className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors text-sm"
                        title="წაშლა"
                      >
                        🗑
                      </button>
                    </div>

                  </div>
                </div>

                {event.meeting_link && (
                  <div className={`border-t px-5 sm:px-6 py-2.5 flex items-center justify-between gap-3
                    ${past ? "border-gray-50 bg-gray-50/50" : "border-pink-50 bg-pink-50/40"}`}
                  >
                    <span className="text-xs text-gray-400 truncate min-w-0">
                      🔗 {event.meeting_link}
                    </span>
                    <a
                      href={event.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs font-semibold flex-shrink-0 transition-colors px-2.5 py-1 rounded-lg ${
                        past
                          ? "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                      }`}
                    >
                      Join →
                    </a>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {confirmDeleteId && (
        <ConfirmModal
          message="დარწმუნებული ხართ, რომ გსურთ ივენთის წაშლა?"
          onConfirm={handleDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
      {successMsg && (
        <SuccessModal message={successMsg} onClose={() => setSuccessMsg(null)} />
      )}
      {errorMsg && (
        <ErrorModal message={errorMsg} onClose={() => setErrorMsg(null)} />
      )}
    </div>
  );
};

export default PartnerEventsList;