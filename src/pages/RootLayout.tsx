import { Outlet } from "react-router-dom";
import NavigationBar from "../components/UI/NavigationBar";
import { NavBar } from "antd-mobile";

const RootLayout = () => {
  return (
    <>
      <div className={"h-screen flex flex-col"}>
        <div className={"flex-none border-b "}>
          <NavBar backIcon={false}>SAFE WATER</NavBar>
        </div>
        <div className={"flex flex-1 justify-center items-center overflow-auto"}>
          <Outlet />
        </div>
        <div className={"flex-none border-t"}>
          <NavigationBar />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
