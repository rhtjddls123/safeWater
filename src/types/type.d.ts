interface FactoryDataType {
  id: string;
  companyName: string;
  factoryLocation: string;
  productNames: { productId: string; name: string }[];
}

interface RawTestType {
  id: string;
  year: string;
  ht: string;
  mgc: string;
  entrpsNm: string;
  wellNm: string;
  chckDe: string;
  chckInstt: string;
  wtrsmpleDe: string;
  unsuitable: string[];
  unsuitableValue: {
    [key: string]: string;
  }[];
}

interface SamplingTest {
  id: string;
  year: string;
  qu: string;
  mgc: string;
  entrpsNm: string;
  prductNm: string;
  chckDe: string;
  chckInstt: string;
  tkawyDe: string;
  unsuitable: string[];
  unsuitableValue: {
    [key: string]: string;
  }[];
}

interface ProductsType {
  id: string;
  name: string;
  factories: FactoriesType[];
}

interface FactoriesType {
  factoryId: string;
  companyName: string;
  factoryLocation: string;
}

type params = "productId" | "factoryId";
