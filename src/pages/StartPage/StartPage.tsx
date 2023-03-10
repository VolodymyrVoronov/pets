import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";
import Img from "../../components/Img/Img";
import HTag from "../../components/HTag/HTag";
import Button from "../../components/Button/Button";

import petsIcon01 from "../../assets/images/pet-image-01.png";
import petsIcon02 from "../../assets/images/pet-image-02.png";

import styles from "./StartPage.module.css";

const StartPage = (): JSX.Element => {
  const navigator = useNavigate();

  const onLeftSideClick = (): void => {
    navigator(Paths.PetsPage);
  };

  const onRightSideClick = (): void => {
    navigator(Paths.AddPetPage);
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Button onClick={onLeftSideClick} className={styles["left-side"]}>
        <ColoredWrapper
          bg="blue"
          isHovering
          className={styles["left-side-wrapper"]}
        >
          <Img
            imageUrl={petsIcon01}
            imageAlt="Pets in house icon/image."
            className={styles["left-side-image"]}
          />
          <HTag tag="h2" className={styles["left-side-text"]}>
            My pets
          </HTag>
        </ColoredWrapper>
      </Button>

      <Button onClick={onRightSideClick} className={styles["right-side"]}>
        <ColoredWrapper
          bg="green"
          isHovering
          className={styles["right-side-wrapper"]}
        >
          <Img
            imageUrl={petsIcon02}
            imageAlt="Pets' list icon/image."
            className={styles["right-side-image"]}
          />
          <HTag tag="h2" className={styles["right-side-text"]}>
            Add pet
          </HTag>
        </ColoredWrapper>
      </Button>
    </motion.div>
  );
};

StartPage.displayName = "StartPage";

export default StartPage;
