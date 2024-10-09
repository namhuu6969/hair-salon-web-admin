import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Switch } from "antd";
import { useContext } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { ThemeContext } from "../../config/context/ThemeContext";

const AppHeader = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const items: MenuProps["items"] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];

  return (
    <div className="flex h-full justify-end items-center gap-5">
      <Dropdown menu={{ items }} trigger={["click"]} arrow placement="bottom">
        <div className="flex cursor-pointer gap-2">
          <FaUserAstronaut size={20} className="!h-fit dark:!text-white" />
          <IoIosArrowDown size={20} className="!h-fit dark:!text-white" />
        </div>
      </Dropdown>
      <Switch
        size="default"
        onChange={toggleTheme}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
        defaultChecked={isDarkMode}
        className="w-12"
      />
    </div>
  );
};

export default AppHeader;
