import { ConfigProvider, theme } from "antd";
import Table, { ColumnProps, TableProps } from "antd/es/table";
import { useContext } from "react";
import { ThemeContext } from "../../config/context/ThemeContext";

export interface Column extends ColumnProps {
  title: string;
  dataIndex: string;
  key: string;
}

interface DashboardProps extends TableProps {
  columns: Column[];
}

const TableUI = ({ columns, ...rest }: DashboardProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Table
        columns={columns}
        {...rest}
        className="
            mt-5 
            dark:bg-gray-800 dark:text-white dark:border-gray-700
            shadow-lg dark:shadow-gray-600 shadow-gray-200
          "
        bordered={true}
      />
    </ConfigProvider>
  );
};

export default TableUI;
