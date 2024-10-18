import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import ButtonComponent from "../../../../../components/Button/ButtonComponent";
import { toast } from "react-toastify";
import { comboApi } from "../../../../../service/comboApi";
import { Service } from "../../../../../model/Service";
import { serviceApi } from "../../../../../service/serviceApi";
import { formatVND } from "../../../../../utils/formatPrice";

interface ComboRequest {
  comboName: string;
  comboPrice: number;
  comboDescription: string;
  serviceIds: number[];
}

interface ModalAddComboProps {
  setRender: any;
}

const ModalAddcombo = ({ setRender }: ModalAddComboProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [dataService, setDataService] = useState<Service[]>([]);
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };
  const handleSubmit = () => {
    form.submit();
  };

  const handleFinish = async (values: ComboRequest) => {
    try {
      setLoading(true);
      const dataForm = {
        comboRequest: {
          comboName: values.comboName,
          comboPrice: values.comboPrice,
          comboDescription: values.comboDescription,
        },
        serviceIds: values.serviceIds,
      };
      await comboApi.createCombo(dataForm);
      toast.success("Add combo success");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setRender(true);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await serviceApi.getAllServic();
        const filterData = response.map((element: Service) => ({
          label: <p className="text-sm">{element.serviceName} - {formatVND(element.servicePrice)}</p>,
          value: element.serviceID,
        }));
        setDataService(filterData);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    if (open) {
      fetchData();
    }
  }, [open]);
  return (
    <>
      <ButtonComponent onClick={() => setOpen(true)}>Add Combo</ButtonComponent>
      <Modal
        loading={loading}
        title="Add Combo"
        open={open}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form labelCol={{ span: 24 }} form={form} onFinish={handleFinish}>
          <Form.Item
            name={"comboName"}
            label="Combo Name"
            rules={[{ required: true, message: "Must not be emtpy" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"comboPrice"}
            label="Combo Price"
            rules={[{ required: true, message: "Must not be emtpy" }]}
          >
            <InputNumber type="number" controls={false} className="w-full" />
          </Form.Item>
          <Form.Item
            name={"comboDescription"}
            label="Combo Description"
            rules={[{ required: true, message: "Must not be emtpy" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name={"serviceIds"} label={"Service"}>
            <Select
              mode="multiple"
              placeholder="Select"
              style={{ width: "100%" }}
              options={dataService}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddcombo;
