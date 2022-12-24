import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";
import HTag from "../../components/HTag/HTag";
import Image from "../../components/Image/Image";
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button/Button";

import petsIcon03 from "../../assets/images/pets-icon-03.png";
import homeIcon from "../../assets/icon/home-outline.svg";

import styles from "./NoPage.module.css";

const NoPage = (): JSX.Element => {
  const navigator = useNavigate();

  const onHomeButtonClick = () => {
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
      <NavBar>
        <Button onClick={onHomeButtonClick} className={styles["back-button"]}>
          <Image imageUrl={homeIcon} imageAlt="Arrow back" />
        </Button>
      </NavBar>
      <ColoredWrapper bg="red" className={styles.container}>
        <Image
          imageUrl={petsIcon03}
          imageAlt="Icon: magnifying glass with paw inside."
          className={styles.image}
        />

        <HTag tag="h3" className={styles.text}>
          Page not found
        </HTag>
      </ColoredWrapper>
    </motion.div>
  );
};

NoPage.displayName = "NoPage";

export default NoPage;
