import { Button, Card, Col, Row, Tag } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  TagsOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

function DetailJob() {
  const location = useLocation();
  const job = location.state?.record; // lấy job trực tiếp
  const navigate = useNavigate();

  return (
    <>
      {/* Nút quay về */}
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16 }}
      >
        Quay về
      </Button>

      <h2 style={{ margin: "16px 0" }}>💼 Thông tin Công việc</h2>

      <Card
        style={{
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        {job ? (
          <Row gutter={[16, 16]}>
   
            <Col span={24}>
              <h3 style={{ marginBottom: 8 }}>{job.name}</h3>
            </Col>

         
            <Col span={24}>
              <p>
                <TagsOutlined style={{ marginRight: 8, color: "#722ed1" }} />
                <b>Kỹ năng yêu cầu:</b>
              </p>
              <div>
                {job.tags?.map((tag, idx) => (
                  <Tag color="blue" key={idx}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </Col>

            
            <Col xs={24} sm={12} md={12} lg={8} xl={6}>
              <p>
                <DollarOutlined style={{ marginRight: 8, color: "#fa8c16" }} />
                <b>Mức lương:</b> {job.salary}
              </p>
            </Col>

         
            <Col xs={24} sm={12} md={12} lg={8} xl={6}>
              <p>
                <EnvironmentOutlined
                  style={{ marginRight: 8, color: "#52c41a" }}
                />
                <b>Thành phố:</b> {job.city?.join(", ") || "Không xác định"}
              </p>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={6}>
              <p>
                <CalendarOutlined
                  style={{ marginRight: 8, color: "#1890ff" }}
                />
                <b>Ngày đăng:</b> {job.createAt}
              </p>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={6}>
              <p>
                <CalendarOutlined
                  style={{ marginRight: 8, color: "#ff4d4f" }}
                />
                <b>Hết hạn:</b> {job.expiryAt}
              </p>
            </Col>

          
            <Col xs={24} sm={12} md={12} lg={8} xl={6}>
              <p>
                <FileTextOutlined
                  style={{ marginRight: 8, color: "#13c2c2" }}
                />
                <b>Trạng thái:</b>{" "}
                {job.status ? (
                  <Tag color="green">Đang tuyển</Tag>
                ) : (
                  <Tag color="red">Hết hạn</Tag>
                )}
              </p>
            </Col>

           
            <Col span={24}>
              <p>
                <FileTextOutlined
                  style={{ marginRight: 8, color: "#13c2c2" }}
                />
                <b>Mô tả công việc:</b>
              </p>
              <p style={{ whiteSpace: "pre-line", marginLeft: 28 }}>
                {job.description}
              </p>
            </Col>
          </Row>
        ) : (
          <p>❌ Không tìm thấy thông tin công việc</p>
        )}
      </Card>
    </>
  );
}

export default DetailJob;
