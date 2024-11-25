import { SpinLoading } from "antd-mobile";
import { useLocation } from "react-router-dom";
import { useGetCurrentViolation } from "../store/violation";
import CustomErrorBlock from "../components/UI/CustomErrorBlock";

const ViolationDetailsPage = () => {
  const location = useLocation();
  const link = location.state;
  const { data, isPending, isError, error } = useGetCurrentViolation(link);
  let content;

  if (isPending) {
    content = <SpinLoading style={{ "--size": "48px" }} />;
  }
  if (isError) {
    content = (
      <CustomErrorBlock
        title="위반내역 상세페이지 로드 오류"
        description={error.message || "위반내역을 불러오지 못했습니다. 잠시 후 다시 시도해주세요"}
      />
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-center mb-4">행정처분 상세보기</h1>
      {data ? (
        <>
          <table className="min-w-full border-collapse border border-gray-200 mb-4">
            <tbody>
              <tr className="border-b">
                <th className="px-4 py-2 text-left bg-gray-100">품목</th>
                <td className="px-4 py-2">{data.item}</td>
              </tr>
              <tr className="border-b">
                <th className="px-4 py-2 text-left bg-gray-100">업체명</th>
                <td className="px-4 py-2">{data.companyName}</td>
              </tr>
              <tr className="border-b">
                <th className="px-4 py-2 text-left bg-gray-100">업체주소</th>
                <td className="px-4 py-2">{data.companyAddress}</td>
              </tr>
              <tr className="border-b">
                <th className="px-4 py-2 text-left bg-gray-100">제품명</th>
                <td className="px-4 py-2">{data.productName}</td>
              </tr>
              <tr className="border-b">
                <th className="px-4 py-2 text-left bg-gray-100">공표마감일자</th>
                <td className="px-4 py-2">{data.publicationDeadline}</td>
              </tr>
              <tr className="border-b">
                <th className="px-4 py-2 text-left bg-gray-100">처분명</th>
                <td className="px-4 py-2">{data.actionName}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="text-xl font-semibold mt-4">위반내용</h2>
          <p className="text-base mb-2">{data.violationDetails}</p>
          <h2 className="text-xl font-semibold mt-4">처분일자</h2>
          <p className="text-base">{data.actionDate}</p>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">{content}</div>
      )}
    </div>
  );
};

export default ViolationDetailsPage;
