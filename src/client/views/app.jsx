import { Routes, Route, Link } from "react-router-dom";
import { TopBar } from "@oliasoft-open-source/react-ui-library";
import Logo from "client/views/images/logo.svg";
import { Main } from "client/views/main/main";
import { RigsPage } from "./oil-rigs/oil-rigs";
import { ChartPage } from "./chart/chart";
import { SitePage } from "./site-page/site";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../store/middleware/api/api";
import { sitesLoaded } from "../store/entities/sites/sites";
import { oilRigsLoaded } from "../store/entities/oil-rigs/oil-rigs";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sitesLoaded());
    dispatch(oilRigsLoaded());
  }, []);

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
