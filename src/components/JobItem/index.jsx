import { Card, Tag, Typography, Space, Divider } from "antd";
import {
  EnvironmentOutlined,
  DollarOutlined,
  BankOutlined,
  CalendarOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

function JobItem({ item ,company}) {
  
  return (
    <Link to={`/jobs/${item.id}`}>
    <Card hoverable style={{ marginBottom: 16,height: "100%" }}>
  
      <Title level={4} style={{ marginBottom: 12 }}>
        {item.name}
      </Title>
     
    
      <div style={{ marginBottom: 12 }}>
        
          {item.tags?.map((tag, i) => (
            <Tag key={i} color="blue">
              <CodeOutlined /> {tag}
            </Tag>
          ))}
        
      </div>

      <div style={{ lineHeight: "28px" }}>
        <Text>
          <EnvironmentOutlined style={{ color: "#fa8c16", marginRight: 8 }} />
          Thành phố: <Tag color="orange" >{item.city}</Tag>
        </Text>
        <br />
        <Text>
          <DollarOutlined style={{ color: "#52c41a", marginRight: 8 }} />
          Lương: {item.salary}
        </Text>
        <br />
        <Text>
          <BankOutlined style={{ color: "#1890ff", marginRight: 8 }} />
          Công ty: {company.companyName}
        </Text>
        <br />
        <Text>
          <CalendarOutlined style={{ color: "#722ed1", marginRight: 8 }} />
          Ngày tạo: {item.createAt}
        </Text>
      </div>
    </Card>
    </Link>
    
  );
}

export default JobItem;
