import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { getPets } from "../../services/api";

import Paths from "../../constants";

import ColoredWrapper from "../../components/ColoredWrapper/ColoredWrapper";
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button/Button";
import Img from "../../components/Img/Img";
import Loader from "../../components/Loader/Loader";
import PTag from "../../components/PTag/PTag";

import arrowBackIcon from "../../assets/icons/arrow-back-outline.svg";
import errorImage from "../../assets/images/error-image-01.png";

import styles from "./PetsPage.module.css";

const PetsPage = (): JSX.Element => {
  const navigator = useNavigate();
  const { data, isLoading, isError, error } = useQuery("getPets", getPets);

  const onBackButtonClick = (): void => {
    navigator(Paths.StartPage, { replace: true });
  };

  console.log(data);

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
          <Img imageUrl={arrowBackIcon} imageAlt="Arrow back" />
        </Button>
      </NavBar>

      {isLoading && (
        <ColoredWrapper bg="blue" className={styles.loader}>
          <Loader />
        </ColoredWrapper>
      )}

      {data && (
        <ColoredWrapper bg="blue" className={styles.container}>
          test
        </ColoredWrapper>
      )}

      {isError && error instanceof Error && (
        <ColoredWrapper bg="red" className={styles.error}>
          <Img
            className={styles["error-image"]}
            imageUrl={errorImage}
            imageAlt="Error."
          />
          <PTag className={styles["error-text"]} size="l">
            Something has gone wrong.
          </PTag>
          <PTag className={styles["error-text"]} size="l">
            {error.message}.
          </PTag>
        </ColoredWrapper>
      )}
    </motion.div>
  );
};

PetsPage.displayName = "PetsPage";

export default PetsPage;
