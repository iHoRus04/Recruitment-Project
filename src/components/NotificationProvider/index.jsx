import { notification } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../../redux-toolkit/notificationSlice";

function NotificationProvider(){
    const [api,contextHolder] = notification.useNotification();
    const {type , message , description} = useSelector((state)=> state.notification);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(type && message){
            api[type]({
                message,
                description,
                placement: "top",
                duration:5,
            });
        }
        dispatch(clearNotification());
    }, [type, message, description, api, dispatch]);
    return(
        <>
            {contextHolder}
        </>
    )
}

export default NotificationProvider;