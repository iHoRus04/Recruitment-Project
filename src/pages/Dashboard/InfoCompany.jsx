import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { editCompany, findCompany } from "../../services/companiesService";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux-toolkit/notificationSlice";

function InfoCompany() {
  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const id = Cookies.get("id");
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const hdSave = async (values) => {
    try {
      setLoading(true);
      await editCompany(id, values);
      setData(values);
      dispatch(
        showNotification({
          type: "success",
          message: "Cập nhật thành công ✅",
        })
      );
      setEdit(false);
    } catch (error) {
      dispatch(
        showNotification({
          type: "error",
          message: "Cập nhật thất bại ❌",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    if (edit) {
      form.setFieldsValue(data);
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      try {
        const res = await findCompany(id);
        setData(res);
        form.setFieldsValue(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAPI();
  }, [id, form]);

  return (
    <Spin spinning={loading}>
      <div style={{ padding: 24 }}>
        <Row justify="end">
          <Col>
            <Button
              type={edit ? "default" : "primary"}
              onClick={resetForm}
              style={{ margin: "0 5px" }}
            >
              {edit ? "Cancel" : "Edit"}
            </Button>
            {edit && (
              <Button
                type="primary"
                onClick={() => form.submit()}
                style={{ margin: "0 5px" }}
              >
                Save
              </Button>
            )}
          </Col>
        </Row>

        <Form
          form={form}
          onFinish={hdSave}
          layout="vertical"
          disabled={!edit}
        >
          <Form.Item
            name="companyName"
            label="Tên Công ty"
            rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]}
          >
            <Input placeholder="Nhập tên công ty..." />
          </Form.Item>

          <Row gutter={18}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                  { pattern: /^0\d{9}$/, message: "Số điện thoại gồm 10 số" },
                ]}
              >
                <Input maxLength={10} placeholder="VD: 0912345678" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input placeholder="VD: company@gmail.com" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={18}>
            <Col xs={24} sm={12}>
              <Form.Item name="address" label="Địa chỉ">
                <Input placeholder="Nhập địa chỉ công ty..." />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="website" label="Website">
                <Input placeholder="VD: https://company.com" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={18}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="quantityPeople"
                label="Số nhân viên"
                rules={[
                  { pattern: /^[1-9]\d*$/, message: "Phải là số nguyên dương" },
                ]}
              >
                <Input placeholder="VD: 50" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="workingTime" label="Thời gian làm">
                <Input placeholder="VD: 8h - 17h" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Mô tả">
            <TextArea style={{ minHeight: 120, resize: "none" }} />
          </Form.Item>
          <Form.Item name="detail" label="Chi tiết">
            <TextArea style={{ minHeight: 120, resize: "none" }} />
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
}

export default InfoCompany;
