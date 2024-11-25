import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as cheerio from "cheerio";
import moment from "moment";

export const queryClient = new QueryClient();

export async function getProducts({ signal }: { signal: AbortSignal }) {
  const url = "http://localhost:3001/products";
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the products");
    throw error;
  }

  const products = await response.json();

  return products;
}

export async function getProduct({ signal, id }: { signal: AbortSignal; id: string }) {
  const url = "http://localhost:3001/products";
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the products");
    throw error;
  }

  const products: ProductsType[] = await response.json();

  const product = products.find((product) => product.id === id);

  return product;
}

export async function getFactoryProducts({ signal, id }: { signal: AbortSignal; id: string }) {
  const url = "http://localhost:3001/factoryData";
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the factories");
    throw error;
  }

  const factories: FactoryDataType[] = await response.json();

  const factory = factories.find((factory) => factory.id === id);

  return factory || null;
}

export async function getViolations({ signal, name }: { signal: AbortSignal; name: string }) {
  const url = "http://localhost:3001/rawTest";
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the products");
    throw error;
  }

  const rawTests: RawTestType[] = await response.json();

  const violation = rawTests
    .filter((test) => test.entrpsNm === name)
    .sort((a, b) => {
      const dateA = moment(a.chckDe, "YYYYMMDD");
      const dateB = moment(b.chckDe, "YYYYMMDD");
      return dateB.diff(dateA);
    });
  return violation || null;
}

export async function getCurrentViolations({ signal }: { signal: AbortSignal }) {
  const url = "/api/home/web/index.do?menuId=10227";

  try {
    const { data } = await axios.get(url, { signal });
    const $ = cheerio.load(data);
    const rows = $("tbody tr");

    const result: CrawlingDataType[] = [];

    rows.each((_, element) => {
      const cols = $(element).find("td");
      const data: CrawlingDataType = {
        number: $(cols[0]).text().trim(),
        item: {
          name: $(cols[1]).find("a").text().trim(),
          link: $(cols[1]).find("a").attr("href")
        },
        companyName: $(cols[2]).text().trim(),
        productName: $(cols[3]).text().trim(),
        actionName: $(cols[4]).text().trim(),
        actionDate: $(cols[5]).text().trim(),
        publicationDeadline: $(cols[6]).text().trim(),
        viewCount: $(cols[7]).text().trim()
      };

      result.push(data);
    });

    return result;
  } catch {
    throw new Error("Error fetching the data");
  }
}

export async function getCurrentViolationDetail({
  signal,
  link
}: {
  signal: AbortSignal;
  link: string;
}) {
  try {
    const { data } = await axios.get(`/api${link}`, { signal });
    const $ = cheerio.load(data);

    const itemInfo: CurrentViolationDetailType = {
      item: $(".view_info01_1 dl dd").eq(0).text().trim(), // 품목
      companyName: $(".view_info02_1 dl dd").eq(0).text().trim(), // 업체명
      companyAddress: $(".view_info02_1 dl dd").eq(1).text().trim(), // 업체소재지
      productName: $(".view_info02_2 dl dd").eq(0).text().trim(), // 제품명
      businessType: $(".view_info02_2 dl dd").eq(1).text().trim(), // 업종명
      publicationDeadline: $(".view_info02_1 dl dd").eq(2).text().trim(), // 공표마감일자
      actionName: $(".view_info02_2 dl dd").eq(2).text().trim(), // 처분명
      actionPeriod: $(".view_info02_2 dl dd").eq(3).text().trim(), // 처분기간
      violationDetails: $(".view_con p").eq(1).text().trim(), // 위반내용
      actionDate: $(".view_info01_1 dl dd").eq(1).text().trim() // 처분일자
    };

    return itemInfo;
  } catch {
    throw new Error("Error fetching the data");
  }
}
