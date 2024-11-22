import moment from "moment";

export const dateFormater = (dateString: string) => {
  const date = moment(dateString, "YYYYMMDD");
  const formattedDate = date.format("YYYY.MM.DD");
  return formattedDate;
};
