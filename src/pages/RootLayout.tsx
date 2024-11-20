import { Outlet } from "react-router-dom";
import NavigationBar from "../components/UI/NavigationBar";
import { NavBar } from "antd-mobile";

const RootLayout = () => {
  return (
    <>
      <div className={"h-screen flex flex-col"}>
        <div className={"flex-none border-b border-adm-color-border"}>
          <NavBar backIcon={false}>SAFE WATER</NavBar>
        </div>
        <div className={"flex-1 flex justify-center items-center"}>
          <Outlet />
        </div>
        <div className={"flex-none border-t border-adm-color-border"}>
          <NavigationBar />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
