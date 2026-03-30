import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateScheduledPost, useFetchScheduledPosts, useUpdateScheduledPost } from "../../services/queries/scheduled/useScheduledPosts";
import BackButton from "../../component/back-button/BackButton";
import InlineError from "../../component/myToasMessage/InlineError";
import SuccessModal from "../../component/modal/successModal/SuccessModal";
import ErrorModal from "../../component/modal/errorModal/ErrorModal";


const TIMEZONES = ["Asia/Tbilisi", "Europe/London", "Europe/Berlin", "UTC", "სხვა / Other"];

interface FormState {
  title_ka: string;
  title_en: string;
  content_ka: string;
  content_en: string;
  icon: string;
  publish_date: string;
  publish_time: string;
  timezone: string;
}

const defaultForm: FormState = {
  title_ka: "", title_en: "", content_ka: "", content_en: "",
  icon: "✨", publish_date: "", publish_time: "", timezone: "Asia/Tbilisi",
};

const inputCls = "w-full px-5 py-4 bg-white rounded-xl border border-purple-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all";
const labelCls = "block text-sm font-semibold text-purple-700";

const ScheduledPostForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [form, setForm] = useState<FormState>(defaultForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const { data: posts } = useFetchScheduledPosts();
  const createPost = useCreateScheduledPost();
  const updatePost = useUpdateScheduledPost();

  const isLoading = createPost.isPending || updatePost.isPending;

  useEffect(() => {
    if (!isEdit || !id || !posts) return;
    const post = posts.find(p => String(p.id) === id);
    if (!post) return;
    setForm({
      title_ka: post.title_ka,
      title_en: post.title_en || "",
      content_ka: post.content_ka || "",
      content_en: post.content_en || "",
      icon: post.icon || "✨",
      publish_date: post.publish_date,
      publish_time: post.publish_time,
      timezone: post.timezone,
    });
  }, [id, posts, isEdit]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => 
    setForm(prev => ({ ...prev, [key]: value }));

  const isPastDate = (): boolean => {
    if (!form.publish_date || !form.publish_time) return false;
    const [y, m, d] = form.publish_date.split("-").map(Number);
    const [h, min] = form.publish_time.split(":").map(Number);
    const selected = new Date(y, m - 1, d, h, min);
    return selected < new Date();
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};

    if (!form.title_ka.trim()) e.title_ka = "ქართული სათაური სავალდებულოა";
    if (!form.title_en.trim()) e.title_en = "English title is required";
    if (!form.publish_date) e.publish_date = "თარიღი სავალდებულოა";
    if (!form.publish_time) e.publish_time = "დრო სავალდებულოა";

    // ← გასული დროის მკაცრი შემოწმება (შექმნა და რედაქტირებაც)
    if (isPastDate()) {
      e.global = "❌ გასულ თარიღზე ან დროზე დაგეგმვა შეუძლებელია";
    }

    if (Object.keys(e).length > 0) {
      setErrors(e);
      setTimeout(() => setErrors({}), 5000);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      title_ka: form.title_ka.trim(),
      title_en: form.title_en.trim(),
      content_ka: form.content_ka.trim() || undefined,
      content_en: form.content_en.trim() || undefined,
      icon: form.icon.trim() || "✨",
      publish_date: form.publish_date,
      publish_time: form.publish_time,
      timezone: form.timezone,
      utcOffset: new Date().getTimezoneOffset() * -1,
    };

    try {
      if (isEdit && id) {
        await updatePost.mutateAsync({ id: Number(id), payload });
      } else {
        await createPost.mutateAsync(payload);
      }
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      setShowError(true);
    }
  };

  return (
    <>
      <main className="min-h-screen px-5 py-28 2xl:py-10">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          <h2 className="text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 pb-2 my-8">
            {isEdit ? "შეტყობინების რედაქტირება" : "ახალი სამოტივაციო შეტყობინება"}
          </h2>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 border border-purple-200/50 backdrop-blur-xl shadow-2xl p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="md:col-span-2 space-y-2">
                <label className={labelCls}>ემოჯი / აიქონი</label>
                <input className={inputCls + " text-4xl text-center"} value={form.icon} onChange={e => set("icon", e.target.value)} maxLength={10} />
              </div>

              <div className="space-y-2">
                <label className={labelCls}>სათაური (ქართული) *</label>
                <input className={inputCls} value={form.title_ka} onChange={e => set("title_ka", e.target.value)} />
                {errors.title_ka && <InlineError message={errors.title_ka} />}
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Title (English) *</label>
                <input className={inputCls} value={form.title_en} onChange={e => set("title_en", e.target.value)} />
                {errors.title_en && <InlineError message={errors.title_en} />}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className={labelCls}>ტექსტი (ქართული)</label>
                <textarea rows={4} className={inputCls + " resize-y"} value={form.content_ka} onChange={e => set("content_ka", e.target.value)} />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className={labelCls}>Content (English)</label>
                <textarea rows={4} className={inputCls + " resize-y"} value={form.content_en} onChange={e => set("content_en", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className={labelCls}>გამოქვეყნების თარიღი *</label>
                <input type="date" className={inputCls} value={form.publish_date} onChange={e => set("publish_date", e.target.value)} />
                {errors.publish_date && <InlineError message={errors.publish_date} />}
              </div>

              <div className="space-y-2">
                <label className={labelCls}>გამოქვეყნების დრო *</label>
                <input type="text" className={inputCls + " text-center font-mono text-lg"} value={form.publish_time} placeholder="14:30" maxLength={5}
                  onChange={e => {
                    let v = e.target.value.replace(/[^0-9:]/g, "");
                    if (v.length === 2 && !v.includes(":")) v += ":";
                    set("publish_time", v);
                  }}
                />
                {errors.publish_time && <InlineError message={errors.publish_time} />}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className={labelCls}>Timezone</label>
                <select className={inputCls} value={form.timezone} onChange={e => set("timezone", e.target.value)}>
                  {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                </select>
              </div>

              {/* გასული დროის შეცდომა */}
              {errors.global && (
                <div className="md:col-span-2">
                  <InlineError message={errors.global} />
                </div>
              )}

              <div className="md:col-span-2 grid grid-cols-2 gap-4 mt-8">
                <button onClick={() => navigate(-1)} className="py-4 rounded-2xl font-bold text-purple-700 border border-purple-300 bg-white hover:bg-purple-50">
                  გაუქმება
                </button>
                <button onClick={handleSubmit} disabled={isLoading}
                  className={`py-4 rounded-2xl font-bold text-white text-lg transition-all ${isLoading ? "bg-gray-400" : "bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-xl"}`}>
                  {isLoading ? "იტვირთება..." : isEdit ? "შენახვა" : "შექმნა და დაგეგმვა"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showSuccess && (
        <SuccessModal
          message={isEdit ? "შეტყობინება წარმატებით განახლდა!" : "შეტყობინება წარმატებით დაგეგმილია!"}
          onClose={() => { setShowSuccess(false); }}
        />
      )}

      {showError && <ErrorModal message="ოპერაცია ვერ მოხერხდა" onClose={() => setShowError(false)} />}
    </>
  );
};

export default ScheduledPostForm;