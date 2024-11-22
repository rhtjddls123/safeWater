import { Card, Image } from "antd-mobile";

interface ProductCardProps {
  name: string;
  companyName: string;
  location: string;
}

const ProductCard = ({ name, companyName, location }: ProductCardProps) => {
  return (
    <Card style={{ padding: 0 }}>
      <div className="flex flex-row gap-4 items-center">
        <Image
          src={"https://picsum.photos/200/200"}
          width={40}
          height={40}
          fit="cover"
          style={{ borderRadius: 32 }}
        />
        <div>
          <p className="font-bold text-base">{name}</p>
          <p className="text-gray-400 text-xs">{companyName} </p>
          <p className="text-gray-400 text-xs">{location}: </p>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
