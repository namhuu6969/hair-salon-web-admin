import { Form, Input } from "antd";
import TableComponent, {
  Column,
} from "../../../../components/Table/TableComponent";
import { formatVND } from "../../../../utils/formatPrice";

const ServiceManagementTable = () => {
  const column: Column[] = [
    {
      dataIndex: "serviceID",
      key: "id",
      title: "#",
    },
    {
      dataIndex: "serviceName",
      key: "id",
      title: "Name",
    },
    {
      dataIndex: "servicePrice",
      key: "id",
      title: "Price",
      render: (data) => formatVND(data)
    },
  ];

  const formItem = (
    <>
      <Form.Item name={"serviceName"} label={"Service name"}>
        <Input />
      </Form.Item>
      <Form.Item name={"servicePrice"} label="Price">
        <Input type="number" />
      </Form.Item>
      <Form.Item hidden name={"serviceID"}>
        <Input type="hidden" />
      </Form.Item>
    </>
  );

  return (
    <div>
      <TableComponent
        title="Services"
        apiUri="services-management"
        columns={column}
        formItem={formItem}
      />
    </div>
  );
};

export default ServiceManagementTable;
