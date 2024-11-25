import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as cheerio from "cheerio";
import moment from "moment";
import { xml2json } from "xml-js";

export const queryClient = new QueryClient();

const scrapeAllData = async () => {
  const baseUrl = "/waternow/web/potMngData/?ATTR_5=3&pMENUID=135";
  try {
    const response = await axios.get(baseUrl);
    const $ = cheerio.load(response.data);

    const paginationLinks = $(".pagination a");
    const totalPages =
      paginationLinks.length > 0
        ? parseInt($(paginationLinks[paginationLinks.length - 1]).text())
        : 1;

    const allData: CrawlingManufacturerDataType[] = [];

    for (let page = 1; page <= totalPages; page++) {
      const pageResponse = await axios.get(`${baseUrl}&page=${page}`);
      const $$ = cheerio.load(pageResponse.data);
      const rows = $$("tbody tr");

      rows.each((_, element) => {
        const columns = $$(element).find("td");
        const rowData = {
          순번: $$(columns[0]).text().trim(),
          시도: $$(columns[1]).text().trim(),
          업체명: $$(columns[2]).text().trim(),
          대표자: $$(columns[3]).text().trim(),
          공장소재지: $$(columns[4]).text().trim(),
          제품명: $$(columns[5]).text().trim(),
          제조업허가일자: $$(columns[6]).text().trim(),
          일일취수허용량: $$(columns[7]).text().trim(),
          취수공정: $$(columns[8]).text().trim(),
          기준일자: $$(columns[9]).text().trim()
        };
        allData.push(rowData);
      });
    }

    // 데이터 파싱
    const extractedData = [];
    const productsData = [];

    for (const row of allData) {
      if (
        row["업체명"] !== "" &&
        row["공장소재지"] !== "" &&
        row["제품명"] !== "" &&
        row["제품명"] !== "-"
      ) {
        const companyName = row["업체명"]
          .replace(/\n/g, " ")
          .replace(/\s+/g, "")
          .replace(/㈜/g, "(주)");
        const factoryLocation = row["공장소재지"].replace(/\n/g, " ").replace(/\s+/g, " ");
        const productNames = Array.from(
          new Set(
            row["제품명"]
              .replace(/\n/g, " ")
              .replace(/\s+/g, " ")
              .split(",")
              .map((product) => product.trim())
          )
        );

        extractedData.push({
          companyName,
          factoryLocation,
          productNames
        });
        productsData.push(...productNames);
      }
    }

    const uniqueProducts = new Set(productsData);
    const pid = "prid";
    let idNum = 0;
    const pData = Array.from(uniqueProducts).map((product) => {
      idNum += 1;
      return { productId: pid + idNum, name: product };
    });
    const sid = "srcId";
    let sidNum = 1;

    const eData: FactoryDataType[] = extractedData.map((data) => ({
      id: sid + sidNum++,
      ...data,
      productNames: data.productNames
        .map((pName) => pData.find((d) => d.name === pName))
        .filter((product): product is ProductsListType => product !== undefined)
    }));

    const result: ProductsType[] = [];
    const productMap = new Map();

    eData.forEach((factory) => {
      factory.productNames.forEach((product) => {
        if (product) {
          const { productId, name } = product;

          if (!productMap.has(productId)) {
            productMap.set(productId, {
              id: productId,
              name,
              factories: []
            });
          }

          productMap.get(productId).factories.push({
            factoryId: factory.id,
            companyName: factory.companyName,
            factoryLocation: factory.factoryLocation
          });
        }
      });
    });

    productMap.forEach((value) => {
      result.push(value);
    });

    return { products: result, factoryData: eData };
  } catch {
    throw new Error("Failed to scrape data");
  }
};

const fetchRawTestData = async () => {
  const datas = [
    "pcbacStbltAt",
    "msbacStbltAt",
    "tcoliStbltAt",
    "fcstrStbltAt",
    "psaerStbltAt",
    "smnlaStbltAt",
    "shglaStbltAt",
    "sfsraStbltAt",
    "pbStbltAt",
    "flrnStbltAt",
    "asStbltAt",
    "slnumStbltAt",
    "mrcStbltAt",
    "cynStbltAt",
    "crStbltAt",
    "nh4nStbltAt",
    "no3nStbltAt",
    "cdmmStbltAt",
    "boronStbltAt",
    "phnlStbltAt",
    "diaznStbltAt",
    "prtoStbltAt",
    "fntrtoStbltAt",
    "cbrylStbltAt",
    "trch111StbltAt",
    "ttcelStbltAt",
    "tceStbltAt",
    "dcmStbltAt",
    "c6h6StbltAt",
    "tlnStbltAt",
    "chchStbltAt",
    "zylnStbltAt",
    "dch11StbltAt",
    "cbttcStbltAt",
    "db12ch3StbltAt",
    "diox14StbltAt",
    "ppconStbltAt",
    "smellStbltAt",
    "copprStbltAt",
    "chmaStbltAt",
    "anosurStbltAt",
    "phStbltAt",
    "zincStbltAt",
    "chloionStbltAt",
    "turStbltAt",
    "slftionStbltAt",
    "almnmStbltAt"
  ];

  const url = "http://apis.data.go.kr/1480523/Dwqualityservice/getDrinkWaterORGWATR";
  const queryParams = {
    serviceKey: import.meta.env.VITE_API_KEY,
    numOfRows: "20000",
    pageNo: "1"
  };

  let id = 1;
  try {
    const response = await axios.get(url, { params: queryParams });
    const xmlData = response.data;

    const result = JSON.parse(xml2json(xmlData, { compact: true, spaces: 2 }));
    if (result.response.body.items) {
      const items: { [key: string]: { _text: string } }[] = result.response.body.items.item;
      const filteringItems: RawTestType[] = items
        .filter((item) => datas.some((key) => item[key]["_text"] === "N"))
        .map((item) => ({
          id: "rwid" + id++,
          year: item.year._text,
          ht: item.ht._text,
          mgc: item.mgc._text,
          entrpsNm: item.entrpsNm._text.replace(/㈜/g, "(주)"),
          wellNm: item.wellNm._text,
          chckDe: item.chckDe._text,
          chckInstt: item.chckInstt._text,
          wtrsmpleDe: item.wtrsmpleDe._text,
          unsuitable: datas
            .filter((key) => item[key]._text === "N")
            .map((key) => key.replace("StbltAt", "")),
          unsuitableValue: datas
            .filter((key) => item[key]._text === "N")
            .map((key) => key.replace("StbltAt", "Value"))
            .map((key) => ({ [key]: item[key]._text }))
        }));

      return filteringItems;
    }
    return [];
  } catch {
    throw new Error("Failed to scrape data");
  }
};

export async function getProducts() {
  const { products } = await scrapeAllData();
  return products;
}

export async function getProduct({ id }: { id: string }) {
  const { products } = await scrapeAllData();

  const product = products.find((product) => product.id === id);

  return product;
}

export async function getFactoryProducts({ id }: { id: string }) {
  const { factoryData: factories } = await scrapeAllData();

  const factory = factories.find((factory) => factory.id === id);

  return factory || null;
}

export async function getViolations({ name }: { name: string }) {
  const rawTests: RawTestType[] = await fetchRawTestData();

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
