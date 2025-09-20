import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { editCompany, findCompany } from "../../services/companiesService";
import { Button, Col, Form, Input,message,Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux-toolkit/notificationSlice";
function InfoCompany(){
    const [form] = Form.useForm();
    const [edit,setEdit] = useState(false)
    const id = Cookies.get("id");
    const [data, setData]= useState({});
    const dispatch = useDispatch();
    const hdSave = async (values) => {
        try {
        const res = await editCompany(id, values);
        setData(values);
        dispatch(showNotification({
            type:"success",
            message: "Update thành công"
        }));
        setEdit(false); // tắt chế độ edit
        } catch (error) {
        dispatch(showNotification({
            type:"error",
            message: "Update thất bại"
        }));
        }
    };
    const resetForm = ()=>{
        if(edit){
            form.setFieldsValue(data);
            setEdit(false);
        }
        else{
            setEdit(true);
        }
    }
    useEffect(()=>{
        const fetchAPI = async ()=>{
            const res = await findCompany(id);
            setData(res);
            form.setFieldsValue(res);

        }
        fetchAPI();
    },[id,form]);
    return(
        <div style={{padding: 24}}>
        <Row justify="end">
            <Col >

            <Button type={edit ? "" : "primary"}onClick={resetForm} style={{ margin:" 0 5px" }}>
            {edit ? "Cancel" : "Edit"}
            </Button>
            {edit && <Button type="primary" onClick={()=>form.submit()} style={{ margin:" 0 5px" }}>
                Save
            </Button>}
            
            </Col>
        </Row>
        
        <Form form={form} onFinish={hdSave}  layout="vertical" disabled={!edit}>
            <Form.Item name="companyName" label="Tên Công ty">
                <Input />
            </Form.Item>
             <Row gutter={18}>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                { pattern: /^0\d{9}$/, message: "Nhập đủ 10 số" },
              ]}
            >
              <Input maxLength={10}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
            <Row gutter={18}>
                <Col span={12}>
                     <Form.Item name="address"label="Địa chỉ">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                     <Form.Item name="website" label="Website">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={18}>
                <Col span={12}>       
                    <Form.Item name="quantityPeople" label="Số nhân viên">
                        <Input />
                     </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="workingTime" label="Thời gian làm">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        
            <Form.Item  name="description" label="Mô tả">
                <TextArea style={{minHeight:150, resize: "none"} }/>
            </Form.Item>
            <Form.Item name="detail" label="Chi tiết">
                <TextArea  style={{minHeight:150,resize: "none"} } />
            </Form.Item>

        </Form>
        </div>
    )
}
export default InfoCompany;