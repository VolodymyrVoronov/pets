import { FC } from "react";
import { motion } from "framer-motion";

import styles from "./StartPage.module.css";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";

const StartPage: FC = (): JSX.Element => {
  const onLeftButtonClick = (): void => {};
  const onRightButtonClick = (): void => {};

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <ColoredWrapper bg="blue" isHovering className={styles["left-side"]}>
        Left Side
      </ColoredWrapper>
      <ColoredWrapper bg="red" isHovering className={styles["right-side"]}>
        Right Side
      </ColoredWrapper>
    </motion.div>
  );
};

export default StartPage;
