import { useRef, useState } from "react";
import type { ResourceType } from "../../services/queries/query/useFetchResources";


interface Props {
  type: ResourceType;
  onSubmit: (values: any, file?: File | null,  resetForm?: () => void) => void;
  loading: boolean;
}

export default function ResourceForm({
  type,
  onSubmit,
  loading
}: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{width:number,height:number} | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
  
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
  
    const url = URL.createObjectURL(selected);
  
    const img = new Image();
    img.onload = () => {
      setImageSize({
        width: img.width,
        height: img.height
      });
      URL.revokeObjectURL(url); 
    };
  
    img.src = url;
  
    setFile(selected);
    setPreview(url);
  };


  const removeImage = () => {
    setFile(null);
    setPreview(null);
    setImageSize(null);
  
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const resetForm = () => {
    setValues({});
    setFile(null);
    setPreview(null);
    setImageSize(null);
  
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!file) {
      return
    }
    onSubmit(values, file, resetForm);
  };

  return (
    <div className="py-12 px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 pb-2  mt-15 md:mt-15 2xl:mt-0 font-bold">
            {type.replace("_", " ")} შექმნა
          </h2>
          <p className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            შეავსეთ ფორმა და დაამატეთ ახალი {type.replace("_", " ")}
          </p>
        </div>

        <form
          onSubmit={submit}
          className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 rounded-3xl shadow-xl border border-purple-100/50 overflow-hidden"
        >
          <div className="p-8 sm:p-10 space-y-7">

            {type === "videos" && (
              <>
                <FormField label="სათაური ქართულად" required>
                  <Input name="title_ka" value={values.title_ka} placeholder="შეიყვანეთ სათაური ქართულად..." onChange={handleChange} />
                </FormField>

                <FormField label="Title in English" required>
                  <Input name="title_en" value={values.title_en} placeholder="Enter title in English..." onChange={handleChange} />
                </FormField>

                <FormField label="აღწერა ქართულად">
                  <Textarea name="description_ka" value={values.description_ka} placeholder="შეიყვანეთ აღწერა ქართულად..." onChange={handleChange} />
                </FormField>

                <FormField label="Description in English">
                  <Textarea name="description_en" value={values.description_en} placeholder="Enter description in English..." onChange={handleChange} />
                </FormField>

                <FormField label="ვიდეოს ბმული" required>
                  <Input name="video_url" value={values.video_url} placeholder="https://youtube.com/watch?v=..." onChange={handleChange} />
                </FormField>
              </>
            )}

            {type === "articles" && (
              <>
                <FormField label="სათაური ქართულად" required>
                  <Input name="title_ka" value={values.title_ka} placeholder="შეიყვანეთ სათაური..." onChange={handleChange} />
                </FormField>

                <FormField label="Title in English" required>
                  <Input name="title_en" value={values.title_en} placeholder="Enter title..." onChange={handleChange} />
                </FormField>

                <FormField label="ჟურნალის სახელი ქართულად">
                  <Input name="MagazineName_ka" value={values.MagazineName_ka} placeholder="მაგ: სარკე, ფორმულა..." onChange={handleChange} />
                </FormField>

                <FormField label="Magazine Name in English">
                  <Input name="MagazineName_en" value={values.MagazineName_en} placeholder="e.g. Forbes, Vogue..." onChange={handleChange} />
                </FormField>

                <FormField label="ქვესათაური ქართულად">
                  <Input name="subtitle_ka" value={values.subtitle_ka} placeholder="ქვესათაური..." onChange={handleChange} />
                </FormField>

                <FormField label="Subtitle in English">
                  <Input name="subtitle_en" value={values.subtitle_en} placeholder="Subtitle..." onChange={handleChange} />
                </FormField>

                <FormField label="აღწერა ქართულად">
                  <Textarea name="description_ka" value={values.description_ka} placeholder="სტატიის მოკლე აღწერა..." onChange={handleChange} />
                </FormField>

                <FormField label="Description in English">
                  <Textarea name="description_en" value={values.description_en} placeholder="Short description..." onChange={handleChange} />
                </FormField>

                <FormField label="სტატიის ბმული" required>
                  <Input name="article_url" value={values.article_url} placeholder="https://example.com/article..." onChange={handleChange} />
                </FormField>
              </>
            )}

            {type === "social_media" && (
              <>
                <FormField label="პლატფორმა" required>
                  <select
                    name="platform"
                    value={values.platform || ""}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-white/70 border border-purple-300 rounded-xl text-gray-800 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-200 shadow-sm backdrop-blur-sm"
                  >
                    <option value="">აირჩიეთ პლატფორმა</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </FormField>

                <FormField label="სათაური ქართულად" required>
                  <Input name="title_ka" value={values.title_ka} placeholder="ანგარიშის სათაური..." onChange={handleChange} />
                </FormField>

                <FormField label="title in English" required>
                  <Input name="title_en" value={values.title_en} placeholder="Account title..." onChange={handleChange} />
                </FormField>

                {values.platform === "linkedin" && (
                  <>
                    <FormField label="აღწერა ქართულად">
                      <Textarea name="description_ka" value={values.description_ka} placeholder="ანგარიშის აღწერა..." onChange={handleChange} />
                    </FormField>

                    <FormField label="Description in English">
                      <Textarea name="description_en" value={values.description_en} placeholder="Account description..." onChange={handleChange} />
                    </FormField>
                  </>
                )}


                <FormField label="ბმული" required>
                  <Input name="link" value={values.link} placeholder="https://instagram.com/yourprofile" onChange={handleChange} />
                </FormField>
              </>
            )}

            <FormField label="დაამატეთ სურათი" required>
              <div className="mt-1">
                <label className="
                  relative flex flex-col items-center justify-center
                  w-full min-h-[260px]
                  border-2 border-dashed rounded-xl cursor-pointer
                  border-purple-300 hover:border-purple-400
                  bg-white/40 backdrop-blur-sm transition-all
                "
                >
                  {preview ? (
                    <div className="relative w-full flex justify-center items-center p-4">
                      <img
                        src={preview}
                        className="max-h-[320px] w-auto object-contain rounded-xl shadow-md"
                      />

                      <button
                        type="button"
                        onClick={removeImage}
                        className="
                        absolute top-3 right-3
                        bg-pink-500 text-white
                        w-8 h-8 rounded-full
                        flex items-center justify-center
                        shadow-lg
                        hover:bg-pink-600
                        transition
                        "
                      >
                        ✕
                      </button>
                      {imageSize && (
                        <div className="
                        absolute bottom-3 left-3
                        bg-purple-800/80 text-white
                        text-xs px-3 py-1
                        rounded-lg
                        ">
                          {imageSize.width} × {imageSize.height}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                      <svg className="w-12 h-12 mb-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mb-2 text-sm text-purple-600">
                        <span className="font-semibold">დააჭირეთ აქ და დაამატე სურათი</span> 
                      </p>
                      <p className="text-xs text-purple-500">PNG, JPG, WEBP (მაქს. 5MB)</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </FormField>
          </div>

          <div className="px-8 sm:px-10 py-6 bg-white/40 border-t border-purple-100/50">
            <button
              type="submit"
              disabled={loading || !file}
              className={`
                w-full py-3.5 px-6 rounded-xl font-medium text-white text-lg
                transition-all duration-200 shadow-md
                ${loading || !file 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:from-purple-800 active:to-pink-800 focus:ring-2 focus:ring-purple-300 focus:outline-none"
                }
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  ინახება...
                </span>
              ) : (
                "შექმნა"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({ label, children, required = false }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-purple-700">
        {label}{required && <span className="text-pink-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ name, placeholder, onChange, value }: any) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      className="w-full px-5 py-3.5 bg-white/70 border border-purple-300 rounded-xl text-gray-800 placeholder-purple-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-200 shadow-sm backdrop-blur-sm"
    />
  );
}

function Textarea({ name, placeholder, onChange, value }: any) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value || ""}
      rows={4}
      onChange={onChange}
      className="w-full px-5 py-3.5 bg-white/70 border border-purple-300 rounded-xl text-gray-800 placeholder-purple-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-200 shadow-sm resize-y min-h-[110px] backdrop-blur-sm"
    />
  );
}