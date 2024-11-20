import { ErrorBlock, ErrorBlockProps } from "antd-mobile";

interface CustomErrorBlockProps extends ErrorBlockProps {
  title: string;
  description: string;
}

const CustomErrorBlock = ({ title, description }: CustomErrorBlockProps) => {
  return (
    <ErrorBlock
      status="empty"
      className="flex flex-col items-center"
      title={<h2>{title}</h2>}
      description={<p>{description}</p>}
    />
  );
};

export default CustomErrorBlock;
