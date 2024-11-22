import { Grid, SpinLoading } from "antd-mobile";
import ProductCard from "./ProductCard";
import { useGetFactoryProducts } from "../../store/products";
import CustomErrorBlock from "../UI/CustomErrorBlock";

interface FactoryProductListProps {
  factory?: FactoriesType;
}

const FactoryProductList = ({ factory }: FactoryProductListProps) => {
  const { data, isPending, isError, error } = useGetFactoryProducts(factory?.factoryId || "");
  let content = <p className="text-gray-400">업체명을 선택해주세요</p>;

  if (isPending) {
    content = <SpinLoading style={{ "--size": "48px" }} />;
  }
  if (isError) {
    content = (
      <CustomErrorBlock
        title="상품 로드 오류"
        description={error.message || "상품을 불러오지 못했습니다. 잠시 후 다시 시도해주세요"}
      />
    );
  }
  return (
    <div className=" p-4 pt-0">
      <Grid columns={1} gap={8}>
        <Grid.Item>
          <h1 className=" text-xl font-bold">동일 수원지 제품 목록</h1>
        </Grid.Item>

        <Grid.Item className="flex flex-col gap-2">
          {data ? (
            data.productNames.map((product) => (
              <ProductCard
                key={product.productId}
                name={product.name}
                companyName={data.companyName}
                location={data.factoryLocation}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-full">{content}</div>
          )}
        </Grid.Item>
      </Grid>
    </div>
  );
};

export default FactoryProductList;
