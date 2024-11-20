import { TabBar } from "antd-mobile";
import { AppOutline, ExclamationCircleFill, ExclamationCircleOutline } from "antd-mobile-icons";
const NavigationBar = () => {
  const tabs = [
    {
      key: "home",
      title: "Home",
      icon: <AppOutline />
    },
    {
      key: "violations",
      title: "Violations",
      icon: (active: boolean) => (active ? <ExclamationCircleFill /> : <ExclamationCircleOutline />)
    }
  ];
  return (
    <div>
      <TabBar>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};

export default NavigationBar;
