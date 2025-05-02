import { Heading, Tabs, VStack, Highlight } from "@chakra-ui/react";
import CreateDua from "./CreateDua";
import SavedDuas from "./SavedDuas";
import { useState } from "react";
import { colors } from "./colors";

enum KeyTypes {
  CreateDua = "CreateDua",
  SaveDua = "SaveDua",
}

function App() {
  const [activeKey, setActiveKey] = useState<KeyTypes>();

  return (
    <VStack>
      <Heading textShadow={"2xl"} size={"6xl"}>
        Rifah
      </Heading>
      <Heading>
        <Highlight query="beautiful" styles={{ color: colors.primary }}>
          Create your own beautiful duas
        </Highlight>
      </Heading>
      <Tabs.Root
        variant={"subtle"}
        lazyMount
        defaultValue={KeyTypes.CreateDua}
        value={activeKey}
        unmountOnExit
      >
        <Tabs.List>
          <Tabs.Trigger value={KeyTypes.CreateDua}>Creata a dua</Tabs.Trigger>
          <Tabs.Trigger value={KeyTypes.SaveDua}>Saved duas</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={KeyTypes.CreateDua}>
          <CreateDua onSaveDua={() => setActiveKey(KeyTypes.SaveDua)} />
        </Tabs.Content>
        <Tabs.Content value={KeyTypes.SaveDua}>
          <SavedDuas />,
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  );
}

export default App;
