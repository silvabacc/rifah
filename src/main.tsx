import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider, theme } from "antd";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorPrimary: "#DBB1FF",
      },
    }}
  >
    <App />
  </ConfigProvider>
);
