import { Routes, Route, Link } from "react-router-dom";
import { TopBar } from "@oliasoft-open-source/react-ui-library";
import Logo from "client/views/images/logo.svg";
import { Main } from "client/views/main/main";
import { SitePage } from "./site-page/site";
import { RigsPage } from "./oil-rigs/oil-rigs";
import { ChartPage } from "./chart/chart";

export const App = () => {
  return (
    <>
      <TopBar
        title={{
          logo: <img src={Logo} alt="logo" style={{ height: 28 }} />,
        }}
        content={[
          {
            type: "Link",
            label: "Oil Sites",
            component: Link,
            url: "/",
          },
          {
            type: "Link",
            label: "Oil Rigs",
            component: Link,
            url: "/oil-rigs",
          },
          {
            type: "Link",
            label: "Chart",
            component: Link,
            url: "/chart",
          },
        ]}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/oil-rigs" element={<RigsPage />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="site/:id" element={<SitePage />} />
      </Routes>
    </>
  );
};
