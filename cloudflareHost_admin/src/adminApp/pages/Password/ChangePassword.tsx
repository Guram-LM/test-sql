import { useState } from "react";
import { $axios } from "../../component/axios/Axios";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../component/modal/successModal/SuccessModal";
import InlineError from "../../component/myToasMessage/InlineError";
import OtpSentMessage from "./OtpSentMessage";



const ChangePassword = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState(0);


const validatePasswords = () => {
  if (!oldPassword || !newPassword || !repeat) {
    setError("ყველა ველი აუცილებელია");
    setErrorKey(prev => prev + 1);
    return false;
  }

  if (newPassword !== repeat) {
    setError("პაროლები არ ემთხვევა");
    setErrorKey(prev => prev + 1);
    return false;
  }

  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasMinLength = newPassword.length >= 6;

  if (!hasUppercase || !hasNumber || !hasMinLength) {
    setError(
      "პაროლი უნდა შეიცავდეს მინიმუმ 1 დიდ ასოს, მინიმუმ 1 ციფრს და სიგრძე არანაკლებ 6 სიმბოლოს"
    );
    setErrorKey(prev => prev + 1);
    return false;
  }

  return true;
};



  const requestCode = async () => {
    setError(null);
    if (!validatePasswords()) return;

    try {
      setLoading(true);
      await $axios.post("/admin/change-password/request", {
        oldPassword,
        newPassword,
      });

      setStep(2);
    } catch (err: any) {
      setError(err?.response?.data?.message || "შეცდომა მოთხოვნის დროს");
      setErrorKey(prev => prev + 1)
    } finally {
      setLoading(false);
    }
  };


  const confirmChange = async () => {
    if (!code) {
      setError("ვერიფიკაციის კოდი აუცილებელია");
      setErrorKey(prev => prev + 1);
      return;
    }

    try {
      setLoading(true);
      const res = await $axios.post("/admin/change-password/confirm", {
        code,
        newPassword,
      });

      // ახალი token sessionStorage-ში — ეს აუცილებელია!
      // წინააღმდეგ შემთხვევაში შემდეგი request 401-ს დაიჭერს და logout გახდება
      if (res.data.accessToken) {
        sessionStorage.setItem("token", res.data.accessToken);
      }

      setStep(1);
      setOldPassword("");
      setNewPassword("");
      setRepeat("");
      setCode("");
      setShowSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "შეცდომა ცვლილების დროს");
      setErrorKey(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };


    const handleLoginRedirect = () => {
    setShowSuccess(false);
    navigate("/"); 
  };

  return (
<>
  <div className="min-h-screen mt-20 md:mt-0 flex items-center justify-center py-12 px-4 relative overflow-hidden bg-black">

    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-linear-to-br from-black via-gray-950 to-black" />
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl" />

      <div className="absolute inset-x-0 top-32 h-px bg-linear-to-r from-transparent via-purple-600/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-32 h-px bg-linear-to-r from-transparent via-purple-600/40 to-transparent" />
      <div className="absolute inset-y-0 left-32 w-px bg-linear-to-b from-transparent via-purple-600/30 to-transparent hidden lg:block" />
      <div className="absolute inset-y-0 right-32 w-px bg-linear-to-b from-transparent via-purple-600/30 to-transparent hidden lg:block" />
    </div>

    <div className="relative z-10 w-full max-w-md bg-gray-950/80 backdrop-blur-2xl p-10 rounded-2xl border border-purple-600/30 shadow-2xl">
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 rounded-full bg-linear-to-br from-purple-500 to-pink-600 p-1 shadow-2xl shadow-purple-900/50">
          <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center">
            <svg className="w-12 h-12 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <h2 className="text-center text-3xl font-bold text-purple-400 mb-2 tracking-wider">
        პაროლის შეცვლა
      </h2>
      <p className="text-center text-gray-400 text-sm mb-8">უსაფრთხოდ განაახლეთ თქვენი პაროლი</p>

      {error && <InlineError message={error} key={errorKey}/>}

      {step === 1 && (
        <>

          <div className="mb-6 relative">
            <label className="block text-purple-400 text-sm font-medium mb-2">ძველი პაროლი</label>
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="••••••••"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-900/70 border border-purple-800/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition pr-14"
              required
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-4 top-10 text-gray-400 hover:text-purple-400 transition"
            >
              {showOldPassword ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>


          <div className="mb-6 relative">
            <label className="block text-purple-400 text-sm font-medium mb-2">ახალი პაროლი</label>
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-900/70 border border-purple-800/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition pr-14"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-10 text-gray-400 hover:text-purple-400 transition"
            >
              {showNewPassword ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="mb-8 relative">
            <label className="block text-purple-400 text-sm font-medium mb-2">გაიმეორეთ პაროლი</label>
            <input
              type={showRepeatPassword ? "text" : "password"}
              placeholder="••••••••"
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              className="w-full px-5 py-4 bg-gray-900/70 border border-purple-800/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition pr-14"
              required
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className="absolute right-4 top-10 text-gray-400 hover:text-purple-400 transition"
            >
              {showRepeatPassword ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <button
            onClick={requestCode}
            disabled={loading}
            className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl text-lg hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-900/40"
          >
            {loading ? "გაგზავნა..." : "ვერიფიკაციის კოდის მიღება"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-8">
            <label className="block text-purple-400 text-sm font-medium mb-3 text-center">შეიყვანეთ ვერიფიკაციის კოდი</label>
            <input
              type="text"
              placeholder="------"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-5 py-5 bg-gray-900/70 border-2 border-purple-600 rounded-xl text-white text-center text-3xl tracking-widest font-mono focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition"
              maxLength={6}
              required
            />
            <OtpSentMessage onResend={requestCode} theme="purple-pink"/>
          </div>

          <button
            onClick={confirmChange}
            disabled={loading}
            className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl text-lg hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-900/40"
          >
            {loading ? "მიტანა..." : "პაროლის შეცვლა"}
          </button>
        </>
      )}

      <p className="text-center text-gray-600 text-xs mt-8">© 2025 • დაცულია 256-ბიტიანი დაშიფვრით</p>
    </div>

    {showSuccess && <SuccessModal onClose={handleLoginRedirect} message="პაროლი წარმატებით შეიცვალა"/>}
  </div>
</>
  );
}

export default ChangePassword