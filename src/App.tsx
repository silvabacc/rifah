import { Button, Input, Space, Tabs, TabsProps } from "antd";
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
        Create your own <span className="text-purple-300">beautiful</span> dua
      </p>
      <Space className="pt-2">
        <Input placeholder="Name your dua 🙏" />
        <Button>Save Dua</Button>
      </Space>
      <Tabs items={items} className="mt-2" />
    </div>
  );
}

export default App;
