import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import {showNotification} from "../../redux-toolkit/notificationSlice";

function PrivateProtect() {
  const token = Cookies.get("token");
  const dispatch = useDispatch();


  if (!token) {
    dispatch(
      showNotification({
        type: "error",
        message: "Phiên đăng nhập đã hết hạn",
        description: "Vui lòng đăng nhập lại để tiếp tục.",
      })
    );
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PrivateProtect;
