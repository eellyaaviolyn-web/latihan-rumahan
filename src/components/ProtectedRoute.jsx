import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute – bungkus route yang butuh login.
 * Jika belum login, redirect ke /login?redirect=/halaman-tujuan
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem('fitlife_user'));

  if (!isLoggedIn) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
}
