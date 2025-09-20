
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "antd";

function Logout() {
  const navigate = useNavigate();
  const hdLogout = ()=>{
    
    const allCookies = Cookies.get();
    console.log(allCookies);
 
      Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });

    navigate("/");
  }

  return <Button   danger onClick={hdLogout} style={{margin: "0 20px"}}>Logout</Button>; // Không cần giao diện, chỉ xử lý rồi redirect
}

export default Logout;
