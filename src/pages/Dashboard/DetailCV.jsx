import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Card, Divider, Button, Tag } from "antd";
import {
    ArrowLeftOutlined,
    MailOutlined,
    PhoneOutlined,
    HomeOutlined,
    UserOutlined,
    LinkOutlined,
    DollarOutlined,
    EnvironmentOutlined,
    TagsOutlined,
    CalendarOutlined,
    FileTextOutlined,
} from "@ant-design/icons";
import { statusCV } from "../../services/cvService";
import dayjs from "dayjs";

function DetailCV() {
    const [data, setData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.record) {
            setData(location.state.record);

            const fetchAPI = async () => {
                try {
                    await statusCV(location.state.record.id, { statusRead: true });
                } catch (error) {
                    console.error(error);
                }
            };
            fetchAPI();
        } else {
            navigate("/admin/manage-cv");
        }
    }, [location.state, navigate]);

    if (!data) return null;

    return (
        <div style={{ padding: 24, background: "#f5f5f5", minHeight: "100vh" }}>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20,
                }}
            >
                <h2 style={{ margin: 0 }}>📄 Thông tin CV</h2>
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
                    Quay về
                </Button>
            </div>


            <Card style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                        <Card size="small" title="Họ tên">
                            <UserOutlined style={{ marginRight: 8 }} />
                            {data.fullName}
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card size="small" title="Địa chỉ">
                            <HomeOutlined style={{ marginRight: 8 }} />
                            {data.city}
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card size="small" title="Số điện thoại">
                            <PhoneOutlined style={{ marginRight: 8, color: "#1890ff" }} />
                            {data.phone}
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card size="small" title="Email">
                            <MailOutlined style={{ marginRight: 8, color: "#ff4d4f" }} />
                            {data.email}
                        </Card>
                    </Col>
                </Row>

                <Divider />

                <Row>
                    <Col span={24}>
                        <Card title="Mô tả" style={{ background: "#fafafa", borderRadius: 8 }}>
                            <p style={{ whiteSpace: "pre-line" }}>{data.description}</p>
                        </Card>
                    </Col>
                </Row>

                <Divider />

                <Row> <Col span={24}> <Card title="Danh sách project" style={{ background: "#fafafa", borderRadius: 8 }} > <a href={data.linkProject} target="_blank" rel="noreferrer" style={{ fontSize: 16 }} > <LinkOutlined /> {data.linkProject} </a> </Card> </Col> </Row> </Card>

            <Divider />


            <h2 style={{ margin: "16px 0" }}>💼 Thông tin Công việc</h2>
            <Card
                style={{
                    borderRadius: 12,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
            >
                {data.job && data.job.length > 0 ? (
                    <Row gutter={[16, 16]}>

                        <Col span={24}>
                            <h3 style={{ marginBottom: 8 }}>{data.job[0].name}</h3>
                        </Col>

                        <Col span={24}>
                            <p>
                                <TagsOutlined style={{ marginRight: 8, color: "#722ed1" }} />
                                <b>Kỹ năng yêu cầu:</b>
                            </p>
                            <div>
                                {data.job[0].tags?.map((tag, idx) => (
                                    <Tag color="blue" key={idx}>
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                        </Col>

                        <Col xs={24} sm={12}>
                            <p>
                                <DollarOutlined style={{ marginRight: 8, color: "#fa8c16" }} />
                                <b>Mức lương:</b> {data.job[0].salary}
                            </p>
                        </Col>

                        <Col xs={24} sm={12}>
                            <p>
                                <EnvironmentOutlined style={{ marginRight: 8, color: "#52c41a" }} />
                                <b>Thành phố:</b> {data.job[0].city?.join(", ")}
                            </p>
                        </Col>

                        <Col xs={24} sm={12}>
                            <p>
                                <CalendarOutlined style={{ marginRight: 8, color: "#1890ff" }} />
                                <b>Ngày đăng:</b>{" "}
                                {dayjs(data.job[0].createAt).format("DD/MM/YYYY")}
                            </p>
                        </Col>

                        <Col xs={24} sm={12}>
                            <p>
                                <CalendarOutlined style={{ marginRight: 8, color: "#ff4d4f" }} />
                                <b>Hết hạn:</b>{" "}
                                {dayjs(data.job[0].expiryAt).format("DD/MM/YYYY")}
                            </p>
                        </Col>


                        <Col xs={24} sm={12}>
                            <p>
                                <FileTextOutlined style={{ marginRight: 8, color: "#13c2c2" }} />
                                <b>Trạng thái:</b>{" "}
                                {data.job[0].status ? (
                                    <Tag color="green">Đang tuyển</Tag>
                                ) : (
                                    <Tag color="red">Hết hạn</Tag>
                                )}
                            </p>
                        </Col>

                        <Col span={24}>
                            <p>
                                <FileTextOutlined style={{ marginRight: 8, color: "#13c2c2" }} />
                                <b>Mô tả công việc:</b>
                            </p>
                            <p style={{ whiteSpace: "pre-line", marginLeft: 28 }}>
                                {data.job[0].description}
                            </p>
                        </Col>
                    </Row>
                ) : (
                    <p>❌ Không tìm thấy thông tin công việc</p>
                )}
            </Card>
        </div>
    );
}

export default DetailCV;
