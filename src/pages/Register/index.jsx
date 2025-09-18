import { useState } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined, BlockOutlined ,PhoneOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { getUser, registerUser } from "../../services/userService";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux-toolkit/notificationSlice";

function Register({ toLogin }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
 

  const hdSubmit = async (values) => {
    setLoading(true);
    try {
      const users = await getUser();
      const checkEmail = users.find((item) => item.email === values.email);
      const checkPhone = users.find(item =>item.phone === values.phone );
      if(checkEmail || checkPhone ){
        dispatch(showNotification({
          type: "error",
          message: checkEmail && checkPhone
          ?
          "Email và số điện thoại đã tồn tại":
          checkEmail 
          ? 
          "Email đã tồn tại"
          :
          "Số điện thoại đã tồn tại"
          
        }))
        return;
      }

      const res = await registerUser(values);
      if (res) {
        dispatch(showNotification({
          type: "success",
          message: "Đăng ký thành công",
        }))
        form.resetFields();
        // Đóng modal sau khi đăng ký thành công
        if (toLogin) {
          setTimeout(() => {
            toLogin();
          }, 1000);
        }
      } else {
        dispatch(showNotification({
          type: "error",
          message: "Đăng ký thất bại!",
        }))
      }
    } catch (err) {
      console.error(err);
      dispatch(showNotification({
          type: "error",
          message: "Lỗi hệ thống!",
        }))
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     
      <div
        style={{
          maxWidth: 400,
          margin: "0 auto",
          padding: "20px 10px",
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Đăng ký
        </Title>
        <Form
          form={form}
          name="registerForm"
          layout="vertical"
          requiredMark={false}
          onFinish={hdSubmit}
        >
          {/* Họ và tên */}
          <Form.Item
            label="Tên công ty"
            name="companyName"
            rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]}
          >
            <Input
              prefix={<UserOutlined />}
              size="large"
              placeholder="Công ty A"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
            hasFeedback
          >
            <Input
              size="large"
              prefix={<BlockOutlined />}
              placeholder="abc@gmail.com"
            />
          </Form.Item>
        

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^0\d{9}$/,
                message: "Số điện thoại phải có 10 chữ số và bắt đầu bằng 0",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="0XXXXXXXXX"
              maxLength={10}
              prefix={<PhoneOutlined />}
            />
          </Form.Item>


          {/* Mật khẩu */}
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} size="large" />
          </Form.Item>

          {/* Xác nhận mật khẩu */}
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không trùng khớp"));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Register;
