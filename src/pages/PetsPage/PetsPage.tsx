import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button/Button";
import Image from "../../components/Image/Image";

import arrowBackIcon from "../../assets/icon/arrow-back-outline.svg";

import styles from "./PetsPage.module.css";

const PetsPage = (): JSX.Element => {
  const navigator = useNavigate();

  const onBackButtonClick = (): void => {
    navigator(Paths.StartPage, { replace: true });
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <NavBar>
        <Button
          onClick={onBackButtonClick}
          className={styles["back-button"]}
          title="Back to start page."
        >
          <Image imageUrl={arrowBackIcon} imageAlt="Arrow back" />
        </Button>
      </NavBar>
      <ColoredWrapper bg="blue" className={styles.container}>
        test
      </ColoredWrapper>
    </motion.div>
  );
};

PetsPage.displayName = "PetsPage";

export default PetsPage;
