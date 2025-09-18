import { Button, Form, Input, Select, message, Space, DatePicker } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { createJob, getCity, getTags, updateJob } from "../../services/jobService";
import { useDispatch } from "react-redux";
import {showNotification} from "../../redux-toolkit/notificationSlice";
import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

const { Option } = Select;

function CreateJob({ isEdit = false, jobData = null, onSuccess }) {
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = Cookies.get("id");
  const reset = () => {
    if (isEdit && jobData) {

      form.setFieldsValue({
        ...jobData,
        createAt: dayjs(jobData.createAt, "YYYY-MM-DD HH:mm:ss"),
        expiryAt: dayjs(jobData.expiryAt, "YYYY-MM-DD HH:mm:ss"),
      });
    } else {
      form.resetFields();
    }
  }


  useEffect(() => {
    const fetchAPI = async ()=>{
      const [tagList,cityList] = await Promise.all([
        getTags(),
        getCity()
      ]) 
      setCity(cityList);
      setTags(tagList);
    };
    fetchAPI();
    if (isEdit && jobData) {
      form.setFieldsValue({
        name: jobData.name,
        salary: jobData.salary,
        idCompany: id,
        tags: jobData.tags || [],
        createAt: dayjs(jobData.createAt, "YYYY-MM-DD HH:mm:ss"),
        expiryAt: dayjs(jobData.expiryAt, "YYYY-MM-DD HH:mm:ss"),
        status: jobData.status,
        city: jobData.city || [],
        description: jobData.description || "",
      });
      
    }
    else{
      form.resetFields();
      form.setFieldsValue({ idCompany: id, status: true });
      }
  }, [isEdit, jobData, form]);

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        createAt: values.createAt.format("YYYY-MM-DD HH:mm:ss"),
        expiryAt: values.expiryAt.format("YYYY-MM-DD HH:mm:ss"),
      };

      if (isEdit && jobData) {
        await updateJob(jobData.id, payload);
        dispatch(showNotification({
          type: "success",
          message: "Cập nhật thành công",
          
        }));
      } else {
        await createJob(payload);
        dispatch(showNotification({
          type: "success",
          message: "Tạo công việc thành công",
          
        }));
        form.resetFields();
        navigate('/admin/manage-jobs');
      }
      
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };
  console.log(onSuccess);
  

  return (
    <div style={{ padding: 20, maxWidth: 700 }}>
      <h2>{isEdit ? "Chỉnh sửa công việc" : "Thêm công việc mới"}</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ status: true }}>
         <Form.Item name="idCompany" hidden>
            <Input type="hidden" />
          </Form.Item>

        <Form.Item
          label="Tên công việc"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên công việc" }]}
        >
          <Input placeholder="Nhập tên công việc" />
        </Form.Item>

        <Form.Item
          label="Mức lương"
          name="salary"
          rules={[{ required: true, message: "Vui lòng nhập mức lương" }]}
        >
          <Input style={{ width: "100%" }} placeholder="Nhập mức lương" />
        </Form.Item>

         <Form.Item
          label="Tags"
          name="tags"
          rules={[{ required: true, message: "Vui lòng chọn ít nhất 1 tag" }]}
        >
          <Select mode="tags" style={{ width: "100%" }} placeholder="Thêm tag và nhấn Enter">
            {tags.map((tag) => (
              <Option value={tag.name} key={tag.id}>{tag.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Thành phố"
          name="city"
          rules={[{ required: true, message: "Vui lòng chọn ít nhất 1 thành phố" }]}
        >
          <Select mode="multiple" style={{ width: "100%" }} placeholder="Chọn thành phố">
             {city.map((city) => (
              <Option value={city.name} key={city.id}>{city.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Mô tả công việc"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả công việc" }]}
        >
          <Input.TextArea rows={4} placeholder="Mô tả công việc..." />
        </Form.Item>

        <Form.Item
          label="Ngày bắt đầu"
          name="createAt"
          rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Ngày kết thúc"
          name="expiryAt"
          rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Trạng thái" name="status">
          <Select>
            <Option value={true}>Đang tuyển</Option>
            <Option value={false}>Hết tuyển</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {isEdit ? "Cập nhật" : "Tạo công việc"}
            </Button>
            <Button onClick={reset}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateJob;
