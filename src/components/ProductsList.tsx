import { List } from "antd-mobile";
import { groupByFirstLetter } from "../util/groupByFirstLetter";

interface ProductsListProps {
  data: ProductType[];
}

const ProductsList = ({ data }: ProductsListProps) => {
  const groups = groupByFirstLetter(data);

  return (
    <div>
      {groups.map((group) => {
        const { title, items } = group;
        return (
          <List header={title}>
            {items.map((item, index) => (
              <List.Item key={index}>{item}</List.Item>
            ))}
          </List>
        );
      })}
    </div>
  );
};

export default ProductsList;
