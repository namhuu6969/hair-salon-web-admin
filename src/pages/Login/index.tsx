import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userApi, UserLogin } from "../../service/userApi";
import { useDispatch } from "react-redux";
import { login } from "../../core/store/slice/userSlice";
import { useState } from "react";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (values: UserLogin) => {
    try {
      setLoading(true);
      const response = await userApi.loginAccount(values);
      if (response.data.role !== "user") {
        dispatch(login(response.data));
        navigate("/admin");
        toast.success("Login success");
      } else {
        toast.error("Your account are not allow to access");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex">
      <div className="h-screen bg-[#942d2d] w-full flex justify-center items-center">
        <img className="object-cover" src="src/assets/logo.png" />
      </div>
      <div className="w-3/5 flex flex-col items-center h-screen bg-gray-200 py-24 gap-24 px-5">
        <div className="flex flex-col gap-3 items-center">
          <p className="text-5xl font-bold">Hair Salon</p>
          <p className="text-2xl font-medium text-gray-500">
            Welcome to Admin Management
          </p>
        </div>
        <div className="flex flex-col gap-5 w-3/4 py-10 px-20 bg-white h-fit shadow-lg rounded-lg">
          <p className="text-xl font-black">Sign in your account</p>
          <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please fill this field",
                },
              ]}
              name={"emailOrPhone"}
              label={"Username:"}
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please fill this field",
                },
              ]}
              name={"password"}
              label={"Password:"}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                htmlType="submit"
                className="!w-full bg-[#942d2d] !text-white hover:!bg-[#942d2d] hover:!opacity-80 hover:!text-white"
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
