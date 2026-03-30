import { useState } from "react";
import { $axios } from "../../component/axios/Axios";
import SuccessModal from "../../component/modal/successModal/SuccessModal";
import { Link, useNavigate } from "react-router-dom";
import InlineError from "../../component/myToasMessage/InlineError";
import OtpSentMessage from "./OtpSentMessage";

const PasswordReset = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState(0);


  const handleRequestReset = async () => {
    if (!email) {
      setError("გთხოვთ მიუთითოთ ელფოსტა");
      setErrorKey(prev => prev + 1)
      return false
    } 
    setError(null);
    try {
      const res = await $axios.post("/admin/request-reset", { email });
      if (res.data.success) {

          setStep(2); 
        }

    } catch (err: any) {
       setError(err.response?.data?.message || "შეცდომა მოხდა");
    }
  };


  const handleVerifyCode = async () => {
    if (!code) {
      setError("გთხოვთ მიუთითოთ კოდი");
      setErrorKey(prev => prev + 1)
      return false
    }
      
    setError(null)
    try {
      const res = await $axios.post("/admin/verify-reset-code", { email, code });
      if (res.data.success) {
        setStep(3);
      }
    } catch (err: any) {
       setError(err.response?.data?.message || "შეცდომა მოხდა");
    }
  };

  const handleResetPassword = async () => {
    setError(null);
    if (!password || !confirmPassword) {
      setError("ყველა ველი აუცილებელია");
      setErrorKey(prev => prev + 1)
      return false
    }
     

    if (password !== confirmPassword) {
      setError("პაროლები არ ემთხვევა");
      setErrorKey(prev => prev + 1)
      return false
    }


    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUppercase || !hasNumber || !hasMinLength) {
       setError("პაროლი უნდა შეიცავდეს მინიმუმ 1 დიდ ასოს, მინიმუმ 1 ციფრს და სიგრძე არანაკლებ 6 სიმბოლოს");
       setErrorKey(prev => prev + 1)
       return false
    }

    setError(null);


    try {
      const res = await $axios.post("/admin/reset-password", {
        email,
        code,
        password,
        confirmPassword,
      });
      if (res.data.success) {
        setEmail("");
        setCode("");
        setPassword("");
        setConfirmPassword("");
        setStep(1);
        setShowSuccess(true)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "შეცდომა მოხდა");
    }
  };


  const handleLoginRedirect = () => {
    setShowSuccess(false);
    navigate("/login"); 
  };

  return (

  <>
  <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">


    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-linear-to-br from-black via-gray-950 to-black" />
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-700/20 rounded-full blur-3xl" />

      <div className="absolute inset-x-0 top-32 h-px bg-linear-to-r from-transparent via-amber-600/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-32 h-px bg-linear-to-r from-transparent via-amber-600/40 to-transparent" />
      <div className="absolute inset-y-0 left-32 w-px bg-linear-to-b from-transparent via-amber-600/30 to-transparent hidden lg:block" />
      <div className="absolute inset-y-0 right-32 w-px bg-linear-to-b from-transparent via-amber-600/30 to-transparent hidden lg:block" />
    </div>


    <div className="relative z-10 w-full max-w-md bg-gray-950/80 backdrop-blur-2xl p-10 rounded-2xl border border-amber-600/30 shadow-2xl">
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 rounded-full bg-linear-to-br from-amber-500 to-amber-700 p-1 shadow-2xl shadow-amber-900/50">
          <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center">
            <svg className="w-12 h-12 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <h2 className="text-center text-3xl font-bold text-amber-500 mb-2 tracking-wider">
        პაროლის აღდგენა
      </h2>
      <p className="text-center text-gray-400 text-sm mb-8">უსაფრთხოდ აღადგინეთ თქვენი წვდომა</p>

      {error && <InlineError message={error} key={errorKey} />}

      {step === 1 && (
        <>
          <div className="mb-6">
            <label className="block text-amber-400 text-sm font-medium mb-2">ელფოსტა</label>
            <input
              type="email"
              placeholder="შეიყვანეთ ელფოსტა"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-gray-900/70 border border-amber-800/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 transition"
              required
            />
          </div>
          <div className="flex flex-col gap-6">
            <button
              onClick={handleRequestReset}
              className="w-full bg-linear-to-r from-amber-600 to-amber-700 text-black font-bold py-4 rounded-xl text-lg hover:from-amber-500 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 shadow-xl shadow-amber-900/40"
            >
              კოდის გაგზავნა
            </button>
            
            <Link
              to={"/login"}
              className="block w-full text-center py-4 px-6 bg-gray-800/60 hover:bg-gray-700/80 border border-amber-600/40 hover:border-amber-500 text-amber-400 hover:text-amber-300 font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/30 hover:-translate-y-0.5"
            >
              უკან დაბრუნება
            </Link>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-8">
            <label className="block text-amber-400 text-sm font-medium mb-3 text-center">შეიყვანეთ OTP კოდი</label>
            <input
              type="text"
              placeholder="------"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-5 py-5 bg-gray-900/70 border-2 border-amber-600 rounded-xl text-white text-center text-3xl tracking-widest font-mono focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/30 transition"
              maxLength={6}
              required
            />
            <OtpSentMessage onResend={handleRequestReset}/>
          </div>

          <button
            onClick={handleVerifyCode}
            className="w-full bg-linear-to-r from-amber-600 to-amber-700 text-black font-bold py-4 rounded-xl text-lg hover:from-amber-500 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 shadow-xl shadow-amber-900/40"
          >
            ვერიფიკაცია
          </button>

          <Link
              to={"/login"}
              className="block w-full text-center mt-6 py-4 px-6 bg-gray-800/60 hover:bg-gray-700/80 border border-amber-600/40 hover:border-amber-500 text-amber-400 hover:text-amber-300 font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/30 hover:-translate-y-0.5"
            >
              უკან დაბრუნება
            </Link>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-center text-2xl font-bold text-amber-500 mb-6">ახალი პაროლის შექმნა</h2>

          <div className="mb-6 relative">
            <label className="block text-amber-400 text-sm font-medium mb-2">ახალი პაროლი</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-900/70 border border-amber-800/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 transition pr-14"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-gray-400 hover:text-amber-400 transition"
            >
              {showPassword ? (
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
            <label className="block text-amber-400 text-sm font-medium mb-2">გაიმეორეთ პაროლი</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-900/70 border border-amber-800/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 transition pr-14"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-10 text-gray-400 hover:text-amber-400 transition"
            >
              {showConfirmPassword ? (
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
            onClick={handleResetPassword}
            className="w-full bg-linear-to-r from-amber-600 to-amber-700 text-black font-bold py-4 rounded-xl text-lg hover:from-amber-500 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 shadow-xl shadow-amber-900/40"
          >
            პაროლის შეცვლა
          </button>

          <Link
              to={"/login"}
              className="block w-full text-center mt-6 py-4 px-6 bg-gray-800/60 hover:bg-gray-700/80 border border-amber-600/40 hover:border-amber-500 text-amber-400 hover:text-amber-300 font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/30 hover:-translate-y-0.5"
            >
              უკან დაბრუნება
            </Link>
        </>
      )}

      <p className="text-center text-gray-600 text-xs mt-8">© 2025 • დაცულია 256-ბიტიანი დაშიფვრით</p>
    </div>

    {showSuccess && <SuccessModal onClose={handleLoginRedirect} buttonText="შესვლა" message="პაროლი წარმატებით აღდგენილია"/>}
  </div>
</>
  );
};

export default PasswordReset;
