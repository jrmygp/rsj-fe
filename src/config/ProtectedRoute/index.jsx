import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { getCookie } from '../cookie';

const ProtectedRoute = ({ allowedRoles, redirectIfAuthenticated = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const cookie = getCookie();

  const currentRole = user?.role;
  const isAllowed = currentRole && allowedRoles?.includes(currentRole);

  useEffect(() => {
    if (redirectIfAuthenticated && cookie) {
      navigate('/dashboard');
    } else if (!redirectIfAuthenticated && (!cookie || !isAllowed)) {
      navigate('/');
    }
  }, [cookie, isAllowed, navigate, redirectIfAuthenticated]);

  return !redirectIfAuthenticated || (redirectIfAuthenticated && !cookie) ? (
    <Outlet />
  ) : null;
};

export default ProtectedRoute;
