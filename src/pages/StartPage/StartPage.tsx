import { FC } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";

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
        Left Side
      </ColoredWrapper>
      <ColoredWrapper
        onClick={onRightSideClick}
        bg="red"
        isHovering
        className={styles["right-side"]}
      >
        Right Side
      </ColoredWrapper>
    </motion.div>
  );
};

export default StartPage;
