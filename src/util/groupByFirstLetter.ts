import { getChoseong } from "es-hangul";

export const groupByFirstLetter = (wordList: string[]) => {
  const result: { title: string; items: string[] }[] = [];

  const isKorean = (char: string) => /[가-힣]/.test(char); // 한글 여부 판단
  const isEnglish = (char: string) => /[a-zA-Z]/.test(char); // 영어 여부 판단

  wordList.forEach((word) => {
    const firstChar = word[0];
    let title = "";

    if (isKorean(firstChar)) {
      title = getChoseong(firstChar);
    } else if (isEnglish(firstChar)) {
      title = firstChar.toUpperCase();
    } else {
      title = "Other";
    }

    const existingGroup = result.find((group) => group.title === title);
    if (existingGroup) {
      existingGroup.items.push(word);
    } else {
      result.push({ title, items: [word] });
    }
  });

  const sortedResult = result
    .sort((a, b) => {
      if (a.title === "Other") return 1;
      if (b.title === "Other") return -1;

      return a.title.localeCompare(b.title);
    })
    .map((group) => ({
      ...group,
      items: group.items.sort((a, b) => a.localeCompare(b)) // 각 items 배열 정렬
    }));

  return sortedResult;
};