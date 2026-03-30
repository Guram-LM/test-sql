// pages/events/EventFormPage.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { MyEventPayload, PartnerEventPayload } from "../../../component/interface/interface";
import InlineError from "../../../component/myToasMessage/InlineError";
import SuccessModal from "../../../component/modal/successModal/SuccessModal";
import ErrorModal from "../../../component/modal/errorModal/ErrorModal";
import { useFetchMyEvents, useFetchPartnerEvents } from "../../../services/queries/events/useFetchEvents";
import { useCreateMyEvent, useCreatePartnerEvent } from "../../../services/queries/events/useCreateEvent";
import { useUpdateMyEvent, useUpdatePartnerEvent } from "../../../services/queries/events/useUpdateEvent";
import BackButton from "../../../component/back-button/BackButton";


const TIMEZONES = [
  "Asia/Tbilisi", "Europe/London", "Europe/Berlin",
  "Europe/Moscow", "Europe/Istanbul", "America/New_York",
  "America/Los_Angeles", "Asia/Dubai", "Asia/Tokyo", "UTC",
  "სხვა / Other",
];

const PLATFORMS = [
  "Zoom", "Google Meet", "Teams", "Webex",
  "Messenger", "Instagram", "WhatsApp", "Telegram", "სხვა / Other",
];

const REMINDER_OPTIONS = [
  { value: 0,    label: "ზუსტ დროზე / At event time" },
  { value: 5,    label: "5 წუთით ადრე / 5 min before" },
  { value: 10,   label: "10 წუთით ადრე / 10 min before" },
  { value: 15,   label: "15 წუთით ადრე / 15 min before" },
  { value: 30,   label: "30 წუთით ადრე / 30 min before" },
  { value: 60,   label: "1 საათით ადრე / 1 hour before" },
  { value: 120,  label: "2 საათით ადრე / 2 hours before" },
  { value: 1440, label: "1 დღით ადრე / 1 day before" },
];


export type EventFormType = "my" | "partner";

interface FormState {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  event_date: string;
  event_time: string;
  timezone: string;
  reminderMinutes: number;
  meeting_type: "online" | "offline";
  meeting_link: string;
  platform: string;
  city: string;
  address: string;
}

const defaultForm: FormState = {
  title_ka: "", title_en: "",
  description_ka: "", description_en: "",
  event_date: "", event_time: "",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  reminderMinutes: 30,
  meeting_type: "online",
  meeting_link: "", platform: "Zoom",
  city: "", address: "",
};



const inputCls =
  "w-full px-5 py-4 bg-white rounded-xl border border-purple-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all";

const labelCls = "block text-sm font-semibold text-purple-700";



interface Props {
  type: EventFormType;
  id?: string;
}

const EventFormPage = ({ type, id }: Props) => {
  const navigate = useNavigate();

  const isEdit = !!id;
  const isMyType = type === "my";

  const [form, setForm] = useState<FormState>(defaultForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);


  const { data: myEvents } = useFetchMyEvents();
  const { data: partnerEvents } = useFetchPartnerEvents();

  const createMyEvent = useCreateMyEvent();
  const createPartnerEvent = useCreatePartnerEvent();
  const updateMyEvent = useUpdateMyEvent();
  const updatePartnerEvent = useUpdatePartnerEvent();

  const isLoading =
    createMyEvent.isPending ||
    createPartnerEvent.isPending ||
    updateMyEvent.isPending ||
    updatePartnerEvent.isPending;

  useEffect(() => {
    if (!isEdit || !id) return;
    const events = isMyType ? myEvents : partnerEvents;
    const event = events?.find((e) => String(e.id) === id) as any;
    if (!event) return;

    setForm({
      title_ka:        event.title_ka || "",
      title_en:        event.title_en || "",
      description_ka:  event.description_ka || "",
      description_en:  event.description_en || "",
      event_date:      event.event_date || "",
      event_time:      event.event_time || "",
      timezone:        event.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      reminderMinutes: event.reminderMinutes || 30,
      meeting_type:    event.meeting_type || "online",
      meeting_link:    event.meeting_link || "",
      platform:        event.platform || "Zoom",
      city:            event.city || "",
      address:         event.address || "",
    });
  }, [id, myEvents, partnerEvents, isMyType, isEdit]);


  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = (): boolean => {
    const e: Record<string, string> = {};

    if (!form.title_ka.trim()) e.title_ka = "ქართული სათაური სავალდებულოა";
    if (!form.title_en.trim()) e.title_en = "English title is required";
    if (!form.event_date)      e.event_date = "თარიღი სავალდებულოა";
    if (!form.event_time)      e.event_time = "დრო სავალდებულოა";

    if (form.event_date && form.event_time && !isEdit) {
      const [year, month, day] = form.event_date.split("-").map(Number);
      const [hour, minute] = form.event_time.split(":").map(Number);
      const eventDate = new Date(year, month - 1, day, hour, minute);
      if (eventDate < new Date()) {
        e.global = "ჩავლილ თარიღზე ივენთის შექმნა შეუძლებელია";
      }
    }

    if (Object.keys(e).length) {
      setErrors(e);
      setTimeout(() => setErrors({}), 3000);
      return false;
    }

    setErrors({});
    return true;
  };


  const handleSubmit = async () => {
    if (!validate()) return;

    const utcOffset = new Date().getTimezoneOffset() * -1;

    const payload: MyEventPayload | PartnerEventPayload = {
      title_ka:        form.title_ka,
      title_en:        form.title_en,
      description_ka:  form.description_ka || undefined,
      description_en:  form.description_en || undefined,
      event_date:      form.event_date,
      event_time:      form.event_time,
      timezone:        form.timezone,
      utcOffset,
      reminderMinutes: form.reminderMinutes,
      meeting_type:    form.meeting_type,
      meeting_link:    form.meeting_type === "online" ? form.meeting_link || undefined : undefined,
      platform:        form.meeting_type === "online" ? form.platform || undefined : undefined,
      ...(isMyType && form.meeting_type === "offline"
        ? { city: form.city || undefined, address: form.address || undefined }
        : {}),
    };

    try {
      if (isEdit && id) {
        isMyType
          ? await updateMyEvent.mutateAsync({ id: Number(id), payload })
          : await updatePartnerEvent.mutateAsync({ id: Number(id), payload });
      } else {
        isMyType
          ? await createMyEvent.mutateAsync(payload as MyEventPayload)
          : await createPartnerEvent.mutateAsync(payload as PartnerEventPayload);
      }
      setShowSuccessModal(true);
    } catch {
      setShowErrorModal(true);
    }
  };


  return (
    <>
      <main className="min-h-screen px-5 py-28 2xl:py-10 2xl:pb-22">
 
        <div className="relative max-w-4xl mx-auto">

        <BackButton/>

          <h2 className="text-2xl md:text-3xl text-center bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400 pb-2 my-5 2xl:mt-0">
            {isEdit
              ? "ივენთის რედაქტირება "
              : "ახალი ივენთი "}
            <span className="block text-lg text-purple-400 mt-1 font-normal">
              {isMyType ? "🗓 ჩემი ივენთი" : "🤝 პარტნიორის ივენთი"}
            </span>
          </h2>

          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-purple-100 via-pink-100 to-indigo-100 border border-purple-200/50 bg-white/60 backdrop-blur-xl shadow-xl p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

              <div className="space-y-2">
                <label className={labelCls}>სათაური (ქართული) *</label>
                <input
                  className={inputCls}
                  value={form.title_ka}
                  onChange={(e) => set("title_ka", e.target.value)}
                  placeholder="მაგ: გუნდის შეხვედრა"
                />
                {errors.title_ka && <InlineError message={errors.title_ka} />}
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Title (English) *</label>
                <input
                  className={inputCls}
                  value={form.title_en}
                  onChange={(e) => set("title_en", e.target.value)}
                  placeholder="e.g. Team Meeting"
                />
                {errors.title_en && <InlineError message={errors.title_en} />}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className={labelCls}>აღწერა (ქართული)</label>
                <textarea
                  rows={3}
                  className={inputCls + " resize-y"}
                  value={form.description_ka}
                  onChange={(e) => set("description_ka", e.target.value)}
                  placeholder="დამატებითი დეტალები..."
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className={labelCls}>Description (English)</label>
                <textarea
                  rows={3}
                  className={inputCls + " resize-y"}
                  value={form.description_en}
                  onChange={(e) => set("description_en", e.target.value)}
                  placeholder="Additional details..."
                />
              </div>

              <div className="space-y-2">
                <label className={labelCls}> თარიღი *</label>
                <input
                  type="date"
                  className={inputCls}
                  value={form.event_date}
                  onChange={(e) => set("event_date", e.target.value)}
                />
                {errors.event_date && <InlineError message={errors.event_date} />}
              </div>

              <div className="space-y-2">
                <label className={labelCls}> დრო *</label>
                <input
                  type="text"
                  className={inputCls + " text-center font-mono text-lg"}
                  value={form.event_time}
                  onChange={(e) => {
                    let v = e.target.value.replace(/[^0-9:]/g, "");
                    if (v.length === 2 && !v.includes(":")) v += ":";
                    set("event_time", v);
                  }}
                  placeholder="00:00"
                  maxLength={5}
                />
                {errors.event_time && <InlineError message={errors.event_time} />}
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Timezone</label>
                <select
                  className={inputCls}
                  value={TIMEZONES.slice(0, -1).includes(form.timezone) ? form.timezone : "სხვა"}
                  onChange={(e) => {
                    if (e.target.value === "სხვა ") {
                      set("timezone", "");
                    } else {
                      set("timezone", e.target.value);
                    }
                  }}
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>

                {!TIMEZONES.slice(0, -1).includes(form.timezone) && (
                  <input
                    className={inputCls}
                    value={form.timezone}
                    onChange={(e) => set("timezone", e.target.value)}
                    placeholder="მაგ: America/Chicago"
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className={labelCls}>შეხსენება</label>
                <select
                  className={inputCls}
                  value={form.reminderMinutes}
                  onChange={(e) => set("reminderMinutes", Number(e.target.value))}
                >
                  {REMINDER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className={labelCls}>შეხვედრის ტიპი </label>
                <div className="flex gap-3">
                  {(["online", "offline"] as const).map((mt) => (
                    <button
                      key={mt}
                      type="button"
                      onClick={() => set("meeting_type", mt)}
                      className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
                        form.meeting_type === mt
                          ? "bg-linear-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                          : "bg-white border border-purple-300 text-purple-700 hover:bg-purple-50"
                      }`}
                    >
                      {mt === "online" ? "ონლაინ " : "პირდაპირი "}
                    </button>
                  ))}
                </div>
              </div>

              {form.meeting_type === "online" && (
                <>
                  <div className="space-y-2">
                    <label className={labelCls}>პლათფორმა </label>
                    <select
                      className={inputCls}
                      value={PLATFORMS.slice(0, -1).includes(form.platform) ? form.platform : "სხვა"}
                      onChange={(e) => {
                        if (e.target.value === "სხვა ") {
                          set("platform", "");
                        } else {
                          set("platform", e.target.value);
                        }
                      }}
                    >
                      {PLATFORMS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>

                    {!PLATFORMS.slice(0, -1).includes(form.platform) && (
                      <input
                        className={inputCls}
                        value={form.platform}
                        onChange={(e) => set("platform", e.target.value)}
                        placeholder="პლათფორმის სახელი"
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className={labelCls}>შეხვედრის ბმული </label>
                    <input
                      type="url"
                      className={inputCls}
                      value={form.meeting_link}
                      onChange={(e) => set("meeting_link", e.target.value)}
                      placeholder="https://zoom.us/j/..."
                    />
                  </div>
                </>
              )}

              {form.meeting_type === "offline" && isMyType && (
                <>
                  <div className="space-y-2">
                    <label className={labelCls}>ქალაქი </label>
                    <input
                      className={inputCls}
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="თბილისი / Tbilisi"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelCls}>მისამართი </label>
                    <input
                      className={inputCls}
                      value={form.address}
                      onChange={(e) => set("address", e.target.value)}
                      placeholder="რუსთაველის 1"
                    />
                  </div>
                </>
              )}

              {errors.global && (
                <div className="md:col-span-2">
                  <InlineError message={errors.global} />
                </div>
              )}

              <div className="md:col-span-2 grid grid-cols-2 gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-full py-4 px-6 rounded-xl font-bold text-lg text-purple-700 border border-purple-300 bg-white hover:bg-purple-50 transition-all duration-300"
                >
                  გაუქმება
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg text-white transition-all duration-300 shadow-lg ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:shadow-xl hover:-translate-y-1 active:scale-95"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      იტვირთება...
                    </span>
                  ) : isEdit ? (
                    "შენახვა "
                  ) : (
                    "შექმნა "
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>

      {showSuccessModal && (
        <SuccessModal
          message={isEdit ? "ივენთი წარმატებით განახლდა!" : "ივენთი წარმატებით შეიქმნა!"}
          onClose={() => {
            setShowSuccessModal(false);
            navigate(-1);
          }}
        />
      )}

      {showErrorModal && (
        <ErrorModal
          message={isEdit ? "ივენთის განახლება ვერ მოხერხდა." : "ივენთის შექმნა ვერ მოხერხდა."}
          onClose={() => setShowErrorModal(false)}
        />
      )}
    </>
  );
};

export default EventFormPage;