import { Form, Input, Select } from "antd";
import TableComponent, {
  Column,
} from "../../../../components/Table/TableComponent";
import { useState } from "react";

const dataCombo = [
  {
    value: 1,
    label: (
      <div className="flex gap-5 items-center py-2">
        <img
          className="w-14 h-14"
          src="https://static-cdn-vip.123host.vn/tailieu/wp-content/uploads/2023/02/MySQL-Management.jpg"
        />
        <p>combo 1</p>
      </div>
    ),
  },
  {
    value: 2,
    label: (
      <div className="flex gap-5 items-center py-2">
        <img
          className="w-14 h-14"
          src="https://static-cdn-vip.123host.vn/tailieu/wp-content/uploads/2023/02/MySQL-Management.jpg"
        />
        <p>combo 2</p>
      </div>
    ),
  },
];

const ServiceManagementTable = () => {
  const [dataCombo, setDataCombo] = useState([]);
  const column: Column[] = [
    {
      dataIndex: "id",
      key: "id",
      title: "#",
    },
  ];

  const formItem = (
    <>
      <Form.Item name={"serviceName"} label={"Service name"}>
        <Input />
      </Form.Item>
      <Form.Item name={"comboID"} label={"Combo"}>
        <Select
          className="!w-full !h-fit"
          showSearch
          optionFilterProp="label"
          options={dataCombo}
        />
      </Form.Item>
      <Form.Item name={"servicePrice"} label="Price">
        <Input type="number" />
      </Form.Item>
      <Form.Item hidden name={"id"}>
        <Input type="hidden" />
      </Form.Item>
    </>
  );

  return (
    <div>
      <TableComponent
        title="Services"
        apiUri="services"
        columns={column}
        formItem={formItem}
      />
    </div>
  );
};

export default ServiceManagementTable;
