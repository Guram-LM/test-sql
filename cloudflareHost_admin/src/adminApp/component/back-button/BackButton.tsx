import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="group relative flex items-center gap-4 px-10 py-2 rounded-full cursor-pointer mb-5
                 bg-[#12110F]/80 border border-transparent
                 transition-all duration-300 backdrop-blur-md"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >

      <span className="absolute inset-0 rounded-full p-px bg-linear-to-br from-violet-500 to-purple-600 opacity-100" />


      <span className="absolute inset-px rounded-full bg-[#12110F]/80" />

      <span className="relative flex items-center gap-2">
        <span className="text-white text-lg transition-transform duration-300 group-hover:-translate-x-1">
          ←
        </span>

        <span className="text-xs tracking-widest uppercase text-white">
          უკან
        </span>
      </span>

    </button>
  );
};

export default BackButton;