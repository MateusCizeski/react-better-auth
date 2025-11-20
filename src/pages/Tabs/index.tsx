import { useSelector } from "react-redux";
import Dashboard from "../Dashboard";
import { RootState } from "@/redux/store";

const Tabs = [
  { render: () => <Dashboard /> }
];

const Tab = ({ value, index, tab, ...other }) => {
      return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}    
        >
            { value === index && (
                <>
                {Tabs[tab].render()}
                </>
            ) }
        </div>
    )
}

const TabsManager = () => {
    const { tabs, tabsIndex } = useSelector((state: RootState) => state.tabs);
    let x;

    return (
        <div style={{ width: "100%", height: "100%" }}>
            { tabs && tabs.map((tab) => (
                <TabPanel key={tab.Codigo} index={tab.Codigo} value={tabsIndex} x={tab.Aba}  />
            )) }
        </div>
    )
}