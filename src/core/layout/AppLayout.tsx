import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ThemeContext } from "../../config/context/ThemeContext";
import AppHeader from "./AppHeader";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={`/admin/${key}`}>{label}</Link>,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User Management", "user-management", <UserOutlined />, [
    getItem("All User", "user-management"),
    getItem("Staff", "staff"),
    getItem("Stylist", "stylist"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Layout
      style={{ minHeight: "100vh" }}
      className="dark:!bg-gray-800 bg-white dark:!text-white !font-serif"
    >
      <Sider
        collapsible
        width={300}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={`${isDarkMode ? "dark:!bg-gray-800" : "bg-white"} dark:!text-white`}
      >
        <Menu
          theme={isDarkMode ? "dark" : "light"}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          className="!min-h-full"
        />
      </Sider>
      <Layout className={isDarkMode ? "dark" : ""}>
        <Header className={"dark:!bg-gray-700 bg-white"}>
          <AppHeader />
        </Header>
        <Content className="dark:!bg-gray-800 dark:text-white p-5">
          <div>
            <Outlet />
          </div>
        </Content>
        <Footer
          className="dark:bg-gray-800 dark:text-white"
          style={{ textAlign: "center" }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
