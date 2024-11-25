import { Grid } from "antd-mobile";
import { dateFormater } from "../../util/dateFormatting";
import { mappingUnsuitableData } from "../../util/mappingUnsuitableData";

interface ViolationInfoProps {
  info: RawTestType;
}

const ViolationInfo = ({ info }: ViolationInfoProps) => {
  const unsuitableValue = mappingUnsuitableData(info.unsuitableValue);
  return (
    <>
      <Grid columns={1} gap={8}>
        <div>적발 업체명: {info.entrpsNm}</div>
        <p>채수 호정명: {info.wellNm}호정</p>
        <div>검사일자: {dateFormater(info.chckDe)}</div>
        <div>검사기관: {info.chckInstt}</div>
        <ul>
          적발내역
          {unsuitableValue.map((val) => (
            <li key={info.id + val.name}>
              <p>
                {val.code}({val.name}) 수치: {val.value}
              </p>
            </li>
          ))}
        </ul>
      </Grid>
    </>
  );
};

export default ViolationInfo;
