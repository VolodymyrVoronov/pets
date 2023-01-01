import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Paths from "./constants";

import Loader from "./components/Loader/Loader";
import ColoredWrapper from "./components/ColoredWrapper/ColoredWrapper";

const StartPage = lazy(() => import("./pages/StartPage/StartPage"));
const NoPage = lazy(() => import("./pages/NoPage/NoPage"));
const PetsPage = lazy(() => import("./pages/PetsPage/PetsPage"));
const AddPetPage = lazy(() => import("./pages/AddPetPage/AddPetPage"));
const PetPageInfo = lazy(() => import("./pages/PetPageInfo/PetPageInfo"));

const App = (): JSX.Element => {
  const location = useLocation();

  const wrapperStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  };

  return (
    <Suspense
      fallback={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={wrapperStyles}
        >
          <ColoredWrapper bg="blue" style={wrapperStyles}>
            <Loader />
          </ColoredWrapper>
        </motion.div>
      }
    >
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route
            path={Paths.Root}
            element={<Navigate to={Paths.StartPage} />}
          />
          <Route path={Paths.StartPage} element={<StartPage />} />
          <Route path={Paths.PetsPage} element={<PetsPage />} />
          <Route path={Paths.PetPageInfo} element={<PetPageInfo />} />
          <Route path={Paths.AddPetPage} element={<AddPetPage />} />
          <Route path={Paths.NoPage} element={<NoPage />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

App.displayName = "App";

export default App;
