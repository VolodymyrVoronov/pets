import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button/Button";
import Image from "../../components/Image/Image";

import arrowBackIcon from "../../assets/icon/arrow-back-outline.svg";
import saveIcon from "../../assets/icon/save-outline.svg";

import styles from "./AddPetPage.module.css";

const AddPetPage = (): JSX.Element => {
  const navigator = useNavigate();

  const onBackButtonClick = (): void => {
    navigator(Paths.StartPage, { replace: true });
  };

  const onSaveButtonClick = (): void => {};

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
          <Image imageUrl={arrowBackIcon} imageAlt="Arrow back icon" />
        </Button>
        <Button
          onClick={onSaveButtonClick}
          className={styles["save-button"]}
          title="Save pet's data."
        >
          <Image imageUrl={saveIcon} imageAlt="Save icon" />
        </Button>
      </NavBar>
      <div className={styles.container}>
        <ColoredWrapper bg="yellow" className={styles["colored-wrapper"]}>
          Foto
        </ColoredWrapper>

        <ColoredWrapper bg="green" className={styles["colored-wrapper"]}>
          Name
        </ColoredWrapper>

        <ColoredWrapper bg="blue" className={styles["colored-wrapper"]}>
          Info
        </ColoredWrapper>
      </div>
    </motion.div>
  );
};

export default AddPetPage;
