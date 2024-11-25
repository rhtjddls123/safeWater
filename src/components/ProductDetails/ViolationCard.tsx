import { Card, Modal } from "antd-mobile";
import { ExclamationCircleFill } from "antd-mobile-icons";
import { dateFormater } from "../../util/dateFormatting";
import ViolationInfo from "./ViolationInfo";

interface ViolationCardProps {
  violationInfo: RawTestType;
}

const ViolationCard = ({ violationInfo }: ViolationCardProps) => {
  return (
    <Card
      style={{ padding: 0 }}
      className="hover:bg-gray-100 active:bg-gray-100"
      onClick={() => {
        Modal.show({
          content: <ViolationInfo info={violationInfo} />,
          closeOnMaskClick: true
        });
      }}
    >
      <div className="flex flex-row gap-4">
        <ExclamationCircleFill fontSize={40} className=" text-red-300" />
        <div>
          <p className="font-bold">검사기관: {violationInfo.chckInstt}</p>
          <p className="text-gray-400">검사일자: {dateFormater(violationInfo.chckDe)}</p>
          <p className="text-gray-400">호정명: {violationInfo.wellNm}호정</p>
        </div>
      </div>
    </Card>
  );
};

export default ViolationCard;
