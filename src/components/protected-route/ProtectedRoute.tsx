import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // User is not authenticated → redirect to login
        return <Navigate to="/login" replace />;
    }

    // User is authenticated → render child routes
    return <Outlet />;
};

export default ProtectedRoute;
