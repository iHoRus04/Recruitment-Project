import { Col, Row, Button, Menu, Flex, Modal, Drawer } from "antd";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Cookies from "js-cookie";
import Logout from "../../pages/Logout";
import { MenuFoldOutlined, MenuUnfoldOutlined, MenuOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png";

function Header({ collapsed, onToggleCollapse }) {
  const [isModalOpen, setIsModalOpen] = useState({
    status: false,
    type: "login",
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const token = Cookies.get("token");
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const navigate = useNavigate();

  const showModal = (type) => setIsModalOpen({ status: true, type });
  const handleCancel = () => setIsModalOpen({ status: false, type: "login" });

  // menu
  const items = [
    { key: "home", label: <Link to="/">Trang chủ</Link> },
    { key: "search", label: <Link to="/search">Tìm việc</Link> },
    { key: "companies", label: <Link to="/companies">Công ty</Link> },
  ];

  return (
    <>
      {/* Header cố định */}
      <div className="layout__header" style={{ position: "sticky", top: 0, zIndex: 1000, background: "#fff" }}>
        <Row align="middle" style={{ height: "64px", width: "100%", padding: "0 16px" }}>
          
          {/* Logo */}
          <Col xs={12} sm={6} md={4}>
            <div className={"layout__header--logo" + (collapsed ? " active" : "")}>
              <Link to={isAdmin ? "/admin" : "/"}>
                <img src={logo} alt="logo" style={{ height: "50px" }} />
                <span style={{ marginLeft: 8, color: "#002396", fontWeight: 600 }}>
                  {!collapsed && (isAdmin ? "Admin" : "JobIT")}
                </span>
              </Link>
            </div>
          </Col>

          {/* Navbar (ẩn trên mobile, hiện trên md+) */}
          <Col xs={0} sm={12} md={14}>
            {!isAdmin ? (
              <Menu mode="horizontal" selectable={false} style={{ justifyContent: "center" }} items={items} />
            ) : (
              <div className={"button__collapsed" + (collapsed ? " active" : "")}>
                <Button size="large" onClick={onToggleCollapse} style={{ marginLeft: 20 }}>
                  {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
              </div>
            )}
          </Col>

          {/* Actions */}
          <Col xs={12} sm={6} md={6} style={{ textAlign: "right" }}>
            {/* Mobile hamburger */}
            <Button
              type="text"
              className="mobile-menu-btn"
              icon={<MenuOutlined />}
              onClick={() => setIsDrawerOpen(true)}
              style={{ display: "inline-block" }}
            />

            {/* Desktop actions */}
            <div className="desktop-actions" style={{ display: "none" }}>
              {token ? (
                <>
                  {isAdmin ? (
                    <Button onClick={() => navigate("/")}>Trang chủ</Button>
                  ) : (
                    <Button onClick={() => navigate("admin")}>Trang quản lí</Button>
                  )}
                  <Logout />
                </>
              ) : (
                <Flex gap={10} justify="center">
                  <Button type="primary" onClick={() => showModal("login")}>
                    Đăng nhập
                  </Button>
                  <Button onClick={() => showModal("register")}>Đăng ký</Button>
                </Flex>
              )}
            </div>
          </Col>
        </Row>
      </div>

      {/* Drawer cho mobile */}
      <Drawer
        placement="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {!isAdmin && <Menu mode="vertical" items={items} selectable={false} />}
        <div style={{ marginTop: 16 }}>
          {token ? (
            <>
              {isAdmin ? (
                <Button block onClick={() => navigate("/")}>Trang chủ</Button>
              ) : (
                <Button block onClick={() => navigate("admin")}>Trang quản lí</Button>
              )}
              <Logout />
            </>
          ) : (
            <Flex vertical gap={10}>
              <Button type="primary" block onClick={() => showModal("login")}>
                Đăng nhập
              </Button>
              <Button block onClick={() => showModal("register")}>Đăng ký</Button>
            </Flex>
          )}
        </div>
      </Drawer>

      {/* Modal login/register */}
      <Modal
        destroyOnClose
        open={isModalOpen.status}
        onCancel={handleCancel}
        footer={null}
      >
        {isModalOpen.type === "login" ? (
          <Login onClose={handleCancel} />
        ) : (
          <Register toLogin={() => setIsModalOpen({ status: true, type: "login" })} />
        )}
      </Modal>

      {/* CSS responsive inline */}
      <style>{`
        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
          .desktop-actions { display: inline-block !important; }
        }
      `}</style>
    </>
  );
}

export default Header;
