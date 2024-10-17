import { Form, Input, InputNumber, Modal } from "antd";
import { useState } from "react";
import ButtonComponent from "../../../../../components/Button/ButtonComponent";
import { toast } from "react-toastify";
import { comboApi } from "../../../../../service/comboApi";

interface ComboRequest {
  comboName: string;
  comboPrice: number;
  comboDescription: string;
}

interface ModalAddComboProps {
  setRender: any;
}

const ModalAddcombo = ({ setRender }: ModalAddComboProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
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
      await comboApi.createCombo(values);
      toast.success("Add combo success");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setRender(true)
    }
  };
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
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddcombo;
