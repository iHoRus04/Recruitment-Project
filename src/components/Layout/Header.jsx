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
    { key: "home", label: <Link onClick={() => setIsDrawerOpen(false)} to="/">Trang chủ</Link> },
    { key: "search", label: <Link  onClick={() => setIsDrawerOpen(false)} to="/search">Tìm việc</Link> },
    { key: "companies", label: <Link onClick={() => setIsDrawerOpen(false)} to="/companies">Công ty</Link> },
  ];

  return (
    <>
    
      <div className="layout__header" style={{ position: "sticky", top: 0, zIndex: 1000, background: "#fff" }}>
        <Row align="middle" style={{ height: "64px", width: "100%", padding: "0 16px" }}>
          
       
          <Col xs={12} sm={6} md={4}>
            <div className={"layout__header--logo" + (collapsed ? " active" : "")}>
              <Link to={isAdmin ? "/admin" : "/"}>
                <img src={logo} alt="logo" style={{ height: "45px" }} />
                <span style={{ marginLeft: 8, color: "#002396", fontWeight: 600 }}>
                  {!collapsed && (isAdmin ? "Admin" : "JobIT")}
                </span>
              </Link>
            </div>
          </Col>

          
          <Col xs={0} sm={12} md={14}>
            {!isAdmin ? (
              <Menu mode="horizontal" selectable={false} style={{ justifyContent: "center" }} items={items} />
            ) : (
              <div className={"button__collapsed" + (collapsed ? " active" : "")}>
                <Button size="large" onClick={onToggleCollapse}>
                  {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
              </div>
            )}
          </Col>

          
          <Col xs={12} sm={6} md={6} style={{ textAlign: "right" }}>
         
            <Button
              type="text"
              className="mobile-menu-btn"
              icon={<MenuOutlined />}
              onClick={() => setIsDrawerOpen(true)}
              style={{ display: "inline-block" }}
            />

           
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

    
      <Drawer
        placement="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        style={{textAlign: "center"}}
      >
        {!isAdmin && <Menu mode="vertical" items={items} selectable={false} />}
        <div style={{ marginTop: 16 }}>
          {token ? (
            <>
              {isAdmin ? (
                <Button  onClick={() => navigate("/")}>Trang chủ</Button>
              ) : (
                <Button  onClick={() => navigate("admin")}>Trang quản lí</Button>
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

     
      <Modal
        destroyOnHidden
        open={isModalOpen.status}
        onCancel={handleCancel}
        footer={null}
      >
        {isModalOpen.type === "login" ? (
          <Login closeDrawer={()=>setIsDrawerOpen(false)} onClose={handleCancel} />
        ) : (
          <Register toLogin={() => setIsModalOpen({ status: true, type: "login" })} />
        )}
      </Modal>


      
    </>
  );
}

export default Header;
