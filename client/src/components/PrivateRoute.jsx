import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const CurrentUser = useSelector(state => state.user.CurrentUser.user);
    console.log(CurrentUser);

    return CurrentUser.userName ? <Outlet /> : <Navigate to="/sign-in" />;
}