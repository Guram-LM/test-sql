// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../zustand/useAuthStore";
import Loader from "../../pages/loader/Loader";


export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token   = useAuthStore((s) => s.accessToken);
  const isReady = useAuthStore((s) => s.isReady);

  if (!isReady) return <Loader />;
  if (!token) return <Navigate to="/login" />;

  return children;
};