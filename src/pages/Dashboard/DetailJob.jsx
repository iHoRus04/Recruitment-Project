import { Button, Card, Col, Row, Tag } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    ArrowLeftOutlined,
    DollarOutlined,
    EnvironmentOutlined,
    TagsOutlined,
    CalendarOutlined,
    FileTextOutlined,
} from "@ant-design/icons";


function DetailJob(){
    const location = useLocation();
    const [data,setData] = useState([location.state.record]);
    const navigate = useNavigate();

    
    return(
        <>
            <Button
                   
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                >
                    Quay về
            </Button>
            <h2 style={{ margin: "16px 0" }}>💼 Thông tin Công việc</h2>
            
            <Card
                style={{
                    borderRadius: 12,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
                variant="outlined"
            >
                {data && data.length > 0 ? (
                    <Row gutter={[16, 16]}>
                        {/* Tên job */}
                        <Col span={24}>
                            <h3 style={{ marginBottom: 8 }}>{data[0].name}</h3>
                        </Col>

                        {/* Tags */}
                        <Col span={24}>
                            <p>
                                <TagsOutlined style={{ marginRight: 8, color: "#722ed1" }} />
                                <b>Kỹ năng yêu cầu:</b>
                            </p>
                            <div>
                                {data[0].tags?.map((tag, idx) => (
                                    <Tag color="blue" key={idx}>
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                        </Col>

                        {/* Lương */}
                        <Col span={12}>
                            <p>
                                <DollarOutlined style={{ marginRight: 8, color: "#fa8c16" }} />
                                <b>Mức lương:</b> {data[0].salary}
                            </p>
                        </Col>

                        {/* Thành phố */}
                        <Col span={12}>
                            <p>
                                <EnvironmentOutlined style={{ marginRight: 8, color: "#52c41a" }} />
                                <b>Thành phố:</b> {data[0].city?.join(", ")}
                            </p>
                        </Col>

                        {/* Ngày tạo */}
                        <Col span={12}>
                            <p>
                                <CalendarOutlined style={{ marginRight: 8, color: "#1890ff" }} />
                                <b>Ngày đăng:</b> {data[0].createAt}
                            </p>
                        </Col>

                        {/* Ngày hết hạn */}
                        <Col span={12}>
                            <p>
                                <CalendarOutlined style={{ marginRight: 8, color: "#ff4d4f" }} />
                                <b>Hết hạn:</b> {data[0].expiryAt}
                            </p>
                        </Col>

                        {/* Trạng thái */}
                        <Col span={12}>
                            <p>
                                <FileTextOutlined style={{ marginRight: 8, color: "#13c2c2" }} />
                                <b>Trạng thái:</b>{" "}
                                {data[0].status ? (
                                    <Tag color="green">Đang tuyển</Tag>
                                ) : (
                                    <Tag color="red">Hết hạn</Tag>
                                )}
                            </p>
                        </Col>

                        {/* Mô tả công việc */}
                        <Col span={24}>
                            <p>
                                <FileTextOutlined style={{ marginRight: 8, color: "#13c2c2" }} />
                                <b>Mô tả công việc:</b>
                            </p>
                            <p style={{ whiteSpace: "pre-line", marginLeft: 28 }}>
                                {data[0].description}
                            </p>
                        </Col>
                    </Row>
                ) : (
                    <p>❌ Không tìm thấy thông tin công việc</p>
                )}
            </Card>

        </>
    )
}
export default DetailJob;