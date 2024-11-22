import { Grid, SpinLoading } from "antd-mobile";
import { useGetProduct } from "../store/products";
import CustomErrorBlock from "../components/UI/CustomErrorBlock";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetails/ProductDetail";
import ViolationHistory from "../components/ProductDetails/ViolationHistory";
import FactoryProductList from "../components/ProductDetails/FactoryProductList";
import { useState } from "react";

const ProductDetailsPage = () => {
  const [selectedFactoryId, setSelectedFactoryId] = useState<FactoriesType>();
  const param = useParams<params>();
  const id = param.productId;
  const { data, isPending, isError, error } = useGetProduct(id || "");

  let content;

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

  const selectFactoryHandler = (factory: FactoriesType) => {
    setSelectedFactoryId(factory);
  };

  return (
    <>
      {data ? (
        <Grid columns={1} gap={8}>
          <Grid.Item>
            <ProductDetail data={data} selectFactory={selectFactoryHandler} />
          </Grid.Item>
          <Grid.Item>
            <FactoryProductList factory={selectedFactoryId} />
          </Grid.Item>
          <Grid.Item>
            <ViolationHistory factory={selectedFactoryId} />
          </Grid.Item>
        </Grid>
      ) : (
        <div className="flex justify-center items-center h-full">{content}</div>
      )}
    </>
  );
};

export default ProductDetailsPage;
