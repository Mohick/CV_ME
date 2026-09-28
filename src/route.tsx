import { Route, Routes } from "react-router-dom";
import Choose_langage from "./pages/choose_langage/page";
import CV_Page from "./pages/main_cv/page";

const RouteApp = () => {
  return (
    <Routes>
      <Route index element={<Choose_langage />} />
      <Route path="/main" element={<CV_Page />} />
    </Routes>
  );
};

export default RouteApp;
