import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findJobs } from "../../services/jobService";
import { getCompany } from "../../services/companiesService";
import { Button, Tag, Card, Row, Col, Typography, Divider, Modal, Space } from "antd";
import FormApply from "../FormApply";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

// Hàm tính thời gian đã đăng
function timeSince(dateString) {
  const now = new Date();
  const seconds = Math.floor((now - new Date(dateString)) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval + " năm trước";

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval + " tháng trước";

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + " ngày trước";

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + " giờ trước";

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + " phút trước";

  return "Vừa xong";
}

function JobDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const showModal = () => {
    setIsModalOpen(true);
  };
  const hdCancel = ()=>{
    setIsModalOpen(false);
  }
  useEffect(() => {
    const fetchAPI = async () => {
      const job = await findJobs(id);
      const companyList = await getCompany();
      const final = {
        ...job,
        tags: job.tags || [],
        inforCompany: companyList.find(c => c.id === parseInt(job.idCompany))
      };
      setData(final);
    };
    fetchAPI();
  }, [id]);

  if (!data) return <p>Loading...</p>;


  return (

    <>
      <Modal
       
        closable
        open={isModalOpen}
        footer={
          <Button key="submit" size="large" type="primary" htmlType="submit" form="applyForm" style={{width:"100%"}}>
            Nộp đơn ngay
          </Button>
        }
        onCancel={hdCancel}
        destroyOnHidden
      >
        <FormApply data={data} id={id} onClose={hdCancel}/>
      </Modal>
    <div style={{ padding: "24px",flex:1 }}>

        <Space style={{ marginBottom: 16 }}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Quay về
        </Button>
      </Space>
      {/* Tiêu đề & nút ứng tuyển */}
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2}>{data.name}</Title>
          <Text type="secondary">
            Đăng tải: {timeSince(data.createAt)} | Hạn nộp:{" "}
            {new Date(data.expiryAt).toLocaleDateString("vi-VN")}
          </Text>
        </Col>
        <Col>
          <Button disabled={!data.status} type="primary" onClick={showModal} size="large">
            Ứng tuyển ngay
          </Button>
        </Col>
      </Row>

      <Divider />

      {/* Thông tin nhanh */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Text strong>Lương</Text>
            <p>{data.salary}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Text strong>Địa điểm</Text>
            <p>{data.city.join(", ")}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Text strong>Trạng thái</Text>
            <p>{data.status ? "Đang tuyển" : "Đã đóng"}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Text strong>Công ty</Text>
            <p>{data.inforCompany?.companyName}</p>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Tags */}
      <div style={{ marginBottom: "16px" }}>
        <span><Text strong>Kỹ năng: </Text></span>
        {data.tags.map((item, index) => (
          <Tag color="blue" key={index}>
            {item}
          </Tag>
        ))}
      </div>

      {/* Mô tả công việc */}
      <Card style={{ marginBottom: "16px" }}>
        <Title level={4}>Mô tả công việc</Title>
        <Paragraph>{data.description}</Paragraph>
      </Card>

      {/* Quyền lợi (demo, bạn có thể thay bằng dữ liệu từ API) */}
      <Card style={{ marginBottom: "16px" }}>
        <Title level={4}>Quyền lợi</Title>
        <ul>
          <li>Thưởng lễ tết, tháng 13</li>
          <li>Đóng bảo hiểm đầy đủ</li>
          <li>Đào tạo kỹ năng chuyên môn</li>
          <li>Du lịch công ty hàng năm</li>
        </ul>
      </Card>

      {/* Thông tin công ty */}
      <Card>
        <Title level={4}>Thông tin công ty</Title>
        <p><strong>Tên công ty:</strong> {data.inforCompany?.companyName}</p>
        <p><strong>Địa chỉ:</strong> {data.inforCompany?.address}</p>
        <p><strong>Website:</strong> <a href={data.inforCompany?.website}>{data.inforCompany?.website}</a></p>
        <p><strong>Quy mô:</strong> {data.inforCompany?.quantityPeople} nhân viên</p>
        <Paragraph>{data.inforCompany?.description}</Paragraph>
      </Card>
    </div>
    </>
    
  );
}

export default JobDetails;
