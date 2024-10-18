import { Form, Input, Modal, Switch } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import ButtonComponent from "../../../../components/Button/ButtonComponent";
import { Stylist, StylistRequest } from "../../../../model/Stylist";
import { stylistApi } from "../../../../service/stylistApi";

interface ModalAddStylistProps {
  setRender: any;
  id?: number;
  data?: Stylist;
}

const ModalAddStylist = ({ setRender, id, data }: ModalAddStylistProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleOpen = () => {
    setOpen(true);
    if (id && data) {
      form.setFieldsValue(data);
    }
  };
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };
  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      if(id && data) {
        await stylistApi.updateStylist(id, values);
        toast.success("Update success");
      } else {
        await stylistApi.addStylist(values);
        toast.success("Add success");
      }
      setRender(true);
      handleCancel();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ButtonComponent onClick={handleOpen}>
        {id === undefined ? "Add new stylist" : "Edit"}
      </ButtonComponent>
      <Modal
        title={"Add new stylist"}
        onCancel={handleCancel}
        open={open}
        loading={loading}
        onOk={() => {
          form.submit();
        }}
        width={800}
      >
        <Form
          labelCol={{ span: 24 }}
          form={form}
          onFinish={handleFinish}
          className="grid grid-cols-2 gap-5"
        >
          <Form.Item
            rules={[{ required: true, message: "Must not be empty" }]}
            name={"stylistName"}
            label={"Name"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Must not be empty" },
              { pattern: /^[0-9]*$/, message: "Please enter number" },
            ]}
            name={"stylistPhone"}
            label={"Phone"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Must not be empty" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              },
            ]}
            name={"stylistEmail"}
            label={"Email"}
          >
            <Input />
          </Form.Item>
          {id && (
            <>
              <Form.Item
                rules={[{ required: true, message: "Must not be empty" }]}
                name={"stylistPassword"}
                label={"Password"}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Must not be empty" }]}
                name={"stylistStatus"}
                label={"Status"}
                valuePropName="checked"
              >
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Must not be empty" }]}
                name={"role"}
                label={"Role"}
              >
                <Input readOnly />
              </Form.Item>
            </>
          )}
          <Form.Item
            rules={[{ required: true, message: "Must not be empty" }]}
            name={"stylistInfor"}
            label={"Information"}
            className="col-span-2"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddStylist;
