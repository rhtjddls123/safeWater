import { AutoCenter, Grid, SpinLoading } from "antd-mobile";
import { useGetCurrentViolations } from "../store/violation";
import CurrentViolationList from "../components/CurrentViolationList";
import CustomErrorBlock from "../components/UI/CustomErrorBlock";

const ViolationsPage = () => {
  const { data, isPending, isError, error } = useGetCurrentViolations();

  let content;

  if (isPending) {
    content = <SpinLoading style={{ "--size": "48px" }} />;
  }
  if (isError) {
    content = (
      <CustomErrorBlock
        title="최근 위반내역 로드 오류"
        description={error.message || "위반내역을 불러오지 못했습니다. 잠시 후 다시 시도해주세요"}
      />
    );
  }

  return (
    <Grid columns={1} gap={8} style={{ marginTop: 8 }}>
      <Grid.Item>
        <AutoCenter>
          <h1 className=" text-xl font-bold">최근 행정처분 내역</h1>
        </AutoCenter>
      </Grid.Item>
      <Grid.Item>
        <div className="flex-1 overflow-auto">
          {data ? (
            <CurrentViolationList data={data || []} />
          ) : (
            <div className="flex justify-center items-center h-full">{content}</div>
          )}
        </div>
      </Grid.Item>
    </Grid>
  );
};

export default ViolationsPage;
