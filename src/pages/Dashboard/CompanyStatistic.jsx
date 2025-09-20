import { useEffect, useState } from "react";
import { getCompanyJobs } from "../../services/jobService";
import { getCompanyCV } from "../../services/cvService";
import { findCompany } from "../../services/companiesService";
import Cookies from "js-cookie";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Divider,
  Descriptions,
} from "antd";

const { Title } = Typography;

function CompanyStatistic() {
  const [data, setData] = useState({
    totalJob: 0,
    jobsOn: 0,
    jobsOff: 0,
    totalCV: 0,
    cvOn: 0,
    cvOff: 0,
    infoCompany: null,
  });

  const id = Cookies.get("id");

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const [jobs, cvs, company] = await Promise.all([
          getCompanyJobs(id),
          getCompanyCV(id),
          findCompany(id),
        ]);

        const obj = {
          totalJob: jobs.length,
          jobsOn: jobs.filter((item) => item.status).length,
          jobsOff: jobs.filter((item) => !item.status).length,
          totalCV: cvs.length,
          cvOn: cvs.filter((item) => item.statusRead).length,
          cvOff: cvs.filter((item) => !item.statusRead).length,
          infoCompany: company,
        };

        setData(obj);
      } catch (error) {
        console.error("Lỗi khi load dữ liệu thống kê:", error);
      }
    };

    if (id) {
      fetchAPI();
    }
  }, [id]);

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Tổng quan công ty</Title>

      {/* Thông tin công ty */}
      {data.infoCompany && (
        <Card style={{ marginBottom: 24 }}>
          <Descriptions
            title={data.infoCompany.companyName}
            bordered
            column={{ xs: 1, sm: 1, md: 2, lg: 2 }}
          >
            <Descriptions.Item label="Email">
              {data.infoCompany.email}
            </Descriptions.Item>
            <Descriptions.Item label="Điện thoại">
              {data.infoCompany.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {data.infoCompany.address}
            </Descriptions.Item>
            <Descriptions.Item label="Website">
              <a
                href={data.infoCompany.website}
                target="_blank"
                rel="noreferrer"
              >
                {data.infoCompany.website}
              </a>
            </Descriptions.Item>
            <Descriptions.Item label="Số nhân viên">
              {data.infoCompany.quantityPeople}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian làm việc">
              {data.infoCompany.workingTime}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả" span={2}>
              {data.infoCompany.description}
            </Descriptions.Item>
            <Descriptions.Item label="Chi tiết" span={2}>
              {data.infoCompany.detail}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      {/* Thống kê Job */}
      <Divider orientation="left">Thống kê công việc</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Tổng số Job" value={data.totalJob} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Job đang mở"
              value={data.jobsOn}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Job đã đóng"
              value={data.jobsOff}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Thống kê CV */}
      <Divider orientation="left">Thống kê hồ sơ</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Tổng số CV" value={data.totalCV} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="CV đã đọc"
              value={data.cvOn}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="CV chưa đọc"
              value={data.cvOff}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CompanyStatistic;
