import { Button, Popconfirm, Table } from "antd";
import ModalAddcombo from "./components/ModalAddcombo";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { comboApi } from "../../../../service/comboApi";
import ModalDetail from "./components/ModalDetail";

const ComboManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);
  const column = [
    {
      title: "#",
      dataIndex: "comboID",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "comboName",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "comboPrice",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "comboID",
      key: "action",
      render: (data: any) => (
        <div className="flex gap-2">
          <ModalDetail setRender={setRender} id={data} />
          <Popconfirm
            title={"Delete this combo"}
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(data)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await comboApi.deleteCombo(id);
      toast.success('Delete success')
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setRender(true)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await comboApi.getCombo();
        setData(response);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    if (render) {
      fetchData();
      setRender(false);
    }
  }, [render]);

  return (
    <div>
      <ModalAddcombo setRender={setRender} />
      <Table
        className="
            mt-5 
            dark:bg-gray-800 dark:text-white dark:border-gray-700
            shadow-lg dark:shadow-gray-600 shadow-gray-200
          "
        columns={column}
        dataSource={data}
        loading={loading}
      />
    </div>
  );
};

export default ComboManagement;
