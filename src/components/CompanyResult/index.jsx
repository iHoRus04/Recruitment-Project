import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Descriptions,
  Spin,
  Empty,
  Divider,
  Row,
  Col,
  Button,
  Space,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { findCompany } from "../../services/companiesService";
import { getCompanyJobs } from "../../services/jobService";
import JobItem from "../JobItem";

function CompanyResult() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await findCompany(id);
        const jobList = await getCompanyJobs(id);

        if (res) {
          setCompany(res);
          setJobs(Array.isArray(jobList) ? jobList : []);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu công ty:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAPI();
  }, [id]);

  if (loading) {
    return <Spin tip="Đang tải dữ liệu..." fullscreen />;
  }

  if (!company) {
    return <p>❌ Không tìm thấy công ty</p>;
  }

  return (
    <div style={{ maxWidth: 1000, margin: "20px auto", padding: "0 16px" }}>
      {/* Nút quay về */}
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Quay về
        </Button>
      </Space>

      {/* Thông tin công ty */}
      <Card
        title={<h2 style={{ margin: 0 }}>{company.companyName}</h2>}
        bordered={false}
        style={{
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: 32,
        }}
      >
        <Descriptions
          column={{ xs: 1, sm: 2 }}
          bordered
          size="middle"
          labelStyle={{ fontWeight: "bold" }}
        >
          <Descriptions.Item label="📍 Địa chỉ">
            {company.address}
          </Descriptions.Item>
          <Descriptions.Item label="📞 Điện thoại">
            {company.phone}
          </Descriptions.Item>
          <Descriptions.Item label="📧 Email">
            {company.email}
          </Descriptions.Item>
          <Descriptions.Item label="⏰ Giờ làm việc">
            {company.workingTime}
          </Descriptions.Item>
          <Descriptions.Item label="🌐 Website" span={2}>
            <a href={company.website} target="_blank" rel="noreferrer">
              {company.website}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="👥 Quy mô" span={2}>
            {company.quantityPeople} nhân viên
          </Descriptions.Item>
          <Descriptions.Item label="📖 Mô tả" span={2}>
            {company.description}
          </Descriptions.Item>
          <Descriptions.Item label="📌 Chi tiết" span={2}>
            {company.detail}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Divider */}
      <Divider style={{ fontSize: 18, fontWeight: "bold" }}>
        Danh sách công việc đang tuyển
      </Divider>

      {/* Danh sách job */}
      <Card
        bordered={false}
        style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
      >
        {jobs.length > 0 ? (
          <Row gutter={[16, 16]}>
            {jobs.map((item) => (
              <Col key={item.id} xs={24} sm={12}>
                <JobItem item={item} company={company} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            description="Chưa có công việc nào"
            style={{ padding: "40px 0" }}
          />
        )}
      </Card>
    </div>
  );
}

export default CompanyResult;
