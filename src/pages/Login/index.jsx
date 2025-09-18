import { Form, Input, Button, Typography, Checkbox, } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginUser } from "../../services/userService";
import {useDispatch} from "react-redux";
import {showNotification} from "../../redux-toolkit/notificationSlice";
import { v4 as uuidv4 } from 'uuid';
import Cookies from "js-cookie";

const { Title } = Typography;

function Login({ onClose }) {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
  try {
    const res = await loginUser(values);
    if (res.length > 0) {
      dispatch(showNotification({
        type: "success",
        message: "Đăng nhập thành công",
        description: "Chào mừng bạn đã quay trở lại!",
      }));
      if (onClose) onClose(); // đóng modal sau khi login
      const user = res[0];
      
      const token = uuidv4();
       const expires = values.remember ? 7 : undefined;

      Cookies.set("token", token, { expires });
      Cookies.set("id", user.id, { expires });
      Cookies.set("fullName", user.fullName, { expires });
      Cookies.set("email", user.email, { expires });
      

    } else {
      dispatch(showNotification({
        type: "error",
        message: "Đăng nhập thất bại",
        description: "Email hoặc mật khẩu không chính xác!",
      }));
    }
  } catch (err) {
    dispatch(showNotification({
      type: "error",
      message: "Lỗi hệ thống",
      description: "Không thể kết nối tới server. Vui lòng thử lại sau!",
    }));
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
        <Title
          level={3}
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          ĐĂNG NHẬP
        </Title>

        <Form
          name="loginForm"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Nhập email"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          {/* Remember me */}
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Login;
