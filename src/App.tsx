import { Tabs, TabsProps } from "antd";
import CreateDua from "./CreateDua";
import MyDuas from "./MyDuas";

function App() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create a dua",
      children: <CreateDua />,
    },
    {
      key: "2",
      label: "My duas",
      children: <MyDuas />,
    },
  ];

  return (
    <div className="text-center">
      <h1 className="font-bold text-shadow-lg text-shadow-neutral-600">
        Rifah
      </h1>
      <p className="text-shadow-lg text-shadow-neutral-600">
        Create your own <span className="text-violet-400">beautiful</span> dua
      </p>
      <Tabs centered items={items} />
    </div>
  );
}

export default App;
