import { Grid } from "antd-mobile";
import ProductDetail from "../components/ProductDetail";

const ProductDetailsPage = () => {
  return (
    <Grid columns={1} gap={8}>
      <Grid.Item>
        <ProductDetail />
      </Grid.Item>
    </Grid>
  );
};

export default ProductDetailsPage;
