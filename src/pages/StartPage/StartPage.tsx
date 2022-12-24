import { FC } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";

import styles from "./StartPage.module.css";
import Image from "../../components/Image/Image";

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
          imageUrl="2"
          imageAlt="2"
          className={styles["left-side-image"]}
        />
      </ColoredWrapper>
      <ColoredWrapper
        onClick={onRightSideClick}
        bg="green"
        isHovering
        className={styles["right-side"]}
      >
        <Image
          imageUrl="2"
          imageAlt="2"
          className={styles["left-right-image"]}
        />
      </ColoredWrapper>
    </motion.div>
  );
};

export default StartPage;
