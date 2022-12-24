import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Paths from "./constants";

import StartPage from "./pages/StartPage/StartPage";
import NoPage from "./pages/NoPage/NoPage";
import PetsPage from "./pages/PetsPage/PetsPage";

const App = (): JSX.Element => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path={Paths.Root} element={<Navigate to={Paths.StartPage} />} />
        <Route path={Paths.StartPage} element={<StartPage />} />
        <Route path={Paths.PetsPage} element={<PetsPage />} />
        <Route path={Paths.PetPageInfo} element={<div>PetPageInfo</div>} />
        <Route path={Paths.AddPetPage} element={<div>AddPetPage</div>} />
        <Route path={Paths.NoPage} element={<NoPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
