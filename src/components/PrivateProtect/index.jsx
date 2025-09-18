import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

function PrivateProtect (){
    const token = Cookies.get("token");

    return token ? <Outlet/>: <Navigate to={"/"} />
}
export default PrivateProtect;