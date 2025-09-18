import { Button, Modal } from "antd";
import { useState } from "react";
import CreateJob from "../CreateJob";

function EditJob({record,onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSuccess = () => {
    setIsModalOpen(false); // đóng modal
    if (onUpdate) onUpdate(); // reload danh sách
  };
    return (
        <>
            <Modal 
            footer={null}
            open={isModalOpen}
            onCancel={handleCancel}
            destroyOnHidden
            >
            <CreateJob isEdit={true} jobData={record} onSuccess={handleSuccess}/>

            </Modal>
            <Button onClick={showModal} type="primary">Edit</Button>
        </>
    )
}
export default EditJob;