import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Dashboard from "../Dashboard";
import { TabState } from "@/redux/slice/tab";

const Tabs = [
  { render: () => <Dashboard /> }
];

interface TabProps {
  value: number;
  index: number;
  tab: number;
}

const Tab = ({ value, index, tab }: TabProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && Tabs[tab].render()}
    </div>
  );
};

export const TabsManager = () => {
  const { tabs, tabsIndex } = useSelector((state: RootState) => state.tabs);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {tabs.map((t: TabState) => (
        <Tab
          key={t.Codigo}
          index={t.Codigo}
          value={tabsIndex}
          tab={t.Aba}
        />
      ))}
    </div>
  );
};
