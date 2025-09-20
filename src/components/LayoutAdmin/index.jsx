import { Layout, Menu } from "antd";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import {
  DashboardOutlined,
  InfoCircleOutlined,
  FileTextOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";


const { Sider, Content } = Layout;

function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(true);

  const items = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Tổng quan</Link>,
    },
    {
      key: "/admin/info-company",
      icon: <InfoCircleOutlined />,
      label: <Link to="/admin/info-company">Thông tin công ty</Link>,
    },
    {
      key: "/admin/manage-cv",
      icon: <FileTextOutlined />,
      label: <Link to="/admin/manage-cv">Quản lý CV</Link>,
    },
    {
      key: "/admin/manage-jobs",
      icon: <AppstoreOutlined />,
      label: <Link to="/admin/manage-jobs">Quản lý công việc</Link>,
    },
  ];



  
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Header */}
        <Header
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />

        {/* Phần thân: Sider + Content */}
        <Layout>
          <Sider
            width={200}
            style={{ background: "#fff" }}
            collapsible
            collapsed={collapsed}
            trigger={null}
          >
            <Menu
              style={{ background: "#fff" }}
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={items}
              
            />
          </Sider>
          <Layout style={{}}>
            <Content
              style={{
                
                margin: 0,
                minHeight: 280,
                background: "#f5f7fa",
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>

      <Footer />
    </>
  );
}

export default LayoutAdmin;
