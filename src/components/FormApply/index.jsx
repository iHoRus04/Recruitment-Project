import { Button, Form, Input, Select, Card } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UserOutlined, MailOutlined, PhoneOutlined, ProjectOutlined, FileTextOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { applyCv, getCV } from "../../services/cvService";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux-toolkit/notificationSlice";

function FormApply({ data, id, onClose }) {
  const [form] = Form.useForm();
  const [cvList, setCvList] = useState([]);
  const [cv, setCv] = useState({
    idJob: id,
    idCompany: data.idCompany,
    statusRead: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await getCV();
        setCvList(res);
      } catch (err) {
        dispatch(
          showNotification({
            type: "error",
            message: "Không thể tải danh sách CV",
          })
        );
      }
    };
    fetchAPI();
  }, [dispatch]);

  const notifyError = (msg) => {
    dispatch(showNotification({ type: "error", message: msg }));
  };

  const onFinish = async (values) => {
    const checkEmail = cvList.some(
      (item) => item.email.toLowerCase() === values.email.toLowerCase()
    );
    const checkPhone = cvList.some((item) => item.phone === values.phone);

    if (checkEmail && checkPhone) {
      notifyError("Email và Số điện thoại đã tồn tại");
      return;
    }
    if (checkPhone) {
      notifyError("Số điện thoại đã tồn tại");
      return;
    }
    if (checkEmail) {
      notifyError("Email đã tồn tại");
      return;
    }

    try {
      const date = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const newCV = { ...cv, ...values, createAt: date };
      const res = await applyCv(newCV);
      if (res) {
        dispatch(
          showNotification({
            type: "success",
            message: "Nộp CV thành công",
          })
        );
        onClose();
      } else {
        dispatch(
          showNotification({
            type: "error",
            message: "Nộp CV thất bại",
          })
        );
      }
    } catch (err) {
      notifyError("Có lỗi xảy ra khi nộp CV");
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "32px 16px" }}>
     
        <h2
          style={{
            textAlign: "center",
            marginBottom: 24,
            fontSize: 22,
            fontWeight: 600,
            borderBottom: "2px solid #1890ff",
            display: "inline-block",
            paddingBottom: 4,
          }}
        >
          FORM ỨNG TUYỂN
        </h2>

        <Form layout="vertical" form={form} onFinish={onFinish} id="applyForm">
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[
              { required: true, message: "Vui lòng nhập họ tên!" },
              {
                pattern: /^[^0-9]+$/,
                message: "Họ tên không được chứa số",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nguyễn Văn A" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="example@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Thành phố"
            name="city"
            rules={[{ required: true, message: "Vui lòng chọn thành phố!" }]}
          >
            <Select
              placeholder="Chọn thành phố"
              options={data.city.map((c, index) => ({
                value: c,
                label: c,
                key: index,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^0\d{9}$/,
                message: "Số điện thoại phải bắt đầu bằng 0 và đủ 10 số",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              maxLength={10}
              placeholder="0123456789"
            />
          </Form.Item>

          <Form.Item
            label="Giới thiệu bản thân"
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập đầy đủ thông tin" },
            ]}
          >
            <TextArea
              prefix={<FileTextOutlined />}
              style={{ height: 120, resize: "none" }}
              placeholder="Mô tả về bản thân, kỹ năng, kinh nghiệm..."
            />
          </Form.Item>

          <Form.Item
            label="Danh sách các link project"
            name="linkProject"
            rules={[
              { required: true, message: "Vui lòng nhập đầy đủ thông tin" },
            ]}
          >
            <TextArea
              prefix={<ProjectOutlined />}
              style={{ height: 120, resize: "none" }}
              placeholder="Ví dụ: https://github.com/username/project1"
            />
          </Form.Item>

        </Form>
      
    </div>
  );
}

export default FormApply;
