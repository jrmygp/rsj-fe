/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCookie, deleteCookie } from '../cookie';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/store/slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth);
  const cookie = getCookie();

  const handleCheckTokenAndUserData = () => {
    if (!cookie || !user) {
      navigate('/');
      dispatch(clearUser());
      deleteCookie();
    }
  };

  const handleUserAccess = () => {
    const currentLocation = location.pathname.split('/')[2];
    // Staff role can't access user page
    if (user.role === 'staff') {
      if (currentLocation === 'user') {
        navigate('/dashboard');
      }
    }
    // Client role can only access dashboard
    if (user.role === 'client' && currentLocation !== '/dashboard') {
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    handleCheckTokenAndUserData();
    handleUserAccess();
  }, []);

  return children;
};

export default ProtectedRoute;
