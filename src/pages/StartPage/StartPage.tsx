import { FC } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";
import Image from "../../components/Image/Image";
import HTag from "../../components/HTag/HTag";

import petsIcon01 from "../../assets/images/pets-icon-01.png";
import petsIcon02 from "../../assets/images/pets-icon-02.png";

import styles from "./StartPage.module.css";

const StartPage: FC = (): JSX.Element => {
  const navigator = useNavigate();

  const onLeftSideClick = (): void => {
    navigator(Paths.PetsPage, { replace: true });
  };
  const onRightSideClick = (): void => {
    navigator(Paths.AddPetPage, { replace: true });
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <ColoredWrapper
        onClick={onLeftSideClick}
        bg="blue"
        isHovering
        className={styles["left-side"]}
      >
        <Image
          imageUrl={petsIcon01}
          imageAlt="Pets in house."
          className={styles["left-side-image"]}
        />
        <HTag tag="h2">My pets</HTag>
      </ColoredWrapper>
      <ColoredWrapper
        onClick={onRightSideClick}
        bg="green"
        isHovering
        className={styles["right-side"]}
      >
        <Image
          imageUrl={petsIcon02}
          imageAlt="Pets' list."
          className={styles["left-right-image"]}
        />
        <HTag tag="h2">Add pet</HTag>
      </ColoredWrapper>
    </motion.div>
  );
};

export default StartPage;
