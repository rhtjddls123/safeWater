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

type params = "productId" | "violationId";

interface CrawlingDataType {
  number: string;
  item: { name: string; link?: string };
  companyName: string;
  productName: string;
  actionName: string;
  actionDate: string;
  publicationDeadline: string;
  viewCount: string;
}

interface CurrentViolationDetailType {
  item: string;
  companyName: string;
  companyAddress: string;
  productName: string;
  businessType: string;
  publicationDeadline: string;
  actionName: string;
  actionPeriod: string;
  violationDetails: string;
  actionDate: string;
}

interface CrawlingManufacturerDataType {
  순번: string;
  시도: string;
  업체명: string;
  대표자: string;
  공장소재지: string;
  제품명: string;
  제조업허가일자: string;
  일일취수허용량: string;
  취수공정: string;
  기준일자: string;
}
