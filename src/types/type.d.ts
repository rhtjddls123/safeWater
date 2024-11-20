interface FactoryDataType {
  id: string;
  companyName: string;
  factoryLocation: string;
  productNames: ProductType[];
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

interface ProductType {
  id: string;
  name: string;
}
