import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context.js";

export function ProtectedRoute({ children }) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export function GuestRoute({ children }) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (user) {
        return <Navigate to="/chat" replace />;
    }

    return children;
}
