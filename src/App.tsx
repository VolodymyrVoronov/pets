import { FC, ReactElement } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Paths from "./constants";

import StartPage from "./pages/StartPage/StartPage";

const App: FC = (): ReactElement => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path={Paths.Root} element={<Navigate to={Paths.StartPage} />} />
        <Route path={Paths.StartPage} element={<StartPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
