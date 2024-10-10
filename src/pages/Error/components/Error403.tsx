import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Error403: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => navigate("/admin/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default Error403;
