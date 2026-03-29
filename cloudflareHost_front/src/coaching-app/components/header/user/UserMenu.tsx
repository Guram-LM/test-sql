import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMe } from '../../hook/user/useUserHooks';
import { useLogout } from '../../hook/user/useAuthHooks';


const UserMenu = () => {
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

  if (!user) {
    return (
      <nav className="flex items-center gap-3">
        <Link
          to="/login"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
        >
          Register
        </Link>
      </nav>
    );
  }

  // Logged in state - Avatar with dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-semibold text-xl border-2 border-yellow-400 ring-2 ring-yellow-400/30 hover:ring-yellow-400/50 transition-all focus:outline-none focus:ring-4 focus:ring-yellow-400/50 overflow-hidden"
        aria-label="User menu"
      >
        {getInitial(user.firstName || user.email)}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
          <div className="px-4 py-3 border-b border-slate-700">
            <p className="text-sm font-medium text-white">
              {user.firstName || 'User'}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user.email}
            </p>
          </div>

          <div className="py-1">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 transition-colors"
            >
              👤 Profile
            </Link>

            <Link
              to="/change-password"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 transition-colors"
            >
              🔒 Change Password
            </Link>
          </div>

          <div className="border-t border-slate-700 my-1" />

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-slate-700 transition-colors"
          >
            ⬅️ Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;