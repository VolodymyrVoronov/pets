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

import arrowBackIcon from "../../assets/icons/arrow-back-outline.svg";

import styles from "./PetsPage.module.css";

const PetsPage = (): JSX.Element => {
  const navigator = useNavigate();
  const { data, isLoading, isError, error } = useQuery("getPets", getPets);

  const onBackButtonClick = (): void => {
    navigator(Paths.StartPage, { replace: true });
  };

  // if (isError && error instanceof Error) {
  //   return <span>Error: {error.message}</span>;
  // }

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
      {isLoading ? (
        <ColoredWrapper bg="blue" className={styles.loader}>
          <Loader />
        </ColoredWrapper>
      ) : (
        <ColoredWrapper bg="blue" className={styles.container}>
          test
        </ColoredWrapper>
      )}
    </motion.div>
  );
};

PetsPage.displayName = "PetsPage";

export default PetsPage;
