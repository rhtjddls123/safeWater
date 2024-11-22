import { List } from "antd-mobile";
import { groupByFirstLetter } from "../util/groupByFirstLetter";
import { useNavigate } from "react-router-dom";

interface ProductsListProps {
  data: ProductsType[];
  searchTerm: string;
}

const ProductsList = ({ data, searchTerm }: ProductsListProps) => {
  const navigate = useNavigate();
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const groups = groupByFirstLetter(filteredData);

  return (
    <div>
      {groups.map((group) => {
        const { title, items } = group;
        return (
          <List header={title} key={title}>
            {items.map((item) => (
              <List.Item
                key={item.id}
                onClick={() => {
                  navigate(item.id);
                }}
              >
                {item.name}
              </List.Item>
            ))}
          </List>
        );
      })}
    </div>
  );
};

export default ProductsList;
