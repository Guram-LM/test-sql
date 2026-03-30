import { useState } from "react";
import { $axios } from "../../component/axios/Axios";
import SuccessModal from "../../component/modal/successModal/SuccessModal";
import ErrorModal from "../../component/modal/errorModal/ErrorModal";


interface PdfFormProps {
  endpoint: string
  buttonText: string
  mode: "free" | "paid"
}

const PdfForm = ({ endpoint, buttonText, mode }: PdfFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);


  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    const fileInput = document.getElementById("pdf-upload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    const form = e.currentTarget  
  
    if (!file) return
  
    try {
      setLoading(true)
  
      const formData = new FormData(form)
 
      if (mode === "paid") {
        formData.append("pdf", file)
  
        await $axios.post(endpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
  
      } else {

  
        const createRes = await $axios.post(endpoint, formData)
  
        const id = createRes.data.id
  
        const pdfForm = new FormData()
        pdfForm.append("pdf", file)
  
        await $axios.post(`${endpoint}/${id}/upload-pdf`, pdfForm)
      }
  
      setShowSuccessModal(true)
  
      form.reset()    
      setFile(null)
  
    } catch (err) {
      console.error(err)
      setShowErrorModal(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-center bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400 pb-2 my-8mt-26 mt-15 md:mt-15 my-5 2xl:mt-0 ">
            ახალი PDF რესურსი
          </h2>
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3"></div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-purple-100 via-pink-100 to-indigo-100 border border-purple-200/50 bg-white/60 backdrop-blur-xl shadow-xl p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-purple-700">სათაური (ქართული)</label>
                <input name="title_ka" required className="w-full px-5 py-4 bg-white rounded-xl border border-purple-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all" placeholder="შეიყვანეთ სათაური ქართულად..." />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-purple-700">Title (English)</label>
                <input name="title_en" required className="w-full px-5 py-4 bg-white rounded-xl border border-purple-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all" placeholder="Enter title in English..." />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-purple-700">აღწერა (ქართული)</label>
                <textarea name="description_ka" required rows={4} className="w-full px-5 py-4 bg-white rounded-xl border border-purple-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all resize-y" placeholder="შეიყვანეთ დეტალური აღწერა..." />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-purple-700">Description (English)</label>
                <textarea name="description_en" required rows={4} className="w-full px-5 py-4 bg-white rounded-xl border border-purple-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all resize-y" placeholder="Enter detailed description in English..." />
              </div>

              {mode === "paid" && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-purple-700">ფასი (₾)</label>
                  <input name="price" type="number" step="0.01" min="0" required className="w-full px-5 py-4 bg-white rounded-xl border border-purple-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all" placeholder="მაგ: 19.99" />
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-purple-700">PDF ფაილი</label>
                {!file ? (
                  <label htmlFor="pdf-upload" className="flex flex-col px-4 items-center justify-center w-full h-40 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer bg-white/50 hover:bg-white/70 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-12 h-12 mb-4 text-purple-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mb-2 text-sm text-purple-700"><span className="font-semibold text-purple-600">დააჭირეთ PDF ფაილის დასამატებლად</span></p>
                      <p className="text-xs text-purple-500">მხოლოდ .pdf (მაქს. 10MB)</p>
                    </div>
                    <input id="pdf-upload" type="file" accept="application/pdf" required onChange={handleFileChange} className="hidden" />
                  </label>
                ) : (
                  <div className="flex items-center justify-between w-full p-4 bg-white/70 border border-purple-200 rounded-xl shadow-sm">
                    <div className="flex items-center gap-4">
                      <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H5.5z" />
                        <path d="M9 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <p className="text-gray-800 font-medium truncate max-w-[200px] sm:max-w-[300px]">{file.name}</p>
                        <p className="text-xs text-purple-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>

                    <button type="button" onClick={removeFile} className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="წაშლა">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <div className="md:col-span-2 mt-4">
                <button type="submit" disabled={loading || !file} className={`w-full py-4 px-6 rounded-xl font-bold text-lg text-white transition-all duration-300 shadow-lg ${loading || !file ? "bg-gray-400 cursor-not-allowed" : "bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:shadow-xl hover:-translate-y-1 active:scale-95"}`}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      იტვირთება...
                    </span>
                  ) : (
                    buttonText
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {showSuccessModal && (
        <SuccessModal 
          message="PDF წარმატებით დაემატა!" 
          onClose={() => setShowSuccessModal(false)} 
        />
      )}

      {showErrorModal && (
        <ErrorModal 
          message="დაფიქსირდა შეცდომა PDF-ის დამატებისას." 
          onClose={() => setShowErrorModal(false)} 
        />
      )}
    </>
  );
};

export default PdfForm;