import { Grid, SpinLoading } from "antd-mobile";
import CustomErrorBlock from "../UI/CustomErrorBlock";
import { useGetViolations } from "../../store/violation";
import ViolationCard from "./ViolationCard";

interface ViolationHistoryProps {
  factory?: FactoriesType;
}

const ViolationHistory = ({ factory }: ViolationHistoryProps) => {
  const { data, isPending, isError, error } = useGetViolations(factory?.companyName || "");
  let content;

  if (isPending) {
    content = <SpinLoading style={{ "--size": "48px" }} />;
  }
  if (isError) {
    content = (
      <CustomErrorBlock
        title="상품 로드 오류"
        description={error.message || "상품을 불러오지 못했습니다. 잠시 후 다시 시도해주세요"}
      />
    );
  }
  if (data?.length === 0) {
    content = <p className="text-gray-400">위반 내역이 없습니다.</p>;
  }

  return (
    <div className=" p-4 pt-0">
      <Grid columns={1} gap={8}>
        <Grid.Item>
          <h1 className=" text-xl font-bold">먹는물영업자 위반현황</h1>
        </Grid.Item>

        <Grid.Item className="flex flex-col gap-2">
          {data && data.length > 0 ? (
            data.map((info) => <ViolationCard violationInfo={info} key={info.id}></ViolationCard>)
          ) : (
            <div className="flex justify-center items-center h-full">{content}</div>
          )}
        </Grid.Item>
      </Grid>
    </div>
  );
};

export default ViolationHistory;
