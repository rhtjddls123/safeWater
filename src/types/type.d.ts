interface FactoryDataType {
  id: string;
  companyName: string;
  factoryLocation: string;
  productNames: ProductsListType[];
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

interface ProductsType {
  id: string;
  name: string;
  factories: FactoriesType[];
}

interface ProductsListType {
  productId: string;
  name: string;
}

interface FactoriesType {
  factoryId: string;
  companyName: string;
  factoryLocation: string;
}

type params = "productId" | "factoryId";

interface CrawlingDataType {
  number: string;
  item: string;
  companyName: string;
  productName: string;
  actionName: string;
  actionDate: string;
  publicationDeadline: string;
  viewCount: string;
}
