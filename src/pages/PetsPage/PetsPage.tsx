import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";
import NavBar from "../../components/NavBar/NavBar";

import styles from "./PetsPage.module.css";

const PetsPage = (): JSX.Element => {
  const navigator = useNavigate();

  const onBackButtonClick = () => {
    navigator(Paths.StartPage, { replace: true });
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <NavBar>test</NavBar>
      <ColoredWrapper bg="blue" isHovering className={styles.container}>
        test
      </ColoredWrapper>
    </motion.div>
  );
};

export default PetsPage;
