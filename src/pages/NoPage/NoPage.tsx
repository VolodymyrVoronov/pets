import { motion } from "framer-motion";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";
import HTag from "../../components/HTag/HTag";
import Image from "../../components/Image/Image";

import petsIcon03 from "../../assets/images/pets-icon-03.png";

import styles from "./NoPage.module.css";

const NoPage = (): JSX.Element => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
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

export default NoPage;
