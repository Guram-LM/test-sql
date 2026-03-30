import { useState, useEffect } from "react";
import { useEventManager } from "../../component/hook/useEventManager";

import type { Event } from "../../component/interface/interface";
import SuccessModal from "../../component/modal/successModal/SuccessModal";
import ErrorModal from "../../component/modal/errorModal/ErrorModal";
import toast from "react-hot-toast";
import ConfirmModal from "../../component/modal/confirmModal/ConfirmModal";
import InlineError from "../../component/myToasMessage/InlineError";
import { useGlobalNotification } from "../../component/context/UniversalNotificationContext";

const EventCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [success, setSuccess] = useState(false);
  const [eventError, setEventError] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [wasEditing, setWasEditing] = useState(false);




  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    reminderMinutes: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const { createEvent, updateEvent, getEvents, deleteEvent, loading } = useEventManager();

   const { startMonitoring } = useGlobalNotification();

  useEffect(() => {
    loadEvents();
  }, []);


  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
      startMonitoring(data);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };





const isPastDateTime = (date: string, time: string) => {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  const eventDate = new Date(year, month - 1, day, hour, minute);
  const now = new Date();

  return eventDate < now;
};



const isReminderInPast = (
  date: string,
  time: string,
  reminderMinutes: string
) => {
  const minutes = Number(reminderMinutes);

  
  if (!minutes || minutes <= 0) return false;

  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  const eventDate = new Date(year, month - 1, day, hour, minute);
  const reminderTime = new Date(eventDate.getTime() - minutes * 60 * 1000);

  return reminderTime < new Date();
};







  const handleEditEvent = (event: Event) => {
  setEditingEvent(event);

  setFormData({
    title: event.title,
    description: event.description || "",
    date: event.date,
    time: event.time,
    reminderMinutes: event.reminderMinutes || "",
    timezone: event.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  setShowModal(true);
};




const [errors, setErrors] = useState<{
  title?: string;
  date?: string;
  time?: string;
  global?: string;
}>({});




const handleSubmit = async () => {
     const newErrors: typeof errors = {};

  if (!formData.title) newErrors.title = "გთხოვთ შეავსოთ სათაური";
  if (!formData.date) newErrors.date = "გთხოვთ შეავსოთ თარიღი";
  if (!formData.time) newErrors.time = "გთხოვთ შეავსოთ დრო";

  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (formData.time && !timeRegex.test(formData.time)) {
    newErrors.time = "დროის ფორმატი უნდა იყოს HH:MM (მაგ: 22:30, 14:00, 09:15)";
  }

  if (formData.date && formData.time && isPastDateTime(formData.date, formData.time)) {
  newErrors.global = "ჩავლილ თარიღსა და დროზე ივენთის შექმნა შეუძლებელია";
}

else if (
  formData.date &&
  formData.time &&
  formData.reminderMinutes &&
  isReminderInPast(
    formData.date,
    formData.time,
    formData.reminderMinutes
  )
) {
  newErrors.global =
    "შეხსენების დრო უკვე გასულია — შეცვალეთ დრო ან შეხსენების ინტერვალი";
}


  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);

   
    setTimeout(() => setErrors({}), 2000);
    return;
  }

  setErrors({});

  try {
    if (editingEvent) {
      setWasEditing(true);
      await updateEvent(editingEvent.id!, formData);
    } else {
      setWasEditing(false);
      await createEvent(formData as Event);
    }

    await loadEvents();
    setShowModal(false);
    setEditingEvent(null);
    setSuccess(true);

    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      reminderMinutes: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  } catch {
    setEventError(true);
  }
};






const closeModal = () => {
  setShowModal(false);
  setEditingEvent(null);
};







 const handleDeleteClick = (eventId: string) => {
  setConfirmDeleteId(eventId);
};

const handleConfirmDelete = async () => {
  if (!confirmDeleteId) return;

  try {
    await deleteEvent(confirmDeleteId);
    await loadEvents();
  } catch (err) {
    toast.error("ივენთის წაშლა ვერ მოხერხდა");
  } finally {
    setConfirmDeleteId(null);
  }
};

const handleCancelDelete = () => {
  setConfirmDeleteId(null);
};


  
  const parseEventDate = (event: Event) => {
    const [year, month, day] = event.date.split("-").map(Number);
    const [hour, minute] = event.time.split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute);
  };

  const upcomingEvents = events
    .filter(event => parseEventDate(event) >= new Date())
    .sort((a, b) => parseEventDate(a).getTime() - parseEventDate(b).getTime());

  const pastEvents = events
    .filter(event => parseEventDate(event) < new Date())
    .sort((a, b) => parseEventDate(b).getTime() - parseEventDate(a).getTime());

  const formatTime = (time: string) => time;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ka-GE', {
      month: 'short',
      day: 'numeric'
    });
  };

  const nextUpcoming = upcomingEvents[0];
  const lastPast = pastEvents[0];

  const EventCard = ({ event, isPast = false }: { event: Event; isPast?: boolean }) => {
    const eventDate = parseEventDate(event);
    const now = new Date();
    const hoursUntil = Math.round((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60));
    const isToday = eventDate.toDateString() === now.toDateString();

    return (
      <div className={`bg-linear-to-r ${isPast ? 'from-gray-50 to-slate-50' : 'from-purple-50 to-pink-50'} p-4 rounded-xl hover:shadow-lg transition border-2 ${isPast ? 'border-gray-200' : 'border-purple-200'} group relative`}>
        <div className="flex items-start gap-3">
          <div className={`bg-linear-to-r ${isPast ? 'from-gray-400 to-slate-400' : 'from-purple-500 to-pink-500'} w-14 h-14 rounded-xl flex flex-col items-center justify-center text-white shadow-lg`}>
            <span className="text-xl font-bold">{new Date(event.date).getDate()}</span>
            <span className="text-xs opacity-90">{formatDate(event.date)}</span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className={`font-bold ${isPast ? 'text-gray-900' : 'text-purple-900'}`}>{event.title}</h3>
              {!isPast && isToday && (
                <span className="bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                  დღეს!
                </span>
              )}
            </div>
            
            {event.description && (
              <p className="text-gray-600 text-xs mb-2 line-clamp-1">{event.description}</p>
            )}
            
            <div className="flex items-center gap-3 text-xs">
              <span className={`${isPast ? 'text-gray-600' : 'text-purple-600'} font-semibold`}>
                🕐 {formatTime(event.time)}
              </span>
              {!isPast && hoursUntil <= 24 && hoursUntil >= 0 && (
                <span className="bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                  ⏰ {hoursUntil === 0 ? '< 1სთ' : `${hoursUntil}სთ`}
                </span>
              )}
              {isPast && (
                <span className="bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                  ✅
                </span>
              )}
            </div>
          </div>



          <div className="absolute  top-16 right-3 flex gap-2 ">

            {!isPast && (
              <button
                onClick={() => handleEditEvent(event)}
                className="text-blue-400 hover:text-blue-600 text-xl transition hover:scale-110  mr-2"
                title="რედაქტირება"
              >
                ✏️
              </button>
            )}

            <button
              onClick={() => handleDeleteClick(event.id!)}
              className="text-red-400 text-xl transition hover:scale-110 "
              title="წაშლა"
            >
              <span className="text-red-600 text-3xl">🗑</span>
            </button>
            

          </div>


        </div>
      </div>
    );
  };

  return (
    <div className="bg-white h-full rounded-2xl shadow-xl p-4 sm:p-6 hover:shadow-2xl transition relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-purple-900">ივენთები</h2>
              <p className="text-gray-600 text-xs">{upcomingEvents.length} დაგეგმილი</p>
            </div>
          </div>

          <button
            onClick={() => {
              setEditingEvent(null);
              setFormData({
                title: "",
                description: "",
                date: "",
                time: "",
                reminderMinutes: "",
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              });
              setShowModal(true);
            }}
            title="შექმნა"
            className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-semibold transition shadow-lg hover:shadow-xl text-sm flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
          >
            <span>+</span>
            <span>ახალი</span>
          </button>

        </div>

        <div className="space-y-3">
          {nextUpcoming && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-purple-900">🔮 შემდეგი ივენთი</h3>
              </div>
              <EventCard event={nextUpcoming} />
            </div>
          )}

          {lastPast && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-gray-900">📜 ბოლო გავლილი</h3>
              </div>
              <EventCard event={lastPast} isPast />
            </div>
          )}

          {!nextUpcoming && !lastPast && (
            <div className="text-center py-8">
              <div className="text-6xl mb-3 opacity-20">📭</div>
              <p className="text-gray-500">ივენთები არ არის</p>
            </div>
          )}
        </div>

        {(upcomingEvents.length > 1 || pastEvents.length > 1) && (
          <button
            onClick={() => setShowAllModal(true)}
            className="w-full mt-4 bg-purple-100 hover:bg-purple-200 text-purple-700 py-3 rounded-xl font-semibold transition text-sm"
          >
            ყველას ნახვა ({upcomingEvents.length + pastEvents.length})
          </button>
        )}
      </div>

    
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
         <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden">
            
           <div className="sticky top-0 z-30 isolate
                border-b border-purple-200/50
                px-6 py-5 flex items-center justify-between
                bg-linear-to-r from-purple-50 via-pink-50 to-purple-50
                backdrop-blur-md shadow-md">

              <div>
                <h3 className="text-2xl font-bold text-purple-900">
                  {editingEvent ? "ივენთის რედაქტირება" : "ახალი ივენთი"}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {editingEvent ? "შეცვალე ივენთის დეტალები" : "შექმენი დაგეგმილი ივენთი"}
                </p>

              </div>
              <button
                onClick={closeModal}
                className="text-purple-500 hover:text-purple-700 text-3xl font-bold transition-colors duration-200 focus:outline-none hover:scale-110"
                aria-label="დახურვა"
                title="დახურვა"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">სათაური *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition text-base"
                  placeholder="მაგ: საბჭოს შეხვედრა"
                />
               {errors.title && <InlineError message={errors.title} />}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">აღწერა</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition resize-none text-base"
                  placeholder="დამატებითი დეტალები..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">თარიღი *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition text-base"
                />

                {errors.date && <InlineError message={errors.date} />}

              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">🕐 დრო (24სთ) *</label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9:]/g, '');
                    if (value.length === 2 && !value.includes(':')) {
                      value = value + ':';
                    }
                    setFormData({ ...formData, time: value });
                  }}
                  placeholder="00:00"
                  maxLength={5}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition text-lg text-center font-mono"
                />
                <p className="text-xs text-gray-500 mt-1 text-center">
                  ფორმატი: HH:MM (მაგ: 22:30, 14:00, 09:15)
                </p>

                {errors.time  && <InlineError message={errors.time} />}

              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">⏰ შეხსენების დრო</label>
                <select
                  value={formData.reminderMinutes}
                  onChange={(e) => setFormData({ ...formData, reminderMinutes: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition text-base bg-white"
                >
                  <option value="0">ზუსტ დროზე</option>
                  <option value="1">1 წუთით ადრე</option>
                  <option value="5">5 წუთით ადრე</option>
                  <option value="10">10 წუთით ადრე</option>
                  <option value="15">15 წუთით ადრე</option>
                  <option value="30">30 წუთით ადრე</option>
                  <option value="60">1 საათით ადრე</option>
                  <option value="120">2 საათით ადრე</option>
                  <option value="1440">1 დღით ადრე</option>
                </select>
              </div>

              {errors.global && <InlineError message={errors.global} />}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold transition shadow-lg hover:shadow-xl disabled:opacity-50 text-base"
              >
                {loading
                  ? "⏳ იტვირთება..."
                  : editingEvent
                  ? "ცვლილებების შენახვა"
                  : "ივენთის შექმნა"
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {showAllModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col relative">
            <button
              onClick={() => setShowAllModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold z-10"
            >
              ✕
            </button>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">ყველა ივენთი</h3>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`flex-1 py-2.5 sm:py-3 rounded-xl font-semibold transition text-sm sm:text-base ${
                    activeTab === 'upcoming'
                      ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  🔮 დაგეგმილი ({upcomingEvents.length})
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`flex-1 py-2.5 sm:py-3 rounded-xl font-semibold transition text-sm sm:text-base ${
                    activeTab === 'past'
                      ? 'bg-linear-to-r from-gray-600 to-slate-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  📜 გავლილი ({pastEvents.length})
                </button>
              </div>
            </div>

            <div className="space-y-3 overflow-y-auto flex-1 pr-2">
              {activeTab === 'upcoming' && (
                upcomingEvents.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-3 opacity-20">📭</div>
                    <p className="text-gray-500">დაგეგმილი ივენთები არ არის</p>
                  </div>
                ) : (
                  upcomingEvents.map(event => <EventCard key={event.id} event={event} />)
                )
              )}

              {activeTab === 'past' && (
                pastEvents.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-3 opacity-20">✨</div>
                    <p className="text-gray-500">გავლილი ივენთები არ არის</p>
                  </div>
                ) : (
                  pastEvents.map(event => <EventCard key={event.id} event={event} isPast />)
                )
              )}
            </div>
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <ConfirmModal
          message="დარწმუნებული ხართ, რომ გსურთ ივენთის წაშლა?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {success && (
        <SuccessModal
          onClose={() => setSuccess(false)}
          message={
            wasEditing
              ? "ივენთი წარმატებით განახლდა"
              : "ივენთი წარმატებით შეიქმნა"
          }
        />
      )}

      {eventError && (
        <ErrorModal onClose={() => setEventError(false)} message="ივენთის შექმნა ვერ მოხერხდა" />
      )}
    </div>
  );
};

export default EventCalendar;

















