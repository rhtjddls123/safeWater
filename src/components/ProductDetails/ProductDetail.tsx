import { AutoCenter, Dropdown, Grid, Image, List, Radio } from "antd-mobile";
import { useState } from "react";

interface ProductDetailProps {
  data: ProductsType;
  selectFactory: (factory: FactoriesType) => void;
}

const ProductDetail = ({ data, selectFactory }: ProductDetailProps) => {
  const [selectedFactory, setSelectedFactory] = useState<string>();

  return (
    <Grid columns={1} gap={8}>
      <Grid.Item>
        <AutoCenter>
          <h1 className=" text-xl font-bold">{data.name}</h1>
        </AutoCenter>
      </Grid.Item>
      <Grid.Item>
        <AutoCenter>
          <Image src={"https://picsum.photos/200/200"} width={100} height={100} fit="cover" />
        </AutoCenter>
      </Grid.Item>
      <Grid.Item>
        <AutoCenter>
          <Dropdown>
            <Dropdown.Item key={"factories"} title={selectedFactory || "업체명"}>
              <div style={{ padding: 12 }}>
                <Radio.Group
                  value={selectedFactory}
                  onChange={(val) => {
                    setSelectedFactory(val as string);
                  }}
                >
                  <List header="업체명" className=" max-h-[40vh] overflow-auto">
                    {data.factories.map((factory) => (
                      <List.Item key={factory.factoryId}>
                        <Radio value={factory.companyName} onClick={() => selectFactory(factory)}>
                          <p>{factory.companyName}</p>
                          <p className=" text-xs">{factory.factoryLocation}</p>
                        </Radio>
                      </List.Item>
                    ))}
                  </List>
                </Radio.Group>
              </div>
            </Dropdown.Item>
          </Dropdown>
        </AutoCenter>
      </Grid.Item>
    </Grid>
  );
};

export default ProductDetail;
