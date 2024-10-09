import { Button, ButtonProps } from "antd";

interface ButtonPrimaryProps extends ButtonProps {
  children?: React.ReactElement | string[] | string;
  className?: string;
  hover?: string;
}

const ButtonComponent: React.FC<ButtonPrimaryProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      className={`
      dark:!bg-gray-800 dark:!text-white dark:!border-white dark:!border-2 shadow-md dark:shadow-gray-300 shadow-gray-200
      ${className}`}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
