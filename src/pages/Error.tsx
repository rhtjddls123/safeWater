import { NavBar } from "antd-mobile";
import NavigationBar from "../components/UI/NavigationBar";
import CustomErrorBlock from "../components/UI/CustomErrorBlock";

const ErrorPage = () => {
  return (
    <>
      <div className={"h-screen flex flex-col"}>
        <div className={"flex-none border-b border-adm-color-border"}>
          <NavBar backIcon={false}>SAFE WATER</NavBar>
        </div>
        <div className={"flex-1 flex justify-center items-center"}>
          <CustomErrorBlock status="empty" title="페이지를 찾을 수 없습니다" description="" />
        </div>
        <div className={"flex-none border-t border-adm-color-border"}>
          <NavigationBar />
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
