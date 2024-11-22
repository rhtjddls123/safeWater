import { Grid, SpinLoading } from "antd-mobile";
import ProductDetail from "../components/ProductDetail";
import { useGetProduct } from "../store/products";
import CustomErrorBlock from "../components/UI/CustomErrorBlock";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
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

  return (
    <>
      {data ? (
        <Grid columns={1} gap={8}>
          <Grid.Item>
            <ProductDetail data={data} />
          </Grid.Item>
        </Grid>
      ) : (
        <div className="flex justify-center items-center h-full">{content}</div>
      )}
    </>
  );
};

export default ProductDetailsPage;
