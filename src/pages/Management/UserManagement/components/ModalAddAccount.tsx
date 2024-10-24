import { Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import ButtonComponent from "../../../../components/Button/ButtonComponent";
import { toast } from "react-toastify";
import { accountApi } from "../../../../service/accountApi";

interface ModalAddAccountProps {
  setRender: any;
}

const ModalAddAccount = ({ setRender }: ModalAddAccountProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };
  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      const { role, ...data } = values;
      await accountApi.createAccount(role, data);
      toast.success("Add success");
      handleCancel();
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
      setRender(true)
    }
  };
  return (
    <>
      <ButtonComponent onClick={() => setOpen(true)}>
        Add new account
      </ButtonComponent>
      <Modal
        open={open}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        loading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleFinish}>
          <Form.Item
            rules={[{ required: true, message: "Must not be empty" }]}
            name={"accountName"}
            label={"Account name: "}
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
            name={"accountEmail"}
            label={"Account email: "}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Must not be empty" },
              { pattern: /^[0-9]*$/, message: "Please enter number" },
            ]}
            name={"accountPhone"}
            label={"Account phone: "}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Must not be empty" }]}
            name={"role"}
            label={"Role: "}
          >
            <Select
              className="!w-full"
              options={[
                { value: "staff", label: "Staff" },
                { value: "manager", label: "Manager" },
                { value: "user", label: "User" },
              ]}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Must not be empty" }]}
            name={"password"}
            label={"Account password: "}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name={"confirmPassword"}
            label={"Confirm password: "}
            rules={[
              { required: true, message: "Must not be empty" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddAccount;
