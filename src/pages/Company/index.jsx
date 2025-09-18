import { useEffect, useState } from "react";
import { getCompany } from "../../services/companiesService";
import { Card, Col, Row, Spin, Button } from "antd";
import { Link } from "react-router-dom";
import { TeamOutlined, EnvironmentOutlined } from "@ant-design/icons";

function Company() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await getCompany();
        if (res) {
          setData(res);
        }
      } catch (err) {
        console.error("Lỗi tải danh sách công ty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAPI();
  }, []);

  if (loading) return <Spin tip="Đang tải danh sách công ty..." fullscreen />;

  return (
    <div style={{ padding: "24px 18px",flex:1, maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24, }}>Danh sách công ty</h2>
      <Row gutter={[20, 20]}>
        {data.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                height: "100%",
              }}
              title={<strong>{item.companyName}</strong>}
              extra={
                <Link to={`/companies/${item.id}`}>
                  <Button type="link" size="small">
                    Xem chi tiết
                  </Button>
                </Link>
              }
            >
              <p>
                <TeamOutlined style={{ marginRight: 6 }} />
                <strong>{item.quantityPeople}</strong> nhân viên
              </p>
              <p>
                <EnvironmentOutlined style={{ marginRight: 6 }} />
                {item.address}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Company;
