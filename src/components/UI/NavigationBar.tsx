import { TabBar } from "antd-mobile";
import { AppOutline, ExclamationCircleFill, ExclamationCircleOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
const NavigationBar = () => {
  const navigate = useNavigate();
  const tabs = [
    {
      key: "home",
      title: "Home",
      path: "/",
      icon: <AppOutline />
    },
    {
      key: "violations",
      title: "Violations",
      path: "/violations",
      icon: (active: boolean) => (active ? <ExclamationCircleFill /> : <ExclamationCircleOutline />)
    }
  ];
  return (
    <div>
      <TabBar>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} onClick={() => navigate(item.path)} />
        ))}
      </TabBar>
    </div>
  );
};

export default NavigationBar;
