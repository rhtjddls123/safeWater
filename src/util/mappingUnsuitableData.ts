const mapping: Record<string, string> = {
  pcbacValue: "일반세균(저온)",
  msbacValue: "일반세균(중온)",
  tcoliValue: "총대장균군",
  fcstrValue: "분원성연쇄상구균",
  psaerValue: "녹농균",
  smnlaValue: "살모넬라",
  shglaValue: "쉬겔라",
  sfsraValue: "아황산환원혐기성 포자형성균",
  pbValue: "납",
  flrnValue: "불소",
  asValue: "비소",
  slnumValue: "셀레늄",
  mrcValue: "수은",
  cynValue: "시안",
  crValue: "크롬",
  nh4nValue: "암모니아성 질소",
  no3nValue: "질산성",
  cdmmValue: "카드뮴",
  boronValue: "보론",
  phnlValue: "페놀",
  diaznValue: "다이아지논",
  prtoValue: "파라티온",
  fntrtoValue: "페니트로티온",
  cbrylValue: "카바릴",
  trch111Value: "1.1.1-트리클로로에탄",
  ttcelValue: "테트라클로로에틸렌",
  tceValue: "트리클로로에틸렌",
  dcmValue: "디클로로메탄",
  c6h6Value: "벤젠",
  tlnValue: "톨루엔",
  chchValue: "에틸벤젠",
  zylnValue: "크실렌",
  dch11Value: "1.1디클로로에틸렌",
  cbttcValue: "사염화탄소",
  db12ch3Value: "1,2-디브로모-3-클로로프로판",
  diox14Value: "1,4-다이옥산",
  ppconValue: "과망간산칼륨소비량",
  smellValue: "냄새",
  copprValue: "동",
  chmaValue: "색도",
  anosurValue: "세제",
  phValue: "수소이온농도",
  zincValue: "아연",
  chloionValue: "염소이온",
  turValue: "탁도",
  slftionValue: "황산이온",
  almnmValue: "알루미늄"
};

export const mappingUnsuitableData = (data: Array<Record<string, string>>) => {
  return data.map((entry) => {
    const key = Object.keys(entry)[0];
    const code = key.slice(0, -5);
    const value = entry[key];
    const name = mapping[key];
    return { code, name, value };
  });
};
