import { Navigate, Outlet } from "react-router";
import { useAuthentication } from "../contexts/AuthenticationContext";

export default function ProtectedRoute(){
    const user = useAuthentication();
    return user ? <Outlet/> : <Navigate to="/landing"/>
}