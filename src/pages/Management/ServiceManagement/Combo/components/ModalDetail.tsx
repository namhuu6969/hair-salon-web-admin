import { Button, Form, Input, InputNumber, Modal, Tag } from "antd";
import { useEffect, useState } from "react";
import ButtonComponent from "../../../../../components/Button/ButtonComponent";
import { comboApi } from "../../../../../service/comboApi";
import { toast } from "react-toastify";
import { Combo, ComboRequest } from "../../../../../model/Combo";

interface ModalDetailProps {
  id: number;
  setRender: any;
}

const ModalDetail = ({ id, setRender }: ModalDetailProps) => {
  const [data, setData] = useState<Combo>();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
      await comboApi.updateCombo(id, values);
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
        setLoading(true);
        const response = await comboApi.getDetailCombo(id);
        setData(response);
        form.setFieldsValue({
          comboName: response.comboName,
          comboPrice: response.comboPrice,
          comboDescription: response.comboDescription,
        });
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (id && open) {
      fetchData();
    }
  }, [form, id, open]);
  return (
    <>
      <ButtonComponent onClick={() => setOpen(true)}>Detail</ButtonComponent>
      <Modal
        width={800}
        loading={loading}
        title="Detail combo"
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" key={"update"} onClick={handleSubmit}>
            Update
          </Button>,
        ]}
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
        </Form>
        <div className="flex flex-row gap-5 flex-wrap">
          {data?.services.map((element: any) => (
            <Tag>{element.serviceName}</Tag>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ModalDetail;
