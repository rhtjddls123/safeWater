import { AutoCenter, Dropdown, Grid, Image, Radio, Space } from "antd-mobile";
import { useState } from "react";
import { useGetProduct } from "../store/products";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const param = useParams<params>();
  const id = param.productId;

  const [selectedFactory, setSelectedFactory] = useState<string>();
  const { data } = useGetProduct(id || "");
  const factories = data?.factories || [];

  return (
    <Grid columns={1} gap={8}>
      <Grid.Item>
        <AutoCenter>
          <h1 className=" text-xl font-bold">{data?.name}</h1>
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
                  onChange={(val) => setSelectedFactory(val as string)}
                >
                  <Space direction="vertical" block>
                    {factories.map((factory) => (
                      <Radio value={factory.companyName} key={factory.factoryId}>
                        {factory.companyName}
                      </Radio>
                    ))}
                  </Space>
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
