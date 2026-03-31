import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMe } from '../../hook/user/useUserHooks';
import { useLogout } from '../../hook/user/useAuthHooks';
import { useQueryClient } from '@tanstack/react-query';

const UserMenu = () => {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useMe();
  const logout = useLogout();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleLogout = async () => {
    await logout.mutateAsync();
    queryClient.clear();
    setIsOpen(false);
    navigate('/login', { replace: true });
  };

  const getInitial = (name?: string) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse" />
    );
  }

  // ============== არარეგისტრირებული მომხმარებელი (ღია ღილაკი) ==============
  if (!user) {
    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-11 h-11 rounded-full 
                    bg-slate-800 text-[#d4af37] 
                    border border-yellow-400 
                    ring-2 ring-yellow-400/30 
                    hover:ring-yellow-400/50 
                    hover:bg-slate-700
                    transition-all duration-300 
                    focus:outline-none focus:ring-4 focus:ring-yellow-400/50 
                    shadow-lg hover:shadow-xl"
          aria-label="User menu"
        >

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
            />
          </svg>
        </button>

        {isOpen && (
          <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-3 w-52 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50 py-2">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left px-5 py-3.5 text-sm transition-all duration-200
                ${
                  location.pathname === "/login"
                    ? "bg-linear-to-r from-yellow-50 to-yellow-100 font-semibold text-yellow-800 border-l-4 border-yellow-600"
                    : "hover:bg-gray-50 text-gray-800"
                }`}
            >
              Login
            </Link>
        
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left px-5 py-3.5 text-sm transition-all duration-200
                ${
                  location.pathname === "/register"
                    ? "bg-linear-to-r from-yellow-50 to-yellow-100 font-semibold text-yellow-800 border-l-4 border-yellow-600"
                    : "hover:bg-gray-50 text-gray-800"
                }`}
            >
              Register
            </Link>
          </div>
        </>
        )}
      </div>
    );
  }

  // ============== რეგისტრირებული მომხმარებელი (მუქი ავატარი + ოქროსფერი კონტური) ==============
  return (
    <div className="relative" ref={dropdownRef}>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center text-[#d4af37]  text-xl border border-[#d4af37] ring-2 ring-[#d4af37] hover:ring-[#d4af37] transition-all focus:outline-none focus:ring-4 focus:ring-yellow-400/50 overflow-hidden"
        aria-label="User menu"
      >
        {getInitial(user.firstName || user.email)}
      </button>

      {isOpen && (
       <>
       <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
       <div className="absolute right-0 mt-3 w-60 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50 py-2">
         
         <div className="px-5 py-3 border-b border-gray-100">
           <p className="text-sm font-medium text-gray-900">
             {user.firstName || 'User'}
           </p>
           <p className="text-xs text-gray-500 truncate">
             {user.email}
           </p>
         </div>
     
         <div className="py-1">
           <Link
             to="/profile"
             onClick={() => setIsOpen(false)}
             className={`flex items-center gap-3 w-full text-left px-5 py-3.5 text-sm transition-all duration-200
               ${
                 location.pathname === "/profile"
                   ? "bg-linear-to-r from-yellow-50 to-yellow-100 font-semibold text-yellow-800 border-l-4 border-yellow-600"
                   : "hover:bg-gray-50 text-gray-800"
               }`}
           >
             👤 Profile
           </Link>
     
           <Link
             to="/change-password"
             onClick={() => setIsOpen(false)}
             className={`flex items-center gap-3 w-full text-left px-5 py-3.5 text-sm transition-all duration-200
               ${
                 location.pathname === "/change-password"
                   ? "bg-linear-to-r from-yellow-50 to-yellow-100 font-semibold text-yellow-800 border-l-4 border-yellow-600"
                   : "hover:bg-gray-50 text-gray-800"
               }`}
           >
             🔒 Change Password
           </Link>
         </div>
     
         <div className="border-t border-gray-100 my-1" />
     
         <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left px-5 py-3.5 text-sm font-bold
                      text-red-600 hover:bg-red-50 
                      transition-all duration-200"
          >
            Logout
          </button>
       </div>
     </>
      )}
    </div>
  );
};

export default UserMenu;