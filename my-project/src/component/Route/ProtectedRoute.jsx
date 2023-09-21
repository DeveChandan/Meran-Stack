
import { Navigate ,Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticatedUser, children }) => {
  if (!isAuthenticatedUser) {
    return <Navigate to="/loginSingup" />;
  }

  return <>{children?children:<Outlet/>}</>;
};

export default ProtectedRoute;
