import { SearchBar, SpinLoading } from "antd-mobile";
import ProductsList from "../components/ProductsList";
import { useGetProducts } from "../store/products";
import CustomErrorBlock from "../components/UI/CustomErrorBlock";

const HomePage = () => {
  const { data, isPending, isError, error } = useGetProducts();
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
    <div className="h-full flex flex-col">
      <div className="flex-none p-4">
        <SearchBar placeholder="Search for a product" />
      </div>

      <div className="flex-1 overflow-auto">
        {data ? (
          <ProductsList data={data || []} />
        ) : (
          <div className="flex justify-center items-center h-full">{content}</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
