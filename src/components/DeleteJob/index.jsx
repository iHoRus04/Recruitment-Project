import { Button, Popconfirm } from "antd";
import { deleteJob } from "../../services/jobService";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux-toolkit/notificationSlice";

function DeleteJob({record,onUpdate}){
    const dispatch = useDispatch();
    const hdDel = async ()=>{
        try {
            const res = await deleteJob(record.id);
            dispatch(showNotification({
                type:"success",
                message:"Xóa thành công"
            }));
            if(onUpdate) await onUpdate();
    
            
        } catch (error) {
            dispatch(showNotification({
                type: "error",
                message: "Xóa thất bại"
            }));
        }
        
    }
    return(
        <>
        <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={hdDel}
            okText="Có"
            cancelText="Không"
        >
            <Button danger >Xóa</Button>

        </Popconfirm>
       
        </>
    )
}
export default DeleteJob;