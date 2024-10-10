import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useContext, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaChartPie, FaMoneyBillAlt, FaUser, FaUsers } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { HiCollection } from "react-icons/hi";
import { IoIosCut } from "react-icons/io";
import {
  MdDiscount,
  MdManageAccounts,
  MdOutlineMiscellaneousServices
} from "react-icons/md";
import { RiAdminFill, RiCalendarScheduleFill } from "react-icons/ri";
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
  getItem("Dashboard", "", <FaChartPie size={20} />),
  getItem(
    "Category Management",
    "category-management",
    <BiSolidCategory size={20} />
  ),
  getItem("User Management", "user-management", <FaUsers size={20} />, [
    getItem("All User", "user-management", <FaUserGroup size={20} />),
    getItem("Admin", "admin", <RiAdminFill size={20} />),
    getItem("Manager", "manager", <MdManageAccounts size={20} />),
    getItem("Staff", "staff", <BsPersonWorkspace size={20} />),
    getItem("User", "user", <FaUser size={20} />),
  ]),
  getItem(
    "Service Management",
    "service-management",
    <MdOutlineMiscellaneousServices size={20} />,
    [getItem("Combos", "combos", <HiCollection size={20} />)]
  ),
  getItem("Stylist Management", "stylist-management", <IoIosCut size={20} />),
  getItem(
    "Booking Management",
    "booking-management",
    <RiCalendarScheduleFill size={20} />
  ),
  getItem("Voucher Management", "voucher-management", <MdDiscount size={20} />),
  getItem(
    "Payment Management",
    "payment-management",
    <FaMoneyBillAlt size={20} />
  ),
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
        className={`${
          isDarkMode ? "dark:!bg-gray-800" : "bg-white"
        } dark:!text-white`}
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
