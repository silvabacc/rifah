import { Tabs, TabsProps } from "antd";
import CreateDua from "./CreateDua";
import SavedDuas from "./SavedDuas";
import { useRef, useState } from "react";

function App() {
  const [activeKey, setActiveKey] = useState("1");
  const savedTabRef = useRef(null);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create a dua",
      children: (
        <CreateDua
          savedTabRef={savedTabRef}
          onSaveDua={() => setActiveKey("2")}
        />
      ),
    },
    {
      key: "2",
      label: <div ref={savedTabRef}>Saved duas</div>,
      children: <SavedDuas />,
    },
  ];

  return (
    <div className="text-center w-full">
      <h1 className="font-bold text-shadow-lg text-shadow-neutral-600">
        Rifah 📿
      </h1>
      <p className="text-shadow-lg text-shadow-neutral-600">
        Create your own <span className="text-violet-400">beautiful</span> dua
      </p>
      <Tabs
        activeKey={activeKey}
        centered
        destroyInactiveTabPane
        items={items}
        onTabClick={(key) => setActiveKey(key)}
      />
    </div>
  );
}

export default App;
